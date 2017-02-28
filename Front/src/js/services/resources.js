angular.module('app')

.factory('Report', ['$resource', function ($resource) {
    return $resource('/report');
}])
;
