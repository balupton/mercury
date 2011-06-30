# Check
if window.top.Mercury? and window.top.Mercury.loaded?
	return

# Includes
includes =
	scripts: [
		'mercury.coffee'
		'native_extensions.coffee'
		'jquery_extensions.coffee'
		'page_editor.coffee'
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
		'regions/editable.coffee'
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

# Prepare
appendEl = document.head or document.getElementsByTagName('head')[0]
mercuryEl = document.getElementById('mercury-include')
mercuryBase = mercuryEl.src.replace(/\?.*$/,'').replace(/mercury\.(js|coffee)$/, '').replace(/\/+$/, '')+'/'
beforeEl = mercuryEl

# Script Loader
loadScriptIndex = 0
loadScript = (next) ->
	# Prepare
	scriptSrc = mercuryBase + 'scripts/' + includes.scripts[loadScriptIndex]# + '?js'
	scriptLoaded = ->
		if this.readyState? and this.readyState isnt 'complete'
			return
		if this.src? and this.src isnt scriptSrc
			return
		++loadScriptIndex
		loadScript(next)

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
		appendEl.appendChild(scriptEl,beforeEl.nextSibling)
		beforeEl = scriptEl
		if /\.coffee$/.test(scriptSrc)
			scriptLoaded()

	# Completed
	else
		next()

	# Return
	true

# Style Loader
loadStyleIndex = 0
loadStyle = (next) ->
	# Prepare
	styleHref = mercuryBase + 'styles/' + includes.styles[loadStyleIndex]
	styleLoaded = ->
		++loadStyleIndex
		loadStyle(next)

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
		appendEl.insertBefore(styleEl,beforeEl.nextSibling)
		beforeEl = styleEl
		styleLoaded()

	# Completed
	else
		next()

	# Return
	true

# Load
loadStyle ->
	loadScript ->