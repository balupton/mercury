@Mercury.dialogHandlers.backColor = ->
	# needs to be mousedown
	@element.find('.picker, .last-picked').mousedown (event) =>
		color = jQuery(event.target).css('background-color')
		@element.find('.last-picked').css({background: color})
		@button.css({backgroundColor: color})
		Mercury.trigger('action', {action: 'backColor', value: color})
