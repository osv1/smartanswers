var app = angular.module("app", 
[
    'ui.router' ,
    'ngBootbox',
    'ngResource',
    'ng-sweet-alert',
    'toastr',
    'angularUtils.directives.dirPagination',
    'ngFileUpload',
    'ngMessages',
    'ngSanitize',
    'angularTrix'

]);

app.constant('APP_CONST', {
    'API_URL': 'http://172.10.1.7:4044'
});
app.factory("userService", function($resource, $stateParams, APP_CONST) {
    return {
        getUsers: function() {
            return $resource(APP_CONST.API_URL + '/task');
        },
        editcms: function(id,aboutus) {
            return $resource(APP_CONST.API_URL + '/task/editcms/' + $stateParams.id,aboutus);
        },
        getcms:function(id){
            return $resource(APP_CONST.API_URL + '/task/getcms');
        },
        getcontact: function() {
            return $resource(APP_CONST.API_URL + '/task/contact');
        },
        postUsers: function(user) {
            return $resource(APP_CONST.API_URL + '/task/addtask', user);
        },
        contact: function(user) {
            return $resource(APP_CONST.API_URL + '/task/addcontact', user);
        },
        postanswer: function(id) {
            return $resource(APP_CONST.API_URL + '/question/addanswer/' + id);
        },
        deleteUsers: function(id) {
            return $resource(APP_CONST.API_URL + "/task/" + id);
        },
        deletecontact: function(id) {
            return $resource(APP_CONST.API_URL + "/task/contact/" + id);
        },
        deletequestion: function(id) {
            return $resource(APP_CONST.API_URL + "/question/" + id);
        },
        deleteanswerr: function(id) {
            return $resource(APP_CONST.API_URL + "/question/answer/" + id);
        },
        geteditUsers: function() {
            return $resource(APP_CONST.API_URL + "/task/myaccount");
        },
        getquesanswer: function(id) {
            return $resource(APP_CONST.API_URL + "/question/" + id);
        },
        showanswer: function() {
            return $resource(APP_CONST.API_URL + '/question/populateall');
        },
        showQA: function(id) {
            return $resource(APP_CONST.API_URL + '/question/populateanswer/' + id);
        },
        getcmsedit: function(id) {
            return $resource(APP_CONST.API_URL + '/task/getcmsedit/' + id);
        },
        editUser: function(user) {
            return $resource(APP_CONST.API_URL + '/task/editUser', user);
        },
        postQuestion: function(vm) {
            return $resource(APP_CONST.API_URL + '/task/addtask', vm);
        },
        postQuestionw: function(vms) {
            return $resource(APP_CONST.API_URL + '/question/addquestion', vms);
        },
        getauserr: function() {
            return $resource(APP_CONST.API_URL + '/task/myaccount', {}, {
                get: {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('webToken')
                    }
                }
            });
        }
    }
});
app.factory('httpRequestInterceptor', function($q, $rootScope, $location) {
    return {
        request: function(config) {
            console.log("config", config);
            if (localStorage.getItem('webToken'))
                config.headers.Authorization = 'Bearer ' + localStorage.getItem('webToken')
            return config;
        },
        response: function(response) {
            
            var curPath = $location.path();
            $rootScope.curPage = curPath;
            if (response.data.code == 200) {
                $rootScope.isLoading = true;
                
            } else {
                $rootScope.isLoading = false;
            
            }
            return response || $q.state(response);
        }
    };
});
app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
    var admintoken = localStorage.getItem('admintoken');
    if (admintoken !== 'true') {
        var auth = function($q, $timeout, $http, $location, $rootScope) {
            var deferred = $q.defer();
            $http.get("http://172.10.1.7:4044/task/auth").success(function(response) {
                deferred.resolve();
            });
            return deferred.promise;
        };
    } else {
        var authr = function($q, $timeout, $http, $location, $rootScope) {
            var deferred = $q.defer();
            $http.get("http://172.10.1.7:4044/task/authr").success(function(response) {
                deferred.resolve();
            });
            return deferred.promise;
        };
    }
    $urlRouterProvider.otherwise('/homeprivate');
    $stateProvider
        .state('login', {
            url: '/login',
            views: {
                "header": {
                    templateUrl: "./users/header.html"
                },
                "content": {
                    templateUrl: "./users/login.html",
                    controller: 'loginController'
                },
                "footer": {
                    templateUrl: "./users/footer.html"
                }
            }
        })
        .state('homeprivate', {
            url: '/homeprivate',
            views: {
                "header": {
                    templateUrl: "./users/header.html"
                },
                "content": {
                    templateUrl: "./users/homeprivate.html"
                },
                "footer": {
                    templateUrl: "./users/footer.html"
                }
            }
        })
        .state('tour', {
            url: '/tour',
            views: {
                "header": {
                    templateUrl: "./users/header.html"
                },
                "content": {
                    templateUrl: "./users/tours.html"
                },
                "footer": {
                    templateUrl: "./users/footer.html"
                }
            }
        })
        .state('editpages', {
            url: '/editpages/:id',
            views: {
                "header": {
                    templateUrl: "./users/header.html"
                },
                "content": {
                    templateUrl: "./users/editpages.html",
                    controller: 'askController'
                },
                "footer": {
                    templateUrl: "./users/footer.html"
                }
            }
        })
        .state('workhere', {
            url: '/workhere',
            views: {
                "header": {
                    templateUrl: "./users/header.html"
                },
                "content": {
                    templateUrl: "./users/workhere.html"
                },
                "footer": {
                    templateUrl: "./users/footer.html"
                }
            }
        })
        .state('help', {
            url: '/help',
            views: {
                "header": {
                    templateUrl: "./users/header.html"
                },
                "content": {
                    templateUrl: "./users/help.html"
                },
                "footer": {
                    templateUrl: "./users/footer.html"
                }
            }
        })
        .state('register', {
            url: '/register',
            views: {
                "header": {
                    templateUrl: "./users/header.html"
                },
                "content": {
                    templateUrl: "./users/register.html",
                    controller: 'registerController'
                },
                "footer": {
                    templateUrl: "./users/footer.html"
                }
            }
        })
        .state('addlist', {
            url: '/addlist',
            views: {
                "header": {
                    templateUrl: "./users/header.html"
                },
                "content": {
                    templateUrl: "./users/addlist.html",
                    controller: 'registerController'
                },
                "footer": {
                    templateUrl: "./users/footer.html"
                }
            }
        })
        .state('about', {
            url: '/about',
            views: {
                "header": {
                    templateUrl: "./users/header.html"
                },
                "content": {
                    templateUrl: "./users/about.html",
                },
                "footer": {
                    templateUrl: "./users/footer.html"
                }
            },
            // resolve: {
            //     auth: auth
            // }
        })
        .state('welcome', {
            url: '/profile',
            views: {
                "header": {
                    templateUrl: "./users/header.html"
                },
                "content": {
                    templateUrl: "./users/profile.html",
                    controller: 'askController'
                },
                "footer": {
                    templateUrl: "./users/footer.html"
                }
            },
            resolve: {
                auth: auth
            }
        })
        .state('myques', {
            url: '/myques',
            views: {
                "header": {
                    templateUrl: "./users/header.html"
                },
                "content": {
                    templateUrl: "./users/myques.html"
                    
                },
                "footer": {
                    templateUrl: "./users/footer.html"
                }
            },
        })

