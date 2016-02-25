var app = app || {};

(function () {
  app.ZombieModel = function() {
    this.dudelings = [];
    this.listeners = [];
  }

  app.ZombieModel.prototype.subscribe = function (onChange) {
    this.listeners.push(onChange);
  }

  app.ZombieModel.prototype.publish = function () {
    this.listeners.forEach( function (callback) { callback(); });
  }

  app.ZombieModel.prototype.add = function (text) {
    this.dudelings.push(new app.Zombie(text));
    this.publish();
  }

  app.ZombieModel.prototype.remove = function (item) {
    this.dudelings = this.dudelings.filter(function (zombie) { return item !== zombie.id });
    this.publish();
  }

  app.Zombie = function(name) {
    this.name = name;
    this.id = Math.abs(Math.floor(Math.random() * (1 - 100 + 1)) + 1)
    this.complete = false;
    this.portrait = getPortrait();

  }

  var portraits = {};

  function getPortrait() {
    var id = Math.abs(Math.floor(Math.random() * (1 - 9 + 1)) + 1);

    if (portraits && Object.keys(portraits).length === 9) { portraits = {} };

    if (portraits[id]) { return getPortrait(); }

    portraits[id] = id;

    return 'portrait-skulls portrait-skulls--' + id;
  }

})();

