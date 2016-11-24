(function() {

     var app = angular.module("newsApp")


     var fetchNewsController = function($scope, $http) {

        var onError = function(error){
            $scope.error ="Sorry, we couldn't find news for you. Please try again later.";
            console.log(error);
        };

        var onGetNewsSuccess = function(response){
            $scope.newsList = response.data.response.results;
        };

        $scope.getNews = function () {
            $http.get("http://content.guardianapis.com/search?api-key=test")
                .then(onGetNewsSuccess, onError);
        };

        $scope.getNews();

        $scope.onSelectNewsItem = function(newsItem){
            $http.get(newsItem.apiUrl + "?show-blocks=body&api-key=test")
                .then(function(response) {
                    $scope.newsItemDetails = response.data.response.content.blocks.body[0].bodyTextSummary;
                }, onError)
        };
    };


app.controller ("fetchNewsController",fetchNewsController)
} ());