.state('myans', {
            url: '/myans',
            views: {
                "header": {
                    templateUrl: "./users/header.html"
                },
                "content": {
                    templateUrl: "./users/myans.html"
                    
                },
                "footer": {
                    templateUrl: "./users/footer.html"
                }
            },
        })

       



        .state('topquestion', {
            url: '/topquestion',
            views: {
                "header": {
                    templateUrl: "./users/header.html"
                },
                "content": {
                    templateUrl: "./users/topquestion.html",
                    controller: 'askController'
                },
                "footer": {
                    templateUrl: "./users/footer.html"
                }
            },
            resolve: {
                auth: auth
            }
        })
        .state('contact', {
            url: '/contact',
            views: {
                "header": {
                    templateUrl: "./users/header.html"
                },
                "content": {
                    templateUrl: "./users/contact.html",
                    controller: 'registerController'
                },
                "footer": {
                    templateUrl: "./users/footer.html"
                }
            }
        })
        .state('admin/question', {
            url: '/admin/question',
            views: {
                "header": {
                    templateUrl: "./users/header.html"
                },
                "content": {
                    templateUrl: "./users/questionlist.html"
                },
                "footer": {
                    templateUrl: "./users/footer.html"
                }
            },
            resolve: {
                authr: authr
            }
        })
        .state('contactuslist', {
            url: '/admin/contactuslist',
            views: {
                "header": {
                    templateUrl: "./users/header.html"
                },
                "content": {
                    templateUrl: "./users/contactuslist.html",
                    controller: 'tourController'
                },
                "footer": {
                    templateUrl: "./users/footer.html"
                }
            },
            resolve: {
                authr: authr
            }
        })
        .state('askquestions', {
            url: '/askquestions',
            views: {
                "header": {
                    templateUrl: "./users/header.html"
                },
                "content": {
                    templateUrl: "./users/askquestions.html"
                },
                "footer": {
                    templateUrl: "./users/footer.html"
                }
            }
        })
        .state('ask', {
            url: '/ask',
            views: {
                "header": {
                    templateUrl: "./users/header.html"
                },
                "content": {
                    templateUrl: "./users/ask.html",
                    controller: 'askController'
                },
                "footer": {
                    templateUrl: "./users/footer.html"
                }
            }
        })
        // .state('about',{
        //    url:'/about',
        //    templateUrl:"./users/about.html"
        // })
        .state('documentation', {
            url: '/documentation',
            views: {
                "header": {
                    templateUrl: "./users/header.html"
                },
                "content": {
                    templateUrl: "./users/documentation.html"
                },
                "footer": {
                    templateUrl: "./users/footer.html"
                }
            }
        })
        .state('documentation.angularjs', {
            url: '/angularjs',
            templateUrl: "./users/Mean.html"
        })
        .state('documentation.android', {
            url: '/android',
            templateUrl: "./users/android.html"
        })
        .state('documentation.Nodejs', {
            url: '/Nodejs',
            templateUrl: "./users/nodejs.html"
        })
        .state('documentation.NETFramework', {
            url: '/NETFramework',
            templateUrl: "./users/c.html"
        })
        .state('documentation.Django', {
            url: '/Django',
            templateUrl: "./users/dej.html"
        })
        .state('documentation.CSS', {
            url: '/CSS',
            templateUrl: "./users/css.html"
        })
        .state('documentation.HTML', {
            url: '/HTML',
            templateUrl: "./users/HTML.html"
        })
        .state('admin', {
            url: '/admin',
            views: {
                "header": {
                    templateUrl: "./users/header.html"
                },
                "content": {
                    templateUrl: "./users/adminpanel.html",
                },
                "footer": {
                    templateUrl: "./users/footer.html"
                }
            },
            resolve: {
                authr: authr
            }
        })
        .state('userlist', {
            url: '/admin/userlist',
            views: {
                "header": {
                    templateUrl: "./users/header.html"
                },
                "content": {
                    templateUrl: "./users/userlist.html",
                    controller: 'tourController'
                },
                "footer": {
                    templateUrl: "./users/footer.html"
                }
            },
            resolve: {
                authr: authr
            }
        })
        .state('questionlist', {
            url: '/admin/questionlist',
            views: {
                "header": {
                    templateUrl: "./users/header.html"
                },
                "content": {
                    templateUrl: "./users/questionlist.html",
                    controller: 'tourController'
                },
                "footer": {
                    templateUrl: "./users/footer.html"
                }
            },
            resolve: {
                authr: authr
            }
        })
        .state('postUsers', {
            url: '/postlist',
            views: {
                "header": {
                    templateUrl: "./users/header.html"
                },
                "content": {
                    templateUrl: "./users/addlist.html",
                    controller: 'tourController'
                },
                "footer": {
                    templateUrl: "./users/footer.html"
                }
            }
        })
        .state('edit', {
            url: '/edit/',
            views: {
                "header": {
                    templateUrl: "./users/header.html"
                },
                "content": {
                    templateUrl: "./users/edit.html",
                    controller: 'tourController'
                },
                "footer": {
                    templateUrl: "./users/footer.html"
                }
            }
        })
        .state('answerpost', {
            url: '/answerpost/:id',
            views: {
                "header": {
                    templateUrl: "./users/header.html"
                },
                "content": {
                    templateUrl: "./users/answerpost.html",
                    controller: 'tourController'
                },
                "footer": {
                    templateUrl: "./users/footer.html"
                }
            }
        })
});
app.controller('myController', function($scope, $http, $location,$ngBootbox, SweetAlert, $stateParams) {
    var token = localStorage.getItem('webToken');
    var admintoken = localStorage.getItem('admintoken');
    if (token != null && admintoken == 'true') {
        $scope.isuserlogin = false;
        $scope.isadminlogin = true;
    } else if (token != null && admintoken == 'false') {
        $scope.isuserlogin = true;
        $scope.isadminlogin = false;
    } else {
        $scope.isuserlogin = false;
        $scope.isadminlogin = false;
    }
    $scope.logout = function() {

        swal({
  title: "Are you sure?",
  text: "You want to logout ",
  type: "warning",
  showCancelButton: true,
  confirmButtonClass: "btn-primary",
  confirmButtonText: "Yes,",
  cancelButtonClass: "btn-danger",
  cancelButtonText: "No",
  closeOnConfirm: false,
  closeOnCancel: false
},
function(isConfirm) {
  if (isConfirm) {
     localStorage.removeItem('webToken');
                    window.location = '/';
   
    swal("Thank You!","success");                  
  } else {
    swal("Cancelled", "Confirmation was cancelled!!! you are still logged in)", "error");
  }
});
       
    };
});
app.controller('loginController', function($scope, $http, toastr, $ngBootbox,SweetAlert, $location) {
    $scope.login = function(vm) {
        $http.post("http://172.10.1.7:4044/task/login", vm).then(function(response) {
            if (response.data.code == 200) {
                console.log(response);
                console.log(response.data.data.token);
                localStorage.setItem('webToken', response.data.data.token);
                localStorage.setItem('admintoken', response.data.data.role);
                swal("Thank You!",
                    "Your are logged in Successfully.",
                    "success");


                console.log('login success');
                $location.path('/homeprivate');
                $scope.users = response.data.data;
            } else {

                swal("Oops...", "Your credentials are gone", "error");
                console.log(response);
            }
        })
    }
});

  app.controller('vote', ['$scope', function($scope) {
    $scope.like = {};
    $scope.like.votes = 0;
    $scope.doVote = function() {
      if ($scope.like.userVotes == 1) {
        delete $scope.like.userVotes;
        $scope.like.votes--;
      } else {
        $scope.like.userVotes = 1;
        $scope.like.votes++;
      }
    }
  }]);


