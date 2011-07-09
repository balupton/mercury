# Cancel if inside the Mercury iFrame
if window.top.Mercury? and window.top.Mercury.loaded?
	return

# Prepare
mercuryEl = document.getElementById('mercury-include')
mercuryBaseUrl = mercuryEl.src.replace(/\?.*$/,'').replace(/mercury\.(js|coffee)$/, '').replace(/\/+$/, '')+'/'

# Load in with Buildr
mercuryBuildr = new window.Buildr {
	baseUrl: mercuryBaseUrl
	beforeEl: mercuryEl
	serverCompilation: window.serverCompilation or false
	scripts: scripts
	styles: styles
}
mercuryBuildr.load()

# Includes
includes =
	scripts: [
		'mercury.coffee'
		'native_extensions.coffee'
		'jquery_extensions.coffee'
		'editor.coffee'
		'editors/iframe.coffee'
		'editors/inline.coffee'
		'history_buffer.coffee'
		'table_editor.coffee'
		'dialog.coffee'
		'palette.coffee'
		'select.coffee'
		'panel.coffee'
		'modal.coffee'
		'statusbar.coffee'
		'toolbar.coffee'
		'toolbar.button.coffee'
		'toolbar.button_group.coffee'
		'toolbar.expander.coffee'
		'tooltip.coffee'
		'snippet.coffee'
		'snippet_toolbar.coffee'
		'region.coffee'
		'uploader.coffee'
		'regions/basic.coffee'
		'regions/plain.coffee'
		'regions/rich.coffee'
		'regions/markupable.coffee'
		'regions/snippetable.coffee'
		'dialogs/backcolor.coffee'
		'dialogs/forecolor.coffee'
		'dialogs/formatblock.coffee'
		'dialogs/objectspanel.coffee'
		'dialogs/style.coffee'
		'modals/htmleditor.coffee'
		'modals/insertcharacter.coffee'
		'modals/insertlink.coffee'
		'modals/insertmedia.coffee'
		'modals/insertsnippet.coffee'
		'modals/inserttable.coffee'
		'loaded.coffee'
	]
	styles: [
		'mercury.less'
		'dialog.less'
		'modal.less'
		'statusbar.less'
		'toolbar.less'
		'tooltip.less'
		'uploader.less'
	]


# Buildr
window.Buildr = class
	# Options
	scripts: null
	styles: null
	appendUrl: null
	baseUrl: null
	beforeEl: null
	serverCompilation: null

	# Construct a new Buildr instance
	constructor: ({scripts,styles,appendUrl,baseUrl,beforeEl,serverCompilation}) ->
		@scripts = scripts or []
		@styles = styles or []
		@appendUrl = appendUrl or document.head or document.getElementsByTagName('head')[0]
		@baseUrl = baseUrl or @getRootUrl()
		@beforeEl = beforeEl or document.head.lastChild
		@serverCompilation = serverCompilation or false

	# Get the root url of our page
	getRootUrl: ->
		# Prepare
		host = (document.location.hostname||document.location.host)
		protocol = document.location.protocol
		rootUrl = "#{protocol}//#{host}"
		
		# Port	
		if document.location.port
			rootUrl += ':'+document.location.port
		rootUrl += '/'

		# Return
		rootUrl
	
	# Load Styles and Scripts
	load: (next) ->
		loadStyle ->
			loadScript ->
				next() if next
	
	# Script Loader
	loadScriptIndex: 0
	loadScript: (next) ->
		# Prepare
		me = @
		scriptSrc = mercuryBase + 'scripts/' + includes.scripts[loadScriptIndex]
		scriptSrc += '?js' if @serverCompilation?
		scriptLoaded = ->
			if this.readyState? and this.readyState isnt 'complete'
				return
			if this.src? and this.src isnt scriptSrc
				return
			++loadScriptIndex
			me.loadScript next

		# Exists
		if includes.scripts[loadScriptIndex]?
			scriptEl = document.createElement('script')
			scriptEl.src = scriptSrc
			if /\.coffee$/.test(scriptSrc)
				scriptEl.type = 'text/coffeescript'
			else
				scriptEl.onreadystatechange = scriptLoaded
				scriptEl.onload = scriptLoaded
				scriptEl.onerror = scriptLoaded
			appendEl.appendChild scriptEl, beforeEl.nextSibling
			beforeEl = scriptEl
			if /\.coffee$/.test(scriptSrc)
				scriptLoaded()

		# Completed
		else
			next()

		# Return
		true

	# Style Loader
	loadStyleIndex: 0
	loadStyle: (next) ->
		# Prepare
		me = @
		styleHref = mercuryBase + 'styles/' + includes.styles[loadStyleIndex]
		styleHref += '?css' if @serverCompilation?
		styleLoaded = ->
			++loadStyleIndex
			me.loadStyle next

		# Exists
		if includes.styles[loadStyleIndex]?
			styleEl = document.createElement('link')
			styleEl.href = styleHref
			styleEl.media = 'screen'
			if /\.less$/.test(styleHref)
				styleEl.rel = 'stylesheet/less'
			else
				styleEl.rel = 'stylesheet'
			styleEl.type = 'text/css'
			#styleEl.onreadystatechange = styleLoaded
			#styleEl.onload = styleLoaded
			#styleEl.onerror = styleLoaded
			appendEl.insertBefore styleEl, beforeEl.nextSibling
			beforeEl = styleEl
			styleLoaded()

		# Completed
		else
			next()

		# Return
		true
