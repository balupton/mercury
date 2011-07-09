class @Mercury.Editor

	# options
	# saveStyle: 'form', or 'json' (defaults to json)
	# ignoredLinks: an array containing classes for links to ignore (eg. lightbox or accordian controls)
	constructor: (@saveUrl = null, @options = {}) ->
		# Should be implemented by inherited
	
	initializeInterface: ->
		# Should be implemented by inherited
		
	initializeEditor: ->
		# Should be implemented by inherited
		

	initializeRegions: ->
		jQuery('.mercury-region', @document).mercury()
		for region in @regions
			if region.focus
				region.focus()
				break


	buildRegion: (region,window) ->
		try
			type = (region.data('type') or 'rich').titleize()
			@regions.push(new Mercury.Regions[type](region, window))
		catch error
			throw error if Mercury.debug
			alert("Region type is malformed, no data-type provided, or \"#{type}\" is unknown.")

	finalizeInterface: ->
		@snippetToolbar = new Mercury.SnippetToolbar(@document)
		@hijackLinks()
		@resize()


	bindEvents: ->
		Mercury.bind 'initialize:frame', => setTimeout(@initializeFrame, 1000)

		Mercury.bind 'region:focused', ->
			$('body').removeClass('mercury-hidden')
		
		Mercury.bind 'region:blurred', ->
			$('body').addClass('mercury-hidden')
		
		Mercury.bind 'action', (event, options) =>
			 @save() if options.action == 'save'

		@document.mousedown (event) ->
			Mercury.trigger('hide:dialogs')
			if Mercury.region
				Mercury.trigger('unfocus:regions') unless jQuery(event.target).closest('.mercury-region').get(0) == Mercury.region.element.get(0)

		jQuery(window).resize => @resize()
		window.onbeforeunload = @beforeUnload


	resize: ->
		Mercury.trigger('resize')


	hijackLinks: ->
		for link in jQuery('a', @document)
			ignored = false
			for classname in @options.ignoredLinks || []
				if jQuery(link).hasClass(classname)
					ignored = true
					continue
			if !ignored && (link.target == '' || link.target == '_self') && !jQuery(link).closest('.mercury-region').length
				jQuery(link).attr('target', '_top')


	beforeUnload: ->
		if Mercury.changes && !Mercury.silent
			return "You have unsaved changes.	Are you sure you want to leave without saving them first?"
		return null


	save: (url) ->
		data = @serialize()
		Mercury.log('saving', data)
		data = jQuery.toJSON(data) unless @options.saveStyle == 'form'
		jQuery.ajax url, {
			type: 'POST'
			data: {content: data}
			success: =>
				Mercury.changes = false
			error: =>
				alert("Mercury was unable to save to the url: #{url}")
		}

	serialize: ->
		serialized = {}
		serialized[region.name] = region.serialize() for region in @regions
		return serialized
