class @Mercury.Regions.Plain extends @Mercury.Regions.Basic
	type = 'plain'

	constructor: (@element, @window, @options = {}) ->
		super
		@type = 'plain'

	execCommand: (action, options = {}) ->
		console.log action
		unless action in ['redo','undo','insertHTML']
			return false

		# use a custom handler if there's one, otherwise use execCommand
		if handler = Mercury.config.behaviors[action] || @actions[action]
			handler.call(@, @selection(), options)
		else
			sibling = @element.get(0).previousSibling if action == 'indent'
			options.value = jQuery('<div>').html(options.value).html() if action == 'insertHTML' && options.value && options.value.get
			try
				@document.execCommand(action, false, options.value)
			catch error
				# mozilla: indenting when there's no br tag handles strangely
				# todo: mozilla: trying to justify the first line of any contentEditable fails
				@element.prev().remove() if action == 'indent' && @element.prev() != sibling

	handlePaste: (prePasteContent) ->
		prePasteContent = prePasteContent.replace(/^\<br\>/, '')

		# remove any regions that might have been pasted
		@element.find('.mercury-region').remove()

		# handle pasting from ms office etc
		content = @content()

		# strip styles
		pasted = prePasteContent.singleDiff(@content())

		container = jQuery('<div>').appendTo(@document.createDocumentFragment()).html(pasted)
		container.find('[style]').attr({style: null})

		@document.execCommand('undo', false, null)
		@execCommand('insertHTML', {value: container.text()})

	# Custom actions (eg. things that execCommand doesn't do, or doesn't do well)
	actions: {
		undo: -> @content(@history.undo())
		redo: -> @content(@history.redo())
	}
