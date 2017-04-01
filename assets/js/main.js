$(document).ready(function () {

    // Cover arrow
    var arr = $('.arrow');
    var st = $(this).scrollTop();
    if (st > 20)
        stopAnimation();
    else
        arr.delay(2500).fadeIn(1000);
    $(window).scroll(function () {
        var st = $(this).scrollTop();
        if (st > 20)
            stopAnimation();
        else
            arr.show();
    });
    function stopAnimation() {
        arr.stop();
        arr.hide();
        arr.removeClass('bounce');
    }

    // Get current language
    var vals = window.location.href.split('/');
    var lang = (vals.length > 3) ? vals[3] : 'en';

    // Validation and signup logic
    var fni = $('#firstName');
    var lni = $('#lastName');
    var ei = $('#email');
    var sb = $('#submit');
    var sbHtml = sb.html();
    var sr = $('#signupRow');
    var ar = $('#alertRow');
    var sa = $('#signupAlert');

    $('#signup').validator().on('submit', function (e) {
        if (e.isDefaultPrevented()) return;
        ar.hide();
        var firstName = fni.val();
        var lastName = lni.val();
        var email = ei.val();
        e.preventDefault();
        signUp(firstName, lastName, email)
    });

    function signUp(firstName, lastName, email) {
        setBusy(true);
        var s = {type: 'POST', contentType: 'application/json'};
        s.data = {firstName: firstName, lastName: lastName, email: email, lang: lang};
        s.data[r('zntvp')] = r('pEPa7jlr3mSpEsKXENLoKpOllOizeRQh');
        s[r('hey')] = r('uggcf://pbybohf-ncv.urebxhncc.pbz/hfref/');
        s.data = JSON.stringify(s.data);
        s.success = function () {
            setBusy(false);
            showAlert(true);
        };
        s.error = function (jqxhr, status, err) {
            if (err) {
                console.log('jqXHR: ' + JSON.stringify(jqxhr));
                console.log('Status: ' + status);
                console.log('Error: ' + err);
            }
            setBusy(false);
            showAlert(false);
        };
        $.ajax(s);
    }

    function setBusy(b) {
        fni.prop('disabled', b);
        lni.prop('disabled', b);
        ei.prop('disabled', b);
        sb.prop('disabled', b);
        sb.html(b ? '...' : sbHtml);
    }

    function showAlert(success) {
        sa.removeClass(success ? 'alert-danger' : 'alert-success');
        sa.addClass(success ? 'alert-success' : 'alert-danger');
        if (success) {
            sa.html(messages[lang].signup.success);
            sr.hide();
        } else
            sa.html(messages[lang].signup.error);
        ar.show();
    }

    function r(s) {
        return s.replace(/[a-zA-Z]/g, function (c) {
            return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
        });
    }
});

var messages = {
    en: {
        signup: {
            success: 'Thanks for signing up! We will keep you informed.',
            error: 'Oops, something went wrong and your data was not sent. Please try again.'
        }
    },
    de: {
        signup: {
            success: 'Danke für Ihre Anmeldung. Wir werden Sie auf dem Laufenden halten.',
            error: 'Beim Senden ging leider etwas schief. Bitte probieren Sie es noch einmal.'
        }
    }
};