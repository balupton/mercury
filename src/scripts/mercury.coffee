#!
# Mercury Editor is a Coffeescript and jQuery based WYSIWYG editor.  Documentation and other useful information can be
# found at https://github.com/jejacks0n/mercury
#
# Supported browsers:
#   - Firefox 4+
#   - Chrome 10+
#   - Safari 5+
#
# Copyright (c) 2011 Jeremy Jackson
#
# Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
# documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
# rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
# persons to whom the Software is furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
# Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
# WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
# COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
# OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
#
#
#= require jquery-1.6
#= require jquery-ui-1.8.13.custom
#= require jquery.additions
#= require liquidmetal
#= require showdown
#
#= require_self
#= require ./native_extensions
#= require ./page_editor
#= require ./history_buffer
#= require ./table_editor
#= require ./dialog
#= require ./palette
#= require ./select
#= require ./panel
#= require ./modal
#= require ./statusbar
#= require ./toolbar
#= require ./toolbar.button
#= require ./toolbar.button_group
#= require ./toolbar.expander
#= require ./tooltip
#= require ./snippet
#= require ./snippet_toolbar
#= require ./region
#= require ./uploader
#= require_tree ./regions
#= require_tree ./dialogs
#= require_tree ./modals
#

# iFrame / no-iFrame handle
if window.top.Mercury? and window.top.Mercury.loaded?
	window.mercuryWindow = window.top
	return
else
	window.mercuryWindow = window

