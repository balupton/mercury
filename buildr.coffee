# Requires
buildr = require 'buildr'

# Includes
config = 
	# Paths
	srcPath: __dirname+'/src'
	outPath: __dirname+'/src'

	# Checking
	checkScripts: false
	checkStyles: false

	# Compression (requires outPath)
	compressScripts: true # Array or true or false
	compressStyles: true # Array or true or false
	compressImages: true # Array or true or false

	# Order
	scriptsOrder: [
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
	stylesOrder: [
		'styles/mercury.less'
		'styles/dialog.less'
		'styles/modal.less'
		'styles/statusbar.less'
		'styles/toolbar.less'
		'styles/tooltip.less'
		'styles/uploader.less'
	]

	# Bundling
	bundleStylePath: __dirname+'/src/mercury.css'
	bundleScriptPath: __dirname+'/src/mercury.js'

	# Loaders
	srcLoaderPath: __dirname+'/src/dev.js'
	srcLoaderHeader: '''
		# Cancel if inside the Mercury iFrame
		if window.top.Mercury? and window.top.Mercury.loaded?
			return

		# Prepare
		mercuryEl = document.getElementById('mercury-include')
		mercuryBaseUrl = mercuryEl.src.replace(/\\?.*$/,'').replace(/dev\\.js$/, '').replace(/\\/+$/, '')+'/'

		# Load in with Buildr
		mercuryBuildr = new window.Buildr {
			baseUrl: mercuryBaseUrl
			beforeEl: mercuryEl
			serverCompilation: window.serverCompilation or false
			scripts: scripts
			styles: styles
		}
		mercuryBuildr.load()
		''' # note, all \ in this are escaped due to it being in a string



# Build
mercuryBuildr = buildr.createInstance(config)
mercuryBuildr.process (err) ->
	throw err if err
	console.log 'Building completed'
