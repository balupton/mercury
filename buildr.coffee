# Requires
fs = require 'fs'
path = require 'path'
util = require 'bal-util'
coffee = require 'coffee-script'
less = require 'less'
cwd = process.cwd()

# Includes
config = 
	srcPath: 'src'
	outPath: 'out'
	outStylePath: 'out/mercury.css'
	outScriptPath: 'out/mercury.js'
	scripts: [
		'scripts/mercury.coffee'
		'scripts/native_extensions.coffee'
		'scripts/jquery_extensions.coffee'
		'scripts/page_editor.coffee'
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
		'scripts/regions/editable.coffee'
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

# -------------------------------------
# Define Buildr

class Buildr
	
	# Configuration
	config: {}

	# Create
	constructor: (@config) ->

	# Process
	process: (next) ->
		# Prepare
		tasks = new util.Group (err) ->
			next err
		tasks.total += 2

		# Expand configuration paths
		@expandPaths (err) =>
			return next err if err
			
			# Copy srcPath to outPath
			@cpSrcToOut (err) =>
				return next err if err

				# Generate out script file
				@generateOutScriptFile (err) ->
					tasks.complete err

				# Generate out script file
				@generateOutStyleFile (err) ->
					tasks.complete err

	# -------------------------------------
	# Process Steps

	# Expand configuration paths
	# next(err)
	expandPaths: (next) ->
		# Prepare
		tasks = new util.Group (err) ->
			next err
		tasks.total += 3

		# Expand srcPath
		util.expandPath @config.srcPath, cwd, {}, (err,srcPath) =>
			return tasks.exit err if err
			@config.srcPath = srcPath
			tasks.complete err

		# Expand outPath
		util.expandPath @config.outPath, cwd, {}, (err,outPath) =>
			return tasks.exit err if err
			@config.outPath = outPath
			tasks.complete err
		
		# Expand outScriptPath
		util.expandPath @config.outScriptPath, cwd, {}, (err,outScriptPath) =>
			return tasks.exit err if err
			@config.outScriptPath = outScriptPath
			tasks.complete err
		

	# Copy srcPath to outPath
	# next(err)
	cpSrcToOut: (next) ->
		# Remove outPath
		util.rmdir @config.outPath, (err) =>
			return next err if err

			# Copy srcPath to outPath
			util.cpdir @config.srcPath, @config.outPath, (err) ->
				# Next
				next err
	
	# Generate out style file
	# next(err)
	generateOutStyleFile: (next) ->
		# Prepare
		source = ''

		# Cycle
		for file in @config.styles
			if path.extname(file) isnt '.less'
				return next new Error('Buildr does not support css files, only less files')
			source += """@import "#{file}";\n"""
		
		# Prepare Compile
		fileOutPath = @config.outStylePath
		data = source
		options = 
			paths: [@config.outPath]
			optimization: 1
			filename: fileOutPath
		
		# Compile
		new (less.Parser)(options).parse data, (err, tree) ->
			if err
				console.log err
				next new Error('Less compilation failed')
			else
				try
					css = tree.toCSS(compress: 1)
					fs.writeFile fileOutPath, css, (err) ->
						next err
				catch err
					next err
	
	# Generate out script file
	# next(err)
	generateOutScriptFile: (next) ->
		# Prepare
		results = {}
		tasks = new util.Group (err) =>
			return next err if err

			# Prepare
			result = ''

			# Cycle
			for file in @config.scripts
				unless results[file]?
					return next new Error('A file failed to compile')
				result += results[file]
			
			# Write file
			fs.writeFile @config.outScriptPath, result, (err) ->
				next err
		tasks.total += @config.scripts.length
		
		# Cycle
		for file in @config.scripts
			# Expand filePath
			((file)=>
				util.expandPath file, @config.outPath, {}, (err,filePath) =>
					return tasks.exit err if err
					
					# Render
					@getScriptData filePath, (err,data) ->
						return tasks.exit err if err
						results[file] = data
						tasks.complete err
			)(file)

	# -------------------------------------
	# Utilities
	
	# Compile
	# next(err,data)
	getScriptData: (filePath,next) ->
		# Read
		fs.readFile filePath, (err,data) ->
			return next err if err
			result = ''

			# Compile
			try
				switch path.extname(filePath)
					when '.coffee'
						result = coffee.compile(data.toString())
					when '.js'
						result = data.toString()
					else
						throw new Error('Unknown script type')
			catch err
				next err

			next false, result


# -------------------------------------
# Create Buildr

buildr = new Buildr(config)
buildr.process (err) ->
	throw err if err
