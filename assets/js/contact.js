$(document).ready(function () {

    // Get current language
    var vals = window.location.href.split('/');
    var lang = (vals.length > 3) ? vals[3] : 'en';

    // Validation and message logic
    var ni = $('#name');
    var ei = $('#email');
    var mi = $('#message');
    var sb = $('#submit');
    var sbHtml = sb.html();
    var mr = $('#messageRow');
    var ar = $('#alertRow');
    var ma = $('#messageAlert');

    $('#contact').validator().on('submit', function (e) {
        if (e.isDefaultPrevented()) return;
        ar.hide();
        var name = ni.val();
        var email = ei.val();
        var message = mi.val().replace(/\n/g, '<br>');
        e.preventDefault();
        sendMessage(name, email, message)
    });

    function sendMessage(name, email, message) {
        setBusy(true);
        var s = {type: 'POST', contentType: 'application/json'};
        s.data = {name: name, email: email, message: message, lang: lang};
        s.data[r('zntvp')] = r('aWrqTA9kknH4G4nW2Ifm4ZdxWx8LMvd9');
        s[r('hey')] = r('uggcf://pbybohf-ncv.urebxhncc.pbz/zrffntrf/');
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
        ni.prop('disabled', b);
        ei.prop('disabled', b);
        mi.prop('disabled', b);
        sb.prop('disabled', b);
        sb.html(b ? '...' : sbHtml);
    }

    function showAlert(success) {
        ma.removeClass(success ? 'alert-danger' : 'alert-success');
        ma.addClass(success ? 'alert-success' : 'alert-danger');
        if (success) {
            ma.html(messages[lang].signup.success);
            mr.hide();
        } else
            ma.html(messages[lang].signup.error);
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
            success: 'Your message was sent. We\'ll get back to you as soon as possible.',
            error: 'Oops, something went wrong and your message was not sent. Please try again.'
        }
    },
    de: {
        signup: {
            success: 'Ihre Nachricht wurde gesendet. Wir melden uns so schnell wie möglich bei Ihnen.',
            error: 'Beim Senden Ihrer Nachricht ging leider etwas schief. Bitte probieren Sie es noch einmal.'
        }
    }
};