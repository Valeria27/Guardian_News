(function() {
     
     var app = angular.module("newsApp")

     
     var fetchNewsController = function($scope, $http) {

        var onError = function(error){
        $scope.error ="Sorry, we couldn't find news for you. Please try again later.";
        $log.info = error;
     };
         var getNewsList = function(response){
            
            $scope.response = response.data;
            
        };
        $scope.getNews = function () {
            $http.get("http://content.guardianapis.com/search?api-key=test")
                 .then(getNewsList, onError);
             };  
        $http.get("http://content.guardianapis.com/search?api-key=test")
                 .then(getNewsList, onError);        
                   
    };
   

app.controller ("fetchNewsController",fetchNewsController)
} ());
