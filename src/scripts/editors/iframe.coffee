class @Mercury.IframeEditor extends @Mercury.Editor

	# options
	# saveStyle: 'form', or 'json' (defaults to json)
	# ignoredLinks: an array containing classes for links to ignore (eg. lightbox or accordian controls)
	constructor: (@saveUrl = null, @options = {}) ->
		super

		throw "Mercury.PageEditor is unsupported in this client. Supported browsers are chrome 10+, firefix 4+, and safari 5+." unless Mercury.supported
		throw "Mercury.PageEditor can only be instantiated once." if window.mercuryInstance

		window.mercuryInstance = @
		@regions = []
		@initializeInterface()
		Mercury.csrfToken = token if token = jQuery('meta[name="csrf-token"]').attr('content')

		$ ->
			$('body').createPromiseEvent('mercury-ready').trigger('mercury-ready')

	initializeInterface: ->
		super
	
		document.body.innerHTML = '&nbsp;'
		#stylesheet.disabled = true for stylesheet in document.styleSheets

		@focusableElement = jQuery('<input>',{
			type: 'text'
			style: 'position:absolute;opacity:0'
		}).appendTo(@options.appendTo ? 'body')
		@iframe = jQuery('<iframe>', {
			class: 'mercury-iframe'
			seamless: 'true'
			frameborder: '0'
			src: 'about:blank'
		})
		@iframe.appendTo(jQuery(@options.appendTo).get(0) ? 'body')
	
		@iframe.load => @initializeEditor()
		@iframe.get(0).contentWindow.document.location.href = @iframeSrc()


	initializeEditor: ->
		super

		@toolbar = new Mercury.Toolbar(@options)
		@statusbar = new Mercury.Statusbar(@options)

		try
			return if @iframe.data('loaded')
			@iframe.data('loaded', true)
			@document = jQuery(@iframe.get(0).contentWindow.document)
			jQuery("<style mercury-styles=\"true\">")
				.html(Mercury.config.injectedStyles)
				.appendTo(@document.find('head'))
			$('body').addClass('mercury-iframe')

			# jquery: make jQuery evaluate scripts within the context of the iframe window -- note that this means that we
			# can't use eval in mercury (eg. script tags in ajax responses) because it will eval in the wrong context (you can
			# use top.Mercury though, if you keep it in mind)
			iframeWindow = @iframe.get(0).contentWindow
			jQuery.globalEval = (data) -> (iframeWindow.execScript || (data) -> iframeWindow["eval"].call(iframeWindow, data))(data) if (data && /\S/.test(data))
			iframeWindow.Mercury = Mercury

			@bindEvents()
			@initializeRegions()
			@finalizeInterface()
		catch error
			alert("Mercury.PageEditor failed to load: #{error}\n\nPlease try refreshing.")

	buildRegion: (region) ->
		super region, @iframe.get(0).contentWindow

	bindEvents: ->
		super

		Mercury.bind 'focus:frame', => @iframe.focus()
		Mercury.bind 'focus:window', => setTimeout((=> @focusableElement.focus()), 10)

	resize: ->
		width = jQuery(window).width()
		height = @statusbar.top()
		toolbarHeight = @toolbar.height()

		Mercury.displayRect = {top: toolbarHeight, left: 0, width: width, height: height - toolbarHeight, fullHeight: height}

		@iframe.css {
			top: Mercury.displayRect.top
			left: 0
			height: Mercury.displayRect.height
		}
		
		super

	iframeSrc: (url = null) ->
		(url ? window.location.href).replace(/([http|https]:\/\/.[^\/]*)\/editor\/?(.*)/i, "$1/$2")

	save: ->
		url = @saveUrl ? @iframeSrc()
		super url
