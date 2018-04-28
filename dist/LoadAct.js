'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoadAct = function () {
  function LoadAct() {
    var script = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var data = arguments[1];
    var key = arguments[2];

    _classCallCheck(this, LoadAct);

    this.js = [];
    this.css = [];
    this.script = script;
    this.data = data;
    this.key = key;
  }

  _createClass(LoadAct, [{
    key: '_initScript',
    value: function _initScript() {
      var _this = this;

      this.script.map(function (s) {
        var type = s.split('.')[s.split('.').length - 1];
        if (type === 'js') {
          _this.js.push(s);
        } else if (type === 'css') {
          _this.css.push(s);
        }
      });
    }
  }, {
    key: '_sortConfigData',
    value: function _sortConfigData() {
      var dataConfig = {};
      var dataTree = function dataTree(tree) {
        var config = {};
        tree.map(function (item) {
          if (item.children) {
            config[item.name] = {};
            config[item.name] = dataTree(item.children);
          } else {
            config[item.name] = item.value;
          }
        });
        return config;
      };
      this.data = dataTree(this.data);
    }
  }, {
    key: '_loadJs',
    value: function _loadJs() {
      this.js.map(function (src) {
        var newscript = document.createElement('script');
        newscript.setAttribute('type', 'text/javascript');
        newscript.setAttribute('src', src);
        document.body.appendChild(newscript);
      });
    }
  }, {
    key: '_loadCss',
    value: function _loadCss() {
      this.css.map(function (src) {
        var newlink = document.createElement('link');
        newlink.setAttribute('rel', 'stylesheet');
        newlink.setAttribute('href', src);
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(newlink);
      });
    }
  }, {
    key: '_loadJson',
    value: function _loadJson() {
      window.dataConfig ? '' : window.dataConfig = {};
      if (this.data && _typeof(this.data) === 'object') {
        window.dataConfig[this.key] = this.data;
      }
    }
  }, {
    key: 'getJson',
    value: function getJson() {
      var data = [];
      if (window.dataConfig && window.dataConfig[this.key]) {
        data = window.dataConfig[this.key];
      }
      return data;
    }
  }, {
    key: 'init',
    value: function init() {
      this._initScript();
      this._sortConfigData();
      this._loadJson();
      this._loadCss();
      this._loadJs();
    }
  }]);

  return LoadAct;
}();

module.exports = LoadAct;