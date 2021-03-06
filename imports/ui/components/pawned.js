import './pawned.html';

const crypto = require('crypto');

Template.pawned.helpers({

    pawned() {

        let amount = 0
        if (Session.get("password").length > 0) {

            var hex = crypto.createHash('sha1').update(Session.get("password")).digest('hex');

            $.ajax({
                url: "https://api.pwnedpasswords.com/range/" + hex.substring(0, 5),
            }).done(function (data) {

                var count = data.toUpperCase().indexOf(hex.substring(5).toUpperCase());

                if ( count === -1) {
                    Session.set("pawned", "save password");
                } else {
                    var begin = data.substring(count);
                    var all = begin.substring(begin.indexOf(":"));
                    amount =  all.substr(1,all.indexOf("\n"));
                    Session.set("pawned", amount);
                }

            });

            return Session.get("pawned");
        }
    }

})
