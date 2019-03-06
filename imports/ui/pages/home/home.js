import './home.html';

import '../../components/login/login.js';
import '../../components/chart/chart.js';
import '../../components/chart/bruteforce.js';
import '../../components/chart/hashvalues.js';
import '../../components/dictionary.js';
import '../../components/pepperandsalt.js';
import '../../components/links.js';
import '../../components/pawned.js';

Template.App_home.onCreated(function () {
  Session.set("minCharacterAmount", 0);
  Session.set("password", "");
})

Template.App_home.events({

  'input #password'(event, template) {

    verifyPasswordPolicy(event.currentTarget.value);
    checkPasswordPolicy();

  },

  'input .w3-check'(event, template) {

    //visibility of password policy
    $("#z" + event.currentTarget.id.substring(1)).prop('disabled', !event.currentTarget.checked);
    $($("#z" + event.currentTarget.id.substring(1)).parent()).toggle();
    checkPasswordPolicy();

    //activate input if at least one character is set selected
    $("#password").prop('disabled', $(".w3-check:checked").length === 0);

    checkCharacterAmount();

  },

  'input .pwdPolicy'(event, template) {
    checkPasswordPolicy();
  },

  'click #eye'(event, template) {
    let elem = $("#eye");
    if ($(elem).hasClass("fa-eye-slash")) {
      $(elem).removeClass("fa-eye-slash").addClass("fa-eye");
      $("#password").prop("type", "password");
    } else {
      $(elem).removeClass("fa-eye").addClass("fa-eye-slash");
      $("#password").prop("type", "text");
    };
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

  //Kleinbuchstaben check
  if(pwdValue.match(/[a-z]/g)){
  $("#xKleinbuchstaben").val(pwdValue.match(/[a-z]/g).length);
  }
  else{
    $("#xKleinbuchstaben").val(0);
  }

  //Grossbuchstaben check
  if(pwdValue.match(/[A-Z]/g)){
  $("#xGrossbuchstaben").val(pwdValue.match(/[A-Z]/g).length);
  }
  else{
    $("#xGrossbuchstaben").val(0);
  }

// check
if(pwdValue.match(/[ !\"#$%&\'\(\)\*\+,\-\.\/:;<=>?@\[\\\]^_`{|}~]/g)){
  $("#xSpecial").val(pwdValue.match(/[ !\"#$%&\'\(\)\*\+,\-\.\/:;<=>?@\[\\\]^_`{|}~]/g).length);
  }
  else{
    $("#xSpecial").val(0);
  }


  Session.set("password", pwdValue);
}


function checkPasswordPolicy() {

  let amount = 0;
  $(".pwdPolicy").each(function () {
    if (!$(this).prop('disabled')) {
      amount = amount + parseInt($(this).val());
    }
  });

  if (amount <= 6 ) {
    $("#amountDiv").removeClass("w3-yellow").removeClass("w3-green");
    $("#amountDiv").addClass("w3-red");
  }

  if (amount > 6) {
    $("#amountDiv").removeClass("w3-red").removeClass("w3-green");
    $("#amountDiv").addClass("w3-yellow");
  }

  if (amount > 8) {
    $("#amountDiv").removeClass("w3-red").removeClass("w3-yellow");
    $("#amountDiv").addClass("w3-green");
  }

  let checkPwd;
  checkPwd = Session.get("password").replace(/\D/g, '');
  checkSpecialPolicy(checkPwd.length, $("#zNumbers"));

  checkPwd = Session.get("password").match(/[a-z]/g);
  if (checkPwd) {
    checkSpecialPolicy(checkPwd.length, $("#zsmallChar"));
  }

  checkPwd = Session.get("password").match(/[A-Z]/g);
  if (checkPwd) {
    checkSpecialPolicy(checkPwd.length, $("#zbigChar"));
  }


  checkPwd = Session.get("password").match(/[ !\"#$%&\'()*+,-.\/:;<=>?@\[\\]^_`{|}~]/g);
  if (checkPwd) {
    checkSpecialPolicy(checkPwd.length, $("#zbigChar"));
  }

  //[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]

  Session.set("minCharacterAmount", amount);
}

function checkSpecialPolicy(length, element) {
  let checkPwd, checkPolicy;

  //numbers check
  checkPolicy = parseInt($(element).val());

  if (checkPolicy > 0) {
    if (length > 0 && length >= checkPolicy) {
      $(element).parent().removeClass("w3-red").addClass("w3-green");
    } else {
      $(element).parent().removeClass("w3-green").addClass("w3-red");
    }
  } else {
    //set input to neutral
    $(element).parent().removeClass("w3-green").removeClass("w3-red");
  }
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