import './login.html';

Template.login.rendered = function() {

    console.log("Template.login.rendered");

    $('#login-sign-in-link').text('Einloggen');
    $('.login-close-text').text('Schliessen');
    $('#login-username-or-email-label').text('Benutzername oder Email');
    $('#login-password-label').text('Passwort');
    $('#signup-link').text('Konto erstellen');
    $('#forgot-password-link').text('Passwort vergessen');
    $('#login-buttons-forgot-password').text('Wiederherstellen');
    $('#back-to-login-link').text('Zurück');
    $('#login-username-label').text('Benutzername');
    $('#login-buttons-open-change-password').text('Passwort ändern');
    $('#login-buttons-logout').text('Logout');
    $('#reset-password-new-password-label').text('Neues Passwort');
    $('#login-old-password-label').text('Aktuelles Passwort');
    $('#login-password-label').text('Neues Passwort');
    $('#login-buttons-do-change-password').text('Passwort ändern');
    if ($('#login-buttons-password').text().indexOf('Sign in') != -1) {
      $('#login-buttons-password').text('Einloggen');
    } else {
      $('#login-buttons-password').text('Konto erstellen');
    }
  
    if ($('.message.error-message').text().indexOf('Username must be at least 3 characters long') != -1) {
      $('.message.error-message').text('Benutzername muss mindestens 3 Zeichen lang sein');
    } else if ($('.message.error-message').text().indexOf('Incorrect password') != -1 || $('.message.error-message').text().indexOf('User not found') != -1) {
      $('.message.error-message').text('Benutzername oder Passwort falsch');
    }
  };