import './hashvalues.html';

const crypto = require('crypto');

Template.hashvalues.helpers({

    md5(){
        return crypto.createHash('md5').update(Session.get( "password" )).digest('hex');
    },

    sha1() {
        return crypto.createHash('sha1').update(Session.get( "password" )).digest('hex');
    },

    sha256() {
        return crypto.createHash('sha256').update(Session.get( "password" )).digest('hex');
    },

    sha512() {
        return crypto.createHash('sha512').update(Session.get( "password" )).digest('hex');
    }
});
