angular.module('starter.services', [])

.factory('Yelp', function($http, Settings) {
    // Might use a resource here that returns a JSON array

    return {
        getYelp: function(location) {
            function randomString(length, chars) {
                var result = '';
                for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
                return result;
            }
            var method = 'GET';
            var url = 'http://api.yelp.com/v2/search';
            var params = {
                callback: 'angular.callbacks._0',
                location: location,
                oauth_consumer_key: Settings.oauth_consumer_key, //Consumer Key
                oauth_token: Settings.oauth_token, //Token
                oauth_signature_method: Settings.oauth_signature_method,
                oauth_timestamp: new Date().getTime(),
                oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                term: 'restaurant'
            };
            var consumerSecret = Settings.consumerSecret; //Consumer Secret
            var tokenSecret = Settings.tokenSecret; //Token Secret
            var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, {
                encodeSignature: false
            });
            params['oauth_signature'] = signature;
            return $http.jsonp(url, {
                params: params
            })

        }
    }
});
