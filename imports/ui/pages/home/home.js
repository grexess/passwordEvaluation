import './home.html';

import '../../components/login/login.js';
import '../../components/chart/chart.js';
import '../../components/chart/bruteforce.js';
import '../../components/chart/hashvalues.js';
import '../../components/dictionary.js';
import '../../components/pepperandsalt.js';
import '../../components/links.js';
import '../../components/pawned.js';

RandExp = require('randexp');

Template.App_home.onCreated(function () {
  Session.set("minCharacterAmount", 0);
  Session.set("password", "");
})

Template.App_home.events({

  'input #password'(event, template) {

    Session.set("password", event.currentTarget.value);

    verifyPasswordPolicy();
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

    verifyPasswordPolicy();
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

function verifyPasswordPolicy() {
  matchCharacters("#xSpecial", /[ !\"#$%&\'\(\)\*\+,\-\.\/:;<=>?@\[\\\]^_`{|}~]/g, "#zspecialChar");
  matchCharacters("#xKleinbuchstaben", /[a-z]/g, "#zsmallChar");
  matchCharacters("#xGrossbuchstaben", /[A-Z]/g, "#zbigChar");
  matchCharacters("#xNumbers", /[0-9]/g, "#zNumbers");
  matchCharacters("#xUmlaute", /[ä,Ä,ö,Ö,ü,Ü,ß]/g, "#zgermanUmlaut");
  //matchCharacters("#xUmlaute", /[\u00F0-\u02AF]/g, "#zgermanUmlaut");
}

/*prüfe Anzahl verschiedener Zeichensätze */
function matchCharacters(idAnalyse, regex, idPolicy) {

  generateRandomPassword(regex, idPolicy);

  let x = Session.get("password").match(regex);
  if (x) {
    $(idAnalyse).val(x.length);
    checkSpecialPolicy(x.length, idPolicy);
  } else {
    $(idAnalyse).val(0);
    checkSpecialPolicy(0, idPolicy);
  }
}

function generateRandomPassword(regex, id) {

  let checkPolicy = parseInt($(id).val());

  for (i = 0; i < checkPolicy; i++) {
    console.log("Random: " + new RandExp(regex).gen());
  }
}

function checkPasswordPolicy() {

  let amount = 0;
  $(".pwdPolicy").each(function () {
    if (!$(this).prop('disabled')) {
      amount = amount + parseInt($(this).val());
    }
  });

  if (amount <= 6) {
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

  Session.set("minCharacterAmount", amount);
}

function checkSpecialPolicy(length, id) {
  let checkPwd, checkPolicy;

  checkPolicy = parseInt($(id).val());

  if (checkPolicy > 0) {
    if (length > 0 && length >= checkPolicy) {
      $(id).parent().removeClass("w3-red").addClass("w3-green");
    } else {
      $(id).parent().removeClass("w3-green").addClass("w3-red");
    }
  } else {
    //set input to neutral
    $(id).parent().removeClass("w3-green").removeClass("w3-red");
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

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}