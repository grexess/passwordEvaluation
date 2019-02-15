import './hashvalues.html';

const crypto = require('crypto');

Template.hashvalues.helpers({
    sha1() {
        return crypto.createHash('sha1').update(Session.get( "password" )).digest('hex');
    },

    sha256() {
        return crypto.createHash('sha256').update(Session.get( "password" )).digest('hex');
    }

});
