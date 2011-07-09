# Requires
buildr = require 'buildr'

# Includes
config = 
	srcPath: __dirname+'/src'
	outPath: __dirname+'/src'
	outStylePath: __dirname+'/src/mercury.css'
	outScriptPath: __dirname+'/src/mercury.js'
	compress: true
	scripts: [
		'scripts/mercury.coffee'
		'scripts/native_extensions.coffee'
		'scripts/jquery_extensions.coffee'
		'scripts/editor.coffee'
		'scripts/editors/iframe.coffee'
		'scripts/editors/inline.coffee'
		'scripts/history_buffer.coffee'
		'scripts/table_editor.coffee'
		'scripts/dialog.coffee'
		'scripts/palette.coffee'
		'scripts/select.coffee'
		'scripts/panel.coffee'
		'scripts/modal.coffee'
		'scripts/statusbar.coffee'
		'scripts/toolbar.coffee'
		'scripts/toolbar.button.coffee'
		'scripts/toolbar.button_group.coffee'
		'scripts/toolbar.expander.coffee'
		'scripts/tooltip.coffee'
		'scripts/snippet.coffee'
		'scripts/snippet_toolbar.coffee'
		'scripts/region.coffee'
		'scripts/uploader.coffee'
		'scripts/regions/basic.coffee'
		'scripts/regions/plain.coffee'
		'scripts/regions/rich.coffee'
		'scripts/regions/markupable.coffee'
		'scripts/regions/snippetable.coffee'
		'scripts/dialogs/backcolor.coffee'
		'scripts/dialogs/forecolor.coffee'
		'scripts/dialogs/formatblock.coffee'
		'scripts/dialogs/objectspanel.coffee'
		'scripts/dialogs/style.coffee'
		'scripts/modals/htmleditor.coffee'
		'scripts/modals/insertcharacter.coffee'
		'scripts/modals/insertlink.coffee'
		'scripts/modals/insertmedia.coffee'
		'scripts/modals/insertsnippet.coffee'
		'scripts/modals/inserttable.coffee'
		'scripts/loaded.coffee'
	]
	styles: [
		'styles/mercury.less'
		'styles/dialog.less'
		'styles/modal.less'
		'styles/statusbar.less'
		'styles/toolbar.less'
		'styles/tooltip.less'
		'styles/uploader.less'
	]

# Build
mercuryBuildr = buildr.createInstance(config)
mercuryBuildr.process (err) ->
	throw err if err
