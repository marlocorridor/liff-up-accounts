// DOMContentLoaded is fired once the document has been loaded and parsed,
// but without waiting for other external resources to load (css/images/etc)
// That makes the app more responsive and perceived as faster.
// https://developer.mozilla.org/Web/Reference/Events/DOMContentLoaded
window.addEventListener('DOMContentLoaded', function() {

  // We'll ask the browser to use strict code to help us catch errors earlier.
  // https://developer.mozilla.org/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode
  'use strict';

  // setup variables
  // element variables
  var rowTemplate = document.querySelector("#row-template");
  var accountsTable = document.querySelector("#account_list");
  var accountList = accountsTable.querySelector('tbody');
  // result variables

  // attach function calls on elements' event

  // We want to wait until the localisations library has loaded all the strings.
  // So we'll tell it to let us know once it's ready.
  navigator.mozL10n.once( localisations_load_callback );
});

  // ---
  // define functions here
  function localisations_load_callback () {
    // navigator.mozL10n.language.code = 'ph';
    console.log('localisations loaded');
  }

