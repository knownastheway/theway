'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('homeCtrl',
    function($scope, $modal, $http, $sce)
    {
        $scope.contact = {}
        $scope.response = "";
        $scope.sendButtonText = "Send";
        $scope.items = ['item1', 'item2', 'item3'];
        $scope.openModal = function(path)
        {
            // do something
            var modal = $modal.open(
            {
                templateUrl: path,
                controller: ModalInstanceCtrl,
                resolve:
                {
                    items: function()
                    {
                        return $scope.items;
                    }
                }
            });

            modal.result.then(function(selectedItem)
            {
                $scope.selected = selectedItem;
            }, function()
            {
                console.log('Modal dismissed at: ' + new Date());
            });
        }


        $scope.sendContactForm = function()
        {
        $scope.sendButtonText = "Sending...";
            console.log($scope.contact)
            $http.post('/contact', $scope.contact).success(
                function(data, status)
                {
                    console.log(data)
                    $scope.response = $sce.trustAsHtml(data)
                    $scope.contact = {}
                    $scope.sendButtonText = "Send";
                }).error(function(data, status)
            {
                console.log(data)
                $scope.response = $sce.trustAsHtml(data)
                $scope.sendButtonText = "Send";
            });
            //Get the data from all the fields
            // var name = $('input[name=name]');
            // var email = $('input[name=email]');
            // var website = $('input[name=website]');
            // var comment = $('textarea[name=comment]');

            // //Simple validation to make sure user entered something
            // //If error found, add hightlight class to the text field
            // if (name.val() == '')
            // {
            //     name.addClass('hightlight');
            //     return false;
            // }
            // else name.removeClass('hightlight');

            // if (email.val() == '')
            // {
            //     email.addClass('hightlight');
            //     return false;
            // }
            // else email.removeClass('hightlight');

            // if (comment.val() == '')
            // {
            //     comment.addClass('hightlight');
            //     return false;
            // }
            // else comment.removeClass('hightlight');

            // //organize the data properly
            // var data = 'name=' + name.val() + '&email=' + email.val() + '&website=' +
            //     website.val() + '&comment=' + encodeURIComponent(comment.val());

            // //disabled all the text fields
            // $('.text').attr('disabled', 'true');

            // //show the loading sign
            // $('.loading').show();

            // //start the ajax
            // $.ajax(
            // {
            //     //this is the php file that processes the data and send mail
            //     url: "/contact",

            //     //GET method is used
            //     type: "POST",

            //     //pass the data         
            //     data: data,

            //     //Do not cache the page
            //     cache: false,

            //     //success
            //     success: function(html)
            //     {
            //         //if process.php returned 1/true (send mail success)
            //         if (html == 1)
            //         {
            //             //hide the form
            //             $('.form').fadeOut('slow');

            //             //show the success message
            //             $('.done').fadeIn('slow');

            //             //if process.php returned 0/false (send mail failed)
            //         }
            //         else alert('Sorry, unexpected error. Please try again later.');
            //     }
            // });

            // //cancel the submit button default behaviours
            // return false;
        }


    }
);

var ModalInstanceCtrl = function($scope, $modalInstance, items)
{

    $scope.close = function()
    {
        $modalInstance.dismiss('cancel');
    };
};
