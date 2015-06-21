var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic.service.core', 'ionic.service.analytics', 'magaperolas.controllers', 'magaperolas.services', 'Parse'])

.run(['$ionicPlatform', '$ionicAnalytics', function($ionicPlatform, $ionicAnalytics ) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
  //go to https://github.com/driftyco/ionic-starter-analytics to see another example
  //analytics docs http://docs.ionic.io/v1.0/docs/analytics-from-scratch
 $ionicAnalytics.register();
}])

.config(function($stateProvider, $urlRouterProvider, $ionicAppProvider, ParseProvider) {

  $ionicAppProvider.identify({
      // The App ID for the server
      app_id: 'APP_ID',
      // The API key all services will use for this app
      api_key: 'API_KEY'
    })

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

    

  .state('tab.categories', {
      cache: false,
      url: '/categories',
      views: {
        'tab-categories': {
          templateUrl: 'templates/tab-categories.html',
          controller: 'CategoriesCtrl'
        }
      }
    })
    .state('tab.category-detail', {
      url: '/category/:categoryId',
      views: {
        'tab-categories': {
          templateUrl: 'templates/category-detail.html',
          controller: 'CategoryDetailCtrl'
        }
      }
    })
    .state('tab.todos', {
      cache: false,
      url: '/todos/:categoryId',
      views: {
        'tab-categories': {
          templateUrl: 'templates/tab-todos.html',
          controller: 'TodosCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/todo/:todoId',
      views: {
        'tab-categories': {
          templateUrl: 'templates/todos-detail.html',
          controller: 'TodosDetailCtrl'
        }
      }
    })

  .state('tab.settings', {
    cache: false,
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');
  // initialize Parse
  return ParseProvider.initialize(
    "Bj8aRVj5RR7bSuWDGDpyVU9XuiiWcTZ8CLpxZSLb", //App ID
    "TB4nrK6kuU8Ab8lEbqgm1iaOUIseOlQbjiKk0waH"  //REST API Key
  );
});
