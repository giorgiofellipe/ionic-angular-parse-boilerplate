angular.module('magaperolas.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('TodosCtrl', function($scope, $location, Todos) {
  $scope.remove = function(todo) {
    todo.destroy();
    $scope.fetchAllTodos();
  };
  $scope.doneToggle = function(todo) {
    if (todo.done) {
      todo.done = false;
    } else {
      todo.done = true;
    }
    todo.save();
    $scope.fetchAllTodos();
  };
  $scope.add = function() {
    $scope.newTodo.save();
    $scope.fetchAllTodos();
  };
  $scope.newTodo = function() {
    $location.path('tab/todos/')
  };
  $scope.fetchAllTodos = function() {
    return Todos.query().then(function(todos) {
      $scope.$broadcast('scroll.refreshComplete');
      return $scope.todos = todos;
    });
  };
  $scope.fetchAllTodos();
})

.controller('TodosDetailCtrl', function($scope, $stateParams, $ionicHistory, $ionicPopup, Todos) {
  $scope.findTodo = function(todoId) {
    return Todos.query({
      'where':{
        'objectId':todoId
      }
    }).then(function(todos) {
      if (todos[0]) {
        $scope.todo = todos[0];
      } else {
        $scope.todo = new Todos();
      }
      return $scope.todo;
    });
  };
  $scope.saveTodo = function() {
    if (!$scope.todo.title) {
      $ionicPopup.alert({
         title: 'Oops...',
         template: 'You must provide a title!'
       });
    } else {
      $scope.todo.save();
      $ionicHistory.goBack();
    }
  };
  $scope.findTodo($stateParams.todoId);
})

.controller('SettingsCtrl', function($scope, Settings) {
  $scope.save = function() {
    $scope.settings.save();
  };
  $scope.fetchSettings = function() {
    return Settings.query({
        'limit': 1,
        'order': '-createdAt'
      }).then(function(settings) {
        $scope.$broadcast('scroll.refreshComplete');
        if (settings[0]) {
          $scope.settings = settings[0];
        } else {
          $scope.settings = new Settings();
        }
        return $scope.settings;
      });
  };
  $scope.fetchSettings();
});
