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

		$('body').addClass('mercury-inline').addClass('mercury-hidden')

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
			$body = $('body')
			$body.removeClass('mercury-hidden')
			if Mercury.region.element.offset().top <= window.mercuryInstance.toolbar.height()
				$body.css {
					position: 'absolute'
					top: window.mercuryInstance.toolbar.height()
				}
			else
				$body.css {
					position: 'static'
					top: 0
				}
		Mercury.bind 'region:blurred', ->
			$body = $('body')
			$body.addClass('mercury-hidden').css {
				position: 'static'
				top: 0
			}

	save: ->
		super @saveUrl ? document.location.href

	resize: ->
		width = jQuery(window).width()
		height = jQuery(window).height()

		Mercury.displayRect = {top: 0, left: 0, width: width, height: height, fullHeight: height}

		super