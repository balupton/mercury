(function() {
  var mercuryBaseUrl, mercuryBuildr, mercuryEl, scripts, styles, _ref;
  scripts = ['scripts/mercury.coffee', 'scripts/native_extensions.coffee', 'scripts/jquery_extensions.coffee', 'scripts/editor.coffee', 'scripts/editors/iframe.coffee', 'scripts/editors/inline.coffee', 'scripts/history_buffer.coffee', 'scripts/table_editor.coffee', 'scripts/dialog.coffee', 'scripts/palette.coffee', 'scripts/select.coffee', 'scripts/panel.coffee', 'scripts/modal.coffee', 'scripts/statusbar.coffee', 'scripts/toolbar.coffee', 'scripts/toolbar.button.coffee', 'scripts/toolbar.button_group.coffee', 'scripts/toolbar.expander.coffee', 'scripts/tooltip.coffee', 'scripts/snippet.coffee', 'scripts/snippet_toolbar.coffee', 'scripts/region.coffee', 'scripts/uploader.coffee', 'scripts/regions/basic.coffee', 'scripts/regions/plain.coffee', 'scripts/regions/rich.coffee', 'scripts/regions/markupable.coffee', 'scripts/regions/snippetable.coffee', 'scripts/dialogs/backcolor.coffee', 'scripts/dialogs/forecolor.coffee', 'scripts/dialogs/formatblock.coffee', 'scripts/dialogs/objectspanel.coffee', 'scripts/dialogs/style.coffee', 'scripts/modals/htmleditor.coffee', 'scripts/modals/insertcharacter.coffee', 'scripts/modals/insertlink.coffee', 'scripts/modals/insertmedia.coffee', 'scripts/modals/insertsnippet.coffee', 'scripts/modals/inserttable.coffee', 'scripts/loaded.coffee'];
  styles = ['styles/mercury.less', 'styles/dialog.less', 'styles/modal.less', 'styles/statusbar.less', 'styles/toolbar.less', 'styles/tooltip.less', 'styles/uploader.less'];
    if ((_ref = window.Buildr) != null) {
    _ref;
  } else {
    window.Buildr = (function() {
      _Class.prototype.scripts = null;
      _Class.prototype.styles = null;
      _Class.prototype.baseUrl = null;
      _Class.prototype.appendEl = null;
      _Class.prototype.beforeEl = null;
      _Class.prototype.serverCompilation = null;
      function _Class(_arg) {
        var appendEl, baseUrl, beforeEl, scripts, serverCompilation, styles;
        scripts = _arg.scripts, styles = _arg.styles, appendEl = _arg.appendEl, baseUrl = _arg.baseUrl, beforeEl = _arg.beforeEl, serverCompilation = _arg.serverCompilation;
        this.scripts = scripts || [];
        this.styles = styles || [];
        this.appendEl = appendEl || document.head || document.getElementsByTagName('head')[0];
        this.baseUrl = baseUrl || this.getRootUrl();
        this.beforeEl = beforeEl || document.head.lastChild;
        this.serverCompilation = serverCompilation || false;
      }
      _Class.prototype.getRootUrl = function() {
        var host, protocol, rootUrl;
        host = document.location.hostname || document.location.host;
        protocol = document.location.protocol;
        rootUrl = "" + protocol + "//" + host;
        if (document.location.port) {
          rootUrl += ':' + document.location.port;
        }
        rootUrl += '/';
        return rootUrl;
      };
      _Class.prototype.load = function(next) {
        var me;
        me = this;
        return me.loadStyle(function() {
          return me.loadScript(function() {
            if (next) {
              return next();
            }
          });
        });
      };
      _Class.prototype.loadScriptIndex = 0;
      _Class.prototype.loadScript = function(next) {
        var me, scriptEl, scriptLoaded, scriptSrc;
        me = this;
        scriptSrc = this.baseUrl + this.scripts[this.loadScriptIndex];
        if (this.serverCompilation != null) {
          scriptSrc += '?js';
        }
        scriptLoaded = function() {
          if ((this.readyState != null) && this.readyState !== 'complete') {
            return;
          }
          if ((this.src != null) && this.src !== scriptSrc) {
            return;
          }
          ++me.loadScriptIndex;
          return me.loadScript(next);
        };
        if (this.scripts[this.loadScriptIndex] != null) {
          scriptEl = document.createElement('script');
          scriptEl.src = scriptSrc;
          if (/\.coffee$/.test(scriptSrc)) {
            scriptEl.type = 'text/coffeescript';
          } else {
            scriptEl.onreadystatechange = scriptLoaded;
            scriptEl.onload = scriptLoaded;
            scriptEl.onerror = scriptLoaded;
          }
          this.appendEl.appendChild(scriptEl, this.beforeEl.nextSibling);
          this.beforeEl = scriptEl;
          if (/\.coffee$/.test(scriptSrc)) {
            scriptLoaded();
          }
        } else {
          next();
        }
        return true;
      };
      _Class.prototype.loadStyleIndex = 0;
      _Class.prototype.loadStyle = function(next) {
        var me, styleEl, styleHref, styleLoaded;
        me = this;
        styleHref = this.baseUrl + this.styles[this.loadStyleIndex];
        if (this.serverCompilation != null) {
          styleHref += '?css';
        }
        styleLoaded = function() {
          ++me.loadStyleIndex;
          return me.loadStyle(next);
        };
        if (this.styles[this.loadStyleIndex] != null) {
          styleEl = document.createElement('link');
          styleEl.href = styleHref;
          styleEl.media = 'screen';
          if (/\.less$/.test(styleHref)) {
            styleEl.rel = 'stylesheet/less';
          } else {
            styleEl.rel = 'stylesheet';
          }
          styleEl.type = 'text/css';
          this.appendEl.insertBefore(styleEl, this.beforeEl.nextSibling);
          this.beforeEl = styleEl;
          styleLoaded();
        } else {
          next();
        }
        return true;
      };
      return _Class;
    })();
  };
  if ((window.top.Mercury != null) && (window.top.Mercury.loaded != null)) {
    return;
  }
  mercuryEl = document.getElementById('mercury-include');
  mercuryBaseUrl = mercuryEl.src.replace(/\?.*$/, '').replace(/dev\.js$/, '').replace(/\/+$/, '') + '/';
  mercuryBuildr = new window.Buildr({
    baseUrl: mercuryBaseUrl,
    beforeEl: mercuryEl,
    serverCompilation: window.serverCompilation || false,
    scripts: scripts,
    styles: styles
  });
  mercuryBuildr.load();
}).call(this);
