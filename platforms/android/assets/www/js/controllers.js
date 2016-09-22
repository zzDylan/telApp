angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$http,$cordovaContacts,$ionicPlatform) {
        $scope.items = '';
        $scope.contacts = "";
        $scope.count = 0;
        $scope.success = 0;
        $http.get("http://tel.51gogo.club/login");
        var url = "http://tel.51gogo.club/app_contacts_list";
        $http.get(url)
        .success(function(data){
            $scope.items = data;
            console.log(data);
        })
        .error(function(err){
            alert('err');
            console.log(err);
        });
        $scope.contactForm = {
            displayName: '',
            phoneNumbers: ''
        }
            var phoneNumbers = [];
        $scope.cloudToPhone=function(){
                var options = {
                filter:'1',
                fields: [ 'displayName','phoneNumbers']
                };
                $ionicPlatform.ready(function () {
                    $cordovaContacts.find(options).then(function(allContacts){
                    $scope.contacts = allContacts;
                    });
                });
                alert(angular.toJson($scope.contacts));
                alert(angular.toJson($scope.items));
                return;
                  for(var i=0;i<$scope.items.length;i++){
                        $scope.status = true;
                        var name=$scope.items[i].name;
                        var num=$scope.items[i].telphone;
                        for(var j=0;j<$scope.contacts.length;j++){
                            if(name == $scope.contacts[j].displayName && num == $scope.contacts[j].phoneNumbers[0].value){
                                $scope.status = false;
                                $scope.count++;
                                break;
                            }
                        }
                        if($scope.status == true){
                            phoneNumbers[0] = new ContactField('mobile', num, true); // preferred number
                                $scope.contactForm.displayName = name;
                                $scope.contactForm.phoneNumbers = phoneNumbers;
                                $ionicPlatform.ready(function () {
                                    $cordovaContacts.save($scope.contactForm).then(function(result) {
                                        // Contact saved
                                        $scope.success++;
                                    }, function(err) {
                                        // Contact error
                                        alert("error");
                                    })
                                });
                                
                        }
                   }
                   alert("过滤了"+$scope.count+"条记录,成功导入了"+$scope.success+"条记录！");
        }
})

.controller('ChatsCtrl', function($scope,$cordovaContacts) {
    $scope.user = {};
    $scope.user.contacts = "";
    $scope.staus = false;
    $scope.getAllContacts= function() {
        var options = {
        filter:'1',
        fields: [ 'displayName','phoneNumbers']
        };
        $cordovaContacts.find(options).then(function(allContacts){
            $scope.user.contacts = allContacts;
            $scope.staus = true;
        })
                
   };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
