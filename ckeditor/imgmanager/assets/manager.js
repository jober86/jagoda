/* This compressed file is part of Xinha. For uncompressed sources, forum, and bug reports, go to xinha.org */
/* This file is part of version 0.95 released Mon, 12 May 2008 17:33:15 +0200 */
/* The URL of the most recent version of this file is http://svn.xinha.webfactional.com/trunk/plugins/ExtendedFileManager/assets/manager.js */
function comboSelectValue(c, _2) {
    var _3 = c.getElementsByTagName("option");
    for (var i = _3.length; --i >= 0;) {
        var op = _3[i];
        op.selected = (op.value == _2);
    }
    c.value = _2;
}

function i18n(_6) {
    if (I18N)
        return (I18N[_6] || _6);
    else
        return _6;
}

function setAlign(_7) {
    var _8 = document.getElementById("f_align");
    for (var i = 0; i < _8.length; i++) {
        if (_8.options[i].value == _7) {
            _8.selectedIndex = i;
            break;
        }
    }
}

function onTargetChanged() {
    var f = document.getElementById("f_other_target");
    if (this.value == "_other") {
        f.style.visibility = "visible";
        f.select();
        f.focus();
    } else {
        f.style.visibility = "hidden";
    }
}

function init() {
    
    if (typeof imgManager == "undefined") {
        setTimeout(init, 10);
        return;
    }
    
    if(window.opener)
        CKEDITOR = window.opener.CKEDITOR;    
    
    __dlg_translate(I18N);
    
    var w = screen.availWidth;
    var h = screen.availHeight-100;
   
    window.moveTo(0, 0);
    window.resizeTo(w, h);
    
   
    var uploadForm = document.getElementById("uploadForm");
    if (uploadForm) {
        uploadForm.target = "imgManager";
    }
       
    document.body.onkeypress = __dlg_close_on_esc;
    
    setTimeout(function() {
        resize();
        addEvent(window, "resize", resize);
    }, 500);
}

function pasteButton(_22) {
    var _23 = document.getElementById("pasteBtn");
    if (!_23.firstChild) {
        var a = document.createElement("a");
        a.href = "javascript:void(0);";
        var img = document.createElement("img");
        img.src = window.opener.Xinha.getPluginDir("ExtendedFileManager") + "/img/edit_paste.gif";
        img.alt = i18n("Paste");
        a.appendChild(img);
        _23.appendChild(a);
    }
    _23.onclick = function() {
        if (typeof imgManager != "undefined") {
            imgManager.paste(_22);
        }
        if (_22.action == "moveFile" || _22.action == "moveDir") {
            this.onclick = null;
            this.removeChild(this.firstChild);
        }
    };
    switch (_22.action) {
        case "copyFile":
            _23.firstChild.title = i18n("Copy \"$file=" + _22.file + "$\" from \"$dir=" + decodeURIComponent(_22.dir) + "$\" here");
            break;
        case "copyDir":
            _23.firstChild.title = i18n("Copy folder \"$file=" + _22.file + "$\" from \"$dir=" + decodeURIComponent(_22.dir) + "$\" here");
            break;
        case "moveFile":
            _23.firstChild.title = i18n("Move \"$file=" + _22.file + "$\" from \"$dir=" + decodeURIComponent(_22.dir) + "$\" here");
            break;
            break;
        case "moveDir":
            _23.firstChild.title = i18n("Move folder \"$file=" + _22.file + "$\" from \"$dir=" + decodeURIComponent(_22.dir) + "$\" here");
            break;
    }
}

function onCancel() {
    __dlg_close(null);
    return false;
}

