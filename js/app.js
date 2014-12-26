var liffUpConfig = {
    template:{
        open : '{{',
        close: '}}',
        clean: '[^]+'
    }
};
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
    var rowTemplate   = document.querySelector("#row-template");
    var accountsTable = document.querySelector("#account_list");
    var accountList   = accountsTable.querySelector('tbody');
    var accountForm   = document.querySelector('#account_form');
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

function render_row ( accountObj, rowTemplate ) {
    var templateString,
        renderedString;
    
    // get needs
    templateString = 
        // check if string of element object
        rowTemplate.substring ?
            rowTemplate : rowTemplate.innerHTML;

    // set defaults
    accountObj = set_row_defaults( accountObj );

    renderedString = replace_values( templateString, accountObj );
    return renderedString;
}

function set_row_defaults ( accountObj ) {
    // for (var i = accountObj.length - 1; i >= 0; i--) {
        // accountObj['account'] = /[0-9\.\-]/.match( accountObj['account'] )
        // accountObj['amount'] = /[0-9\.\-]/.match( accountObj['amount'] )
        // accountObj['description'] = /[0-9\.\-]/.match( accountObj['description'] )
        // accountObj['balance'] = /[0-9\.\-]/.match( accountObj['balance'] )
    // };
    return accountObj;
}

function replace_values ( templateString, accountObj ) {
    /***
        this function renders the template string dynamically.
        uses the passed data object's keys as target for replacement
    */

    // get keys to iterate on replacements
    var accountObjKeys = Object.keys( accountObj );
    var renderedString = templateString;

    // iterate
    for (var i = accountObjKeys.length - 1; i >= 0; i--) {
        // create regex obj
        var dataIndexRegex = RegExp( "{{" + accountObjKeys[i] + "}}", 'g' );
        // get value to replace
        var dataValue = accountObj[ accountObjKeys[i] ];

        // execute replace
        renderedString = renderedString.replace( dataIndexRegex, dataValue );
    };
    return renderedString;
}

function clean_rendered_string ( renderedString, emptyMarkString ) {
    // generate regex for cleaning unreplaced values
    cleaningRegExp = 
        RegExp(
            liffUpConfig.template.open + 
            liffUpConfig.template.clean + 
            liffUpConfig.template.close,
            'g'
        );

    emptyMarkString = emptyMarkString || '';

    // execute replace
    renderedString = renderedString.replace( cleaningRegExp, emptyMarkString )

    return renderedString;
}

function append_row_element ( renderedString, accountList ) {
    // append row by manipulating innerHTML
    // if it is better to use appendChild, replace this implementation
    // replace implementation if the rows has events
    // accountList
    accountList.innerHTML = accountList.innerHTML + renderedString;

    return true;
}
