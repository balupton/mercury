(function() {
  /*!
  Mercury Editor is a Coffeescript and jQuery based WYSIWYG editor.  Documentation and other useful information can be found at https://github.com/jejacks0n/mercury
  
  Supported browsers:
    - Firefox 4+
    - Chrome 10+
    - Safari 5+
  
  Copyright (c) 2011 Jeremy Jackson
  
  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  */  var Mercury;
  if ((window.top.Mercury != null) && (window.top.Mercury.loaded != null)) {
    window.mercuryWindow = window.top;
    return;
  } else {
    window.mercuryWindow = window;
  }
  Mercury = window.Mercury = jQuery.extend(true, {
    silent: false,
    debug: true,
    config: {
      editor: 'inline',
      cleanStylesOnPaste: true,
      snippets: {
        optionsUrl: "/mercury/snippets/:name/options",
        previewUrl: "/mercury/snippets/:name/preview"
      },
      uploading: {
        enabled: 'local',
        allowedMimeTypes: ["image/jpeg", "image/gif", "image/png"],
        maxFileSize: 1235242880,
        inputName: "image[image]",
        url: "/images",
        handler: false
      },
      toolbars: {
        primary: {
          save: ["Save", "Save this page"],
          preview: [
            "Preview", "Preview this page", {
              toggle: true,
              mode: true
            }
          ],
          sep1: " ",
          undoredo: {
            undo: ["Undo", "Undo your last action"],
            redo: ["Redo", "Redo your last action"],
            sep: " "
          },
          insertLink: [
            "Link", "Insert Link", {
              modal: "/mercury/modals/link",
              regions: ["rich", "markupable"]
            }
          ],
          insertMedia: [
            "Media", "Insert Media (images and videos)", {
              modal: "/mercury/modals/media",
              regions: ["rich", "markupable"]
            }
          ],
          insertTable: [
            "Table", "Insert Table", {
              modal: "/mercury/modals/table",
              regions: ["rich", "markupable"]
            }
          ],
          insertCharacter: [
            "Character", "Special Characters", {
              modal: "/mercury/modals/character",
              regions: ["rich", "markupable"]
            }
          ],
          snippetPanel: [
            "Snippet", "Snippet Panel", {
              panel: "/mercury/panels/snippets"
            }
          ],
          sep2: " ",
          historyPanel: [
            "History", "Page Version History", {
              panel: "/mercury/panels/history"
            }
          ],
          sep3: " ",
          notesPanel: [
            "Notes", "Page Notes", {
              panel: "/mercury/panels/notes"
            }
          ]
        },
        simple: {
          _regions: ["basic", "rich", "markupable"],
          predefined: {
            style: [
              "Style", null, {
                select: "/mercury/selects/style",
                preload: true
              }
            ],
            sep1: " ",
            formatblock: [
              "Block Format", null, {
                select: "/mercury/selects/formatblock",
                preload: true
              }
            ],
            sep2: "-"
          },
          colors: {
            backColor: [
              "Background Color", null, {
                palette: "/mercury/palettes/backcolor",
                context: true,
                preload: true,
                regions: ["basic", "rich"]
              }
            ],
            sep1: " ",
            foreColor: [
              "Text Color", null, {
                palette: "/mercury/palettes/forecolor",
                context: true,
                preload: true,
                regions: ["basic", "rich"]
              }
            ],
            sep2: "-"
          },
          decoration: {
            bold: [
              "Bold", null, {
                context: true
              }
            ],
            italic: [
              "Italicize", null, {
                context: true
              }
            ],
            overline: [
              "Overline", null, {
                context: true,
                regions: ["basic", "rich"]
              }
            ],
            strikethrough: [
              "Strikethrough", null, {
                context: true,
                regions: ["basic", "rich"]
              }
            ],
            underline: [
              "Underline", null, {
                context: true,
                regions: ["basic", "rich"]
              }
            ],
            sep: "-"
          },
          script: {
            subscript: [
              "Subscript", null, {
                context: true
              }
            ],
            superscript: [
              "Superscript", null, {
                context: true
              }
            ]
          }
        },
        editable: {
          _regions: ["rich", "markupable"],
          justify: {
            justifyLeft: [
              "Align Left", null, {
                context: true,
                regions: ["rich"]
              }
            ],
            justifyCenter: [
              "Center", null, {
                context: true,
                regions: ["rich"]
              }
            ],
            justifyRight: [
              "Align Right", null, {
                context: true,
                regions: ["rich"]
              }
            ],
            justifyFull: [
              "Justify Full", null, {
                context: true,
                regions: ["rich"]
              }
            ],
            sep: "-"
          },
          list: {
            insertUnorderedList: [
              "Unordered List", null, {
                context: true
              }
            ],
            insertOrderedList: [
              "Numbered List", null, {
                context: true
              }
            ],
            sep: "-"
          },
          indent: {
            outdent: ["Decrease Indentation", null],
            indent: ["Increase Indentation", null],
            sep: "-"
          },
          table: {
            _context: true,
            insertRowBefore: [
              "Insert Table Row", "Insert a table row before the cursor", {
                regions: ["rich"]
              }
            ],
            insertRowAfter: [
              "Insert Table Row", "Insert a table row after the cursor", {
                regions: ["rich"]
              }
            ],
            deleteRow: [
              "Delete Table Row", "Delete this table row", {
                regions: ["rich"]
              }
            ],
            insertColumnBefore: [
              "Insert Table Column", "Insert a table column before the cursor", {
                regions: ["rich"]
              }
            ],
            insertColumnAfter: [
              "Insert Table Column", "Insert a table column after the cursor", {
                regions: ["rich"]
              }
            ],
            deleteColumn: [
              "Delete Table Column", "Delete this table column", {
                regions: ["rich"]
              }
            ],
            sep1: " ",
            increaseColspan: ["Increase Cell Columns", "Increase the cells colspan"],
            decreaseColspan: ["Decrease Cell Columns", "Decrease the cells colspan and add a new cell"],
            increaseRowspan: ["Increase Cell Rows", "Increase the cells rowspan"],
            decreaseRowspan: ["Decrease Cell Rows", "Decrease the cells rowspan and add a new cell"],
            sep2: "-"
          },
          rules: {
            horizontalRule: ["Horizontal Rule", "Insert a horizontal rule"],
            sep1: "-"
          },
          formatting: {
            removeFormatting: [
              "Remove Formatting", "Remove formatting for the selection", {
                regions: ["rich"]
              }
            ],
            sep2: " "
          },
          editors: {
            htmlEditor: [
              "Edit HTML", "Edit the HTML content", {
                regions: ["rich"]
              }
            ]
          }
        },
        snippetable: {
          _custom: true,
          actions: {
            editSnippet: ["Edit Snippet Settings", null],
            sep1: " ",
            removeSnippet: ["Remove Snippet", null]
          }
        }
      },
      behaviors: {
        horizontalRule: function(selection) {
          return selection.replace("<hr/>");
        },
        htmlEditor: function() {
          return Mercury.modal("/mercury/modals/htmleditor", {
            title: "HTML Editor",
            fullHeight: true,
            handler: "htmlEditor"
          });
        }
      },
      injectedStyles: "" + ".mercury-region, .mercury-textarea { min-height: 10px; outline: 1px dotted #09F }" + ".mercury-textarea { box-sizing: border-box; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; resize: vertical; }" + ".mercury-region:focus, .mercury-region.focus, .mercury-textarea.focus { outline: none; -webkit-box-shadow: 0 0 10px #09F, 0 0 1px #045; box-shadow: 0 0 10px #09F, 0 0 1px #045 }" + ".mercury-region:after { content: \".\"; display: block; visibility: hidden; clear: both; height: 0; overflow: hidden; }" + ".mercury-region table, .mercury-region td, .mercury-region th { border: 1px dotted red; }"
    },
    Regions: {},
    modalHandlers: {},
    dialogHandlers: {},
    preloadedViews: {}
  }, window.Mercury || {}, {
    version: '0.2.0',
    supported: document.getElementById && document.designMode && !jQuery.browser.konqueror && !jQuery.browser.msie,
    bind: function(eventName, callback) {
      return jQuery(document).bind("mercury:" + eventName, callback);
    },
    trigger: function(eventName, options) {
      Mercury.log(eventName, options);
      return jQuery(document).trigger("mercury:" + eventName, options);
    },
    log: function() {
      if (Mercury.debug && console) {
        if (arguments[0] === 'hide:toolbar' || arguments[0] === 'show:toolbar') {
          return;
        }
        try {
          return console.debug(arguments);
        } catch (e) {

        }
      }
    }
  });
}).call(this);
(function() {
  String.prototype.titleize = function() {
    return this[0].toUpperCase() + this.slice(1);
  };
  String.prototype.toHex = function() {
    if (this[0] === '#') {
      return this;
    }
    return this.replace(/rgba?\((\d+)[\s|\,]?\s(\d+)[\s|\,]?\s(\d+)\)/gi, function(a, r, g, b) {
      return "#" + (parseInt(r).toHex()) + (parseInt(g).toHex()) + (parseInt(b).toHex());
    });
  };
  String.prototype.singleDiff = function(that) {
    var char, diff, index, re, _len;
    diff = '';
    for (index = 0, _len = that.length; index < _len; index++) {
      char = that[index];
      if (char === 'each') {
        break;
      }
      if (char !== this[index]) {
        re = new RegExp(this.substr(index).regExpEscape().replace(/^\s+|^(&nbsp;)+/g, '') + '$', 'm');
        diff = that.substr(index).replace(re, '');
        break;
      }
    }
    return diff;
  };
  String.prototype.regExpEscape = function() {
    var escaped, specials;
    specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
    escaped = new RegExp('(\\' + specials.join('|\\') + ')', 'g');
    return this.replace(escaped, '\\$1');
  };
  String.prototype.sanitizeHTML = function() {
    var content, element;
    element = jQuery('<div>').html(this.toString());
    element.find('style').remove();
    content = element.text();
    content = content.replace(/\n+/g, '<br/>').replace(/.*<!--.*-->/g, '').replace(/^(<br\/>)+|(<br\/>\s*)+$/g, '');
    return content;
  };
  Number.prototype.toHex = function() {
    var result;
    result = this.toString(16).toUpperCase();
    if (result[1]) {
      return result;
    } else {
      return "0" + result;
    }
  };
  Number.prototype.toBytes = function() {
    var bytes, i;
    bytes = parseInt(this);
    i = 0;
    while (1023 < bytes) {
      bytes /= 1024;
      i += 1;
    }
    if (i) {
      return "" + (bytes.toFixed(2)) + ['', ' kb', ' Mb', ' Gb', ' Tb', ' Pb', ' Eb'][i];
    } else {
      return "" + bytes + " bytes";
    }
  };
}).call(this);
(function() {
  var _base, _base2, _base3, _base4, _ref, _ref2, _ref3, _ref4;
    if ((_ref = (_base = $.fn).firedPromiseEvent) != null) {
    _ref;
  } else {
    _base.firedPromiseEvent = function(eventName) {
      var $el, result;
      $el = $(this);
      result = ($el.data('defer-' + eventName + '-resolved') ? true : false);
      return result;
    };
  };
    if ((_ref2 = (_base2 = $.fn).createPromiseEvent) != null) {
    _ref2;
  } else {
    _base2.createPromiseEvent = function(eventName) {
      var $this, boundHandlers, events;
      $this = $(this);
      if (typeof $this.data('defer-' + eventName + '-resolved') !== 'undefined') {
        return $this;
      }
      $this.data('defer-' + eventName + '-resolved', false);
      events = $.fn.createPromiseEvent.events = $.fn.createPromiseEvent.events || {
        bind: function(callback) {
          $this = $(this);
          return $this.bind(eventName, callback);
        },
        trigger: function(event) {
          var Deferred, specialEvent;
          $this = $(this);
          Deferred = $this.data('defer-' + eventName);
          if (!Deferred) {
            specialEvent = $.event.special[eventName];
            specialEvent.setup.call(this);
            Deferred = $this.data('defer-' + eventName);
          }
          $this.data('defer-' + eventName + '-resolved', true);
          Deferred.resolve();
          event.preventDefault();
          event.stopImmediatePropagation();
          event.stopPropagation();
          return $this;
        },
        setup: function(data, namespaces) {
          $this = $(this);
          return $this.data('defer-' + eventName, new $.Deferred());
        },
        teardown: function(namespaces) {
          $this = $(this);
          return $this.data('defer-' + eventName, null);
        },
        add: function(handleObj) {
          var Deferred, specialEvent;
          $this = $(this);
          Deferred = $this.data('defer-' + eventName);
          specialEvent = $.event.special[eventName];
          if (!Deferred) {
            specialEvent.setup.call(this);
            return specialEvent.add.apply(this, [handleObj]);
          }
          return Deferred.done(handleObj.handler);
        },
        remove: function(handleObj) {}
      };
      boundHandlers = [];
      $.each(($this.data('events') || {})[eventName] || [], function(i, event) {
        return boundHandlers.push(event.handler);
      });
      $this.unbind(eventName);
      $this.bind(eventName, events.trigger);
      $.fn[eventName] = $.fn[eventName] || events.bind;
      $.event.special[eventName] = $.event.special[eventName] || {
        setup: events.setup,
        teardown: events.teardown,
        add: events.add,
        remove: events.remove
      };
      $.each(boundHandlers, function(i, handler) {
        return $this.bind(eventName, handler);
      });
      return $this;
    };
  };
    if ((_ref3 = (_base3 = $.fn).outerHtml) != null) {
    _ref3;
  } else {
    _base3.outerHtml = function() {
      var $el, el, outerHtml;
      $el = $(this);
      el = $el.get(0);
      outerHtml = el.outerHTML || new XMLSerializer().serializeToString(el);
      return outerHtml;
    };
  };
    if ((_ref4 = (_base4 = $.fn).mercury) != null) {
    _ref4;
  } else {
    _base4.mercury = function(type) {
      var $this;
      $this = $(this);
      if (type) {
        $this.data('type', type);
      }
      return $this.each(function() {
        return window.mercuryInstance.buildRegion($(this));
      });
    };
  };
}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.Editor = (function() {
    function Editor(saveUrl, options) {
      this.saveUrl = saveUrl != null ? saveUrl : null;
      this.options = options != null ? options : {};
    }
    Editor.prototype.initializeInterface = function() {};
    Editor.prototype.initializeEditor = function() {};
    Editor.prototype.initializeRegions = function() {
      var region, _i, _len, _ref, _results;
      jQuery('.mercury-region', this.document).mercury();
      _ref = this.regions;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        region = _ref[_i];
        if (region.focus) {
          region.focus();
          break;
        }
      }
      return _results;
    };
    Editor.prototype.buildRegion = function(region, window) {
      var type;
      try {
        type = (region.data('type') || 'rich').titleize();
        return this.regions.push(new Mercury.Regions[type](region, window));
      } catch (error) {
        if (Mercury.debug) {
          throw error;
        }
        return alert("Region type is malformed, no data-type provided, or \"" + type + "\" is unknown.");
      }
    };
    Editor.prototype.finalizeInterface = function() {
      this.snippetToolbar = new Mercury.SnippetToolbar(this.document);
      this.hijackLinks();
      return this.resize();
    };
    Editor.prototype.bindEvents = function() {
      Mercury.bind('initialize:frame', __bind(function() {
        return setTimeout(this.initializeFrame, 1000);
      }, this));
      Mercury.bind('region:focused', function() {
        return $('body').removeClass('mercury-hidden');
      });
      Mercury.bind('region:blurred', function() {
        return $('body').addClass('mercury-hidden');
      });
      Mercury.bind('action', __bind(function(event, options) {
        if (options.action === 'save') {
          return this.save();
        }
      }, this));
      this.document.click(function(event) {
        Mercury.trigger('hide:dialogs');
        if (Mercury.region) {
          if (jQuery(event.target).closest('.mercury-region').get(0) !== Mercury.region.element.get(0)) {
            return Mercury.trigger('unfocus:regions');
          }
        }
      });
      jQuery(window).resize(__bind(function() {
        return this.resize();
      }, this));
      return window.onbeforeunload = this.beforeUnload;
    };
    Editor.prototype.resize = function() {
      return Mercury.trigger('resize');
    };
    Editor.prototype.hijackLinks = function() {
      var classname, ignored, link, _i, _j, _len, _len2, _ref, _ref2, _results;
      _ref = jQuery('a', this.document);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        link = _ref[_i];
        ignored = false;
        _ref2 = this.options.ignoredLinks || [];
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          classname = _ref2[_j];
          if (jQuery(link).hasClass(classname)) {
            ignored = true;
            continue;
          }
        }
        _results.push(!ignored && (link.target === '' || link.target === '_self') && !jQuery(link).closest('.mercury-region').length ? jQuery(link).attr('target', '_top') : void 0);
      }
      return _results;
    };
    Editor.prototype.beforeUnload = function() {
      if (Mercury.changes && !Mercury.silent) {
        return "You have unsaved changes.	Are you sure you want to leave without saving them first?";
      }
      return null;
    };
    Editor.prototype.save = function(url) {
      var data;
      data = this.serialize();
      Mercury.log('saving', data);
      if (this.options.saveStyle !== 'form') {
        data = jQuery.toJSON(data);
      }
      return jQuery.ajax(url, {
        type: 'POST',
        data: {
          content: data
        },
        success: __bind(function() {
          return Mercury.changes = false;
        }, this),
        error: __bind(function() {
          return alert("Mercury was unable to save to the url: " + url);
        }, this)
      });
    };
    Editor.prototype.serialize = function() {
      var region, serialized, _i, _len, _ref;
      serialized = {};
      _ref = this.regions;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        region = _ref[_i];
        serialized[region.name] = region.serialize();
      }
      return serialized;
    };
    return Editor;
  })();
}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.IframeEditor = (function() {
    __extends(IframeEditor, this.Mercury.Editor);
    function IframeEditor(saveUrl, options) {
      var token;
      this.saveUrl = saveUrl != null ? saveUrl : null;
      this.options = options != null ? options : {};
      IframeEditor.__super__.constructor.apply(this, arguments);
      if (!Mercury.supported) {
        throw "Mercury.PageEditor is unsupported in this client. Supported browsers are chrome 10+, firefix 4+, and safari 5+.";
      }
      if (window.mercuryInstance) {
        throw "Mercury.PageEditor can only be instantiated once.";
      }
      window.mercuryInstance = this;
      this.regions = [];
      this.initializeInterface();
      if (token = jQuery('meta[name="csrf-token"]').attr('content')) {
        Mercury.csrfToken = token;
      }
      $(function() {
        return $('body').createPromiseEvent('mercury-ready').trigger('mercury-ready');
      });
    }
    IframeEditor.prototype.initializeInterface = function() {
      var _ref, _ref2;
      IframeEditor.__super__.initializeInterface.apply(this, arguments);
      document.body.innerHTML = '&nbsp;';
      this.focusableElement = jQuery('<input>', {
        type: 'text',
        style: 'position:absolute;opacity:0'
      }).appendTo((_ref = this.options.appendTo) != null ? _ref : 'body');
      this.iframe = jQuery('<iframe>', {
        "class": 'mercury-iframe',
        seamless: 'true',
        frameborder: '0',
        src: 'about:blank'
      });
      this.iframe.appendTo((_ref2 = jQuery(this.options.appendTo).get(0)) != null ? _ref2 : 'body');
      this.iframe.load(__bind(function() {
        return this.initializeEditor();
      }, this));
      return this.iframe.get(0).contentWindow.document.location.href = this.iframeSrc();
    };
    IframeEditor.prototype.initializeEditor = function() {
      var iframeWindow;
      IframeEditor.__super__.initializeEditor.apply(this, arguments);
      this.toolbar = new Mercury.Toolbar(this.options);
      this.statusbar = new Mercury.Statusbar(this.options);
      try {
        if (this.iframe.data('loaded')) {
          return;
        }
        this.iframe.data('loaded', true);
        this.document = jQuery(this.iframe.get(0).contentWindow.document);
        jQuery("<style mercury-styles=\"true\">").html(Mercury.config.injectedStyles).appendTo(this.document.find('head'));
        $('body').addClass('mercury-iframe');
        iframeWindow = this.iframe.get(0).contentWindow;
        jQuery.globalEval = function(data) {
          if (data && /\S/.test(data)) {
            return (iframeWindow.execScript || function(data) {
              return iframeWindow["eval"].call(iframeWindow, data);
            })(data);
          }
        };
        iframeWindow.Mercury = Mercury;
        this.bindEvents();
        this.initializeRegions();
        return this.finalizeInterface();
      } catch (error) {
        return alert("Mercury.PageEditor failed to load: " + error + "\n\nPlease try refreshing.");
      }
    };
    IframeEditor.prototype.buildRegion = function(region) {
      return IframeEditor.__super__.buildRegion.call(this, region, this.iframe.get(0).contentWindow);
    };
    IframeEditor.prototype.bindEvents = function() {
      IframeEditor.__super__.bindEvents.apply(this, arguments);
      Mercury.bind('focus:frame', __bind(function() {
        return this.iframe.focus();
      }, this));
      return Mercury.bind('focus:window', __bind(function() {
        return setTimeout((__bind(function() {
          return this.focusableElement.focus();
        }, this)), 10);
      }, this));
    };
    IframeEditor.prototype.resize = function() {
      var height, toolbarHeight, width;
      width = jQuery(window).width();
      height = this.statusbar.top();
      toolbarHeight = this.toolbar.height();
      Mercury.displayRect = {
        top: toolbarHeight,
        left: 0,
        width: width,
        height: height - toolbarHeight,
        fullHeight: height
      };
      this.iframe.css({
        top: Mercury.displayRect.top,
        left: 0,
        height: Mercury.displayRect.height
      });
      return IframeEditor.__super__.resize.apply(this, arguments);
    };
    IframeEditor.prototype.iframeSrc = function(url) {
      if (url == null) {
        url = null;
      }
      return (url != null ? url : window.location.href).replace(/([http|https]:\/\/.[^\/]*)\/editor\/?(.*)/i, "$1/$2");
    };
    IframeEditor.prototype.save = function() {
      var url, _ref;
      url = (_ref = this.saveUrl) != null ? _ref : this.iframeSrc();
      return IframeEditor.__super__.save.call(this, url);
    };
    return IframeEditor;
  }).call(this);
}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  this.Mercury.InlineEditor = (function() {
    __extends(InlineEditor, this.Mercury.Editor);
    function InlineEditor(saveUrl, options) {
      var token;
      this.saveUrl = saveUrl != null ? saveUrl : null;
      this.options = options != null ? options : {};
      InlineEditor.__super__.constructor.apply(this, arguments);
      if (!Mercury.supported) {
        throw "Mercury.PageEditor is unsupported in this client. Supported browsers are chrome 10+, firefix 4+, and safari 5+.";
      }
      if (window.mercuryInstance) {
        throw "Mercury.PageEditor can only be instantiated once.";
      }
      window.mercuryInstance = this;
      this.regions = [];
      this.initializeInterface();
      if (token = $('meta[name="csrf-token"]').attr('content')) {
        Mercury.csrfToken = token;
      }
      $(function() {
        return $('body').createPromiseEvent('mercury-ready').trigger('mercury-ready');
      });
    }
    InlineEditor.prototype.initializeInterface = function() {
      InlineEditor.__super__.initializeInterface.apply(this, arguments);
      return this.initializeEditor();
    };
    InlineEditor.prototype.initializeEditor = function() {
      InlineEditor.__super__.initializeEditor.apply(this, arguments);
      this.document = $(document);
      this.toolbar = new Mercury.Toolbar(this.options);
      this.statusbar = new Mercury.Statusbar(this.options);
      $('body').addClass('mercury-inline').addClass('mercury-hidden');
      $("<style mercury-styles=\"true\">").html(Mercury.config.injectedStyles).appendTo(this.document.find('head'));
      this.bindEvents();
      this.initializeRegions();
      return this.finalizeInterface();
    };
    InlineEditor.prototype.buildRegion = function(region) {
      return InlineEditor.__super__.buildRegion.call(this, region, window);
    };
    InlineEditor.prototype.bindEvents = function() {
      InlineEditor.__super__.bindEvents.apply(this, arguments);
      Mercury.bind('region:focused', function() {
        var $body;
        $body = $('body');
        $body.removeClass('mercury-hidden');
        if (Mercury.region.element.offset().top <= window.mercuryInstance.toolbar.height()) {
          return $body.css({
            position: 'absolute',
            top: window.mercuryInstance.toolbar.height()
          });
        } else {
          return $body.css({
            position: 'static',
            top: 0
          });
        }
      });
      return Mercury.bind('region:blurred', function() {
        var $body;
        $body = $('body');
        return $body.addClass('mercury-hidden').css({
          position: 'static',
          top: 0
        });
      });
    };
    InlineEditor.prototype.save = function() {
      var _ref;
      return InlineEditor.__super__.save.call(this, (_ref = this.saveUrl) != null ? _ref : document.location.href);
    };
    InlineEditor.prototype.resize = function() {
      var height, width;
      width = jQuery(window).width();
      height = jQuery(window).height();
      Mercury.displayRect = {
        top: 0,
        left: 0,
        width: width,
        height: height,
        fullHeight: height
      };
      return InlineEditor.__super__.resize.apply(this, arguments);
    };
    return InlineEditor;
  }).call(this);
}).call(this);
(function() {
  this.Mercury.HistoryBuffer = (function() {
    function HistoryBuffer(maxLength) {
      this.maxLength = maxLength != null ? maxLength : 200;
      this.index = 0;
      this.stack = [];
      this.markerRegExp = /<em class="mercury-marker"><\/em>/g;
    }
    HistoryBuffer.prototype.push = function(item) {
      if (jQuery.type(item) === 'string') {
        if (this.stack[this.index] && this.stack[this.index].replace(this.markerRegExp, '') === item.replace(this.markerRegExp, '')) {
          return;
        }
      } else if (jQuery.type(item) === 'object' && item.html) {
        if (this.stack[this.index] && this.stack[this.index].html === item.html) {
          return;
        }
      }
      this.stack = this.stack.slice(0, this.index + 1);
      this.stack.push(item);
      if (this.stack.length > this.maxLength) {
        this.stack.shift();
      }
      return this.index = this.stack.length - 1;
    };
    HistoryBuffer.prototype.undo = function() {
      if (this.index < 1) {
        return null;
      }
      this.index -= 1;
      return this.stack[this.index];
    };
    HistoryBuffer.prototype.redo = function() {
      if (this.index >= this.stack.length - 1) {
        return null;
      }
      this.index += 1;
      return this.stack[this.index];
    };
    return HistoryBuffer;
  })();
}).call(this);
(function() {
  this.Mercury.tableEditor = function(table, cell, cellContent) {
    Mercury.tableEditor.load(table, cell, cellContent);
    return Mercury.tableEditor;
  };
  jQuery.extend(Mercury.tableEditor, {
    load: function(table, cell, cellContent) {
      this.table = table;
      this.cell = cell;
      this.cellContent = cellContent != null ? cellContent : '';
      this.row = this.cell.parent('tr');
      this.columnCount = this.getColumnCount();
      return this.rowCount = this.getRowCount();
    },
    addColumn: function(position) {
      var i, intersecting, matchOptions, matching, newCell, row, rowSpan, sig, _len, _ref, _results;
      if (position == null) {
        position = 'after';
      }
      sig = this.cellSignatureFor(this.cell);
      _ref = this.table.find('tr');
      _results = [];
      for (i = 0, _len = _ref.length; i < _len; i++) {
        row = _ref[i];
        rowSpan = 1;
        matchOptions = position === 'after' ? {
          right: sig.right
        } : {
          left: sig.left
        };
        _results.push((matching = this.findCellByOptionsFor(row, matchOptions)) ? (newCell = jQuery("<" + (matching.cell.get(0).tagName) + ">").html(this.cellContent), this.setRowspanFor(newCell, matching.height), position === 'before' ? matching.cell.before(newCell) : matching.cell.after(newCell), i += matching.height - 1) : (intersecting = this.findCellByIntersectionFor(row, sig)) ? this.setColspanFor(intersecting.cell, intersecting.width + 1) : void 0);
      }
      return _results;
    },
    removeColumn: function() {
      var adjusting, cell, i, intersecting, matching, removing, row, sig, _i, _j, _len, _len2, _len3, _ref, _results;
      sig = this.cellSignatureFor(this.cell);
      if (sig.width > 1) {
        return;
      }
      removing = [];
      adjusting = [];
      _ref = this.table.find('tr');
      for (i = 0, _len = _ref.length; i < _len; i++) {
        row = _ref[i];
        if (matching = this.findCellByOptionsFor(row, {
          left: sig.left,
          width: sig.width
        })) {
          removing.push(matching.cell);
          i += matching.height - 1;
        } else if (intersecting = this.findCellByIntersectionFor(row, sig)) {
          adjusting.push(intersecting.cell);
        }
      }
      for (_i = 0, _len2 = removing.length; _i < _len2; _i++) {
        cell = removing[_i];
        jQuery(cell).remove();
      }
      _results = [];
      for (_j = 0, _len3 = adjusting.length; _j < _len3; _j++) {
        cell = adjusting[_j];
        _results.push(this.setColspanFor(cell, this.colspanFor(cell) - 1));
      }
      return _results;
    },
    addRow: function(position) {
      var cell, cellCount, colspan, newCell, newRow, previousRow, rowCount, rowspan, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3;
      if (position == null) {
        position = 'after';
      }
      newRow = jQuery('<tr>');
      if ((rowspan = this.rowspanFor(this.cell)) > 1 && position === 'after') {
        this.row = jQuery(this.row.nextAll('tr')[rowspan - 2]);
      }
      cellCount = 0;
      _ref = this.row.find('th, td');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cell = _ref[_i];
        colspan = this.colspanFor(cell);
        newCell = jQuery("<" + cell.tagName + ">").html(this.cellContent);
        this.setColspanFor(newCell, colspan);
        cellCount += colspan;
        if ((rowspan = this.rowspanFor(cell)) > 1 && position === 'after') {
          this.setRowspanFor(cell, rowspan + 1);
          continue;
        }
        newRow.append(newCell);
      }
      if (cellCount < this.columnCount) {
        rowCount = 0;
        _ref2 = this.row.prevAll('tr');
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          previousRow = _ref2[_j];
          rowCount += 1;
          _ref3 = jQuery(previousRow).find('td[rowspan], th[rowspan]');
          for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
            cell = _ref3[_k];
            rowspan = this.rowspanFor(cell);
            if (rowspan - 1 >= rowCount && position === 'before') {
              this.setRowspanFor(cell, rowspan + 1);
            } else if (rowspan - 1 >= rowCount && position === 'after') {
              if (rowspan - 1 === rowCount) {
                newCell = jQuery("<" + cell.tagName + ">").html(this.cellContent);
                this.setColspanFor(newCell, this.colspanFor(cell));
                newRow.append(newCell);
              } else {
                this.setRowspanFor(cell, rowspan + 1);
              }
            }
          }
        }
      }
      if (position === 'before') {
        return this.row.before(newRow);
      } else {
        return this.row.after(newRow);
      }
    },
    removeRow: function() {
      var aboveRow, cell, i, match, minRowspan, prevRowspan, rowsAbove, rowspan, rowspansMatch, sig, _i, _j, _k, _l, _len, _len2, _len3, _len4, _ref, _ref2, _ref3, _ref4, _ref5;
      rowspansMatch = true;
      prevRowspan = 0;
      minRowspan = 0;
      _ref = this.row.find('td, th');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cell = _ref[_i];
        rowspan = this.rowspanFor(cell);
        if (prevRowspan && rowspan !== prevRowspan) {
          rowspansMatch = false;
        }
        if (rowspan < minRowspan || !minRowspan) {
          minRowspan = rowspan;
        }
        prevRowspan = rowspan;
      }
      if (!rowspansMatch && this.rowspanFor(this.cell) > minRowspan) {
        return;
      }
      if (minRowspan > 1) {
        for (i = 0, _ref2 = minRowspan - 2; 0 <= _ref2 ? i <= _ref2 : i >= _ref2; 0 <= _ref2 ? i++ : i--) {
          jQuery(this.row.nextAll('tr')[i]).remove();
        }
      }
      _ref3 = this.row.find('td[rowspan], th[rowspan]');
      for (_j = 0, _len2 = _ref3.length; _j < _len2; _j++) {
        cell = _ref3[_j];
        sig = this.cellSignatureFor(cell);
        if (sig.height === minRowspan) {
          continue;
        }
        if (match = this.findCellByOptionsFor(this.row.nextAll('tr')[minRowspan - 1], {
          left: sig.left,
          forceAdjacent: true
        })) {
          this.setRowspanFor(cell, this.rowspanFor(cell) - this.rowspanFor(this.cell));
          if (match.direction === 'before') {
            match.cell.before(jQuery(cell).clone());
          } else {
            match.cell.after(jQuery(cell).clone());
          }
        }
      }
      if (this.columnsFor(this.row.find('td, th')) < this.columnCount) {
        rowsAbove = 0;
        _ref4 = this.row.prevAll('tr');
        for (_k = 0, _len3 = _ref4.length; _k < _len3; _k++) {
          aboveRow = _ref4[_k];
          rowsAbove += 1;
          _ref5 = jQuery(aboveRow).find('td[rowspan], th[rowspan]');
          for (_l = 0, _len4 = _ref5.length; _l < _len4; _l++) {
            cell = _ref5[_l];
            rowspan = this.rowspanFor(cell);
            if (rowspan > rowsAbove) {
              this.setRowspanFor(cell, rowspan - this.rowspanFor(this.cell));
            }
          }
        }
      }
      return this.row.remove();
    },
    increaseColspan: function() {
      var cell;
      cell = this.cell.next('td, th');
      if (!cell.length) {
        return;
      }
      if (this.rowspanFor(cell) !== this.rowspanFor(this.cell)) {
        return;
      }
      if (this.cellIndexFor(cell) > this.cellIndexFor(this.cell) + this.colspanFor(this.cell)) {
        return;
      }
      this.setColspanFor(this.cell, this.colspanFor(this.cell) + this.colspanFor(cell));
      return cell.remove();
    },
    decreaseColspan: function() {
      var newCell;
      if (this.colspanFor(this.cell) === 1) {
        return;
      }
      this.setColspanFor(this.cell, this.colspanFor(this.cell) - 1);
      newCell = jQuery("<" + (this.cell.get(0).tagName) + ">").html(this.cellContent);
      this.setRowspanFor(newCell, this.rowspanFor(this.cell));
      return this.cell.after(newCell);
    },
    increaseRowspan: function() {
      var match, nextRow, sig;
      sig = this.cellSignatureFor(this.cell);
      nextRow = this.row.nextAll('tr')[sig.height - 1];
      if (nextRow && (match = this.findCellByOptionsFor(nextRow, {
        left: sig.left,
        width: sig.width
      }))) {
        this.setRowspanFor(this.cell, sig.height + match.height);
        return match.cell.remove();
      }
    },
    decreaseRowspan: function() {
      var match, newCell, nextRow, sig;
      sig = this.cellSignatureFor(this.cell);
      if (sig.height === 1) {
        return;
      }
      nextRow = this.row.nextAll('tr')[sig.height - 2];
      if (match = this.findCellByOptionsFor(nextRow, {
        left: sig.left,
        forceAdjacent: true
      })) {
        newCell = jQuery("<" + (this.cell.get(0).tagName) + ">").html(this.cellContent);
        this.setColspanFor(newCell, this.colspanFor(this.cell));
        this.setRowspanFor(this.cell, sig.height - 1);
        if (match.direction === 'before') {
          return match.cell.before(newCell);
        } else {
          return match.cell.after(newCell);
        }
      }
    },
    getColumnCount: function() {
      return this.columnsFor(this.table.find('thead tr:first-child, tbody tr:first-child, tfoot tr:first-child').first().find('td, th'));
    },
    getRowCount: function() {
      return this.table.find('tr').length;
    },
    cellIndexFor: function(cell) {
      var aboveCell, aboveRow, columns, index, row, rowsAbove, _i, _j, _len, _len2, _ref, _ref2;
      cell = jQuery(cell);
      row = cell.parent('tr');
      columns = this.columnsFor(row.find('td, th'));
      index = this.columnsFor(cell.prevAll('td, th'));
      if (columns < this.columnCount) {
        rowsAbove = 0;
        _ref = row.prevAll('tr');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aboveRow = _ref[_i];
          rowsAbove += 1;
          _ref2 = jQuery(aboveRow).find('td[rowspan], th[rowspan]');
          for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
            aboveCell = _ref2[_j];
            if (this.rowspanFor(aboveCell) > rowsAbove && this.cellIndexFor(aboveCell) <= index) {
              index += this.colspanFor(aboveCell);
            }
          }
        }
      }
      return index;
    },
    cellSignatureFor: function(cell) {
      var sig;
      sig = {
        cell: jQuery(cell)
      };
      sig.left = this.cellIndexFor(cell);
      sig.width = this.colspanFor(cell);
      sig.height = this.rowspanFor(cell);
      sig.right = sig.left + sig.width;
      return sig;
    },
    findCellByOptionsFor: function(row, options) {
      var cell, prev, sig, _i, _len, _ref;
      _ref = jQuery(row).find('td, th');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cell = _ref[_i];
        sig = this.cellSignatureFor(cell);
        if (typeof options.right !== 'undefined') {
          if (sig.right === options.right) {
            return sig;
          }
        }
        if (typeof options.left !== 'undefined') {
          if (options.width) {
            if (sig.left === options.left && sig.width === options.width) {
              return sig;
            }
          } else if (!options.forceAdjacent) {
            if (sig.left === options.left) {
              return sig;
            }
          } else if (options.forceAdjacent) {
            if (sig.left > options.left) {
              prev = jQuery(cell).prev('td, th');
              if (prev.length) {
                sig = this.cellSignatureFor(prev);
                sig.direction = 'after';
              } else {
                sig.direction = 'before';
              }
              return sig;
            }
          }
        }
      }
      if (options.forceAdjacent) {
        sig.direction = 'after';
        return sig;
      }
      return null;
    },
    findCellByIntersectionFor: function(row, signature) {
      var cell, sig, _i, _len, _ref;
      _ref = jQuery(row).find('td, th');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cell = _ref[_i];
        sig = this.cellSignatureFor(cell);
        if (sig.right - signature.left >= 0 && sig.right > signature.left) {
          return sig;
        }
      }
      return null;
    },
    columnsFor: function(cells) {
      var cell, count, _i, _len;
      count = 0;
      for (_i = 0, _len = cells.length; _i < _len; _i++) {
        cell = cells[_i];
        count += this.colspanFor(cell);
      }
      return count;
    },
    colspanFor: function(cell) {
      return parseInt(jQuery(cell).attr('colspan')) || 1;
    },
    rowspanFor: function(cell) {
      return parseInt(jQuery(cell).attr('rowspan')) || 1;
    },
    setColspanFor: function(cell, value) {
      return jQuery(cell).attr('colspan', value > 1 ? value : null);
    },
    setRowspanFor: function(cell, value) {
      return jQuery(cell).attr('rowspan', value > 1 ? value : null);
    }
  });
}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.Dialog = (function() {
    function Dialog(url, name, options) {
      this.url = url;
      this.name = name;
      this.options = options != null ? options : {};
      this.button = this.options["for"];
      this.build();
      this.bindEvents();
      this.preload();
    }
    Dialog.prototype.build = function() {
      var _ref;
      this.element = jQuery('<div>', {
        "class": "mercury-dialog mercury-" + this.name + "-dialog loading",
        style: 'display:none'
      });
      return this.element.appendTo((_ref = jQuery(this.options.appendTo).get(0)) != null ? _ref : 'body');
    };
    Dialog.prototype.bindEvents = function() {
      return this.element.mousedown(function(event) {
        return event.stopPropagation();
      });
    };
    Dialog.prototype.preload = function() {
      if (this.options.preload) {
        return this.load();
      }
    };
    Dialog.prototype.toggle = function(element) {
      if (this.visible) {
        return this.hide();
      } else {
        return this.show();
      }
    };
    Dialog.prototype.resize = function() {
      return this.show();
    };
    Dialog.prototype.show = function() {
      Mercury.trigger('hide:dialogs', this);
      this.visible = true;
      if (this.loaded) {
        this.element.css({
          width: 'auto',
          height: 'auto'
        });
        this.position(this.visible);
        return this.appear();
      } else {
        this.position();
        return this.appear();
      }
    };
    Dialog.prototype.position = function(keepVisible) {};
    Dialog.prototype.appear = function() {
      this.element.css({
        display: 'block',
        opacity: 0
      });
      return this.element.animate({
        opacity: 0.95
      }, 200, 'easeInOutSine', __bind(function() {
        if (!this.loaded) {
          return this.load(__bind(function() {
            return this.resize();
          }, this));
        }
      }, this));
    };
    Dialog.prototype.hide = function() {
      this.element.hide();
      return this.visible = false;
    };
    Dialog.prototype.load = function(callback) {
      if (!this.url) {
        return;
      }
      if (Mercury.preloadedViews[this.url]) {
        this.loadContent(Mercury.preloadedViews[this.url]);
        if (Mercury.dialogHandlers[this.name]) {
          Mercury.dialogHandlers[this.name].call(this);
        }
        if (callback) {
          return callback();
        }
      } else {
        return jQuery.ajax(this.url, {
          success: __bind(function(data) {
            this.loadContent(data);
            if (Mercury.dialogHandlers[this.name]) {
              Mercury.dialogHandlers[this.name].call(this);
            }
            if (callback) {
              return callback();
            }
          }, this),
          error: __bind(function() {
            this.hide();
            if (this.button) {
              this.button.removeClass('pressed');
            }
            return alert("Mercury was unable to load " + this.url + " for the " + this.name + " dialog.");
          }, this)
        });
      }
    };
    Dialog.prototype.loadContent = function(data) {
      this.loaded = true;
      this.element.removeClass('loading');
      return this.element.html(data);
    };
    return Dialog;
  })();
}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.Palette = (function() {
    __extends(Palette, Mercury.Dialog);
    function Palette(url, name, options) {
      this.url = url;
      this.name = name;
      this.options = options != null ? options : {};
      Palette.__super__.constructor.apply(this, arguments);
    }
    Palette.prototype.build = function() {
      var _ref;
      this.element = jQuery('<div>', {
        "class": "mercury-palette mercury-" + this.name + "-palette loading",
        style: 'display:none'
      });
      return this.element.appendTo((_ref = jQuery(this.options.appendTo).get(0)) != null ? _ref : 'body');
    };
    Palette.prototype.bindEvents = function() {
      Mercury.bind('hide:dialogs', __bind(function(event, dialog) {
        if (dialog !== this) {
          return this.hide();
        }
      }, this));
      return Palette.__super__.bindEvents.apply(this, arguments);
    };
    Palette.prototype.position = function(keepVisible) {
      var position, width;
      this.element.css({
        top: 0,
        left: 0,
        display: 'block',
        visibility: 'hidden'
      });
      position = this.button.offset();
      width = this.element.width();
      if (position.left + width > jQuery(window).width()) {
        position.left = position.left - width + this.button.width();
      }
      return this.element.css({
        top: position.top + this.button.height(),
        left: position.left,
        display: keepVisible ? 'block' : 'none',
        visibility: 'visible'
      });
    };
    return Palette;
  })();
}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.Select = (function() {
    __extends(Select, Mercury.Dialog);
    function Select(url, name, options) {
      this.url = url;
      this.name = name;
      this.options = options != null ? options : {};
      Select.__super__.constructor.apply(this, arguments);
    }
    Select.prototype.build = function() {
      var _ref;
      this.element = jQuery('<div>', {
        "class": "mercury-select mercury-" + this.name + "-select loading",
        style: 'display:none'
      });
      return this.element.appendTo((_ref = jQuery(this.options.appendTo).get(0)) != null ? _ref : 'body');
    };
    Select.prototype.bindEvents = function() {
      Mercury.bind('hide:dialogs', __bind(function(event, dialog) {
        if (dialog !== this) {
          return this.hide();
        }
      }, this));
      this.element.mousedown(__bind(function(event) {
        return event.preventDefault();
      }, this));
      return Select.__super__.bindEvents.apply(this, arguments);
    };
    Select.prototype.position = function(keepVisible) {
      var documentHeight, elementHeight, elementWidth, height, left, position, top;
      this.element.css({
        top: 0,
        left: 0,
        display: 'block',
        visibility: 'hidden'
      });
      position = this.button.offset();
      elementWidth = this.element.width();
      elementHeight = this.element.height();
      documentHeight = jQuery(document).height();
      if (Mercury.displayRect.height === Mercury.displayRect.fullHeight) {
        top = position.top + this.button.height() - jQuery(document).scrollTop();
      } else {
        top = position.top + (this.button.height() / 2) - (elementHeight / 2);
        if (top < position.top - 100) {
          top = position.top - 100;
        }
        if (top < 20) {
          top = 20;
        }
      }
      height = this.loaded ? 'auto' : elementHeight;
      if (top + elementHeight >= documentHeight - 20) {
        height = documentHeight - top - 20;
      }
      left = position.left;
      if (left + elementWidth > jQuery(window).width()) {
        left = left - elementWidth + this.button.width();
      }
      return this.element.css({
        top: top,
        left: left,
        height: height,
        display: keepVisible ? 'block' : 'none',
        visibility: 'visible'
      });
    };
    return Select;
  })();
}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.Panel = (function() {
    __extends(Panel, Mercury.Dialog);
    function Panel(url, name, options) {
      this.url = url;
      this.name = name;
      this.options = options != null ? options : {};
      Panel.__super__.constructor.apply(this, arguments);
    }
    Panel.prototype.build = function() {
      var _ref;
      this.element = jQuery('<div>', {
        "class": 'mercury-panel loading',
        style: 'display:none;'
      });
      this.titleElement = jQuery("<h1>" + this.options.title + "</h1>").appendTo(this.element);
      this.paneElement = jQuery('<div>', {
        "class": 'mercury-panel-pane'
      }).appendTo(this.element);
      return this.element.appendTo((_ref = jQuery(this.options.appendTo).get(0)) != null ? _ref : 'body');
    };
    Panel.prototype.bindEvents = function() {
      Mercury.bind('resize', __bind(function() {
        return this.position(this.visible);
      }, this));
      Mercury.bind('hide:panels', __bind(function(event, panel) {
        if (panel !== this) {
          this.button.removeClass('pressed');
          return this.hide();
        }
      }, this));
      this.element.mousedown(function(event) {
        return event.stopPropagation();
      });
      return Panel.__super__.bindEvents.apply(this, arguments);
    };
    Panel.prototype.show = function() {
      Mercury.trigger('hide:panels', this);
      return Panel.__super__.show.apply(this, arguments);
    };
    Panel.prototype.resize = function() {
      var position, postWidth, preWidth;
      this.paneElement.css({
        display: 'none'
      });
      preWidth = this.element.width();
      this.paneElement.css({
        visibility: 'hidden',
        width: 'auto',
        display: 'block'
      });
      postWidth = this.element.width();
      this.paneElement.css({
        visibility: 'visible',
        display: 'none'
      });
      position = this.element.offset();
      this.element.animate({
        left: position.left - (postWidth - preWidth),
        width: postWidth
      }, 200, 'easeInOutSine', __bind(function() {
        this.paneElement.css({
          display: 'block',
          width: postWidth
        });
        return this.makeDraggable();
      }, this));
      if (!this.visible) {
        return this.hide();
      }
    };
    Panel.prototype.position = function(keepVisible) {
      var elementWidth, height, left, offset, paneHeight;
      this.element.css({
        display: 'block',
        visibility: 'hidden'
      });
      offset = this.element.offset();
      elementWidth = this.element.width();
      height = Mercury.displayRect.height - 16;
      paneHeight = height - this.titleElement.outerHeight();
      this.paneElement.css({
        height: paneHeight,
        overflowY: paneHeight < 30 ? 'hidden' : 'auto'
      });
      if (!this.moved) {
        left = Mercury.displayRect.width - elementWidth - 20;
      }
      if (left <= 8) {
        left = 8;
      }
      if (this.pinned || elementWidth + offset.left > Mercury.displayRect.width - 20) {
        left = Mercury.displayRect.width - elementWidth - 20;
      }
      this.element.css({
        top: Mercury.displayRect.top + 8,
        left: left,
        height: height,
        display: keepVisible ? 'block' : 'none',
        visibility: 'visible'
      });
      this.makeDraggable();
      if (!keepVisible) {
        return this.element.hide();
      }
    };
    Panel.prototype.loadContent = function(data) {
      this.loaded = true;
      this.element.removeClass('loading');
      this.paneElement.css({
        visibility: 'hidden'
      });
      return this.paneElement.html(data);
    };
    Panel.prototype.makeDraggable = function() {
      var elementWidth;
      elementWidth = this.element.width();
      return this.element.draggable({
        handle: 'h1',
        axis: 'x',
        opacity: 0.70,
        scroll: false,
        addClasses: false,
        iframeFix: true,
        containment: [8, 0, Mercury.displayRect.width - elementWidth - 20, 0],
        stop: __bind(function() {
          var left;
          left = this.element.offset().left;
          this.moved = true;
          this.pinned = left > Mercury.displayRect.width - elementWidth - 30 ? true : false;
          return true;
        }, this)
      });
    };
    return Panel;
  })();
}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.modal = function(url, options) {
    if (options == null) {
      options = {};
    }
    Mercury.modal.show(url, options);
    return Mercury.modal;
  };
  jQuery.extend(Mercury.modal, {
    minWidth: 400,
    show: function(url, options) {
      this.url = url;
      this.options = options != null ? options : {};
      Mercury.trigger('focus:window');
      this.initialize();
      if (this.visible) {
        return this.update();
      } else {
        return this.appear();
      }
    },
    initialize: function() {
      if (this.initialized) {
        return;
      }
      this.build();
      this.bindEvents();
      return this.initialized = true;
    },
    build: function() {
      var _ref, _ref2;
      this.element = jQuery('<div>', {
        "class": 'mercury-modal loading'
      });
      this.element.html('<h1 class="mercury-modal-title"><span></span><a>&times;</a></h1>');
      this.element.append('<div class="mercury-modal-content-container"><div class="mercury-modal-content"></div></div>');
      this.overlay = jQuery('<div>', {
        "class": 'mercury-modal-overlay'
      });
      this.titleElement = this.element.find('.mercury-modal-title');
      this.contentContainerElement = this.element.find('.mercury-modal-content-container');
      this.contentElement = this.element.find('.mercury-modal-content');
      this.element.appendTo((_ref = jQuery(this.options.appendTo).get(0)) != null ? _ref : 'body');
      this.overlay.appendTo((_ref2 = jQuery(this.options.appendTo).get(0)) != null ? _ref2 : 'body');
      return this.titleElement.find('span').html(this.options.title);
    },
    bindEvents: function() {
      Mercury.bind('refresh', __bind(function() {
        return this.resize(true);
      }, this));
      Mercury.bind('resize', __bind(function() {
        return this.position();
      }, this));
      this.overlay.click(__bind(function() {
        return this.hide();
      }, this));
      return this.titleElement.find('a').click(__bind(function() {
        return this.hide();
      }, this));
    },
    appear: function() {
      this.position();
      this.overlay.show();
      return this.overlay.animate({
        opacity: 1
      }, 200, 'easeInOutSine', __bind(function() {
        this.element.css({
          top: -this.element.height()
        });
        this.setTitle();
        this.element.show();
        return this.element.animate({
          top: 0
        }, 200, 'easeInOutSine', __bind(function() {
          this.visible = true;
          return this.load();
        }, this));
      }, this));
    },
    resize: function(keepVisible) {
      var height, titleHeight, visibility, width;
      visibility = keepVisible ? 'visible' : 'hidden';
      titleHeight = this.titleElement.outerHeight();
      width = this.contentElement.outerWidth();
      if (this.contentPane) {
        this.contentPane.css({
          height: 'auto'
        });
      }
      this.contentElement.css({
        height: 'auto',
        visibility: visibility,
        display: 'block'
      });
      height = this.contentElement.outerHeight() + titleHeight;
      if (width < this.minWidth) {
        width = this.minWidth;
      }
      if (height > Mercury.displayRect.fullHeight - 20 || this.options.fullHeight) {
        height = Mercury.displayRect.fullHeight - 20;
      }
      return this.element.stop().animate({
        left: (Mercury.displayRect.width - width) / 2,
        width: width,
        height: height
      }, 200, 'easeInOutSine', __bind(function() {
        var controlHeight;
        this.contentElement.css({
          visibility: 'visible',
          display: 'block'
        });
        if (this.contentPane.length) {
          this.contentElement.css({
            height: height - titleHeight,
            overflow: 'visible'
          });
          controlHeight = this.contentControl.length ? this.contentControl.outerHeight() : 0;
          this.contentPane.css({
            height: height - titleHeight - controlHeight - 40
          });
          return this.contentPane.find('.mercury-modal-pane').css({
            width: width - 40
          });
        } else {
          return this.contentElement.css({
            height: height - titleHeight,
            overflow: 'auto'
          });
        }
      }, this));
    },
    position: function() {
      var controlHeight, height, titleHeight, viewportWidth, width;
      viewportWidth = Mercury.displayRect.width;
      if (this.contentPane) {
        this.contentPane.css({
          height: 'auto'
        });
      }
      this.contentElement.css({
        height: 'auto'
      });
      this.element.css({
        width: 'auto',
        height: 'auto',
        display: 'block',
        visibility: 'hidden'
      });
      width = this.element.width();
      height = this.element.height();
      if (width < this.minWidth) {
        width = this.minWidth;
      }
      if (height > Mercury.displayRect.fullHeight - 20 || this.options.fullHeight) {
        height = Mercury.displayRect.fullHeight - 20;
      }
      titleHeight = this.titleElement.outerHeight();
      if (this.contentPane && this.contentPane.length) {
        this.contentElement.css({
          height: height - titleHeight,
          overflow: 'visible'
        });
        controlHeight = this.contentControl.length ? this.contentControl.outerHeight() : 0;
        this.contentPane.css({
          height: height - titleHeight - controlHeight - 40
        });
        this.contentPane.find('.mercury-modal-pane').css({
          width: width - 40
        });
      } else {
        this.contentElement.css({
          height: height - titleHeight,
          overflow: 'auto'
        });
      }
      return this.element.css({
        left: (viewportWidth - width) / 2,
        width: width,
        height: height,
        display: this.visible ? 'block' : 'none',
        visibility: 'visible'
      });
    },
    update: function() {
      this.reset();
      this.resize();
      return this.load();
    },
    load: function() {
      this.element.addClass('loading');
      this.setTitle();
      if (Mercury.preloadedViews[this.url]) {
        return setTimeout((__bind(function() {
          return this.loadContent(Mercury.preloadedViews[this.url]);
        }, this)), 10);
      } else {
        return jQuery.ajax(this.url, {
          type: this.options.loadType || 'get',
          data: this.options.loadData,
          success: __bind(function(data) {
            return this.loadContent(data);
          }, this),
          error: __bind(function() {
            this.hide();
            return alert("Mercury was unable to load " + this.url + " for the modal.");
          }, this)
        });
      }
    },
    loadContent: function(data, options) {
      if (options == null) {
        options = null;
      }
      this.initialize();
      this.options = options || this.options;
      this.setTitle();
      this.loaded = true;
      this.element.removeClass('loading');
      this.contentElement.html(data);
      this.contentElement.css({
        display: 'none',
        visibility: 'hidden'
      });
      this.contentPane = this.element.find('.mercury-modal-pane-container');
      this.contentControl = this.element.find('.mercury-modal-controls');
      if (this.options.afterLoad) {
        this.options.afterLoad.call(this);
      }
      if (this.options.handler && Mercury.modalHandlers[this.options.handler]) {
        Mercury.modalHandlers[this.options.handler].call(this);
      }
      return this.resize();
    },
    setTitle: function() {
      return this.titleElement.find('span').html(this.options.title);
    },
    reset: function() {
      this.titleElement.find('span').html('');
      return this.contentElement.html('');
    },
    hide: function() {
      Mercury.trigger('focus:frame');
      this.element.hide();
      this.overlay.hide();
      this.reset();
      return this.visible = false;
    }
  });
}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.Statusbar = (function() {
    function Statusbar(options) {
      this.options = options != null ? options : {};
      this.build();
      this.bindEvents();
    }
    Statusbar.prototype.build = function() {
      var _ref;
      return this.element = jQuery('<div>', {
        "class": 'mercury-statusbar'
      }).appendTo((_ref = jQuery(this.options.appendTo).get(0)) != null ? _ref : 'body');
    };
    Statusbar.prototype.bindEvents = function() {
      return Mercury.bind('region:update', __bind(function(event, options) {
        if (options.region && jQuery.type(options.region.path) === 'function') {
          return this.setPath(options.region.path());
        }
      }, this));
    };
    Statusbar.prototype.height = function() {
      return this.element.outerHeight();
    };
    Statusbar.prototype.top = function() {
      return this.element.offset().top;
    };
    Statusbar.prototype.setPath = function(elements) {
      var element, path, _i, _len;
      path = [];
      for (_i = 0, _len = elements.length; _i < _len; _i++) {
        element = elements[_i];
        path.push("<a>" + (element.tagName.toLowerCase()) + "</a>");
      }
      return this.element.html("<span><strong>Path: </strong></span>" + (path.reverse().join(' &raquo; ')));
    };
    return Statusbar;
  })();
}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.Toolbar = (function() {
    function Toolbar(options) {
      this.options = options != null ? options : {};
      this.build();
      this.bindEvents();
    }
    Toolbar.prototype.build = function() {
      var button, buttonName, buttons, container, expander, options, toolbar, toolbarName, _ref, _ref2;
      this.element = jQuery('<div>', {
        "class": 'mercury-toolbar-container',
        style: 'width:10000px'
      });
      this.element.appendTo((_ref = jQuery(this.options.appendTo).get(0)) != null ? _ref : 'body');
      _ref2 = Mercury.config.toolbars;
      for (toolbarName in _ref2) {
        if (!__hasProp.call(_ref2, toolbarName)) continue;
        buttons = _ref2[toolbarName];
        if (buttons._custom) {
          continue;
        }
        toolbar = jQuery('<div>', {
          "class": "mercury-toolbar mercury-" + toolbarName + "-toolbar"
        }).appendTo(this.element);
        if (buttons._regions) {
          toolbar.attr('data-regions', buttons._regions);
        }
        container = jQuery('<div>', {
          "class": 'mercury-toolbar-button-container'
        }).appendTo(toolbar);
        for (buttonName in buttons) {
          if (!__hasProp.call(buttons, buttonName)) continue;
          options = buttons[buttonName];
          if (buttonName === '_regions') {
            continue;
          }
          button = this.buildButton(buttonName, options);
          if (button) {
            button.appendTo(container);
          }
        }
        if (container.css('white-space') === 'nowrap') {
          expander = new Mercury.Toolbar.Expander(toolbarName, {
            appendTo: toolbar,
            "for": container
          });
          expander.appendTo(this.element);
        }
        if (toolbarName !== 'primary') {
          toolbar.addClass('disabled');
        }
      }
      return this.element.css({
        width: '100%'
      });
    };
    Toolbar.prototype.buildButton = function(name, options) {
      var action, button, group, handled, opts, summary, title;
      if (name[0] === '_' || !options) {
        return false;
      }
      switch (jQuery.type(options)) {
        case 'array':
          title = options[0], summary = options[1], handled = options[2];
          return new Mercury.Toolbar.Button(name, title, summary, handled, {
            appendDialogsTo: this.element
          });
        case 'object':
          group = new Mercury.Toolbar.ButtonGroup(name, options);
          for (action in options) {
            if (!__hasProp.call(options, action)) continue;
            opts = options[action];
            button = this.buildButton(action, opts);
            if (button) {
              button.appendTo(group);
            }
          }
          return group;
        case 'string':
          return jQuery('<hr>', {
            "class": "mercury-" + (options === '-' ? 'line-separator' : 'separator')
          });
        default:
          throw "Unknown button structure -- please provide an array, object, or string for " + name + ".";
      }
    };
    Toolbar.prototype.bindEvents = function() {
      Mercury.bind('region:focused', __bind(function(event, options) {
        var regions, toolbar, _i, _len, _ref, _results;
        _ref = this.element.find(".mercury-toolbar");
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          toolbar = _ref[_i];
          toolbar = jQuery(toolbar);
          _results.push((regions = toolbar.data('regions')) ? regions.split(',').indexOf(options.region.type) > -1 ? toolbar.removeClass('disabled') : void 0 : void 0);
        }
        return _results;
      }, this));
      Mercury.bind('region:blurred', __bind(function(event, options) {
        var regions, toolbar, _i, _len, _ref, _results;
        _ref = this.element.find(".mercury-toolbar");
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          toolbar = _ref[_i];
          toolbar = jQuery(toolbar);
          _results.push((regions = toolbar.data('regions')) ? regions.split(',').indexOf(options.region.type) > -1 ? toolbar.addClass('disabled') : void 0 : void 0);
        }
        return _results;
      }, this));
      this.element.click(function() {
        return Mercury.trigger('hide:dialogs');
      });
      return this.element.mousedown(function(event) {
        return event.preventDefault();
      });
    };
    Toolbar.prototype.height = function() {
      return this.element.outerHeight();
    };
    return Toolbar;
  })();
}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.Toolbar.Button = (function() {
    function Button(name, title, summary, types, options) {
      this.name = name;
      this.title = title;
      this.summary = summary != null ? summary : null;
      this.types = types != null ? types : {};
      this.options = options != null ? options : {};
      this.build();
      this.bindEvents();
      return this.element;
    }
    Button.prototype.build = function() {
      var dialogOptions, mixed, type, url, _ref, _ref2, _results;
      this.element = jQuery('<div>', {
        title: (_ref = this.summary) != null ? _ref : this.title,
        "class": "mercury-button mercury-" + this.name + "-button"
      }).html("<em>" + this.title + "</em>");
      this.element.data('expander', "<div class=\"mercury-expander-button\" data-button=\"" + this.name + "\"><em></em><span>" + this.title + "</span></div>");
      this.handled = [];
      dialogOptions = {
        title: this.summary || this.title,
        preload: this.types.preload,
        appendTo: this.options.appendDialogsTo || 'body',
        "for": this.element
      };
      _ref2 = this.types;
      _results = [];
      for (type in _ref2) {
        if (!__hasProp.call(_ref2, type)) continue;
        mixed = _ref2[type];
        _results.push((function() {
          switch (type) {
            case 'preload':
              return true;
            case 'regions':
              this.element.addClass('disabled');
              return this.handled[type] = jQuery.isFunction(mixed) ? mixed.call(this, this.name) : mixed;
            case 'toggle':
              return this.handled[type] = true;
            case 'mode':
              return this.handled[type] = mixed === true ? this.name : mixed;
            case 'context':
              return this.handled[type] = jQuery.isFunction(mixed) ? mixed : Mercury.Toolbar.Button.contexts[this.name];
            case 'palette':
              this.element.addClass("mercury-button-palette");
              url = jQuery.isFunction(mixed) ? mixed.call(this, this.name) : mixed;
              return this.handled[type] = new Mercury.Palette(url, this.name, dialogOptions);
            case 'select':
              this.element.addClass("mercury-button-select").find('em').html(this.title);
              url = jQuery.isFunction(mixed) ? mixed.call(this, this.name) : mixed;
              return this.handled[type] = new Mercury.Select(url, this.name, dialogOptions);
            case 'panel':
              this.element.addClass('mercury-button-panel');
              url = jQuery.isFunction(mixed) ? mixed.call(this, this.name) : mixed;
              this.handled['toggle'] = true;
              return this.handled[type] = new Mercury.Panel(url, this.name, dialogOptions);
            case 'modal':
              return this.handled[type] = jQuery.isFunction(mixed) ? mixed.apply(this, this.name) : mixed;
            default:
              throw "Unknown button type " + type + " used for the " + this.name + " button.";
          }
        }).call(this));
      }
      return _results;
    };
    Button.prototype.bindEvents = function() {
      Mercury.bind('button', __bind(function(event, options) {
        if (options.action === this.name) {
          return this.element.click();
        }
      }, this));
      Mercury.bind('region:update', __bind(function(event, options) {
        var element;
        if (this.handled.context && options.region && jQuery.type(options.region.currentElement) === 'function') {
          element = options.region.currentElement();
          if (element.length && this.handled.context.call(this, element, options.region.element)) {
            return this.element.addClass('active');
          } else {
            return this.element.removeClass('active');
          }
        } else {
          return this.element.removeClass('active');
        }
      }, this));
      Mercury.bind('region:focused', __bind(function(event, options) {
        if (this.handled.regions && options.region && options.region.type) {
          if (this.handled.regions.indexOf(options.region.type) > -1) {
            return this.element.removeClass('disabled');
          } else {
            return this.element.addClass('disabled');
          }
        }
      }, this));
      Mercury.bind('region:blurred', __bind(function(event, options) {
        if (this.handled.regions) {
          return this.element.addClass('disabled');
        }
      }, this));
      this.element.mousedown(__bind(function(event) {
        return this.element.addClass('active');
      }, this));
      this.element.mouseup(__bind(function(event) {
        return this.element.removeClass('active');
      }, this));
      return this.element.click(__bind(function(event) {
        var handled, mixed, type, _ref;
        if (this.element.closest('.disabled').length) {
          return;
        }
        handled = false;
        _ref = this.handled;
        for (type in _ref) {
          if (!__hasProp.call(_ref, type)) continue;
          mixed = _ref[type];
          switch (type) {
            case 'toggle':
              this.togglePressed();
              break;
            case 'mode':
              handled = true;
              Mercury.trigger('mode', {
                mode: mixed
              });
              break;
            case 'modal':
              handled = true;
              Mercury.modal(this.handled.modal, {
                title: this.summary || this.title,
                handler: this.name
              });
              break;
            case 'palette':
            case 'select':
            case 'panel':
              event.stopPropagation();
              handled = true;
              this.handled[type].toggle();
          }
        }
        if (!handled) {
          Mercury.trigger('action', {
            action: this.name
          });
        }
        return Mercury.trigger('focus:frame');
      }, this));
    };
    Button.prototype.togglePressed = function() {
      return this.element.toggleClass('pressed');
    };
    return Button;
  })();
  this.Mercury.Toolbar.Button.contexts = {
    backColor: function(node) {
      return this.element.css('background-color', node.css('background-color'));
    },
    foreColor: function(node) {
      return this.element.css('background-color', node.css('color'));
    },
    bold: function(node) {
      var weight;
      weight = node.css('font-weight');
      return weight === 'bold' || weight > 400;
    },
    italic: function(node) {
      return node.css('font-style') === 'italic';
    },
    overline: function(node) {
      return node.css('text-decoration') === 'overline' || node.parent().css('text-decoration') === 'overline';
    },
    strikethrough: function(node, region) {
      return node.css('text-decoration') === 'line-through' || !!node.closest('strike', region).length;
    },
    underline: function(node, region) {
      return node.css('text-decoration') === 'underline' || !!node.closest('u', region).length;
    },
    subscript: function(node, region) {
      return !!node.closest('sub', region).length;
    },
    superscript: function(node, region) {
      return !!node.closest('sup', region).length;
    },
    justifyLeft: function(node) {
      return node.css('text-align').indexOf('left') > -1;
    },
    justifyCenter: function(node) {
      return node.css('text-align').indexOf('center') > -1;
    },
    justifyRight: function(node) {
      return node.css('text-align').indexOf('right') > -1;
    },
    justifyFull: function(node) {
      return node.css('text-align').indexOf('justify') > -1;
    },
    insertOrderedList: function(node, region) {
      return !!node.closest('ol', region.element).length;
    },
    insertUnorderedList: function(node, region) {
      return !!node.closest('ul', region.element).length;
    }
  };
}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.Toolbar.ButtonGroup = (function() {
    function ButtonGroup(name, options) {
      this.name = name;
      this.options = options != null ? options : {};
      this.build();
      this.bindEvents();
      this.regions = this.options._regions;
      return this.element;
    }
    ButtonGroup.prototype.build = function() {
      this.element = jQuery('<div>', {
        "class": "mercury-button-group mercury-" + this.name + "-group"
      });
      if (this.options._context || this.options._regions) {
        return this.element.addClass('disabled');
      }
    };
    ButtonGroup.prototype.bindEvents = function() {
      Mercury.bind('region:update', __bind(function(event, options) {
        var context, element;
        context = Mercury.Toolbar.ButtonGroup.contexts[this.name];
        if (context) {
          if (options.region && jQuery.type(options.region.currentElement) === 'function') {
            element = options.region.currentElement();
            if (element.length && context.call(this, element, options.region.element)) {
              return this.element.removeClass('disabled');
            } else {
              return this.element.addClass('disabled');
            }
          }
        }
      }, this));
      Mercury.bind('region:focused', __bind(function(event, options) {
        if (this.regions && options.region && options.region.type) {
          if (this.regions.indexOf(options.region.type) > -1) {
            if (!this.options._context) {
              return this.element.removeClass('disabled');
            }
          } else {
            return this.element.addClass('disabled');
          }
        }
      }, this));
      return Mercury.bind('region:blurred', __bind(function(event, options) {
        if (this.options.regions) {
          return this.element.addClass('disabled');
        }
      }, this));
    };
    return ButtonGroup;
  })();
  this.Mercury.Toolbar.ButtonGroup.contexts = {
    table: function(node, region) {
      return !!node.closest('table', region).length;
    }
  };
}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.Toolbar.Expander = (function() {
    __extends(Expander, Mercury.Palette);
    function Expander(name, options) {
      this.name = name;
      this.options = options;
      this.container = this.options["for"];
      this.containerWidth = this.container.outerWidth();
      Expander.__super__.constructor.call(this, null, this.name, this.options);
      return this.element;
    }
    Expander.prototype.build = function() {
      var _ref;
      this.container.css({
        whiteSpace: 'normal'
      });
      this.trigger = jQuery('<div>', {
        "class": 'mercury-toolbar-expander'
      }).appendTo((_ref = jQuery(this.options.appendTo).get(0)) != null ? _ref : 'body');
      this.element = jQuery('<div>', {
        "class": "mercury-palette mercury-expander mercury-" + this.name + "-expander",
        style: 'display:none'
      });
      return this.windowResize();
    };
    Expander.prototype.bindEvents = function() {
      Mercury.bind('hide:dialogs', __bind(function(event, dialog) {
        if (dialog !== this) {
          return this.hide();
        }
      }, this));
      Mercury.bind('resize', __bind(function() {
        return this.windowResize();
      }, this));
      Expander.__super__.bindEvents.apply(this, arguments);
      this.trigger.click(__bind(function(event) {
        var button, hiddenButtons, _i, _len, _ref;
        event.stopPropagation();
        hiddenButtons = [];
        _ref = this.container.find('.mercury-button');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          button = _ref[_i];
          button = jQuery(button);
          if (button.position().top > 5) {
            hiddenButtons.push(button.data('expander'));
          }
        }
        this.loadContent(hiddenButtons.join(''));
        return this.toggle();
      }, this));
      return this.element.click(__bind(function(event) {
        var button, buttonName;
        buttonName = jQuery(event.target).closest('[data-button]').data('button');
        button = this.container.find(".mercury-" + buttonName + "-button");
        return button.click();
      }, this));
    };
    Expander.prototype.windowResize = function() {
      if (this.containerWidth > jQuery(window).width()) {
        this.trigger.show();
      } else {
        this.trigger.hide();
      }
      return this.hide();
    };
    Expander.prototype.position = function(keepVisible) {
      var position, width;
      this.element.css({
        top: 0,
        left: 0,
        display: 'block',
        visibility: 'hidden'
      });
      position = this.trigger.offset();
      width = this.element.width();
      if (position.left + width > jQuery(window).width()) {
        position.left = position.left - width + this.trigger.width();
      }
      return this.element.css({
        top: position.top + this.trigger.height(),
        left: position.left,
        display: keepVisible ? 'block' : 'none',
        visibility: 'visible'
      });
    };
    return Expander;
  })();
}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.tooltip = function(forElement, content, options) {
    if (options == null) {
      options = {};
    }
    Mercury.tooltip.show(forElement, content, options);
    return Mercury.tooltip;
  };
  jQuery.extend(Mercury.tooltip, {
    show: function(forElement, content, options) {
      this.forElement = forElement;
      this.content = content;
      this.options = options != null ? options : {};
      this.document = jQuery(this.forElement.get(0).ownerDocument);
      this.initialize();
      if (this.visible) {
        return this.update();
      } else {
        return this.appear();
      }
    },
    initialize: function() {
      if (this.initialized) {
        return;
      }
      this.build();
      this.bindEvents();
      return this.initialized = true;
    },
    build: function() {
      var _ref;
      this.element = jQuery('<div>', {
        "class": 'mercury-tooltip'
      });
      return this.element.appendTo((_ref = jQuery(this.options.appendTo).get(0)) != null ? _ref : 'body');
    },
    bindEvents: function() {
      Mercury.bind('resize', __bind(function() {
        if (this.visible) {
          return this.position();
        }
      }, this));
      this.document.scroll(__bind(function() {
        if (this.visible) {
          return this.position();
        }
      }, this));
      return this.element.mousedown(function(event) {
        event.preventDefault();
        return event.stopPropagation();
      });
    },
    appear: function() {
      this.update();
      this.element.show();
      return this.element.animate({
        opacity: 1
      }, 200, 'easeInOutSine', __bind(function() {
        return this.visible = true;
      }, this));
    },
    update: function() {
      this.element.html(this.content);
      return this.position();
    },
    position: function() {
      var left, offset, top, width;
      offset = this.forElement.offset();
      width = this.element.width();
      top = offset.top + this.forElement.outerHeight();
      left = offset.left - jQuery(this.document).scrollLeft();
      if (Mercury.displayRect.height !== Mercury.displayRect.fullHeight) {
        top += Mercury.displayRect.top - jQuery(this.document).scrollTop();
      }
      if ((left + width + 25) > Mercury.displayRect.width) {
        left = left - (left + width + 25) - Mercury.displayRect.width;
      }
      left = left <= 0 ? 0 : left;
      return this.element.css({
        top: top,
        left: left
      });
    },
    hide: function() {
      if (!this.initialized) {
        return;
      }
      this.element.hide();
      return this.visible = false;
    }
  });
}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.Snippet = (function() {
    Snippet.all = [];
    Snippet.displayOptionsFor = function(name) {
      Mercury.modal(Mercury.config.snippets.optionsUrl.replace(':name', name), {
        title: 'Snippet Options',
        handler: 'insertSnippet',
        snippetName: name
      });
      return Mercury.snippet = null;
    };
    Snippet.create = function(name, options) {
      var identity, instance;
      identity = "snippet_" + this.all.length;
      instance = new Mercury.Snippet(name, identity, options);
      this.all.push(instance);
      return instance;
    };
    Snippet.find = function(identity) {
      var snippet, _i, _len, _ref;
      _ref = this.all;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        snippet = _ref[_i];
        if (snippet.identity === identity) {
          return snippet;
        }
      }
      return null;
    };
    Snippet.load = function(snippets) {
      var details, identity, instance, _results;
      _results = [];
      for (identity in snippets) {
        if (!__hasProp.call(snippets, identity)) continue;
        details = snippets[identity];
        instance = new Mercury.Snippet(details.name, identity, details.options);
        _results.push(this.all.push(instance));
      }
      return _results;
    };
    function Snippet(name, identity, options) {
      this.name = name;
      this.identity = identity;
      if (options == null) {
        options = {};
      }
      this.version = 0;
      this.data = '';
      this.history = new Mercury.HistoryBuffer();
      this.setOptions(options);
    }
    Snippet.prototype.getHTML = function(context, callback) {
      var element;
      if (callback == null) {
        callback = null;
      }
      element = jQuery('<div class="mercury-snippet" contenteditable="false">', context);
      element.attr({
        'data-snippet': this.identity
      });
      element.attr({
        'data-version': this.version
      });
      element.html("[" + this.identity + "]");
      this.loadPreview(element, callback);
      return element;
    };
    Snippet.prototype.getText = function(callback) {
      return "[--" + this.identity + "--]";
    };
    Snippet.prototype.loadPreview = function(element, callback) {
      if (callback == null) {
        callback = null;
      }
      return jQuery.ajax(Mercury.config.snippets.previewUrl.replace(':name', this.name), {
        type: 'POST',
        data: this.options,
        success: __bind(function(data) {
          this.data = data;
          element.html(data);
          if (callback) {
            return callback();
          }
        }, this),
        error: __bind(function() {
          return alert("Error loading the preview for the " + this.name + " snippet.");
        }, this)
      });
    };
    Snippet.prototype.displayOptions = function() {
      Mercury.snippet = this;
      return Mercury.modal(Mercury.config.snippets.optionsUrl.replace(':name', this.name), {
        title: 'Snippet Options',
        handler: 'insertSnippet',
        loadType: 'post',
        loadData: this.options
      });
    };
    Snippet.prototype.setOptions = function(options) {
      this.options = options;
      delete this.options['authenticity_token'];
      delete this.options['utf8'];
      this.version += 1;
      return this.history.push(this.options);
    };
    Snippet.prototype.setVersion = function(version) {
      if (version == null) {
        version = null;
      }
      version = parseInt(version);
      if (version && this.history.stack[version - 1]) {
        this.version = version - 1;
        this.options = this.history.stack[this.version];
        return true;
      }
      return false;
    };
    Snippet.prototype.serialize = function() {
      return {
        name: this.name,
        options: this.options
      };
    };
    return Snippet;
  })();
}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.SnippetToolbar = (function() {
    __extends(SnippetToolbar, Mercury.Toolbar);
    function SnippetToolbar(document, options) {
      this.document = document;
      this.options = options != null ? options : {};
      SnippetToolbar.__super__.constructor.call(this, this.options);
    }
    SnippetToolbar.prototype.build = function() {
      var button, buttonName, options, _ref, _ref2, _results;
      this.element = jQuery('<div>', {
        "class": 'mercury-toolbar mercury-snippet-toolbar',
        style: 'display:none'
      });
      this.element.appendTo((_ref = jQuery(this.options.appendTo).get(0)) != null ? _ref : 'body');
      _ref2 = Mercury.config.toolbars.snippetable;
      _results = [];
      for (buttonName in _ref2) {
        if (!__hasProp.call(_ref2, buttonName)) continue;
        options = _ref2[buttonName];
        button = this.buildButton(buttonName, options);
        _results.push(button ? button.appendTo(this.element) : void 0);
      }
      return _results;
    };
    SnippetToolbar.prototype.bindEvents = function() {
      Mercury.bind('show:toolbar', __bind(function(event, options) {
        if (!options.snippet) {
          return;
        }
        options.snippet.mouseout(__bind(function() {
          return this.hide();
        }, this));
        return this.show(options.snippet);
      }, this));
      Mercury.bind('hide:toolbar', __bind(function(event, options) {
        if (!(options.type && options.type === 'snippet')) {
          return;
        }
        return this.hide(options.immediately);
      }, this));
      jQuery(this.document).scroll(__bind(function() {
        if (this.visible) {
          return this.position();
        }
      }, this));
      this.element.mousemove(__bind(function() {
        return clearTimeout(this.hideTimeout);
      }, this));
      return this.element.mouseout(__bind(function() {
        return this.hide();
      }, this));
    };
    SnippetToolbar.prototype.show = function(snippet) {
      this.snippet = snippet;
      Mercury.tooltip.hide();
      this.position();
      return this.appear();
    };
    SnippetToolbar.prototype.position = function() {
      var left, offset, top;
      offset = this.snippet.offset();
      top = offset.top + Mercury.displayRect.top - jQuery(this.document).scrollTop() - this.height() + 10;
      left = offset.left - jQuery(this.document).scrollLeft();
      return this.element.css({
        top: top,
        left: left
      });
    };
    SnippetToolbar.prototype.appear = function() {
      clearTimeout(this.hideTimeout);
      if (this.visible) {
        return;
      }
      this.visible = true;
      this.element.css({
        display: 'block',
        opacity: 0
      });
      return this.element.stop().animate({
        opacity: 1
      }, 200, 'easeInOutSine');
    };
    SnippetToolbar.prototype.hide = function(immediately) {
      if (immediately == null) {
        immediately = false;
      }
      clearTimeout(this.hideTimeout);
      if (immediately) {
        this.element.hide();
        return this.visible = false;
      } else {
        return this.hideTimeout = setTimeout((__bind(function() {
          this.element.stop().animate({
            opacity: 0
          }, 300, 'easeInOutSine', __bind(function() {
            return this.element.hide();
          }, this));
          return this.visible = false;
        }, this)), 500);
      }
    };
    return SnippetToolbar;
  })();
}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.Region = (function() {
    var type;
    type = 'region';
    function Region(element, window, options) {
      this.element = element;
      this.window = window;
      this.options = options != null ? options : {};
      if (!this.type) {
        this.type = 'region';
      }
      Mercury.log("building " + this.type, this.element, this.options);
      this.document = this.window.document;
      this.name = this.element.attr('id');
      this.history = new Mercury.HistoryBuffer();
      this.build();
      this.bindEvents();
      this.pushHistory();
    }
    Region.prototype.build = function() {};
    Region.prototype.focus = function() {};
    Region.prototype.bindEvents = function() {
      Mercury.bind('mode', __bind(function(event, options) {
        if (options.mode === 'preview') {
          return this.togglePreview();
        }
      }, this));
      Mercury.bind('focus:frame', __bind(function() {
        if (this.previewing) {
          return;
        }
        if (Mercury.region !== this) {
          return;
        }
        return this.focus();
      }, this));
      Mercury.bind('action', __bind(function(event, options) {
        if (this.previewing) {
          return;
        }
        if (Mercury.region !== this) {
          return;
        }
        if (options.action) {
          return this.execCommand(options.action, options);
        }
      }, this));
      this.element.mousemove(__bind(function(event) {
        var snippet;
        if (this.previewing) {
          return;
        }
        if (Mercury.region !== this) {
          return;
        }
        snippet = jQuery(event.target).closest('.mercury-snippet');
        if (snippet.length) {
          this.snippet = snippet;
          return Mercury.trigger('show:toolbar', {
            type: 'snippet',
            snippet: this.snippet
          });
        }
      }, this));
      return this.element.mouseout(__bind(function(event) {
        if (this.previewing) {
          return;
        }
        return Mercury.trigger('hide:toolbar', {
          type: 'snippet',
          immediately: false
        });
      }, this));
    };
    Region.prototype.content = function(value, filterSnippets) {
      var container, index, snippet, _len, _ref;
      if (value == null) {
        value = null;
      }
      if (filterSnippets == null) {
        filterSnippets = false;
      }
      if (value !== null) {
        return this.element.html(value);
      } else {
        container = jQuery('<div>').appendTo(this.document.createDocumentFragment());
        container.html(this.element.html().replace(/^\s+|\s+$/g, ''));
        if (filterSnippets) {
          _ref = container.find('.mercury-snippet');
          for (index = 0, _len = _ref.length; index < _len; index++) {
            snippet = _ref[index];
            snippet = jQuery(snippet);
            snippet.attr({
              contenteditable: null,
              'data-version': null
            });
            snippet.html("[" + (snippet.data('snippet')) + "]");
          }
        }
        return container.html();
      }
    };
    Region.prototype.togglePreview = function() {
      if (this.previewing) {
        this.previewing = false;
        this.element.addClass('mercury-region').removeClass('mercury-region-preview');
        if (Mercury.region === this) {
          return this.focus();
        }
      } else {
        this.previewing = true;
        this.element.addClass('mercury-region-preview').removeClass('mercury-region');
        return Mercury.trigger('region:blurred', {
          region: this
        });
      }
    };
    Region.prototype.execCommand = function(action, options) {
      if (options == null) {
        options = {};
      }
      this.focus();
      if (action !== 'redo') {
        this.pushHistory();
      }
      Mercury.log('execCommand', action, options.value);
      return Mercury.changes = true;
    };
    Region.prototype.pushHistory = function() {
      return this.history.push(this.content());
    };
    Region.prototype.snippets = function() {
      var element, snippet, snippets, _i, _len, _ref;
      snippets = {};
      _ref = this.element.find('[data-snippet]');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        snippet = Mercury.Snippet.find(jQuery(element).data('snippet'));
        snippet.setVersion(jQuery(element).data('version'));
        snippets[snippet.identity] = snippet.serialize();
      }
      return snippets;
    };
    Region.prototype.serialize = function() {
      return {
        type: this.type,
        value: this.content(null, true),
        snippets: this.snippets()
      };
    };
    return Region;
  })();
}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty;
  this.Mercury.uploader = function(file, options) {
    if (Mercury.config.uploading.enabled) {
      Mercury.uploader.show(file, options);
    }
    return Mercury.uploader;
  };
  jQuery.extend(Mercury.uploader, {
    show: function(file, options) {
      this.options = options != null ? options : {};
      this.file = new Mercury.uploader.File(file);
      if (this.file.errors) {
        alert("Error: " + this.file.errors);
        return;
      }
      if (!this.supported()) {
        return;
      }
      Mercury.trigger('focus:window');
      if (Mercury.config.uploading.enabled === 'local') {
        return this.file.readAsDataURL(__bind(function(result) {
          return Mercury.trigger('action', {
            action: 'insertImage',
            value: {
              src: result
            }
          });
        }, this));
      } else if (Mercury.config.uploading.enabled) {
        this.initialize();
        return this.appear();
      }
    },
    initialize: function() {
      if (this.initialized) {
        return;
      }
      this.build();
      this.bindEvents();
      return this.initialized = true;
    },
    supported: function() {
      var fileReader, xhr;
      xhr = new XMLHttpRequest;
      fileReader = window.FileReader;
      if (window.Uint8Array && window.ArrayBuffer && !XMLHttpRequest.prototype.sendAsBinary) {
        XMLHttpRequest.prototype.sendAsBinary = function(datastr) {
          var data, index, ui8a, _len;
          ui8a = new Uint8Array(datastr.length);
          for (index = 0, _len = datastr.length; index < _len; index++) {
            data = datastr[index];
            ui8a[index] = datastr.charCodeAt(index) & 0xff;
          }
          return this.send(ui8a.buffer);
        };
      }
      return !!(xhr.upload && xhr.sendAsBinary && fileReader);
    },
    build: function() {
      var _ref, _ref2;
      this.element = jQuery('<div>', {
        "class": 'mercury-uploader',
        style: 'display:none'
      });
      this.element.append('<div class="mercury-uploader-preview"><b><img/></b></div>');
      this.element.append('<div class="mercury-uploader-details"></div>');
      this.element.append('<div class="mercury-uploader-progress"><span>Processing...</span><div class="mercury-uploader-indicator"><div><b>0%</b></div></div></div>');
      this.overlay = jQuery('<div>', {
        "class": 'mercury-uploader-overlay',
        style: 'display:none'
      });
      this.element.appendTo((_ref = jQuery(this.options.appendTo).get(0)) != null ? _ref : 'body');
      return this.overlay.appendTo((_ref2 = jQuery(this.options.appendTo).get(0)) != null ? _ref2 : 'body');
    },
    bindEvents: function() {
      return Mercury.bind('resize', __bind(function() {
        return this.position();
      }, this));
    },
    appear: function() {
      this.fillDisplay();
      this.position();
      this.overlay.show();
      return this.overlay.animate({
        opacity: 1
      }, 200, 'easeInOutSine', __bind(function() {
        this.element.show();
        return this.element.animate({
          opacity: 1
        }, 200, 'easeInOutSine', __bind(function() {
          this.visible = true;
          return this.loadImage();
        }, this));
      }, this));
    },
    position: function() {
      var height, width;
      width = this.element.outerWidth();
      height = this.element.outerHeight();
      return this.element.css({
        top: (Mercury.displayRect.height - height) / 2,
        left: (Mercury.displayRect.width - width) / 2
      });
    },
    fillDisplay: function() {
      var details;
      details = ["Name: " + this.file.name, "Size: " + this.file.readableSize, "Type: " + this.file.type];
      return this.element.find('.mercury-uploader-details').html(details.join('<br/>'));
    },
    loadImage: function() {
      return this.file.readAsDataURL(__bind(function(result) {
        this.element.find('.mercury-uploader-preview b').html(jQuery('<img>', {
          src: result
        }));
        return this.upload();
      }, this));
    },
    upload: function() {
      var xhr;
      xhr = new XMLHttpRequest;
      jQuery.each(['onloadstart', 'onprogress', 'onload', 'onabort', 'onerror'], __bind(function(index, eventName) {
        return xhr.upload[eventName] = __bind(function(event) {
          return this.uploaderEvents[eventName].call(this, event);
        }, this);
      }, this));
      xhr.onload = __bind(function(event) {
        var response;
        try {
          response = Mercury.config.uploading.handler ? Mercury.config.uploading.handler(event.target.responseText) : jQuery.parseJSON(event.target.responseText);
          return Mercury.trigger('action', {
            action: 'insertImage',
            value: {
              src: response.image.url
            }
          });
        } catch (error) {
          return this.updateStatus('Unable to process response:<br/>' + error.toString());
        }
      }, this);
      xhr.open('post', Mercury.config.uploading.url, true);
      xhr.setRequestHeader('Accept', 'application/json, text/javascript, text/html, application/xml, text/xml, */*');
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.setRequestHeader('X-CSRF-Token', Mercury.csrfToken);
      return this.file.readAsBinaryString(__bind(function(result) {
        var multipart;
        multipart = new Mercury.uploader.MultiPartPost(Mercury.config.uploading.inputName, this.file, result);
        this.file.updateSize(multipart.delta);
        xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + multipart.boundary);
        return xhr.sendAsBinary(multipart.body);
      }, this));
    },
    updateStatus: function(message, loaded) {
      var percent;
      this.element.find('.mercury-uploader-progress span').html(message);
      if (loaded) {
        percent = Math.floor(loaded * 100 / this.file.size) + '%';
        this.element.find('.mercury-uploader-indicator div').css({
          width: percent
        });
        return this.element.find('.mercury-uploader-indicator b').html(percent).show();
      }
    },
    hide: function(delay) {
      if (delay == null) {
        delay = 0;
      }
      return setTimeout((__bind(function() {
        return this.element.animate({
          opacity: 0
        }, 200, 'easeInOutSine', __bind(function() {
          return this.overlay.animate({
            opacity: 0
          }, 200, 'easeInOutSine', __bind(function() {
            this.overlay.hide();
            this.element.hide();
            this.reset();
            this.visible = false;
            return Mercury.trigger('focus:frame');
          }, this));
        }, this));
      }, this)), delay * 1000);
    },
    reset: function() {
      this.element.find('.mercury-uploader-preview b').html('');
      this.element.find('.mercury-uploader-indicator div').css({
        width: 0
      });
      this.element.find('.mercury-uploader-indicator b').html('0%').hide();
      return this.updateStatus('Processing...');
    },
    uploaderEvents: {
      onloadstart: function() {
        return this.updateStatus('Uploading...');
      },
      onprogress: function(event) {
        return this.updateStatus('Uploading...', event.loaded);
      },
      onabort: function() {
        this.updateStatus('Aborted');
        return this.hide(1);
      },
      onload: function() {
        this.updateStatus('Successfully uploaded', this.file.size);
        return this.hide(1);
      },
      onerror: function() {
        this.updateStatus('Error: Unable to upload the file');
        return this.hide(5);
      }
    }
  });
  Mercury.uploader.File = (function() {
    function File(file) {
      var errors;
      this.file = file;
      this.size = this.file.size;
      this.fullSize = this.file.size;
      this.readableSize = this.file.size.toBytes();
      this.name = this.file.fileName;
      this.type = this.file.type;
      errors = [];
      if (this.size >= Mercury.config.uploading.maxFileSize) {
        errors.push('Too large');
      }
      if (!(Mercury.config.uploading.allowedMimeTypes.indexOf(this.type) > -1)) {
        errors.push('Unsupported format');
      }
      if (errors.length) {
        this.errors = errors.join(' / ');
      }
    }
    File.prototype.readAsDataURL = function(callback) {
      var reader;
      if (callback == null) {
        callback = null;
      }
      reader = new FileReader();
      reader.readAsDataURL(this.file);
      return reader.onload = __bind(function() {
        if (callback) {
          return callback(reader.result);
        }
      }, this);
    };
    File.prototype.readAsBinaryString = function(callback) {
      var reader;
      if (callback == null) {
        callback = null;
      }
      reader = new FileReader();
      reader.readAsBinaryString(this.file);
      return reader.onload = __bind(function() {
        if (callback) {
          return callback(reader.result);
        }
      }, this);
    };
    File.prototype.updateSize = function(delta) {
      return this.fullSize = this.size + delta;
    };
    return File;
  })();
  Mercury.uploader.MultiPartPost = (function() {
    function MultiPartPost(inputName, file, contents, formInputs) {
      this.inputName = inputName;
      this.file = file;
      this.contents = contents;
      this.formInputs = formInputs != null ? formInputs : {};
      this.boundary = 'Boundaryx20072377098235644401115438165x';
      this.body = '';
      this.buildBody();
      this.delta = this.body.length - this.file.size;
    }
    MultiPartPost.prototype.buildBody = function() {
      var boundary, name, value, _ref;
      boundary = '--' + this.boundary;
      _ref = this.formInputs;
      for (name in _ref) {
        if (!__hasProp.call(_ref, name)) continue;
        value = _ref[name];
        this.body += "" + boundary + "\r\nContent-Disposition: form-data; name=\"" + name + "\"\r\n\r\n" + (unescape(encodeURIComponent(value))) + "\r\n";
      }
      return this.body += "" + boundary + "\r\nContent-Disposition: form-data; name=\"" + this.inputName + "\"; filename=\"" + this.file.name + "\"\r\nContent-Type: " + this.file.type + "\r\nContent-Transfer-Encoding: binary\r\n\r\n" + this.contents + "\r\n" + boundary + "--";
    };
    return MultiPartPost;
  })();
}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.Regions.Basic = (function() {
    var type;
    __extends(Basic, Mercury.Region);
    type = 'basic';
    function Basic(element, window, options) {
      this.element = element;
      this.window = window;
      this.options = options != null ? options : {};
      Basic.__super__.constructor.apply(this, arguments);
      this.type = 'basic';
    }
    Basic.prototype.build = function() {
      var element, _i, _len, _ref;
      if (jQuery.browser.mozilla && this.content() === '') {
        this.content('&nbsp;');
      }
      this.element.data({
        originalOverflow: this.element.css('overflow')
      });
      this.element.css({
        overflow: 'auto'
      });
      this.specialContainer = jQuery.browser.mozilla && this.element.get(0).tagName !== 'DIV';
      this.element.get(0).contentEditable = true;
      _ref = this.element.find('.mercury-snippet');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        element.contentEditable = false;
        jQuery(element).attr('data-version', '1');
      }
      if (!this.document.mercuryEditing) {
        this.document.execCommand('styleWithCSS', false, false);
        this.document.execCommand('insertBROnReturn', false, false);
        this.document.execCommand('enableInlineTableEditing', false, false);
        this.document.execCommand('enableObjectResizing', false, false);
        return this.document.mercuryEditing = true;
      }
    };
    Basic.prototype.bindEvents = function() {
      Basic.__super__.bindEvents.apply(this, arguments);
      Mercury.bind('region:update', __bind(function() {
        var anchor, currentElement, table;
        if (this.previewing) {
          return;
        }
        if (Mercury.region !== this) {
          return;
        }
        setTimeout((__bind(function() {
          return this.selection().forceSelection(this.element.get(0));
        }, this)), 1);
        currentElement = this.currentElement();
        if (currentElement.length) {
          table = currentElement.closest('table', this.element);
          if (table.length) {
            Mercury.tableEditor(table, currentElement.closest('tr, td'), '&nbsp;');
          }
          anchor = currentElement.closest('a', this.element);
          if (anchor.length && anchor.attr('href')) {
            return Mercury.tooltip(anchor, "<a href=\"" + (anchor.attr('href')) + "\" target=\"_blank\">" + (anchor.attr('href')) + "</a>", {
              position: 'below'
            });
          } else {
            return Mercury.tooltip.hide();
          }
        }
      }, this));
      this.element.bind('paste', __bind(function() {
        var content;
        if (this.previewing) {
          return;
        }
        if (Mercury.region !== this) {
          return;
        }
        Mercury.changes = true;
        if (this.specialContainer) {
          event.preventDefault();
          return;
        }
        content = this.content();
        clearTimeout(this.handlePasteTimeout);
        return this.handlePasteTimeout = setTimeout((__bind(function() {
          return this.handlePaste(content);
        }, this)), 100);
      }, this));
      this.element.focus(__bind(function() {
        if (this.previewing) {
          return;
        }
        Mercury.region = this;
        setTimeout((__bind(function() {
          return this.selection().forceSelection(this.element.get(0));
        }, this)), 1);
        return Mercury.trigger('region:focused', {
          region: this
        });
      }, this));
      this.element.blur(__bind(function() {
        if (this.previewing) {
          return;
        }
        Mercury.trigger('region:blurred', {
          region: this
        });
        return Mercury.tooltip.hide();
      }, this));
      this.element.click(__bind(function(event) {
        if (this.previewing) {
          return jQuery(event.target).closest('a').attr('target', '_top');
        }
      }, this));
      this.element.dblclick(__bind(function(event) {
        var image;
        if (this.previewing) {
          return;
        }
        image = jQuery(event.target).closest('img', this.element);
        if (image.length) {
          this.selection().selectNode(image.get(0), true);
          return Mercury.trigger('button', {
            action: 'insertMedia'
          });
        }
      }, this));
      this.element.mouseup(__bind(function() {
        if (this.previewing) {
          return;
        }
        this.pushHistory();
        return Mercury.trigger('region:update', {
          region: this
        });
      }, this));
      this.element.keydown(__bind(function(event) {
        var container, handled;
        if (this.previewing) {
          return;
        }
        Mercury.changes = true;
        switch (event.keyCode) {
          case 90:
            if (!event.metaKey) {
              return;
            }
            event.preventDefault();
            if (event.shiftKey) {
              this.execCommand('redo');
            } else {
              this.execCommand('undo');
            }
            return;
          case 13:
            event.preventDefault();
            return false;
          case 9:
            event.preventDefault();
            container = this.selection().commonAncestor();
            handled = false;
            if (container.closest('li', this.element).length) {
              handled = true;
              if (event.shiftKey) {
                this.execCommand('outdent');
              } else {
                this.execCommand('indent');
              }
            }
            if (!handled) {
              this.execCommand('insertHTML', {
                value: '&nbsp; '
              });
            }
        }
        if (event.metaKey) {
          switch (event.keyCode) {
            case 66:
              this.execCommand('bold');
              event.preventDefault();
              break;
            case 73:
              this.execCommand('italic');
              event.preventDefault();
              break;
            case 85:
              this.execCommand('underline');
              event.preventDefault();
          }
        }
        return this.pushHistory(event.keyCode);
      }, this));
      return this.element.keyup(__bind(function() {
        if (this.previewing) {
          return;
        }
        return Mercury.trigger('region:update', {
          region: this
        });
      }, this));
    };
    Basic.prototype.focus = function() {
      var selection;
      if (Mercury.region !== this) {
        this.element.focus();
        selection = this.selection().selection;
        if (selection.type !== 'None') {
          selection = this.selection().selection.collapseToStart();
        }
      }
      Mercury.trigger('region:focused', {
        region: this
      });
      return Mercury.trigger('region:update', {
        region: this
      });
    };
    Basic.prototype.content = function(value, filterSnippets, includeMarker) {
      var container, content, element, index, selection, snippet, version, _i, _len, _len2, _ref, _ref2;
      if (value == null) {
        value = null;
      }
      if (filterSnippets == null) {
        filterSnippets = true;
      }
      if (includeMarker == null) {
        includeMarker = false;
      }
      if (value !== null) {
        container = jQuery('<div>').appendTo(this.document.createDocumentFragment());
        container.html(value);
        _ref = container.find('[data-snippet]');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          element = _ref[_i];
          element.contentEditable = false;
          element = jQuery(element);
          if (snippet = Mercury.Snippet.find(element.data('snippet'))) {
            if (!element.data('version')) {
              try {
                version = parseInt(element.html().match(/\/(\d+)\]/)[1]);
                if (version) {
                  snippet.setVersion(version);
                  element.attr({
                    'data-version': version
                  });
                  element.html(snippet.data);
                }
              } catch (error) {

              }
            }
          }
        }
        this.element.html(container.html());
        return this.selection().selectMarker(this.element);
      } else {
        this.element.find('meta').remove();
        if (includeMarker) {
          selection = this.selection();
          selection.placeMarker();
        }
        container = jQuery('<div>').appendTo(this.document.createDocumentFragment());
        container.html(this.element.html().replace(/^\s+|\s+$/g, ''));
        if (filterSnippets) {
          _ref2 = container.find('[data-snippet]');
          for (index = 0, _len2 = _ref2.length; index < _len2; index++) {
            element = _ref2[index];
            element = jQuery(element);
            if (snippet = Mercury.Snippet.find(element.data("snippet"))) {
              snippet.data = element.html();
            }
            element.html("[" + (element.data("snippet")) + "/" + (element.data("version")) + "]");
            element.attr({
              contentEditable: null,
              'data-version': null
            });
          }
        }
        content = container.html();
        if (includeMarker) {
          selection.removeMarker();
        }
        return content;
      }
    };
    Basic.prototype.togglePreview = function() {
      if (this.previewing) {
        this.element.get(0).contentEditable = true;
        this.element.css({
          overflow: 'auto'
        });
      } else {
        this.content(this.content());
        this.element.get(0).contentEditable = false;
        this.element.css({
          overflow: this.element.data('originalOverflow')
        });
        this.element.blur();
      }
      return Basic.__super__.togglePreview.apply(this, arguments);
    };
    Basic.prototype.execCommand = function(action, options) {
      var handler, sibling;
      if (options == null) {
        options = {};
      }
      Basic.__super__.execCommand.apply(this, arguments);
      switch (action) {
        case 'bold':
        case 'italic':
        case 'underline':
          if (this.selection().fragment.textContent === '') {
            false;
          }
      }
      if (handler = Mercury.config.behaviors[action] || this.actions[action]) {
        return handler.call(this, this.selection(), options);
      } else {
        if (action === 'indent') {
          sibling = this.element.get(0).previousSibling;
        }
        if (action === 'insertHTML' && options.value && options.value.get) {
          options.value = jQuery('<div>').html(options.value).html();
        }
        try {
          return this.document.execCommand(action, false, options.value);
        } catch (error) {
          if (action === 'indent' && this.element.prev() !== sibling) {
            return this.element.prev().remove();
          }
        }
      }
    };
    Basic.prototype.pushHistory = function(keyCode) {
      var keyCodes, knownKeyCode, waitTime;
      keyCodes = [13, 46, 8];
      waitTime = 2.5;
      if (keyCode) {
        knownKeyCode = keyCodes.indexOf(keyCode);
      }
      clearTimeout(this.historyTimeout);
      if (knownKeyCode >= 0 && knownKeyCode !== this.lastKnownKeyCode) {
        this.history.push(this.content(null, false, true));
      } else if (keyCode) {
        this.historyTimeout = setTimeout((__bind(function() {
          return this.history.push(this.content(null, false, true));
        }, this)), waitTime * 1000);
      } else {
        this.history.push(this.content(null, false, true));
      }
      return this.lastKnownKeyCode = knownKeyCode;
    };
    Basic.prototype.selection = function() {
      return new this.Selection(this.window.getSelection(), this.document);
    };
    Basic.prototype.path = function() {
      var container;
      container = this.selection().commonAncestor();
      if (!container) {
        return [];
      }
      if (container.get(0) === this.element.get(0)) {
        return [];
      } else {
        return container.parentsUntil(this.element);
      }
    };
    Basic.prototype.currentElement = function() {
      var element, selection;
      element = [];
      selection = this.selection();
      if (selection.range) {
        element = selection.commonAncestor();
        if (element.get(0).nodeType === 3) {
          element = element.parent();
        }
      }
      return element;
    };
    Basic.prototype.handlePaste = function(prePasteContent) {
      var cleaned, container, content, pasted;
      prePasteContent = prePasteContent.replace(/^\<br\>/, '');
      this.element.find('.mercury-region').remove();
      content = this.content();
      if (content.indexOf('<!--StartFragment-->') > -1 || content.indexOf('="mso-') > -1 || content.indexOf('<o:') > -1 || content.indexOf('="Mso') > -1) {
        cleaned = prePasteContent.singleDiff(this.content()).sanitizeHTML();
        try {
          this.document.execCommand('undo', false, null);
          return this.execCommand('insertHTML', {
            value: cleaned
          });
        } catch (error) {
          this.content(prePasteContent);
          return Mercury.modal('/mercury/modals/sanitizer', {
            title: 'HTML Sanitizer (Starring Clippy)',
            afterLoad: function() {
              return this.element.find('textarea').val(cleaned.replace(/<br\/>/g, '\n'));
            }
          });
        }
      } else if (Mercury.config.cleanStylesOnPaste) {
        pasted = prePasteContent.singleDiff(this.content());
        container = jQuery('<div>').appendTo(this.document.createDocumentFragment()).html(pasted);
        container.find('[style]').attr({
          style: null
        });
        this.document.execCommand('undo', false, null);
        return this.execCommand('insertHTML', {
          value: container.html()
        });
      }
    };
    Basic.prototype.actions = {
      insertRowBefore: function() {
        return Mercury.tableEditor.addRow('before');
      },
      insertRowAfter: function() {
        return Mercury.tableEditor.addRow('after');
      },
      insertColumnBefore: function() {
        return Mercury.tableEditor.addColumn('before');
      },
      insertColumnAfter: function() {
        return Mercury.tableEditor.addColumn('after');
      },
      deleteColumn: function() {
        return Mercury.tableEditor.removeColumn();
      },
      deleteRow: function() {
        return Mercury.tableEditor.removeRow();
      },
      increaseColspan: function() {
        return Mercury.tableEditor.increaseColspan();
      },
      decreaseColspan: function() {
        return Mercury.tableEditor.decreaseColspan();
      },
      increaseRowspan: function() {
        return Mercury.tableEditor.increaseRowspan();
      },
      decreaseRowspan: function() {
        return Mercury.tableEditor.decreaseRowspan();
      },
      undo: function() {
        return this.content(this.history.undo());
      },
      redo: function() {
        return this.content(this.history.redo());
      },
      removeFormatting: function(selection) {
        return selection.insertTextNode(selection.textContent());
      },
      backColor: function(selection, options) {
        return selection.changeStyle('background-color', options.value.toHex());
      },
      overline: function(selection) {
        return selection.toggleStyle('text-decoration', 'overline');
      },
      style: function(selection, options) {
        return selection.wrap("<span class=\"" + options.value + "\">", true);
      },
      replaceHTML: function(selection, options) {
        return this.content(options.value);
      },
      insertImage: function(selection, options) {
        return this.execCommand('insertHTML', {
          value: jQuery('<img/>', options.value)
        });
      },
      insertLink: function(selection, options) {
        var anchor;
        anchor = jQuery("<" + options.value.tagName + ">", this.document).attr(options.value.attrs).html(options.value.content);
        return selection.insertNode(anchor);
      },
      replaceLink: function(selection, options) {
        var anchor, html;
        anchor = jQuery("<" + options.value.tagName + ">", this.document).attr(options.value.attrs).html(options.value.content);
        selection.selectNode(options.node);
        html = jQuery('<div>').html(selection.content()).find('a').html();
        return selection.replace(jQuery(anchor, selection.context).html(html));
      },
      insertSnippet: function(selection, options) {
        var existing, snippet;
        snippet = options.value;
        if ((existing = this.element.find("[data-snippet=" + snippet.identity + "]")).length) {
          selection.selectNode(existing.get(0));
        }
        return selection.insertNode(snippet.getHTML(this.document));
      },
      editSnippet: function() {
        var snippet;
        if (!this.snippet) {
          return;
        }
        snippet = Mercury.Snippet.find(this.snippet.data('snippet'));
        return snippet.displayOptions();
      },
      removeSnippet: function() {
        if (this.snippet) {
          this.snippet.remove();
        }
        return Mercury.trigger('hide:toolbar', {
          type: 'snippet',
          immediately: true
        });
      }
    };
    Basic.prototype.Selection = (function() {
      _Class.prototype.selection = null;
      _Class.prototype.context = null;
      _Class.prototype.range = null;
      _Class.prototype.fragment = null;
      _Class.prototype.clone = null;
      function _Class(selection, context) {
        this.selection = selection;
        this.context = context;
        if (!(this.selection.rangeCount >= 1)) {
          return;
        }
        this.range = this.selection.getRangeAt(0);
        this.fragment = this.range.cloneContents();
        this.clone = this.range.cloneRange();
      }
      _Class.prototype.toggleStyle = function(name, value) {
        var style;
        style = 'mercury-' + name;
        if (!this.cleanStyle(style)) {
          return this.wrap('<span class="' + style + '" style="' + name + ':' + value + '">', true);
        }
      };
      _Class.prototype.cleanStyle = function(style) {
        var $parent, $selection, cleaned;
        $parent = this.commonAncestor().parent();
        $selection = $parent;
        cleaned = false;
        if ($parent.is('.' + style)) {
          $selection = $parent.contents();
          $parent.replaceWith($selection);
          cleaned = true;
        }
        $parent.find('.' + style).each(function() {
          var $this;
          $this = $(this);
          $this.replaceWith($this.contents());
          return cleaned = true;
        });
        return cleaned;
      };
      _Class.prototype.changeStyle = function(name, value) {
        var style;
        style = 'mercury-' + name;
        this.cleanStyle(style);
        return this.wrap('<span class="' + style + '" style="' + name + ':' + value + '">', true);
      };
      _Class.prototype.commonAncestor = function(onlyTag) {
        var ancestor;
        if (onlyTag == null) {
          onlyTag = false;
        }
        if (!this.range) {
          return null;
        }
        ancestor = this.range.commonAncestorContainer;
        if (ancestor.nodeType === 3 && onlyTag) {
          ancestor = ancestor.parentNode;
        }
        return jQuery(ancestor);
      };
      _Class.prototype.wrap = function(element, replace) {
        if (replace == null) {
          replace = false;
        }
        element = jQuery(element, this.context).html(this.fragment);
        if (replace) {
          this.replace(element);
        }
        return element;
      };
      _Class.prototype.textContent = function() {
        return this.range.cloneContents().textContent;
      };
      _Class.prototype.content = function() {
        return this.range.cloneContents();
      };
      _Class.prototype.is = function(elementType) {
        var content;
        content = this.content();
        if (content.childNodes.length === 1 && jQuery(content.firstChild).is(elementType)) {
          return jQuery(content.firstChild);
        }
        return false;
      };
      _Class.prototype.forceSelection = function(element) {
        var lastChild, range;
        if (!jQuery.browser.webkit) {
          return;
        }
        range = this.context.createRange();
        if (this.range) {
          if (this.commonAncestor(true).closest('.mercury-snippet').length) {
            lastChild = this.context.createTextNode('\00');
            element.appendChild(lastChild);
          }
        } else {
          if (element.lastChild && element.lastChild.nodeType === 3 && element.lastChild.textContent.replace(/^[\s+|\n+]|[\s+|\n+]$/, '') === '') {
            lastChild = element.lastChild;
            element.lastChild.textContent = '\00';
          } else {
            lastChild = this.context.createTextNode(' ');
            element.appendChild(lastChild);
          }
        }
        if (lastChild) {
          range.setStartBefore(lastChild);
          range.setEndBefore(lastChild);
          return this.selection.addRange(range);
        }
      };
      _Class.prototype.selectMarker = function(context) {
        var markers, range;
        markers = context.find('em.mercury-marker');
        if (!markers.length) {
          return;
        }
        range = this.context.createRange();
        range.setStartBefore(markers.get(0));
        if (markers.length >= 2) {
          range.setEndBefore(markers.get(1));
        }
        markers.remove();
        this.selection.removeAllRanges();
        return this.selection.addRange(range);
      };
      _Class.prototype.placeMarker = function() {
        var rangeEnd, rangeStart;
        if (!this.range) {
          return;
        }
        this.startMarker = jQuery('<em class="mercury-marker"/>', this.context).get(0);
        this.endMarker = jQuery('<em class="mercury-marker"/>', this.context).get(0);
        rangeEnd = this.range.cloneRange();
        rangeEnd.collapse(false);
        rangeEnd.insertNode(this.endMarker);
        if (!this.range.collapsed) {
          rangeStart = this.range.cloneRange();
          rangeStart.collapse(true);
          rangeStart.insertNode(this.startMarker);
        }
        this.selection.removeAllRanges();
        return this.selection.addRange(this.range);
      };
      _Class.prototype.removeMarker = function() {
        jQuery(this.startMarker).remove();
        return jQuery(this.endMarker).remove();
      };
      _Class.prototype.insertTextNode = function(string) {
        var node;
        node = this.context.createTextNode(string);
        this.range.extractContents();
        this.range.insertNode(node);
        this.range.selectNodeContents(node);
        return this.selection.addRange(this.range);
      };
      _Class.prototype.insertNode = function(element) {
        if (element.get) {
          element = element.get(0);
        }
        if (jQuery.type(element) === 'string') {
          element = jQuery(element, this.context).get(0);
        }
        this.range.deleteContents();
        this.range.insertNode(element);
        this.range.selectNodeContents(element);
        return this.selection.addRange(this.range);
      };
      _Class.prototype.selectNode = function(node, removeExisting) {
        if (removeExisting == null) {
          removeExisting = false;
        }
        this.range.selectNode(node);
        if (removeExisting) {
          this.selection.removeAllRanges();
        }
        return this.selection.addRange(this.range);
      };
      _Class.prototype.replace = function(element) {
        if (element.get) {
          element = element.get(0);
        }
        if (jQuery.type(element) === 'string') {
          element = jQuery(element, this.context).get(0);
        }
        this.range.deleteContents();
        this.range.insertNode(element);
        this.range.selectNodeContents(element);
        return this.selection.addRange(this.range);
      };
      return _Class;
    })();
    return Basic;
  })();
}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  this.Mercury.Regions.Plain = (function() {
    var type;
    __extends(Plain, this.Mercury.Regions.Basic);
    type = 'plain';
    function Plain(element, window, options) {
      this.element = element;
      this.window = window;
      this.options = options != null ? options : {};
      Plain.__super__.constructor.apply(this, arguments);
      this.type = 'plain';
    }
    Plain.prototype.execCommand = function(action, options) {
      var handler, sibling;
      if (options == null) {
        options = {};
      }
      console.log(action);
      if (action !== 'redo' && action !== 'undo' && action !== 'insertHTML') {
        return false;
      }
      if (handler = Mercury.config.behaviors[action] || this.actions[action]) {
        return handler.call(this, this.selection(), options);
      } else {
        if (action === 'indent') {
          sibling = this.element.get(0).previousSibling;
        }
        if (action === 'insertHTML' && options.value && options.value.get) {
          options.value = jQuery('<div>').html(options.value).html();
        }
        try {
          return this.document.execCommand(action, false, options.value);
        } catch (error) {
          if (action === 'indent' && this.element.prev() !== sibling) {
            return this.element.prev().remove();
          }
        }
      }
    };
    Plain.prototype.handlePaste = function(prePasteContent) {
      var container, content, pasted;
      prePasteContent = prePasteContent.replace(/^\<br\>/, '');
      this.element.find('.mercury-region').remove();
      content = this.content();
      pasted = prePasteContent.singleDiff(this.content());
      container = jQuery('<div>').appendTo(this.document.createDocumentFragment()).html(pasted);
      container.find('[style]').attr({
        style: null
      });
      this.document.execCommand('undo', false, null);
      return this.execCommand('insertHTML', {
        value: container.text()
      });
    };
    Plain.prototype.actions = {
      undo: function() {
        return this.content(this.history.undo());
      },
      redo: function() {
        return this.content(this.history.redo());
      }
    };
    return Plain;
  }).call(this);
}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.Regions.Rich = (function() {
    var type;
    __extends(Rich, Mercury.Regions.Basic);
    type = 'rich';
    function Rich(element, window, options) {
      this.element = element;
      this.window = window;
      this.options = options != null ? options : {};
      Rich.__super__.constructor.apply(this, arguments);
      this.type = 'rich';
      if (!this.document.mercuryEditing) {
        this.document.execCommand('insertBROnReturn', false, true);
        this.document.execCommand('enableObjectResizing', false, true);
      }
    }
    Rich.prototype.bindEvents = function() {
      Rich.__super__.bindEvents.apply(this, arguments);
      this.element.bind('dragenter', __bind(function(event) {
        if (event.preventDefault) {
          event.preventDefault();
        }
        return event.originalEvent.dataTransfer.dropEffect = 'copy';
      }, this));
      this.element.bind('dragover', __bind(function(event) {
        if (event.preventDefault) {
          event.preventDefault();
        }
        return event.originalEvent.dataTransfer.dropEffect = 'copy';
      }, this));
      this.element.bind('drop', __bind(function(event) {
        if (this.previewing) {
          return;
        }
        clearTimeout(this.dropTimeout);
        this.dropTimeout = setTimeout((__bind(function() {
          return this.element.trigger('possible:drop');
        }, this)), 1);
        if (!event.originalEvent.dataTransfer.files.length) {
          return;
        }
        if (event.preventDefault) {
          event.preventDefault();
        }
        this.focus();
        return Mercury.uploader(event.originalEvent.dataTransfer.files[0]);
      }, this));
      this.element.unbind('keydown').keydown(__bind(function(event) {
        var container, handled;
        if (this.previewing) {
          return;
        }
        Mercury.changes = true;
        switch (event.keyCode) {
          case 90:
            if (!event.metaKey) {
              return;
            }
            event.preventDefault();
            if (event.shiftKey) {
              this.execCommand('redo');
            } else {
              this.execCommand('undo');
            }
            return;
          case 13:
            if (jQuery.browser.webkit && this.selection().commonAncestor().closest('li, ul', this.element).length === 0) {
              event.preventDefault();
              this.document.execCommand('insertLineBreak', false, null);
            } else if (this.specialContainer) {
              event.preventDefault();
              this.document.execCommand('insertHTML', false, '<br/>');
            }
            break;
          case 9:
            event.preventDefault();
            container = this.selection().commonAncestor();
            handled = false;
            if (container.closest('li', this.element).length) {
              handled = true;
              if (event.shiftKey) {
                this.execCommand('outdent');
              } else {
                this.execCommand('indent');
              }
            }
            if (!handled) {
              this.execCommand('insertHTML', {
                value: '&nbsp; '
              });
            }
        }
        if (event.metaKey) {
          switch (event.keyCode) {
            case 66:
              this.execCommand('bold');
              event.preventDefault();
              break;
            case 73:
              this.execCommand('italic');
              event.preventDefault();
              break;
            case 85:
              this.execCommand('underline');
              event.preventDefault();
          }
        }
        return this.pushHistory(event.keyCode);
      }, this));
      return this.element.keyup(__bind(function() {
        if (this.previewing) {
          return;
        }
        return Mercury.trigger('region:update', {
          region: this
        });
      }, this));
    };
    return Rich;
  })();
}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.Regions.Markupable = (function() {
    var type;
    __extends(Markupable, Mercury.Region);
    type = 'markupable';
    function Markupable(element, window, options) {
      this.element = element;
      this.window = window;
      this.options = options != null ? options : {};
      Markupable.__super__.constructor.apply(this, arguments);
      this.type = 'markupable';
      this.converter = new Showdown.converter();
    }
    Markupable.prototype.build = function() {
      var height, value, width;
      width = '100%';
      height = this.element.height();
      value = this.element.html().replace(/^\s+|\s+$/g, '').replace('&gt;', '>');
      this.textarea = jQuery('<textarea>', this.document).val(value);
      this.textarea.attr('class', this.element.attr('class')).addClass('mercury-textarea');
      this.textarea.css({
        border: 0,
        background: 'transparent',
        display: 'block',
        width: width,
        height: height,
        fontFamily: '"Courier New", Courier, monospace',
        fontSize: '14px'
      });
      this.element.empty().append(this.textarea);
      this.element.removeClass('mercury-region');
      this.previewElement = jQuery('<div>', this.document);
      this.element.append(this.previewElement);
      this.element = this.textarea;
      return this.resize();
    };
    Markupable.prototype.focus = function() {
      return this.element.focus();
    };
    Markupable.prototype.bindEvents = function() {
      Mercury.bind('mode', __bind(function(event, options) {
        if (options.mode === 'preview') {
          return this.togglePreview();
        }
      }, this));
      Mercury.bind('focus:frame', __bind(function() {
        if (this.previewing) {
          return;
        }
        if (Mercury.region !== this) {
          return;
        }
        return this.focus();
      }, this));
      Mercury.bind('action', __bind(function(event, options) {
        if (this.previewing) {
          return;
        }
        if (Mercury.region !== this) {
          return;
        }
        if (options.action) {
          return this.execCommand(options.action, options);
        }
      }, this));
      Mercury.bind('unfocus:regions', __bind(function(event) {
        if (this.previewing) {
          return;
        }
        if (Mercury.region !== this) {
          return;
        }
        this.element.blur();
        this.element.removeClass('focus');
        return Mercury.trigger('region:blurred', {
          region: this
        });
      }, this));
      this.element.bind('dragenter', __bind(function(event) {
        if (this.previewing) {
          return;
        }
        event.preventDefault();
        return event.originalEvent.dataTransfer.dropEffect = 'copy';
      }, this));
      this.element.bind('dragover', __bind(function(event) {
        if (this.previewing) {
          return;
        }
        event.preventDefault();
        return event.originalEvent.dataTransfer.dropEffect = 'copy';
      }, this));
      this.element.bind('drop', __bind(function(event) {
        if (this.previewing) {
          return;
        }
        if (Mercury.snippet) {
          event.preventDefault();
          this.focus();
          Mercury.Snippet.displayOptionsFor(Mercury.snippet);
        }
        if (event.originalEvent.dataTransfer.files.length) {
          event.preventDefault();
          this.focus();
          return Mercury.uploader(event.originalEvent.dataTransfer.files[0]);
        }
      }, this));
      this.element.focus(__bind(function() {
        if (this.previewing) {
          return;
        }
        Mercury.region = this;
        this.element.addClass('focus');
        return Mercury.trigger('region:focused', {
          region: this
        });
      }, this));
      this.element.keydown(__bind(function(event) {
        var end, lineText, number, selection, start, text;
        if (this.previewing) {
          return;
        }
        Mercury.changes = true;
        this.resize();
        switch (event.keyCode) {
          case 90:
            if (!event.metaKey) {
              return;
            }
            event.preventDefault();
            if (event.shiftKey) {
              this.execCommand('redo');
            } else {
              this.execCommand('undo');
            }
            return;
          case 13:
            selection = this.selection();
            text = this.element.val();
            start = text.lastIndexOf('\n', selection.start);
            end = text.indexOf('\n', selection.end);
            if (end < start) {
              end = text.length;
            }
            if (text[start] === '\n') {
              start = text.lastIndexOf('\n', selection.start - 1);
            }
            if (text[start + 1] === '-') {
              selection.replace('\n- ', false, true);
              event.preventDefault();
            }
            if (/\d/.test(text[start + 1])) {
              lineText = text.substring(start, end);
              if (/(\d+)\./.test(lineText)) {
                number = parseInt(RegExp.$1);
                selection.replace("\n" + (number += 1) + ". ", false, true);
                event.preventDefault();
              }
            }
            break;
          case 9:
            event.preventDefault();
            this.execCommand('insertHTML', {
              value: '	'
            });
        }
        if (event.metaKey) {
          switch (event.keyCode) {
            case 66:
              this.execCommand('bold');
              event.preventDefault();
              break;
            case 73:
              this.execCommand('italic');
              event.preventDefault();
              break;
            case 85:
              this.execCommand('underline');
              event.preventDefault();
          }
        }
        return this.pushHistory(event.keyCode);
      }, this));
      this.element.keyup(__bind(function() {
        if (this.previewing) {
          return;
        }
        return Mercury.trigger('region:update', {
          region: this
        });
      }, this));
      this.element.mouseup(__bind(function() {
        if (this.previewing) {
          return;
        }
        this.focus();
        return Mercury.trigger('region:focused', {
          region: this
        });
      }, this));
      return this.previewElement.click(__bind(function(event) {
        if (this.previewing) {
          return $(event.target).closest('a').attr('target', '_top');
        }
      }, this));
    };
    Markupable.prototype.content = function(value, filterSnippets) {
      if (value == null) {
        value = null;
      }
      if (filterSnippets == null) {
        filterSnippets = true;
      }
      if (value !== null) {
        if (jQuery.type(value) === 'string') {
          return this.element.val(value);
        } else {
          this.element.val(value.html);
          return this.selection().select(value.selection.start, value.selection.end);
        }
      } else {
        return this.element.val();
      }
    };
    Markupable.prototype.contentAndSelection = function() {
      return {
        html: this.content(null, false),
        selection: this.selection().serialize()
      };
    };
    Markupable.prototype.togglePreview = function() {
      var value;
      if (this.previewing) {
        this.previewElement.hide();
        this.element.show();
      } else {
        value = this.converter.makeHtml(this.element.val());
        this.previewElement.html(value);
        this.previewElement.show();
        this.element.hide();
      }
      return Markupable.__super__.togglePreview.apply(this, arguments);
    };
    Markupable.prototype.execCommand = function(action, options) {
      var handler;
      if (options == null) {
        options = {};
      }
      Markupable.__super__.execCommand.apply(this, arguments);
      if (handler = Mercury.Regions.Markupable.actions[action]) {
        handler.call(this, this.selection(), options);
      }
      return this.resize();
    };
    Markupable.prototype.pushHistory = function(keyCode) {
      var keyCodes, knownKeyCode, waitTime;
      keyCodes = [13, 46, 8];
      waitTime = 2.5;
      if (keyCode) {
        knownKeyCode = keyCodes.indexOf(keyCode);
      }
      clearTimeout(this.historyTimeout);
      if (knownKeyCode >= 0 && knownKeyCode !== this.lastKnownKeyCode) {
        this.history.push(this.contentAndSelection());
      } else if (keyCode) {
        this.historyTimeout = setTimeout((__bind(function() {
          return this.history.push(this.contentAndSelection());
        }, this)), waitTime * 1000);
      } else {
        this.history.push(this.contentAndSelection());
      }
      return this.lastKnownKeyCode = knownKeyCode;
    };
    Markupable.prototype.selection = function() {
      return new Mercury.Regions.Markupable.Selection(this.element);
    };
    Markupable.prototype.resize = function() {};
    Markupable.prototype.snippets = function() {};
    Markupable.actions = {
      undo: function() {
        return this.content(this.history.undo());
      },
      redo: function() {
        return this.content(this.history.redo());
      },
      insertHTML: function(selection, options) {
        var element;
        if (options.value.get && (element = options.value.get(0))) {
          options.value = jQuery('<div>').html(element).html();
        }
        return selection.replace(options.value, false, true);
      },
      insertImage: function(selection, options) {
        return selection.replace('![add alt text](' + encodeURI(options.value.src) + ')', true);
      },
      insertLink: function(selection, options) {
        return selection.replace("[" + options.value.content + "](" + options.value.attrs.href + " 'optional title')", true);
      },
      insertUnorderedList: function(selection) {
        return selection.addList('unordered');
      },
      insertOrderedList: function(selection) {
        return selection.addList('ordered');
      },
      style: function(selection, options) {
        return selection.wrap("<span class=\"" + options.value + "\">", '</span>');
      },
      formatblock: function(selection, options) {
        var wrapper, wrapperName, wrappers;
        wrappers = {
          h1: ['# ', ' #'],
          h2: ['## ', ' ##'],
          h3: ['### ', ' ###'],
          h4: ['#### ', ' ####'],
          h5: ['##### ', ' #####'],
          h6: ['###### ', ' ######'],
          pre: ['		', ''],
          blockquote: ['> ', ''],
          p: ['\n', '\n']
        };
        for (wrapperName in wrappers) {
          wrapper = wrappers[wrapperName];
          selection.unWrapLine("" + wrapper[0], "" + wrapper[1]);
        }
        if (options.value === 'blockquote') {
          Mercury.Regions.Markupable.actions.indent.call(this, selection, options);
          return;
        }
        return selection.wrapLine("" + wrappers[options.value][0], "" + wrappers[options.value][1]);
      },
      bold: function(selection) {
        return selection.wrap('**', '**');
      },
      italic: function(selection) {
        return selection.wrap('_', '_');
      },
      subscript: function(selection) {
        return selection.wrap('<sub>', '</sub>');
      },
      superscript: function(selection) {
        return selection.wrap('<sup>', '</sup>');
      },
      indent: function(selection) {
        return selection.wrapLine('> ', '', false, true);
      },
      outdent: function(selection) {
        return selection.unWrapLine('> ', '', false, true);
      },
      horizontalRule: function(selection) {
        return selection.replace('\n- - -\n');
      },
      insertSnippet: function(selection, options) {
        var snippet;
        snippet = options.value;
        return selection.replace(snippet.getText());
      }
    };
    return Markupable;
  })();
  Mercury.Regions.Markupable.Selection = (function() {
    function Selection(element) {
      this.element = element;
      this.el = this.element.get(0);
      this.getDetails();
    }
    Selection.prototype.serialize = function() {
      return {
        start: this.start,
        end: this.end
      };
    };
    Selection.prototype.getDetails = function() {
      this.length = this.el.selectionEnd - this.el.selectionStart;
      this.start = this.el.selectionStart;
      this.end = this.el.selectionEnd;
      return this.text = this.element.val().substr(this.start, this.length);
    };
    Selection.prototype.replace = function(text, select, placeCursor) {
      var changed, savedVal, val;
      if (select == null) {
        select = false;
      }
      if (placeCursor == null) {
        placeCursor = false;
      }
      this.getDetails();
      val = this.element.val();
      savedVal = this.element.val();
      this.element.val(val.substr(0, this.start) + text + val.substr(this.end, val.length));
      changed = this.element.val() !== savedVal;
      if (select) {
        this.select(this.start, this.start + text.length);
      }
      if (placeCursor) {
        this.select(this.start + text.length, this.start + text.length);
      }
      return changed;
    };
    Selection.prototype.select = function(start, end) {
      this.start = start;
      this.end = end;
      this.element.focus();
      this.el.selectionStart = this.start;
      this.el.selectionEnd = this.end;
      return this.getDetails();
    };
    Selection.prototype.wrap = function(left, right) {
      this.getDetails();
      this.deselectNewLines();
      this.replace(left + this.text + right, this.text !== '');
      if (this.text === '') {
        return this.select(this.start + left.length, this.start + left.length);
      }
    };
    Selection.prototype.wrapLine = function(left, right, selectAfter, reselect) {
      var end, savedSelection, start, text;
      if (selectAfter == null) {
        selectAfter = true;
      }
      if (reselect == null) {
        reselect = false;
      }
      this.getDetails();
      savedSelection = this.serialize();
      text = this.element.val();
      start = text.lastIndexOf('\n', this.start);
      end = text.indexOf('\n', this.end);
      if (end < start) {
        end = text.length;
      }
      if (text[start] === '\n') {
        start = text.lastIndexOf('\n', this.start - 1);
      }
      this.select(start + 1, end);
      this.replace(left + this.text + right, selectAfter);
      if (reselect) {
        return this.select(savedSelection.start + left.length, savedSelection.end + left.length);
      }
    };
    Selection.prototype.unWrapLine = function(left, right, selectAfter, reselect) {
      var changed, end, leftRegExp, rightRegExp, savedSelection, start, text;
      if (selectAfter == null) {
        selectAfter = true;
      }
      if (reselect == null) {
        reselect = false;
      }
      this.getDetails();
      savedSelection = this.serialize();
      text = this.element.val();
      start = text.lastIndexOf('\n', this.start);
      end = text.indexOf('\n', this.end);
      if (end < start) {
        end = text.length;
      }
      if (text[start] === '\n') {
        start = text.lastIndexOf('\n', this.start - 1);
      }
      this.select(start + 1, end);
      window.something = this.text;
      leftRegExp = new RegExp("^" + (left.regExpEscape()));
      rightRegExp = new RegExp("" + (right.regExpEscape()) + "$");
      changed = this.replace(this.text.replace(leftRegExp, '').replace(rightRegExp, ''), selectAfter);
      if (reselect && changed) {
        return this.select(savedSelection.start - left.length, savedSelection.end - left.length);
      }
    };
    Selection.prototype.addList = function(type) {
      var end, index, line, lines, start, text;
      text = this.element.val();
      start = text.lastIndexOf('\n', this.start);
      end = text.indexOf('\n', this.end);
      if (end < start) {
        end = text.length;
      }
      if (text[start] === '\n') {
        start = text.lastIndexOf('\n', this.start - 1);
      }
      this.select(start + 1, end);
      lines = this.text.split('\n');
      if (type === 'unordered') {
        return this.replace("- " + lines.join("\n- "), true);
      } else {
        return this.replace(((function() {
          var _len, _results;
          _results = [];
          for (index = 0, _len = lines.length; index < _len; index++) {
            line = lines[index];
            _results.push("" + (index + 1) + ". " + line);
          }
          return _results;
        })()).join('\n'), true);
      }
    };
    Selection.prototype.deselectNewLines = function() {
      var length, text;
      text = this.text;
      length = text.replace(/\n+$/g, '').length;
      return this.select(this.start, this.start + length);
    };
    Selection.prototype.placeMarker = function() {
      return this.wrap('[mercury-marker]', '[mercury-marker]');
    };
    Selection.prototype.removeMarker = function() {
      var end, start, val;
      val = this.element.val();
      start = val.indexOf('[mercury-marker]');
      if (!(start > -1)) {
        return;
      }
      end = val.indexOf('[mercury-marker]', start + 1) - '[mercury-marker]'.length;
      this.element.val(this.element.val().replace(/\[mercury-marker\]/g, ''));
      return this.select(start, end);
    };
    Selection.prototype.textContent = function() {
      return this.text;
    };
    return Selection;
  })();
}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.Regions.Snippetable = (function() {
    var type;
    __extends(Snippetable, Mercury.Region);
    type = 'snippetable';
    function Snippetable(element, window, options) {
      this.element = element;
      this.window = window;
      this.options = options != null ? options : {};
      Snippetable.__super__.constructor.apply(this, arguments);
      this.type = 'snippetable';
      this.makeSortable();
    }
    Snippetable.prototype.build = function() {
      if (this.element.css('minHeight') === '0px') {
        return this.element.css({
          minHeight: 20
        });
      }
    };
    Snippetable.prototype.bindEvents = function() {
      Snippetable.__super__.bindEvents.apply(this, arguments);
      Mercury.bind('unfocus:regions', __bind(function(event) {
        if (this.previewing) {
          return;
        }
        if (Mercury.region === this) {
          this.element.removeClass('focus');
          this.element.sortable('destroy');
          return Mercury.trigger('region:blurred', {
            region: this
          });
        }
      }, this));
      Mercury.bind('focus:window', __bind(function(event) {
        if (this.previewing) {
          return;
        }
        if (Mercury.region === this) {
          this.element.removeClass('focus');
          this.element.sortable('destroy');
          return Mercury.trigger('region:blurred', {
            region: this
          });
        }
      }, this));
      jQuery(this.document).keydown(__bind(function(event) {
        if (this.previewing) {
          return;
        }
        if (Mercury.region !== this) {
          return;
        }
        Mercury.changes = true;
        switch (event.keyCode) {
          case 90:
            if (!event.metaKey) {
              return;
            }
            event.preventDefault();
            if (event.shiftKey) {
              this.execCommand('redo');
            } else {
              this.execCommand('undo');
            }
        }
      }, this));
      this.element.mouseup(__bind(function() {
        if (this.previewing) {
          return;
        }
        this.focus();
        return Mercury.trigger('region:focused', {
          region: this
        });
      }, this));
      this.element.bind('dragover', __bind(function(event) {
        if (this.previewing) {
          return;
        }
        event.preventDefault();
        return event.originalEvent.dataTransfer.dropEffect = 'copy';
      }, this));
      return this.element.bind('drop', __bind(function(event) {
        if (this.previewing) {
          return;
        }
        if (!Mercury.snippet) {
          return;
        }
        this.focus();
        event.preventDefault();
        return Mercury.Snippet.displayOptionsFor(Mercury.snippet);
      }, this));
    };
    Snippetable.prototype.focus = function() {
      Mercury.region = this;
      this.makeSortable();
      return this.element.addClass('focus');
    };
    Snippetable.prototype.togglePreview = function() {
      if (this.previewing) {
        this.makeSortable();
      } else {
        this.element.sortable('destroy');
        this.element.removeClass('focus');
      }
      return Snippetable.__super__.togglePreview.apply(this, arguments);
    };
    Snippetable.prototype.execCommand = function(action, options) {
      var handler;
      if (options == null) {
        options = {};
      }
      Snippetable.__super__.execCommand.apply(this, arguments);
      if (handler = Mercury.Regions.Snippetable.actions[action]) {
        return handler.call(this, options);
      }
    };
    Snippetable.prototype.makeSortable = function() {
      return this.element.sortable('destroy').sortable({
        document: this.document,
        scroll: false,
        containment: 'parent',
        items: '.mercury-snippet',
        opacity: 0.4,
        revert: 100,
        tolerance: 'pointer',
        beforeStop: __bind(function() {
          Mercury.trigger('hide:toolbar', {
            type: 'snippet',
            immediately: true
          });
          return true;
        }, this),
        stop: __bind(function() {
          setTimeout((__bind(function() {
            return this.pushHistory();
          }, this)), 100);
          return true;
        }, this)
      });
    };
    Snippetable.actions = {
      undo: function() {
        return this.content(this.history.undo());
      },
      redo: function() {
        return this.content(this.history.redo());
      },
      insertSnippet: function(options) {
        var existing, snippet;
        snippet = options.value;
        if ((existing = this.element.find("[data-snippet=" + snippet.identity + "]")).length) {
          return existing.replaceWith(snippet.getHTML(this.document, __bind(function() {
            return this.pushHistory();
          }, this)));
        } else {
          return this.element.append(snippet.getHTML(this.document, __bind(function() {
            return this.pushHistory();
          }, this)));
        }
      },
      editSnippet: function() {
        var snippet;
        if (!this.snippet) {
          return;
        }
        snippet = Mercury.Snippet.find(this.snippet.data('snippet'));
        return snippet.displayOptions();
      },
      removeSnippet: function() {
        if (this.snippet) {
          this.snippet.remove();
        }
        return Mercury.trigger('hide:toolbar', {
          type: 'snippet',
          immediately: true
        });
      }
    };
    return Snippetable;
  })();
}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.dialogHandlers.backColor = function() {
    return this.element.find('.picker, .last-picked').mousedown(__bind(function(event) {
      var color;
      color = jQuery(event.target).css('background-color');
      this.element.find('.last-picked').css({
        background: color
      });
      this.button.css({
        backgroundColor: color
      });
      return Mercury.trigger('action', {
        action: 'backColor',
        value: color
      });
    }, this));
  };
}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.dialogHandlers.foreColor = function() {
    return this.element.find('.picker, .last-picked').mousedown(__bind(function(event) {
      var color;
      color = jQuery(event.target).css('background-color');
      this.element.find('.last-picked').css({
        background: color
      });
      this.button.css({
        backgroundColor: color
      });
      return Mercury.trigger('action', {
        action: 'foreColor',
        value: color
      });
    }, this));
  };
}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.dialogHandlers.formatblock = function() {
    return this.element.find('[data-tag]').click(__bind(function(event) {
      var tag;
      tag = jQuery(event.target).data('tag');
      return Mercury.trigger('action', {
        action: 'formatblock',
        value: tag
      });
    }, this));
  };
}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.dialogHandlers.snippetPanel = function() {
    this.element.find('input.filter').keyup(__bind(function() {
      var snippet, value, _i, _len, _ref, _results;
      value = this.element.find('input.filter').val();
      _ref = this.element.find('li[data-filter]');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        snippet = _ref[_i];
        _results.push(LiquidMetal.score(jQuery(snippet).data('filter'), value) === 0 ? jQuery(snippet).hide() : jQuery(snippet).show());
      }
      return _results;
    }, this));
    return this.element.find('img[data-snippet]').bind('dragstart', function(event) {
      return Mercury.snippet = jQuery(this).data('snippet');
    });
  };
}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.dialogHandlers.style = function() {
    return this.element.find('[data-class]').click(__bind(function(event) {
      var className;
      className = jQuery(event.target).data('class');
      return Mercury.trigger('action', {
        action: 'style',
        value: className
      });
    }, this));
  };
}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.modalHandlers.htmlEditor = function() {
    this.element.find('textarea').val(Mercury.region.content(null, true, false));
    return this.element.find('form').submit(__bind(function(event) {
      var value;
      event.preventDefault();
      value = this.element.find('textarea').val().replace(/\n/g, '');
      Mercury.trigger('action', {
        action: 'replaceHTML',
        value: value
      });
      return this.hide();
    }, this));
  };
}).call(this);
(function() {
  this.Mercury.modalHandlers.insertCharacter = function() {
    return this.element.find('.character').click(function() {
      Mercury.trigger('action', {
        action: 'insertHTML',
        value: "&" + (jQuery(this).attr('data-entity')) + ";"
      });
      return Mercury.modal.hide();
    });
  };
}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.modalHandlers.insertLink = function() {
    var bookmarkSelect, container, existingLink, href, link, newBookmarkInput, selection, _i, _len, _ref;
    this.element.find('label input').click(function(event) {
      return jQuery(this).closest('label').next('.selectable').focus();
    });
    this.element.find('.selectable').focus(function() {
      return jQuery(this).prev('label').find('input[type=radio]').prop("checked", true);
    });
    this.element.find('#link_target').change(__bind(function() {
      this.element.find(".link-target-options").hide();
      this.element.find("#" + (this.element.find('#link_target').val()) + "_options").show();
      return this.resize(true);
    }, this));
    bookmarkSelect = this.element.find('#link_existing_bookmark');
    _ref = jQuery('a[name]', window.mercuryInstance.document);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      link = _ref[_i];
      bookmarkSelect.append(jQuery('<option>', {
        value: jQuery(link).attr('name')
      }).text(jQuery(link).text()));
    }
    if (Mercury.region && Mercury.region.selection) {
      selection = Mercury.region.selection();
      if (selection && selection.commonAncestor) {
        container = selection.commonAncestor(true).closest('a');
      }
      if (container && container.length) {
        existingLink = container;
        this.element.find('#link_text_container').hide();
        if (container.attr('href') && container.attr('href').indexOf('#') === 0) {
          bookmarkSelect.val(container.attr('href').replace(/[^#]*#/, ''));
          bookmarkSelect.prev('label').find('input[type=radio]').prop("checked", true);
        } else {
          this.element.find('#link_external_url').val(container.attr('href'));
        }
        if (container.attr('name')) {
          newBookmarkInput = this.element.find('#link_new_bookmark');
          newBookmarkInput.val(container.attr('name'));
          newBookmarkInput.prev('label').find('input[type=radio]').prop("checked", true);
        }
        if (container.attr('target')) {
          this.element.find('#link_target').val(container.attr('target'));
        }
        if (container.attr('href') && container.attr('href').indexOf('javascript:void') === 0) {
          href = container.attr('href');
          this.element.find('#link_external_url').val(href.match(/window.open\('([^']+)',/)[1]);
          this.element.find('#link_target').val('popup');
          this.element.find('#link_popup_width').val(href.match(/width=(\d+),/)[1]);
          this.element.find('#link_popup_height').val(href.match(/height=(\d+),/)[1]);
          this.element.find('#popup_options').show();
        }
      }
      if (selection.textContent) {
        this.element.find('#link_text').val(selection.textContent());
      }
    }
    return this.element.find('form').submit(__bind(function(event) {
      var args, attrs, content, target, type, value;
      event.preventDefault();
      content = this.element.find('#link_text').val();
      target = this.element.find('#link_target').val();
      type = this.element.find('input[name=link_type]:checked').val();
      switch (type) {
        case 'existing_bookmark':
          attrs = {
            href: "#" + (this.element.find('#link_existing_bookmark').val())
          };
          break;
        case 'new_bookmark':
          attrs = {
            name: "" + (this.element.find('#link_new_bookmark').val())
          };
          break;
        default:
          attrs = {
            href: this.element.find("#link_" + type).val()
          };
      }
      switch (target) {
        case 'popup':
          args = {
            width: parseInt(this.element.find('#link_popup_width').val()) || 500,
            height: parseInt(this.element.find('#link_popup_height').val()) || 500,
            menubar: 'no',
            toolbar: 'no'
          };
          attrs['href'] = "javascript:void(window.open('" + attrs['href'] + "', 'popup_window', '" + (jQuery.param(args).replace(/&/g, ',')) + "'))";
          break;
        default:
          if (target) {
            attrs['target'] = target;
          }
      }
      value = {
        tagName: 'a',
        attrs: attrs,
        content: content
      };
      if (existingLink) {
        Mercury.trigger('action', {
          action: 'replaceLink',
          value: value,
          node: existingLink.get(0)
        });
      } else {
        Mercury.trigger('action', {
          action: 'insertLink',
          value: value
        });
      }
      return this.hide();
    }, this));
  };
}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.modalHandlers.insertMedia = function() {
    var iframe, image, selection, src;
    this.element.find('label input').click(function(event) {
      return jQuery(this).closest('label').next('.selectable').focus();
    });
    this.element.find('.selectable').focus(__bind(function(event) {
      var element;
      element = jQuery(event.target);
      element.prev('label').find('input[type=radio]').prop("checked", true);
      this.element.find(".media-options").hide();
      this.element.find("#" + (element.attr('id').replace('media_', ''))).show();
      return this.resize(true);
    }, this));
    if (Mercury.region && Mercury.region.selection) {
      selection = Mercury.region.selection();
      if (selection.is && (image = selection.is('img'))) {
        this.element.find('#media_image_url').val(image.attr('src'));
        this.element.find('#media_image_alignment').val(image.attr('align'));
      }
      if (selection.is && (iframe = selection.is('iframe'))) {
        src = iframe.attr('src');
        if (src.indexOf('http://www.youtube.com') > -1) {
          this.element.find('#media_youtube_url').val("http://youtu.be/" + (src.match(/\/embed\/(\w+)/)[1]));
          this.element.find('#media_youtube_width').val(iframe.width());
          this.element.find('#media_youtube_height').val(iframe.height());
          this.element.find('#media_youtube_url').focus();
        } else if (src.indexOf('http://player.vimeo.com') > -1) {
          this.element.find('#media_vimeo_url').val("http://vimeo.com/" + (src.match(/\/video\/(\w+)/)[1]));
          this.element.find('#media_vimeo_width').val(iframe.width());
          this.element.find('#media_vimeo_height').val(iframe.height());
          this.element.find('#media_vimeo_url').focus();
        }
      }
    }
    return this.element.find('form').submit(__bind(function(event) {
      var alignment, attrs, code, type, value;
      event.preventDefault();
      type = this.element.find('input[name=media_type]:checked').val();
      switch (type) {
        case 'image_url':
          attrs = {
            src: this.element.find('#media_image_url').val()
          };
          if (alignment = this.element.find('#media_image_alignment').val()) {
            attrs['align'] = alignment;
          }
          Mercury.trigger('action', {
            action: 'insertImage',
            value: attrs
          });
          break;
        case 'youtube_url':
          code = this.element.find('#media_youtube_url').val().replace('http://youtu.be/', '');
          value = jQuery('<iframe>', {
            width: this.element.find('#media_youtube_width').val() || 560,
            height: this.element.find('#media_youtube_height').val() || 349,
            src: "http://www.youtube.com/embed/" + code + "?wmode=transparent",
            frameborder: 0,
            allowfullscreen: 'true'
          });
          Mercury.trigger('action', {
            action: 'insertHTML',
            value: value
          });
          break;
        case 'vimeo_url':
          code = this.element.find('#media_vimeo_url').val().replace('http://vimeo.com/', '');
          value = jQuery('<iframe>', {
            width: this.element.find('#media_vimeo_width').val() || 400,
            height: this.element.find('#media_vimeo_height').val() || 225,
            src: "http://player.vimeo.com/video/" + code + "?title=1&byline=1&portrait=0&color=ffffff",
            frameborder: 0
          });
          Mercury.trigger('action', {
            action: 'insertHTML',
            value: value
          });
      }
      return this.hide();
    }, this));
  };
}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.modalHandlers.insertSnippet = function() {
    return this.element.find('form').submit(__bind(function(event) {
      var serializedForm, snippet;
      event.preventDefault();
      serializedForm = this.element.find('form').serializeObject();
      if (Mercury.snippet) {
        snippet = Mercury.snippet;
        snippet.setOptions(serializedForm);
        Mercury.snippet = null;
      } else {
        snippet = Mercury.Snippet.create(this.options.snippetName, serializedForm);
      }
      Mercury.trigger('action', {
        action: 'insertSnippet',
        value: snippet
      });
      return this.hide();
    }, this));
  };
}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  this.Mercury.modalHandlers.insertTable = function() {
    var firstCell, table;
    table = this.element.find('#table_display table');
    table.click(__bind(function(event) {
      var cell;
      cell = jQuery(event.target);
      table = cell.closest('table');
      table.find('.selected').removeClass('selected');
      cell.addClass('selected');
      return Mercury.tableEditor(table, cell, '&nbsp;');
    }, this));
    firstCell = table.find('td, th').first();
    firstCell.addClass('selected');
    Mercury.tableEditor(table, firstCell, '&nbsp;');
    this.element.find('input.action').click(__bind(function(event) {
      var action;
      action = jQuery(event.target).attr('name');
      switch (action) {
        case 'insertRowBefore':
          return Mercury.tableEditor.addRow('before');
        case 'insertRowAfter':
          return Mercury.tableEditor.addRow('after');
        case 'deleteRow':
          return Mercury.tableEditor.removeRow();
        case 'insertColumnBefore':
          return Mercury.tableEditor.addColumn('before');
        case 'insertColumnAfter':
          return Mercury.tableEditor.addColumn('after');
        case 'deleteColumn':
          return Mercury.tableEditor.removeColumn();
        case 'increaseColspan':
          return Mercury.tableEditor.increaseColspan();
        case 'decreaseColspan':
          return Mercury.tableEditor.decreaseColspan();
        case 'increaseRowspan':
          return Mercury.tableEditor.increaseRowspan();
        case 'decreaseRowspan':
          return Mercury.tableEditor.decreaseRowspan();
      }
    }, this));
    this.element.find('#table_alignment').change(__bind(function() {
      return table.attr({
        align: this.element.find('#table_alignment').val()
      });
    }, this));
    this.element.find('#table_border').keyup(__bind(function() {
      return table.attr({
        border: parseInt(this.element.find('#table_border').val())
      });
    }, this));
    this.element.find('#table_spacing').keyup(__bind(function() {
      return table.attr({
        cellspacing: parseInt(this.element.find('#table_spacing').val())
      });
    }, this));
    return this.element.find('form').submit(__bind(function(event) {
      var html, value;
      event.preventDefault();
      table.find('.selected').removeClass('selected');
      table.find('td, th').html('&nbsp;');
      html = jQuery('<div>').html(table).html();
      value = html.replace(/^\s+|\n/gm, '').replace(/(<\/.*?>|<table.*?>|<tbody>|<tr>)/g, '$1\n');
      Mercury.trigger('action', {
        action: 'insertHTML',
        value: value
      });
      return this.hide();
    }, this));
  };
}).call(this);
(function() {
  this.Mercury.loaded = true;
  $(function() {
    if (window.Mercury.config.editor === 'iframe') {
      return new window.Mercury.IframeEditor();
    } else {
      return new window.Mercury.InlineEditor();
    }
  });
}).call(this);
