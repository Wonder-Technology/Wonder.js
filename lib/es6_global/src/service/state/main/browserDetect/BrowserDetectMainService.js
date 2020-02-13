

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";

var _isFirefox = (
    function(){
      var userAgent = navigator.userAgent.toLowerCase();

        return userAgent.indexOf("firefox") > -1 && userAgent.indexOf("mobile") === -1;
    }
    );

var _isChrome = (
    function(){
      var userAgent = navigator.userAgent.toLowerCase();

        return userAgent.indexOf("chrome") > -1 && userAgent.indexOf("mobile") === -1;
    }
    );

var _isAndroid = (
    function(){
        return /Android/i.test(navigator.userAgent)
    }
    );

var _isIOS = (
    function(){
        return /iPhone|iPad|iPod/i.test(navigator.userAgent)
    }
    );

function detect(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var match = _isFirefox() === true;
  var tmp;
  if (match) {
    tmp = /* Firefox */1;
  } else {
    var match$1 = _isChrome() === true;
    if (match$1) {
      tmp = /* Chrome */0;
    } else {
      var match$2 = _isAndroid();
      if (match$2) {
        tmp = /* Android */2;
      } else {
        var match$3 = _isIOS();
        tmp = match$3 ? /* IOS */3 : /* Unknown */4;
      }
    }
  }
  newrecord[/* browserDetectRecord */40] = /* record */[/* browser */tmp];
  return newrecord;
}

function isMobile(state) {
  var match = state[/* browserDetectRecord */40][/* browser */0];
  return match === 3 || match === 2;
}

function detectMobileNotSupportWorker(state) {
  var match = isMobile(state);
  if (match) {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("DetectEnvironmentMainWorkerJob->execJob", "mobile not support worker", "", "", ""));
  } else {
    return /* () */0;
  }
}

export {
  _isFirefox ,
  _isChrome ,
  _isAndroid ,
  _isIOS ,
  detect ,
  isMobile ,
  detectMobileNotSupportWorker ,
  
}
/* _isFirefox Not a pure module */
