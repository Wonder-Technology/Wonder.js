'use strict';


var setSharedArrayBufferToBeArrayBuffer = (
  function(){
    window.SharedArrayBuffer = window.ArrayBuffer;
  }
  );

exports.setSharedArrayBufferToBeArrayBuffer = setSharedArrayBufferToBeArrayBuffer;
/* setSharedArrayBufferToBeArrayBuffer Not a pure module */
