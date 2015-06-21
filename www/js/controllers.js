angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('TodosCtrl', function($scope, $stateParams, $location, $ionicPopup, Todos, Category) {
  $scope.remove = function(todo) {
    $ionicPopup.confirm({
      title: 'Confirm',
      template: 'Are you sure you want to delete it?'
    }).then(function(res) {
      if(res) {
        todo.destroy();
        $scope.fetchAllTodos($stateParams.categoryId);
      }
    });
  };
  $scope.doneToggle = function(todo) {
    if (todo.done) {
      todo.done = false;
    } else {
      todo.done = true;
    }
    todo.save();
    $scope.fetchAllTodos($stateParams.categoryId);
  };
  $scope.add = function() {
    $scope.newTodo.save();
    $scope.fetchAllTodos($stateParams.categoryId);
  };
  $scope.newTodo = function() {
    $location.path('tab/todo/')
  };
  $scope.fetchAllTodos = function(categoryId) {
    if (!categoryId) {
      categoryId = $stateParams.categoryId;
    }
    $scope.todos = null;
    return Todos.query({
      'where':{
        'category': {
          __type: "Pointer", 
          className: "Category", 
          objectId: categoryId 
        }
      }
    }).then(function(todos) {
      $scope.$broadcast('scroll.refreshComplete');
      return $scope.todos = todos;
    });
  };
  $scope.fetchAllTodos($stateParams.categoryId);
})

.controller('TodosDetailCtrl', function($scope, $stateParams, $ionicHistory, $ionicPopup, Todos, Category) {
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
  $scope.findCategories = function() {
    return Category.query()
    .then(function(categories) {
      return $scope.categories = categories;
    });
  };
  $scope.saveTodo = function() {
    $scope.todo.category = $scope.category;
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
  $scope.findCategory = function(categoryId) {
    $scope.category = null;
    return Category.query({
      'where':{
        'objectId':categoryId
      }
    }).then(function(categories) {
      if (categories[0]) {
        $scope.category = categories[0];
      }
      return $scope.category;
    });
  };
  $scope.categoryChanged = function(categoryId) {
    $scope.findCategory(categoryId);
  };
  $scope.findCategories();
  $scope.findTodo($stateParams.todoId);
})

.controller('CategoriesCtrl', function($scope, $location, $ionicPopup, Category) {
  $scope.remove = function(category) {
    $ionicPopup.confirm({
      title: 'Confirm',
      template: 'Are you sure you want to delete it?'
    }).then(function(res) {
      if(res) {
        category.destroy();
        $scope.fetchAllCategories();
      }
    });
  };
  $scope.add = function() {
    $scope.newCategory.save();
    $scope.fetchAllCategories();
  };
  $scope.newCategory = function() {
    $location.path('tab/category/')
  };
  $scope.edit = function(category) {
    $location.path('tab/category/' + category.objectId)
  };
  $scope.fetchAllCategories = function() {
    $scope.categories = null;
    return Category.query()
    .then(function(categories) {
      $scope.$broadcast('scroll.refreshComplete');
      return $scope.categories = categories;
    });
  };
  $scope.fetchAllCategories();
})

.controller('CategoryDetailCtrl', function($scope, $stateParams, $ionicHistory, $ionicPopup, Category) {
  $scope.findCategory = function(categoryId) {
    return Category.query({
      'where':{
        'objectId':categoryId
      }
    }).then(function(categories) {
      if (categories[0]) {
        $scope.category = categories[0];
      } else {
        $scope.category = new Category();
      }
      return $scope.category;
    });
  };
  $scope.saveCategory = function() {
    if (!$scope.category.name) {
      $ionicPopup.alert({
         title: 'Oops...',
         template: 'You must provide a name!'
       });
    } else {
      $scope.category.save();
      $ionicHistory.goBack();
    }
  };
  $scope.findCategory($stateParams.categoryId);
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
