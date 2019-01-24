var app = angular.module('MinuanApp', []);

app.controller('clientController', function($scope,$http) {
  $http.get("http://localhost:7555/getProvinces",{})
  .success(function(response) {
    $scope.provinces = response.data;
  });
  //$scope.provinces = [{"id":1,"name":"Entre Rios"}, {"id":2,"name":"Buenos Aires"}, {"id":3,"name":"Corrientes"}];
});
