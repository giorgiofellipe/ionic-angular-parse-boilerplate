angular.module('magaperolas.services', ['Parse'])

.factory('Todos', function(Parse) {
  var Todos;
  return Todos = (function(_super) {
    __extends(Todos, _super);

    function Todos() {
      return Todos.__super__.constructor.apply(this, arguments);
    }

    Todos.configure("Todos", "title", "done");

    return Todos;

  })(Parse.Model);
})

.factory('Settings', function(Parse) {
  var Settings;
  return Settings = (function(_super) {
    __extends(Settings, _super);

    function Settings() {
      return Settings.__super__.constructor.apply(this, arguments);
    }

    Settings.configure("Settings", "showAlreadyDone");

    return Settings;

  })(Parse.Model);
});