(function(){
	'use strict';

    function NewsListController(newsService) {
    	var model = this;

    	var onRequestError = function(error){
        	model.error = 'Sorry, we couldn\'t find news for you. Please try again later.';
    	};


    	model.getNewsList= function(){
    		model.error = '';
       		newsService
       			.getNewsList()
       			.then(function(newsList){
	            	model.newsList = newsList;
	        	}, onRequestError);
    	};

    	model.getNewsList();

        model.onSelectNewsItem = function(newsItem) {
        	if (!newsItem.newsItemDetails){
            	newsService
            		.getNewsItemDetails(newsItem)
            		.then(function(newsItemDetails){
	        			newsItem.newsItemDetails = newsItemDetails;
	        		}, onRequestError);
	        };
        };
    }

    var module = angular.module('newsApp');
    module.component('newsList', {
        templateUrl: 'news-app/news-list.component.html',
        controllerAs: 'model',
        controller: NewsListController
	});
}());

