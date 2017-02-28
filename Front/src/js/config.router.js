(function () {
  'use strict';

  angular.module('app')
    .run(['$rootScope', '$state', '$stateParams', '$auth', run])
    .config(['$stateProvider', '$urlRouterProvider', config]);

  function run($rootScope, $state, $stateParams, $auth) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.$on('$stateChangeStart', function (ev, next) {
      var current_name = $state.current.name;
      console.log("state change start, current:", current_name, "change to:", next.name);

      if (!next.data)
        return;

      if (next.data.needAuth && !$auth.isAuthenticated()) {
        if (!current_name || current_name == "access.signup") {
          // landing or in signup
          $state.go('access.signin');
        } else {
          if (current_name != 'access.signin') {
            $rootScope.$broadcast('event:auth-loginRequired');
          }
          // hide the loading progress bar
          $rootScope.$broadcast('$stateChangeSuccess');
        }
        ev.preventDefault();
        return;
      }

      if (next.data.needRole && next.data.needRole.indexOf($rootScope.currentUser.role) == -1) {
        if (!current_name)
          $state.go('app.offernetwork');
        $rootScope.$broadcast('event:auth-forbidden');
        ev.preventDefault();
        return;
      }
    });
  }

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/app/report');

    $stateProvider
      .state('app', {
        abstract: true,
        url: '/app',
        templateUrl: "tpl/app.html"
      })
      .state('app.report', {
        url: '/report',
        templateUrl: 'tpl/report.html',
        controller: 'ReportCtrl',
        data: {}
      })
      .state('access', {
        url: '/access',
        template: '<div ui-view class="fade-in-right-big smooth"></div>'
      })
      .state('access.signin', {
        url: '/signin',
        templateUrl: 'tpl/signin.html',
        controller: 'SigninCtrl'
      })
      .state('access.signup', {
        url: '/signup',
        templateUrl: 'tpl/signup.html',
        controller: 'SignupCtrl'
      });
  }

})();
