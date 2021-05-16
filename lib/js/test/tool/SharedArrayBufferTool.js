'use strict';


var setSharedArrayBufferToBeArrayBuffer = (
  function(param){
    window.SharedArrayBuffer = window.ArrayBuffer;
  }
  );

exports.setSharedArrayBufferToBeArrayBuffer = setSharedArrayBufferToBeArrayBuffer;
/* setSharedArrayBufferToBeArrayBuffer Not a pure module */
