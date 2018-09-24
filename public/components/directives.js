'use strict'

/* Directives */

angular.module('myApp.directives', [])
.directive('appVersion', ['version',
  function (version) {
    return function (scope, elm, attrs) {
      elm.text(version)
    }
  }
])

.directive('prettyphoto', function () {
  return function (scope, element, attrs) {
    $("[rel^='prettyPhoto']").prettyPhoto({
      deeplinking: false
    })
  }
})

.directive('flexslider', function () {
  return function (scope, element, attrs) {
    $('.flexslider').flexslider({
      animation: 'slide',
      slideshow: true,
      slideshowSpeed: 3500,
      animationSpeed: 1000
    })
  }
})

.directive('scrollable', function () {
  return function (scope, element, attrs) {
    $('.scrollable')
    .scrollable({
      circular: true,
      speed: 550
    })
                .autoscroll({interval: 7000})
                .navigator()
    $('.item-container.cloned iframe', element).removeAttr('id')

    // flexslider({
    //   selector: '.items .item-container',
    //   animation: 'slide',
    //   slideshow: true,
    //   slideshowSpeed: 3500,
    //   animationSpeed: 1000
    // })
  }
})
