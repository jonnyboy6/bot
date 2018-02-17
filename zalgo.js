var settings = {
    'above': {'min': 5, 'max': 10},
    'below': {'min': 5, 'max': 10},
    'overlay': {'min': 0, 'max': 1}
};

function getRandIntBetween(min, max) {
    return Math.floor(Math.random()*(max-min+1))+min;
}

function generateRandomZalgo (originalTxt, marksTable, generateSettings, generateHtmlTF) {

    var convertedTxt = "";
    var convertedHtml = "";

    for (var c = 0; c < originalTxt.length; c++) {
        convertedTxt += originalTxt.charAt(c);

        if (generateHtmlTF) {
            convertedHtml += originalTxt.charAt(c);
        }

        if (originalTxt.charAt(c) != " ") {
            for (var gSettingsType in generateSettings) {
                var randWithinSettings = getRandIntBetween(generateSettings[gSettingsType]['min'], generateSettings[gSettingsType]['max']);
                var markTypeLength = zalgoMarks[gSettingsType].length;

                for (var c2=0; c2 < randWithinSettings; c2++){
                    var markToInclude = marksTable[gSettingsType][getRandIntBetween(0,markTypeLength-1)];
                    convertedTxt += markToInclude;

                    if (generateHtmlTF) {
                        convertedHtml += zalgoMarksHtml[markToInclude];
                    }

                }

            }
        }
    }

    return new Array(convertedTxt, convertedHtml);
}

function setZalgo() {
    zalgoConverted = generateRandomZalgo($("#originaltext").val(), zalgoMarks, settings, viewingHtml);
    //alert();
    if ($("#textfor").val() == "facebook") {
        if (zalgoConverted[0] != "") {
            $("#zalgotext").val(".\r\n.\r\n"+zalgoConverted[0]+"\r\n.\r\n.");
            $("#zalgotext").css("line-height", "1.1em");
        } else {
            $("#zalgotext").val("");
        }
    }
    else {
        $("#zalgotext").val(zalgoConverted[0]);
        $("#zalgotext").css("line-height", "5em");
    }

    if (zalgoConverted[0] != "") {
        $("#generatezalgosubmit").val("Re-generate Zalgo Text");
    }

    if (viewingHtml) {
        $("#zalgohtml").val(zalgoConverted[1]);
    }
}

var viewingHtml = false;

$(document).ready(function() {
    $("#originaltext").focus();
    $("#originaltext").keyup(function() {
        setZalgo();
    });

    textClicksAfterFocus=0;
    $("textarea#zalgotext").mouseup(function(event) {
        if (textClicksAfterFocus==0) {
            event.preventDefault();
        }
        textClicksAfterFocus++;
    }).focus(function() {
        $(this).select();
        textClicksAfterFocus=0;
    });

    htmlClicksAfterFocus=0;
    $("textarea#zalgohtml").mouseup(function(event) {
        if (htmlClicksAfterFocus==0) {
            event.preventDefault();
        }
        htmlClicksAfterFocus++;
    }).focus(function() {
        $(this).select();
        htmlClicksAfterFocus=0;
    });

    $("#textfor").change(function() {
        setZalgo();
    });

    $("input#generatezalgosubmit").click(function(e) {
        setZalgo();
        e.preventDefault();
    });

    $("input#viewhtml").click(function(e) {
        $("input#viewhtml").hide();
        $("div#zalgohtmlc").show();
        viewingHtml = true;
        setZalgo();
        e.preventDefault();
    });

    $("form").submit(function(e) {
        setZalgo();
        //alert("s");
        e.preventDefault();
    });
});