"use strict";
var delay;
var myTextArea = document.getElementById('myTextArea');
var response = document.getElementById('response');

var editor = CodeMirror.fromTextArea(myTextArea, {
    mode: "application/x-httpd-php",
    lineNumbers: true,
    styleActiveLine: true,
    indentWithTabs: true,
    matchBrackets: true,
    viewportMargin: Infinity,
    indentUnit: 4,
    theme: 'mdn-like'
});

// theme

var input = document.getElementById("select");
input.addEventListener('change', selectTheme);
function selectTheme() {
    var theme = input.options[input.selectedIndex].innerHTML;
    editor.setOption("theme", theme);
}
var choice = document.location.search &&
    decodeURIComponent(document.location.search.slice(1));
if (choice) {
    input.value = choice;
    editor.setOption("theme", choice);
}

loadXMLDoc(response, 'http://codemirror.massinflux.com?data=' + encodeURI(myTextArea.value));

function loadXMLDoc(div, path) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            div.innerHTML = xmlhttp.responseText;
        }
    };
    xmlhttp.open("GET", path, true);
    xmlhttp.send();
}