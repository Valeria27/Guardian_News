(function(){
	'use strict';

    function NewsListController(newsService) {
    	var model = this;

        model.currentPage = 1;
        model.pageFromInput = model.currentPage;

    	var onRequestError = function(error){
        	model.error = 'Sorry, we couldn\'t find news for you. Please try again later.';
    	};

    	model.getNewsList = function(){   //Used for getting list of news for current page only (Default value current page =1 )
            model.error = '';
       		newsService
       			.getNewsList(model.currentPage)
       			.then(function(newsList){
	            	model.newsList = newsList;
	        	}, onRequestError);
    	};

    	model.getNewsList();

        model.getNewsPages = function(){  //Used for getting value of Total pages (http call)
            model.error = '';
            newsService
                .getNewsPages()
                .then(function(totalPages){
                    model.totalPages = totalPages;
                }, onRequestError);
        };

        model.getNewsPages();

        model.onSelectNewsItem = function(newsItem) { //Used for getting news details (text of an article)
        	if (!newsItem.newsItemDetails){
                model.error = '';
            	newsService
            		.getNewsItemDetails(newsItem)
            		.then(function(newsItemDetails){
	        			newsItem.newsItemDetails = newsItemDetails;
	        		}, onRequestError);
	        };
        };

        model.onPageFromInputChange = function(){
            if (model.pageFromInput){
                model.currentPage = model.pageFromInput;
                model.getNewsList();
            }
        };

        model.goToPreviousPage = function (){
            model.currentPage = model.currentPage - 1;
            model.pageFromInput = model.currentPage;
            model.getNewsList()
        };
        model.goToNextPage = function (){
            model.currentPage = model.currentPage + 1;
            model.pageFromInput = model.currentPage;
            model.getNewsList()
        };


    }

    var module = angular.module('newsApp');
    module.component('newsList', {
        templateUrl: 'news-app/news-list.component.html',
        controllerAs: 'model',
        controller: NewsListController
	});
}());

