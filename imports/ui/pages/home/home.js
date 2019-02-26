import './home.html';

import '../../components/login/login.js';
import '../../components/chart/chart.js';
import '../../components/chart/bruteforce.js';
import '../../components/chart/hashvalues.js';
import '../../components/dictionary.js';
import '../../components/pepperandsalt.js';
import '../../components/links.js';

Template.App_home.onCreated(function () {
  Session.set("minCharacterAmount", 0);
  Session.set("password", "");
})

Template.App_home.events({

  'input #password'(event, template) {

    verifyPasswordPolicy(event.currentTarget.value);

  },

  'input .w3-check'(event, template) {

    //visibility of password policy
    $("#z" + event.currentTarget.id.substring(1)).prop('disabled', !event.currentTarget.checked);
    event.currentTarget.checked ? $($("#z" + event.currentTarget.id.substring(1)).parent()).css('visibility', 'visible') : $($("#z" + event.currentTarget.id.substring(1)).parent()).css('visibility', 'hidden');
    checkPasswordPolicy();

    //activate input if at least one character is set selected
    $("#password").prop('disabled', $(".w3-check:checked").length === 0);

    checkCharacterAmount();

  },

  'input .pwdPolicy'(event, template) {
    checkPasswordPolicy();
  },



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
  },

  minCharacterAmount() {
    return Session.get("minCharacterAmount");
  }

})

function verifyPasswordPolicy(pwdValue) {

  // Initialize counter to zero
  var counter = 0;

  //numbers check
  $("#xNumbers").val(pwdValue.replace(/\D/g, '').length);

  /* 
   s.replace(/\D/g, '').length

    if ($("#yNumbers").prop('disabled', false)) {
      if (/[0-9]/.test(pwdValue)) {
        $("#yNumbers").siblings().css("color", "green");
      }
    }
    //small char check
    if ($("#ysmallChar").prop('disabled', false)) {
      if (/[a-z]/.test(pwdValue)) {
        $("#ysmallChar").siblings().css("color", "green");
      }
    }
    //bigchar check
    if ($("#ybigChar").prop('disabled', false)) {
      if (/[a-z]/.test(pwdValue)) {
        $("#ybigChar").siblings().css("color", "green");
      }
    } */
  /* 
    if (/[a-z]/.test(string)) {
        // If string contain at least one lowercase alphabet character
        counter++;
    }
    if (/[A-Z]/.test(string)) {
        counter++;
    }
    if (/[0-9]/.test(string)) {
        counter++;
    }
    if (/[!@#$&*]/.test(string)) {
        counter++;
    } */

  Session.set("password", pwdValue);
}


function checkPasswordPolicy() {
  let amount = 0;
  $(".pwdPolicy").each(function () {
    if (!$(this).prop('disabled')) {
      amount = amount + parseInt($(this).val());
    }
  });
  Session.set("minCharacterAmount", amount);
}

/* check which character set is selected and display combinations*/
function checkCharacterAmount() {

  amount = 0;

  if ($("#yNumbers").prop('checked')) {
    amount = amount + 10;
  }
  if ($("#ysmallChar").prop('checked')) {
    amount = amount + 26;
  }
  if ($("#ybigChar").prop('checked')) {
    amount = amount + 26;
  }
  if ($("#yspecialChar").prop('checked')) {
    amount = amount + 33;
  }
  if ($("#ygermanUmlaut").prop('checked')) {
    amount = amount + 7;
  }

  Session.set("characterAmount", amount);

}

function permutationCount(length, amount) {

  return Math.pow(amount, length);
}