class @Mercury.Regions.Rich extends Mercury.Regions.Basic
	type = 'rich'

	constructor: (@element, @window, @options = {}) ->
		super
		@type = 'rich'

		unless @document.mercuryEditing
			@document.execCommand('insertBROnReturn', false, true)
			@document.execCommand('enableObjectResizing', false, true)

	bindEvents: ->
		super

		@element.bind 'dragenter', (event) =>
			event.preventDefault() if event.preventDefault
			event.originalEvent.dataTransfer.dropEffect = 'copy'

		@element.bind 'dragover', (event) =>
			event.preventDefault() if event.preventDefault
			event.originalEvent.dataTransfer.dropEffect = 'copy'

		@element.bind 'drop', (event) =>
			return if @previewing

			# handle dropping snippets
			clearTimeout(@dropTimeout)
			@dropTimeout = setTimeout((=> @element.trigger('possible:drop')), 1)

			# handle any files that were dropped
			return unless event.originalEvent.dataTransfer.files.length
			event.preventDefault() if event.preventDefault
			@focus()
			Mercury.uploader(event.originalEvent.dataTransfer.files[0])

		@element.unbind('keydown').keydown (event) =>
			return if @previewing
			Mercury.changes = true
			switch event.keyCode
				when 90 # undo / redo
					return unless event.metaKey
					event.preventDefault()
					if event.shiftKey then @execCommand('redo') else @execCommand('undo')
					return

				when 13 # enter
					if jQuery.browser.webkit && @selection().commonAncestor().closest('li, ul', @element).length == 0
						event.preventDefault()
						@document.execCommand('insertLineBreak', false, null)
					else if @specialContainer
						# mozilla: pressing enter in any elemeny besides a div handles strangely
						event.preventDefault()
						@document.execCommand('insertHTML', false, '<br/>')

				when 9 # tab
					event.preventDefault()
					container = @selection().commonAncestor()
					handled = false

					# indent when inside of an li
					if container.closest('li', @element).length
						handled = true
						if event.shiftKey then @execCommand('outdent') else @execCommand('indent')

					@execCommand('insertHTML', {value: '&nbsp; '}) unless handled

			if event.metaKey
				switch event.keyCode
					when 66 # b
						@execCommand('bold')
						event.preventDefault()

					when 73 # i
						@execCommand('italic')
						event.preventDefault()

					when 85 # u
						@execCommand('underline')
						event.preventDefault()

			@pushHistory(event.keyCode)

		@element.keyup =>
			return if @previewing
			Mercury.trigger('region:update', {region: @})
