


// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'ngRoute',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers',
    'ui.bootstrap'
    //'$strap.directives'
]).
config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/index.html',
            controller: 'homeCtrl'
        });
        $routeProvider.otherwise({
            redirectTo: '/'
        });


        $locationProvider.html5Mode(false);
    }
]).run(function() {


    $(document).ready(function() {
        $("nav").sticky({
            topSpacing: 0
        });
    });

    function scrollTo(target) {
        var targetPosition = $(target).offset().top;
        $('html,body').animate({
            scrollTop: targetPosition
        }, 'slow');
    }

    $(document).ready(function() {
        $("a[class^='prettyPhoto']").prettyPhoto({
            social_tools: false,
            theme: 'light_square'
        });
    });

    $(document).ready(function() {
        $("a[rel^='prettyPhoto']").prettyPhoto({
            social_tools: false,
            theme: 'light_square'
        });
    });

});