# Mercury! Do a little dance! Boom cha cha boom cha cha
Mercury = window.Mercury = jQuery.extend(

	# Deep Extend
	true

	# Default
	{
		# Options
		silent: false
		debug: true

		# Configuration
		config: 
			editor: 'inline'
			
			cleanStylesOnPaste: true
			snippets: 
				optionsUrl: "/mercury/snippets/:name/options"
				previewUrl: "/mercury/snippets/:name/preview"
			
			uploading: 
				enabled: 'local'
				allowedMimeTypes: [ "image/jpeg", "image/gif", "image/png" ]
				maxFileSize: 1235242880
				inputName: "image[image]"
				url: "/images"
				handler: false

			toolbars: 
				primary: 
					save: [ "Save", "Save this page" ]
					preview: [ "Preview", "Preview this page", 
						toggle: true
						mode: true
					 ]
					sep1: " "
					undoredo: 
						undo: [ "Undo", "Undo your last action" ]
						redo: [ "Redo", "Redo your last action" ]
						sep: " "
					
					insertLink: [ "Link", "Insert Link", 
						modal: "/mercury/modals/link"
						regions: [ "rich", "markupable" ]
					 ]
					insertMedia: [ "Media", "Insert Media (images and videos)", 
						modal: "/mercury/modals/media"
						regions: [ "rich", "markupable" ]
					 ]
					insertTable: [ "Table", "Insert Table", 
						modal: "/mercury/modals/table"
						regions: [ "rich", "markupable" ]
					 ]
					insertCharacter: [ "Character", "Special Characters", 
						modal: "/mercury/modals/character"
						regions: [ "rich", "markupable" ]
					 ]
					snippetPanel: [ "Snippet", "Snippet Panel", panel: "/mercury/panels/snippets" ]
					sep2: " "
					historyPanel: [ "History", "Page Version History", panel: "/mercury/panels/history" ]
					sep3: " "
					notesPanel: [ "Notes", "Page Notes", panel: "/mercury/panels/notes" ]
				
				simple: 
					_regions: [ "basic", "rich", "markupable" ]
					predefined: 
						style: [ "Style", null, 
							select: "/mercury/selects/style"
							preload: true
						 ]
						sep1: " "
						formatblock: [ "Block Format", null, 
							select: "/mercury/selects/formatblock"
							preload: true
						 ]
						sep2: "-"
					
					colors: 
						backColor: [ "Background Color", null, 
							palette: "/mercury/palettes/backcolor"
							context: true
							preload: true
							regions: [ "basic", "rich" ]
						 ]
						sep1: " "
						foreColor: [ "Text Color", null, 
							palette: "/mercury/palettes/forecolor"
							context: true
							preload: true
							regions: [ "basic", "rich" ]
						 ]
						sep2: "-"
					
					decoration: 
						bold: [ "Bold", null, context: true ]
						italic: [ "Italicize", null, context: true ]
						overline: [ "Overline", null, 
							context: true
							regions: [ "basic", "rich" ]
						 ]
						strikethrough: [ "Strikethrough", null, 
							context: true
							regions: [ "basic", "rich" ]
						 ]
						underline: [ "Underline", null, 
							context: true
							regions: [ "basic", "rich" ]
						 ]
						sep: "-"
					
					script: 
						subscript: [ "Subscript", null, context: true ]
						superscript: [ "Superscript", null, context: true ]

				editable: 
					_regions: [ "rich", "markupable" ]
					justify: 
						justifyLeft: [ "Align Left", null, 
							context: true
							regions: [ "rich" ]
						 ]
						justifyCenter: [ "Center", null, 
							context: true
							regions: [ "rich" ]
						 ]
						justifyRight: [ "Align Right", null, 
							context: true
							regions: [ "rich" ]
						 ]
						justifyFull: [ "Justify Full", null, 
							context: true
							regions: [ "rich" ]
						 ]
						sep: "-"
					
					list: 
						insertUnorderedList: [ "Unordered List", null, context: true ]
						insertOrderedList: [ "Numbered List", null, context: true ]
						sep: "-"
					
					indent: 
						outdent: [ "Decrease Indentation", null ]
						indent: [ "Increase Indentation", null ]
						sep: "-"
					
					table: 
						_context: true
						insertRowBefore: [ "Insert Table Row", "Insert a table row before the cursor", regions: [ "rich" ] ]
						insertRowAfter: [ "Insert Table Row", "Insert a table row after the cursor", regions: [ "rich" ] ]
						deleteRow: [ "Delete Table Row", "Delete this table row", regions: [ "rich" ] ]
						insertColumnBefore: [ "Insert Table Column", "Insert a table column before the cursor", regions: [ "rich" ] ]
						insertColumnAfter: [ "Insert Table Column", "Insert a table column after the cursor", regions: [ "rich" ] ]
						deleteColumn: [ "Delete Table Column", "Delete this table column", regions: [ "rich" ] ]
						sep1: " "
						increaseColspan: [ "Increase Cell Columns", "Increase the cells colspan" ]
						decreaseColspan: [ "Decrease Cell Columns", "Decrease the cells colspan and add a new cell" ]
						increaseRowspan: [ "Increase Cell Rows", "Increase the cells rowspan" ]
						decreaseRowspan: [ "Decrease Cell Rows", "Decrease the cells rowspan and add a new cell" ]
						sep2: "-"
					
					rules: 
						horizontalRule: [ "Horizontal Rule", "Insert a horizontal rule" ]
						sep1: "-"
					
					formatting: 
						removeFormatting: [ "Remove Formatting", "Remove formatting for the selection", regions: [ "rich" ] ]
						sep2: " "
					
					editors: htmlEditor: [ "Edit HTML", "Edit the HTML content", regions: [ "rich" ] ]
				
				snippetable: 
					_custom: true
					actions: 
						editSnippet: [ "Edit Snippet Settings", null ]
						sep1: " "
						removeSnippet: [ "Remove Snippet", null ]
			
			behaviors: 
				horizontalRule: (selection) ->
					selection.replace "<hr/>"
				
				htmlEditor: ->
					Mercury.modal "/mercury/modals/htmleditor", 
						title: "HTML Editor"
						fullHeight: true
						handler: "htmlEditor"
			
			injectedStyles: "" + ".mercury-region, .mercury-textarea { min-height: 10px; outline: 1px dotted #09F }" + ".mercury-textarea { box-sizing: border-box; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; resize: vertical; }" + ".mercury-region:focus, .mercury-region.focus, .mercury-textarea.focus { outline: none; -webkit-box-shadow: 0 0 10px #09F, 0 0 1px #045; box-shadow: 0 0 10px #09F, 0 0 1px #045 }" + ".mercury-region:after { content: \".\"; display: block; visibility: hidden; clear: both; height: 0; overflow: hidden; }" + ".mercury-region table, .mercury-region td, .mercury-region th { border: 1px dotted red; }"

		# Mercury object namespaces
		Regions: {}
		modalHandlers: {}
		dialogHandlers: {}
		preloadedViews: {}
	}

	# User Configuration
	window.Mercury||{}

	# Custom Configuration
	{
		version: '0.2.0'

		# No IE support yet because it doesn't follow the W3C standards for HTML5 contentEditable (aka designMode).
		supported: document.getElementById && document.designMode && !jQuery.browser.konqueror && !jQuery.browser.msie

		# Custom event and logging methods
		bind: (eventName, callback) ->
			jQuery(document).bind("mercury:#{eventName}", callback)

		trigger: (eventName, options) ->
			Mercury.log(eventName, options)
			jQuery(document).trigger("mercury:#{eventName}", options)

		log: ->
			if Mercury.debug && console
				return if arguments[0] == 'hide:toolbar' || arguments[0] == 'show:toolbar'
				try console.debug(arguments) catch e

	}
)