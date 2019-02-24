import './home.html';

import '../../components/login/login.js';
import '../../components/chart/chart.js';
import '../../components/chart/bruteforce.js';
import '../../components/chart/hashvalues.js';

import '../../components/dictionary.js';
import '../../components/pepperandsalt.js';
import '../../components/links.js';

Template.App_home.events({

    'input #password'(event, template) {
        Session.set("password", event.currentTarget.value);
    }

});

Template.App_home.helpers({

    length() {
        return Session.get( "password" ).length;
    },

    permcount() {
        return permutationCount(Session.get( "password" ).length,Session.get( "password" ).length) ;
    }

})


function permutationCount(n, k) {
    var result = 1;
  
    var divisor = factorial(n - k);
    if (divisor) {
      result = factorial(n) / divisor;
    }
  
    return result;
  }

  var factorial = function(n) {
    var result = 1;
  
    for (var i=n; i>0; i--) {
      result *= i;
    }
  
    return result;
  }