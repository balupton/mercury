class @Mercury.InlineEditor extends @Mercury.Editor

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
		Mercury.csrfToken = token if token = $('meta[name="csrf-token"]').attr('content')

		$ ->
			$('body').createPromiseEvent('mercury-ready').trigger('mercury-ready')

	initializeInterface: ->
		super

		@initializeEditor()
		
	initializeEditor: ->
		super

		@document = $(document)
		@toolbar = new Mercury.Toolbar(@options)
		@statusbar = new Mercury.Statusbar(@options)

		$('body').addClass('mercury-inline').css({
			'padding-top': @toolbar.height()
			'padding-bottom': @statusbar.height()
		}).addClass('mercury-hidden')

		$("<style mercury-styles=\"true\">")
			.html(Mercury.config.injectedStyles)
			.appendTo(@document.find('head'))
		
		@bindEvents()
		@initializeRegions()
		@finalizeInterface()

	buildRegion: (region) ->
		super region, window

	bindEvents: ->
		super

		Mercury.bind 'region:focused', ->
			$('body').removeClass('mercury-hidden')
		Mercury.bind 'region:blurred', ->
			$('body').addClass('mercury-hidden')

	save: ->
		super @saveUrl ? document.location.href
