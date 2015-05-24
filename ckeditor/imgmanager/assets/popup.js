/* This compressed file is part of Xinha. For uncompressed sources, forum, and bug reports, go to xinha.org */
/* This file is part of version 0.95 released Mon, 12 May 2008 17:33:15 +0200 */
/* The URL of the most recent version of this file is http://svn.xinha.webfactional.com/trunk/plugins/ExtendedFileManager/assets/popup.js */
function __dlg_onclose() {
    if (opener.Dialog._return) {
        opener.Dialog._return(null);
    }
}

function __dlg_init(_1, _2) {
    __xinha_dlg_init(_2);
}

function __xinha_dlg_init(_3) {
    if (window.__dlg_init_done) {
        return true;
    }
    if (window.opener._editor_skin) {
        var _4 = document.getElementsByTagName("head")[0];
        var _5 = document.createElement("link");
        _5.type = "text/css";
        _5.href = window.opener._editor_url + "skins/" + window.opener._editor_skin + "/skin.css";
        _5.rel = "stylesheet";
        _4.appendChild(_5);
    }
    if (!window.dialogArguments && opener.Dialog._arguments) {
        window.dialogArguments = opener.Dialog._arguments;
    }
    Xinha.addDom0Event(document.body, "keypress", __dlg_close_on_esc);
    window.__dlg_init_done = true;
}

function __dlg_translate(I18N) {
    var _7 = ["span", "option", "td", "th", "button", "div", "label", "a", "img", "legend"];
    for (var _8 = 0; _8 < _7.length; _8++) {
        var _9 = document.getElementsByTagName(_7[_8]);
        for (var i = _9.length; --i >= 0;) {
            var _b = _9[i];
            if (_b.firstChild && _b.firstChild.data) {               
                var _c = I18N[_b.firstChild.data];
                if (_c) {
                    _b.firstChild.data = _c;
                }
            }
            if (_b.title) {              
                var _c = I18N[_b.title];
                if (_c) {
                    _b.title = _c;
                }
            }
            if (_b.alt) {                
                var _c = I18N[_b.alt];
                if (_c) {
                    _b.alt = _c;
                }
            }
        }
    }  
    document.title = I18N[document.title];
}

function __dlg_close(_d) {
//    opener.Dialog._return(_d);
    window.close();
}

function popupPrompt(_e, _f, _10, _11) {
    Dialog("prompt.html", function(_12) {
        if (!_12) {
            return false;
        } else {
            _10(_12.value);
        }
    }, {
        prompt: _e,
        value: _f,
        title: _11
    });
}

function __dlg_close_on_esc(ev) {
    ev || (ev = window.event);
    if (ev.keyCode == 27) {
        __dlg_close(null);
        return false;
    }
    return true;
}