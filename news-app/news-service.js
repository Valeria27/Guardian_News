(function(){
    'use strict';

    function NewsService($http) {
        var getNewsList = function () {
            return  $http.get('http://content.guardianapis.com/search?api-key=test')
                    .then(function(response){
                        return response.data.response.results;
                    });
        };

        var getNewsItemDetails = function(newsItem){
            return  $http.get(newsItem.apiUrl + '?show-blocks=body&api-key=test')
                    .then(function(response) {
                        return response.data.response.content.blocks.body[0].bodyTextSummary;
                    });
        };

        return {
            getNewsList: getNewsList,
            getNewsItemDetails: getNewsItemDetails,
        };
    }

    var module = angular.module('newsApp');
    module.factory('newsService', NewsService);
}());
