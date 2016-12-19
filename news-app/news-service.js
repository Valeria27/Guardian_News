(function(){
    'use strict';

    function NewsService($http) {
        var getNewsList = function (currentPage) { //Used for getting list of news for current page only (Default value current page =1 )
            return  $http.get('http://content.guardianapis.com/search?page=' + currentPage + '&api-key=test')
                    .then(function(response){
                        return response.data.response.results;
                    });
        };

        var getNewsItemDetails = function(newsItem){ //Used for getting news details (text of an article)
            return  $http.get(newsItem.apiUrl + '?show-blocks=body&api-key=test')
                    .then(function(response) {
                        return response.data.response.content.blocks.body[0].bodyTextSummary;
                    });
        };

        var getNewsPages = function () {    //Used for getting value of Total pages
            return  $http.get('http://content.guardianapis.com/search?api-key=test')
                    .then(function(response){
                        return response.data.response.pages;
                    });
        };

        return {
            getNewsList: getNewsList,
            getNewsItemDetails: getNewsItemDetails,
            getNewsPages: getNewsPages
        };
    }

    var module = angular.module('newsApp');
    module.factory('newsService', NewsService);
}());
