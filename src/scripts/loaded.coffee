@Mercury.loaded = true
$ ->
	if window.Mercury.config.editor is 'iframe'
		new window.Mercury.IframeEditor()
	else
		new window.Mercury.InlineEditor()