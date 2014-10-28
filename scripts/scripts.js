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
    autoCloseBrackets: true,
    theme: 'mdn-like',
    extraKeys: {
        "F11": function (cm) {
            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },
        "Esc": function (cm) {
            if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
        }
    }
});

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

var getResults = document.getElementById('get_results');
getResults.onclick = function () {
    document.getElementById('wait_for_it').style.display = 'block';
    loadXMLDoc(response, 'http://codemirror.massinflux.com?data=' + encodeURIComponent(editor.getValue()).replace(/%20/g,'+'));
};

loadXMLDoc(response, 'http://codemirror.massinflux.com?data=' + encodeURIComponent(myTextArea.value).replace(/%20/g,'+'));

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
            document.getElementById('wait_for_it').style.display = 'none';
            div.innerHTML = xmlhttp.responseText;
        }
    };
    xmlhttp.open("GET", path, true);
    xmlhttp.send();
}