app.controller('askController', function($scope, $http, Upload, $rootScope, $window, $ngBootbox,SweetAlert, $location, toastr, $stateParams, $resource, userService) {
//     CKEDITOR.editorConfig = function (config) {
//   // ... other configuration ...

//   config.toolbar_mini = [
//     ["Bold",  "Italic",  "Underline",  "Strike",  "-",  "Subscript",  "Superscript"],
//   ];
//   config.toolbar = "simple";

//   // ... rest of the original config.js  ...
// }
 
     var events = ['trixInitialize', 'trixChange', 'trixSelectionChange', 'trixFocus', 'trixBlur', 'trixFileAccept', 'trixAttachmentAdd', 'trixAttachmentRemove'];

    for (var i = 0; i < events.length; i++) {
        $scope[events[i]] = function(e) {
            console.info('Event type:', e.type);
        }
    };

    var createStorageKey, host;

    
     

    createStorageKey = function(file) {
        var date, day, time;
        date = new Date();
        day = date.toISOString().slice(0, 10);
        time = date.getTime();
        return "tmp/" + day + "/" + time + "-" + file.name;

    };

//     var editor = CKEDITOR.replace( 'editor1' );

// editor.on( 'change', function( evt ) {
//     console.log( 'Total bytes: ' + evt.editor.getData().length );
// });

    $scope.questionw = function(vms) {        
console.log(vms);
        userService.postQuestionw().save(vms, function(response) {
            if (response.code == 200) {
                $location.path('/topquestion');
                swal(" Question Posted",
                    "Your question has been Posted Successfully.",
                    "success");

                
               
                console.log('response', response);
            } else {
                alert('no record');
            }
        }, function(response) {
            swal("Oops...", "You are not Authorized person", "error");
            $location.path('/login');
        });
    }
    




    $scope.postanswer = function(id, answer) {
        userService.postanswer(id).save({
            answer,
            id
        }, function(response) {
            if (response.code == 200) {
                swal({
                    title: "Are you sure?",
                    type: "warning",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, post it!",
                    closeOnConfirm: false,
                    html: false
                }, function() {
                    swal(" Answer Posted",
                        "Your answer has been Posted Successfully.",
                        "success");
                });
                $location.path('/topquestion');
            } else {}
        }, function(response) {
            swal("Oops...", "You are not Authorized person", "error");
        });
    }


    $scope.editcms = function(aboutus) {
        console.log(aboutus);
      userService.editcms($stateParams.id).save({aboutus},function(response) {
            console.log('response', response);
            if (response.code == 200) {
                swal({
                    title: "Are you sure?",
                    
                    type: "warning",
                    
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, Update it!",
                    closeOnConfirm: false,
                    html: false
                }, function() {
                    swal(" Page Updated",
                        "Your pages has been Posted Successfully.",
                        "success");
                });
                // toastr.success(' Thank you for contacting us – we will get back to you soon!');
                $location.path('/about');
                
            } else {
                alert('no record');
            }
        }, function(response) {
            alert('error');
        });
    };
    $scope.loadanswer = function() {
        userService.showanswer().get(function(response) {
            console.log(response);
            if (response.code == 200) {
                $scope.answers = response.data;
            } else {
                swal("Oops...", "No Record Found", "error");;
            }
        })
    }
$scope.getcms = function() {
        userService.getcms().get(function(response) {
            console.log(response);
            if (response.code == 200) {
                $scope.page = response.data[0];
            } else {
                swal("Oops...", "No Record Found", "error");;
            }
        })
    }
  $scope.getcmsedit = function(id) {
        userService.getcmsedit($stateParams.id).get(function(response) {
            console.log(response)
            if (response.code == 200) {
                $scope.cms = response.data;
                } else {
                console.log(response)
            }
         
        })
    }  
 

    $scope.getauser = function() {
        userService.getauserr().get(function(response) {
                if (response.code == 200) {
                    $scope.users = response.data;
                } else {
                    console.log(response);
                }
            }),
            function(response) {
                alert('error');
            }
    }
    $scope.upload = function(file) {
        Upload.upload({
            url: 'http://172.10.1.7:4044/task/uploadImage',
            data: {
                file: file
            }
        }).then(function(resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data.filename);
            $scope.getauser()
        }, function(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
});
app.controller('registerController', function($scope, $location, toastr,$ngBootbox, SweetAlert, $stateParams, $resource, userService) {
    $scope.register = function(user) {
        console.log(user);
        userService.postUsers().save(user, function(response) {
            console.log('response', response);
            if (response.code == 200) {
                swal({
                    title: "Are you sure?",
                    // text: "Are you sure to get register?",
                    type: "warning",
                    // showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes",
                    closeOnConfirm: false,
                    html: false
                }, function() {
                    swal("Registered",
                        "Registrastion Successfully",
                        "success");
                });
                // toastr.success(' Registrastion Successfully');
                $location.path('/login');
                $scope.users = response.data;
            } else {
                alert('no record');
            }
        }, function(response) {
            alert('error');
        });
    };
    $scope.contact = function(user) {
        console.log(user);
        userService.contact().save(user, function(response) {
            console.log('response', response);
            if (response.code == 200) {
                swal({
                    title: "Are you sure?",
                    
                    type: "warning",
                    
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, post it!",
                    closeOnConfirm: false,
                    html: false
                }, function() {
                    swal(" message Posted",
                        "Your message has been Posted Successfully.",
                        "success");
                });
                // toastr.success(' Thank you for contacting us – we will get back to you soon!');
                $location.path('/homeprivate');
                $scope.users = response.data;
            } else {
                alert('no record');
            }
        }, function(response) {
            alert('error');
        });
    };

 
});
app.controller('tourController', function($scope, $window, $location,$ngBootbox, SweetAlert, $stateParams, $resource, $rootScope, toastr, userService) {
    $scope.getUser = function() {
        userService.getUsers().get(function(response) {
                console.log('response', response);
                if (response.code == 200) {
                    $scope.users = response.data;
                } else {
                    alert('no record');
                }
            }),
            function(response) {
                alert('error');
            }
    }
    $scope.getcontact = function() {
        userService.getcontact().get(function(response) {
                console.log('response', response);
                if (response.code == 200) {
                    $scope.users = response.data;
                } else {
                    alert('no record');
                }
            }),
            function(response) {
                alert('error');
            }
    }
    $scope.deleteUser = function(id) {
        console.log(id);
        userService.deleteUsers(id).delete(function(response) {
            if (response.code == 200) {

                toastr.success(' Delete Successfully');
                swal({
                    title: "Are you sure?",
                    // text: "You will not be able to recover this user",
                    type: "warning",
                    // showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false,
                    html: false
                }, function() {
                    swal("Deleted!",
                        "Your user has been deleted.",
                        "success");
                });
                console.log('response', response);
            } else {
                console.log(response)
            }
            $scope.getUser();
        })
    }
    $scope.deletecontact = function(id) {
        console.log(id);
        userService.deletecontact(id).delete(function(response) {
            if (response.data.code == 200) {
                swal({
                    title: "Are you sure?",
                    // text: "You will not be able to recover this person",
                    type: "warning",
                    // showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false,
                    html: false
                }, function() {
                    swal("Deleted!",
                        "Your conatct person has been deleted.",
                        "success");
                });
                console.log('response', response);
            } else {
                console.log(response)
            }
            $scope.getcontact();
        })
    }
    $scope.deletequestion = function(id) {

        userService.deletequestion(id).delete(function(response) {
            if (response.code == 200) {
                swal({
                    title: "Are you sure?",

                    type: "warning",

                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false,
                    html: false
                }, function() {
                    swal("Deleted!",
                        "Your Question has been deleted.",
                        "success");
                });
                console.log('response', response);
            } else {
                console.log(response)
            }
            $scope.loadanswer();
        })
    }
    $scope.deleteanswer = function(id) {

        userService.deleteanswerr(id).delete(function(response) {
            if (response.code == 200) {
                swal({
                    title: "Are you sure?",

                    type: "warning",

                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false,
                    html: false
                }, function() {
                    swal("Deleted!",
                        "Your Question has been deleted.",
                        "success");
                });
                console.log('response', response);
            } else {
                console.log(response)
            }
            $scope.loadanswer();
        })
    }
    $scope.showQA = function(id) {
        userService.showQA($stateParams.id).get(function(response) {
            console.log(response)
            if (response.code == 200) {
                $scope.users = response.data;
                var answer = response.data[0].answer;
                var length = answer.length;
                console.log('No .of Answer in thi question is:', length);
            } else {
                console.log(response)
            }
            // $location.path('/answerpost/');
        })
    }
    $scope.getquesanswer = function(id) {
        userService.getquesanswer(id).get(function(response) {
            console.log(response);
            if (response.code == 200) {
                console.log(response);
                $rootScope.user = response.data;
            }
        });
        $location.path('/answerpost/');
    }
    $scope.editUser = function() {
        $location.path('/edit/');
    }
    $scope.geteditUsers = function() {
        userService.geteditUsers().get(function(response) {
            console.log(response);
            if (response.code == 200) {
                $rootScope.user = response.data;
            } else {
                alert('no record found');
            }
        });
    }
    $scope.edit = function(user) {
            userService.editUser().save(user, function(response) {
                if (response.code == 200) {
                    // toastr.success('Update', 'success');
                    swal({
                        title: "Are you sure?",
                        // text: "You want to edit your profile",
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes, I want to update profile",
                        closeOnConfirm: false,
                        html: false
                    }, function() {

                        swal(" Update Successfully",
                            "Your profile has been update Successfully.",
                            "success");

                    });
                    // console.log(response);
                    $location.path('/profile');
                } else {
                    console.log(response);
                }
            }, function(response) {})
        }
        /*------------------------*/
});
// ------------------------------------------------------------------------------
// var myApp = angular.module('myApp', []);
// function Main($scope, $http){
//   $http.get('http://api.randomuser.me/?results=20').success(function(data) {
//     $scope.users = data.results;
//     $('#loader').hide();
//     $('#userList').show();
//   }).error(function(data, status) {
//     alert('get data error!');
//   });
//   $scope.showUserModal = function(idx){
//     var user = $scope.users[idx].user;
//     $scope.currUser = user;
//     $('#myModalLabel').text(user.name.first
//          + ' ' + user.name.last);
//     $('#myModal').modal('show');
//   }
// }
// --------------------------------------------------------------------------------
//
//   .state('register',{
//    url:'/register',
//    templateUrl:"./users/register.html",
//    controller:'registerController'
// })
//   .state('addlist',{
//    url:'/addlist',
//    templateUrl:"./users/addlist.html",
//    controller:'registerController'
// })
/* $scope.delete = function(index){
$scope.users.splice(index,1);
}
$scope.save = function(index){
$scope.users[index].editable = false;
}
$scope.add = function(){
$scope.users.push({
name : "",
country : "",
editable : true
})
}
});
*/
//  $scope.deleteUser =function(id){
//           $http.delete("http://172.10.1.7:4044/task/"+id).then(function(response)
//           {
//             console.log(response);
//             if(response.data.code==200)
//             {
//               console.log("deleted")
//               $scope.getUsers();
//             }else{
//               console.log("not deleted")
//             }
//           })
//         }
// {
//  $location.path("register");
// }
// $http.get("http://172.10.1.7:4044/task").then(function(response)
// $scope.geteditUsers=function(){
//       console.log($stateParams.user);
//       $http.get("http://172.10.1.7:4044/task/"+$stateParams.user).then(function(response)
//       {
//         console.log(response);
//         $scope.user=response.data.data[0];
//       })
//      }
//   $scope.editUser=function(id){
//     console.log(id);
//     $location.path('/edit/'+id);
//   }
// $scope.edit=function(user)
// {
//   $http.put('/task/editUser/'+user._id,user).then(function(response)
//   {
//     console.log("updated");
//   },
//   function(response)
//   {
//     console.log("not");
//   });
// }
/*.state('about', {
url: '/about',
views: {
"header": {
templateUrl: "./users/h.html"
},
"content": {
templateUrl: "./users/about.html"
},
"footer": {
templateUrl: "./users/footer.html"
}
}
})*/
//app.factory('product', ['$resource',function($resource) {
//return $resource('http://172.10.1.7:4044/task/addtask');
//}]);
// app.controller('registerController', function($scope,$http) {
//         $scope.register  =function(user){
//           $http.post("http://172.10.1.7:4044/task/addtask",user).then(function(response)
//           {
//             console.log("reg success");
//           })
//         }
//     });
/*var app = angular.module("app", ['ngRoute']);
app.config(function($routeProvider)
{
$routeProvider.
when('/',  {templateUrl:'./users/login.html' } )
.when('/simple', {
templateUrl : './users/simple.html'})
.when('/register', {
templateUrl : './users/register.html'})
});
app.controller('mainController', function($scope) {
});
*/
/*
var app = angular.module("app", ['ui.router']);
app.config(function ($stateProvider, $urlRouterProvider) {
$urlRouterProvider.when("", "/Pageclick");
$stateProvider
.state("Pageclick", {
url: "/Pageclick",
templateUrl: "Pageclick.html"
})
.state("Pageclick.login", {
url: "/Page1",
templateUrl: "login.html"
})
.state("Pageclick.register", {
url: "/Page2",
templateUrl: "register.html"
})
.state("Pageclick.simple", {
url: "/Page3",
templateUrl: "simple.html"
});
});
// .state('askquestions',{
//           url:'/askquestions',
//           templateUrl:"./users/askquestions.html"
//        })
// .state('askquestions.ask',
//          {
//             url:'/ask',
//             templateUrl:"./users/ask.html",
//             controller:'askController'
//          })
// .state('ask',
//          {
//             url:'/ask',
//             templateUrl:"./users/ask.html",
//             controller:'askController'
//          })
/*
var app = angular.module('app', ['ngRoute']);
// configure our routes
app.config(function($routeProvider) {
$routeProvider
// route for the home page
.when('/', {
templateUrl : '/users/login.html',
controller  : 'mainController'
})
// route for the about page
.when('/register', {
templateUrl : '/users/register.html',
controller  : 'aboutController'
})
// route for the contact page
.when('/simple', {
templateUrl : '/users/simple.html',
controller  : 'contactController'
});
});
// create the controller and inject Angular's $scope
app.controller('mainController', function($scope) {
// create a message to display in our view
$scope.message = 'Everyone come and see how good I look!';
});
app.controller('aboutController', function($scope) {
$scope.message = 'Look! I am an about page.';
});
app.controller('contactController', function($scope) {
$scope.message = 'Contact us! JK. This is just a demo.';
});
/*var mainApp = angular.module("mainApp", ['ngRoute']);
mainApp.config(['$routeProvider', function($routeProvider) {
$routeProvider.
when('/addStudent', {
templateUrl: 'addStudent.htm', controller: 'AddStudentController'
})
.when('/viewStudents', {
templateUrl: 'viewStudents.htm', controller: 'ViewStudentsController'
})
.otherwise({ redirectTo: '/addStudent'
});
app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
$httpProvider.interceptors.push('httpRequestInterceptor');
var Atoken = localStorage.getItem('userRole');
console.log('Atoken',Atoken);
if(Atoken!=='true'){
console.log('no');
var auth = function($q, $timeout, $http, $location, $rootScope) {
var deferred = $q.defer();
$http.get('http://172.10.1.7:4047/Users/auth').then(function(response) {
deferred.resolve();
});
return deferred.promise;
};
} else {
console.log('yes');
var Adminauth = function($q, $timeout, $http, $location, $rootScope) {
var deferred = $q.defer();
$http.get('http://172.10.1.7:4047/Users/Adminauth').then(function(response) {
deferred.resolve();
});
return deferred.promise;
};
}
*/