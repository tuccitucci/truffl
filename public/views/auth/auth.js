angular.module('Truffl') // declaring an angular module
    .controller('AuthCtrl', AuthCtrl); // chaining a controller

AuthCtrl.$inject = ['$http', '$state']; // injecting the $http service

function AuthCtrl($http, $state) { // auth controller constructor function
    console.info("Auth.controller:loaded");

    var auth = this,
        alertError = ['alert','alert-danger'];

    auth.payload = {};

    auth.login = {
        submit: function($event) {
            console.debug('Login.submit');
            $http.post('/api/login', auth.payload).then(auth.login.success, auth.login.error);
        },
        success: function(res) {
            // when login is successful, redirect them home
            console.info('auth.login.success, session: ', res.data );
            localStorage.setItem('auth', true)
            $state.go('dashboard');
        },
        error: function(err) {
            console.error('Login.error');
            auth.login.alert = alertError;
            auth.login.message = err.data && err.data.message || 'Login failed!';
        }
    };

    // TODO: we need to move the logout method in here, but we can do that later LEAVE IT
    // so your text editor highlights it special to help you out

    auth.register = {
        submit: function($event) {
            $http.post('/api/register', auth.payload).then(auth.register.success, auth.register.error);
        },
        success: function(res) {
            // when register is successful, also redirect them into the dashboard (already logged in, [req.session.user] on the backend)
            console.info('auth.register.success');
            localStorage.setItem('auth', true)
            $state.go('dashboard');
        },
        error: function(err) {
            console.error('Register:error', err);
            auth.register.alert = alertError;
            auth.register.message = err.data && err.data.message || 'Registration failed!';
        }
    };
}
