


var setSharedArrayBufferToBeArrayBuffer = (
  function(param){
    window.SharedArrayBuffer = window.ArrayBuffer;
  }
  );

export {
  setSharedArrayBufferToBeArrayBuffer ,
  
}
/* setSharedArrayBufferToBeArrayBuffer Not a pure module */
