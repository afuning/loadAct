class LoadAct {
  constructor (script = [], data, key) {
    this.js = [];
    this.css = [];
    this.script = script;
    this.data = data;
    this.key = key;
  }
  _initScript () {
    this.script.map(s => {
      const type = s.split('.')[s.split('.').length - 1];
      if (type === 'js') {
        this.js.push(s);
      } else if (type === 'css') {
        this.css.push(s);
      }
    });
  }
  _sortConfigData () {
    let dataConfig = {};
    const dataTree = (tree) => {
      let config = {};
      tree.map(item => {
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
  _loadJs () {
    this.js.map(src => {
      var newscript = document.createElement('script');
      newscript.setAttribute('type', 'text/javascript');
      newscript.setAttribute('src', src);
      document.body.appendChild(newscript);
    });
  }
  _loadCss () {
    this.css.map(src => {
      var newlink = document.createElement('link');
      newlink.setAttribute('rel', 'stylesheet');
      newlink.setAttribute('href', src);
      var head = document.getElementsByTagName('head')[0];
      head.appendChild(newlink);
    });
  }
  _loadJson () {
    window.dataConfig ? '' : window.dataConfig = {};
    if (this.data && typeof this.data === 'object') {
      window.dataConfig[this.key] = this.data;
    }
  }
  getJson () {
    let data = [];
    if (window.dataConfig && window.dataConfig[this.key]) {
      data = window.dataConfig[this.key];
    }
    return data;
  }
  init () {
    this._initScript();
    this._sortConfigData();
    this._loadJson();
    this._loadCss();
    this._loadJs();
  }
}
module.exports = LoadAct;