chrome.devtools.panels.create("ServePHP",
    "MyPanelIcon.png",
    "panel.html",
    function(panel) {
        console.log(panel);

        // code invoked on panel creation
    }
);