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
  },

  'input .w3-check'(event, template) {
    //activate input if at least one character is set selected
    $("#password").prop('disabled', $(".w3-check:checked").length === 0);

    checkCharacterAmount();

  }



});

Template.App_home.helpers({

  length() {
    return Session.get("password").length;
  },

  permcount() {
    return permutationCount(Session.get("password").length, Session.get("characterAmount"));
  },

  characterAmount() {
    return Session.get("characterAmount");
  }

})

/* check which character set is selected and display combinations*/
function checkCharacterAmount() {

  amount = 0;

  if($("#yNumbers").prop('checked')){
    amount = amount + 10;
  }
  if($("#ysmallChar").prop('checked')){
    amount = amount + 26;
  }
  if($("#ybigChar").prop('checked')){
    amount = amount + 26;
  }
  if($("#yspecialChar").prop('checked')){
    amount = amount + 33;
  }
  if($("#ygermanUmlaut").prop('checked')){
    amount = amount + 7;
  }

  Session.set("characterAmount", amount);

}

function permutationCount(length, amount) {

  return Math.pow(amount,length);
}
