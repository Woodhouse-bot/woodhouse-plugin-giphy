var request = require('request');

var archer = function() {
    this.name = 'giphy';
    this.displayname = 'Giphy';
    this.description = 'Gives you a GIF for your query';
}

archer.prototype.init = function(){
    var self = this;
    this.listen('giphy (:<query>.+?)', 'standard', function(from, interface, params){
        self.getQuote(from, interface, params);
    })
}

archer.prototype.getQuote = function(from, interface, params){
    var self = this,
        options = {
            uri: 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + encodeURIComponent(params[0]),
            headers: {
                'user-agent': 'Woodhouse Bot - https://github.com/woodhouse-bot/'
            }
        };

    request(options, function(err, response, data){
        if (err) {throw err}
        var dataObj = JSON.parse(data),
            message;

        if (typeof dataObj.data.id === 'undefined') {
            message = 'Sorry, no GIFs found for ' + params[0];
        } else {
            message = dataObj.data.image_url;
        }

        self.sendMessage(message, interface, from);
    })
}

module.exports = archer;