function onOK() {
    if (manager_mode == "image") {
        var _26 = ["f_url", "f_alt", "f_title", "f_align", "f_border", "f_margin", "f_padding", "f_height", "f_width", "f_borderColor", "f_backgroundColor"];
        var _27 = new Object();
        for (var i in _26) {
            var id = _26[i];
            var el = document.getElementById(id);
            if (id == "f_url" && el.value.indexOf("://") < 0 && el.value) {
                _27[id] = makeURL(base_url, el.value);
                
            } else {
                _27[id] = el.value;
            }
        }
        var _2b = {
            w: document.getElementById("orginal_width").value,
            h: document.getElementById("orginal_height").value
        };
        
        if ((_2b.w != _27.f_width) || (_2b.h != _27.f_height)) {
            
            var url = window.top.opener.CKEDITOR.basePath + 'imgmanager/' + _backend_url + "&__function=resizer&img=" + encodeURIComponent(document.getElementById("f_url").value) + "&width=" + _27.f_width + "&height=" + _27.f_height;
            var $ = window.top.opener.$;            
            $.get( url, function(uri) {                   
               
                if (uri) {
                    _27.f_url = makeURL(base_url, uri.replace(/'/g, ''));
                }
                return returnCKE(_27);
            });           
            
        }else {
            return returnCKE(_27);
        }
       
    } else {
        if (manager_mode == "link") {
            var _2d = {};
            for (var i in _2d) {
                var el = document.getElementById(i);
                if (!el.value) {
                    alert(_2d[i]);
                    el.focus();
                    return false;
                }
            }
            var _26 = ["f_href", "f_title", "f_target"];
            var _27 = new Object();
            for (var i in _26) {
                var id = _26[i];
                var el = document.getElementById(id);
                if (id == "f_href" && el.value.indexOf("://") < 0) {
                    _27[id] = makeURL(base_url, el.value);
                } else {
                    _27[id] = el.value;
                }
            }
            if (_27.f_target == "_other") {
                _27.f_target = document.getElementById("f_other_target").value;
            }
            __dlg_close(_27);
            return false;
        }
    }
}

function returnCKE(_27){
    
    funcNum = getUrlParam('CKEditorFuncNum') ;	
	
    //fixed the issue: images are not displayed in preview window when filename contain spaces due encodeURI encoding already encoded fileUrl	
    window.top.opener.CKEDITOR.tools.callFunction( funcNum, _27.f_url);

    ///////////////////////////////////
    window.top.close() ;
    window.top.opener.focus() ;
    return false;
    
}

function makeURL(_2e, _2f) {
    if (_2e.substring(_2e.length - 1) != "/") {
        _2e += "/";
    }
    if (_2f.charAt(0) == "/") {}
    _2f = _2f.substring(1);
    return _2e + _2f;
}

function updateDir(_30) {
    var _31 = _30.options[_30.selectedIndex].value;
    changeDir(_31);
}

function goUpDir() {
    var _32 = document.getElementById("dirPath");
    var _33 = _32.options[_32.selectedIndex].text;
    if (_33.length < 2) {
        return false;
    }
    var _34 = _33.split("/");
    var _35 = "";
    for (var i = 0; i < _34.length - 2; i++) {
        _35 += _34[i] + "/";
    }
    for (var i = 0; i < _32.length; i++) {
        var _37 = _32.options[i].text;
        if (_37 == _35) {
            _32.selectedIndex = i;
            var _38 = _32.options[i].value;
            changeDir(_38);
            break;
        }
    }
}

function changeDir(_39) {
    if (typeof imgManager != "undefined") {
        imgManager.changeDir(_39);
    }
}

function updateView() {
    refresh();
}

function toggleConstrains(_3a) {
    var _3b = document.getElementById("imgLock");
    var _3a = document.getElementById("constrain_prop");
    if (_3a.checked) {
        _3b.src = "img/locked.gif";
        checkConstrains("width");
    } else {
        _3b.src = "img/unlocked.gif";
    }
}

function checkConstrains(_3c) {
    var _3d = document.getElementById("constrain_prop");
    if (_3d.checked) {
        var obj = document.getElementById("orginal_width");
        var _3f = parseInt(obj.value);
        var obj = document.getElementById("orginal_height");
        var _40 = parseInt(obj.value);
        var _41 = document.getElementById("f_width");
        var _42 = document.getElementById("f_height");
        var _43 = parseInt(_41.value);
        var _44 = parseInt(_42.value);
        if (_3f > 0 && _40 > 0) {
            if (_3c == "width" && _43 > 0) {
                _42.value = parseInt((_43 / _3f) * _40);
            }
            if (_3c == "height" && _44 > 0) {
                _41.value = parseInt((_44 / _40) * _3f);
            }
        }
    }
}

function showMessage(_45) {
    var _46 = document.getElementById("message");
    var _47 = document.getElementById("messages");
    if (_46.firstChild) {
        _46.removeChild(_46.firstChild);
    }
    _46.appendChild(document.createTextNode(i18n(_45)));
    _47.style.display = "block";
}

function addEvent(obj, _49, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(_49, fn, true);
        return true;
    } else {
        if (obj.attachEvent) {
            var r = obj.attachEvent("on" + _49, fn);
            return r;
        } else {
            return false;
        }
    }
}

function doUpload() {
    var _4c = document.getElementById("uploadForm");
    if (_4c) {
        showMessage("Uploading");
    }
}

function refresh() {
    var _4d = document.getElementById("dirPath");
    updateDir(_4d);
}

function newFolder() {
    function createFolder(_4e) {
        var _4f = document.getElementById("dirPath");
        var dir = _4f.options[_4f.selectedIndex].value;
        if (_4e == thumbdir) {
            alert(i18n("Invalid folder name, please choose another folder name."));
            return false;
        }
        if (_4e && _4e != "" && typeof imgManager != "undefined") {
            imgManager.newFolder(dir, encodeURI(_4e));
        }
    }
  
//        popupPrompt(i18n("Please enter name for new folder..."), i18n("Untitled"), createFolder, i18n("New Folder"));
    
        var _51 = prompt(i18n("Please enter name for new folder..."), i18n("Untitled"));
        createFolder(_51);
  
}

function resize() {
    var win = {y : window.innerHeight, x : window.innerWidth};
    var m = document.getElementById("messages");
    var _54 = (m && m.style.display != "none") ? parseInt(document.getElementById("messages").offsetHeight, 10) : 0;
    document.getElementById("imgManager").style.height = parseInt(win.y - 130 - document.getElementById("controls").offsetHeight, 10) - _54 + "px";
    return true;
}

function getUrlParam( paramName ) {
    var reParam = new RegExp( '(?:[\?&]|&)' + paramName + '=([^&]+)', 'i' ) ;
    var match = window.location.search.match(reParam) ;

    return ( match && match.length > 1 ) ? match[ 1 ] : null ;
}

addEvent(window, 'load', init);