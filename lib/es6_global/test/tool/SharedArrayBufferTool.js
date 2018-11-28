


var setSharedArrayBufferToBeArrayBuffer = (
  function(){
    window.SharedArrayBuffer = window.ArrayBuffer;
  }
  );

export {
  setSharedArrayBufferToBeArrayBuffer ,
  
}
/* setSharedArrayBufferToBeArrayBuffer Not a pure module */
