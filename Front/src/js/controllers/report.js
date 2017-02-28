(function () {

  angular.module('app')
    .controller('ReportCtrl', [
      '$scope', 'Report',
      ReportCtrl
    ]);

  function ReportCtrl($scope, Report) {
    $scope.app.subtitle = 'Report';

    $scope.errMessage = "";

    function success(items) {
      if (items['Error']) {
        $scope.errMessage = items['Error'].code;
        return;
      } else {
        $scope.errMessage = "";
      }
      $scope.items = items.rows;

      if (items.rows.length > 0) {
        $scope.volumes = Object.keys(items.rows[0]);

      }
    }

    function error() {
      $scope.items = [];
      $scope.volumes = [];
    }

    $scope.getList = function () {
      $scope.promise = Report.get($scope.query, success, error).$promise;
    };

    $scope.search = function () {
      $scope.getList();
    };

  }

})();
