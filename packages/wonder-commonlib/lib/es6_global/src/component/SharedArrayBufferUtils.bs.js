


var _isSupportSharedArrayBuffer = (function(param){
        return typeof SharedArrayBuffer !== "undefined"
    });

function newSharedArrayBuffer(totalByteLength) {
  return new SharedArrayBuffer(totalByteLength);
}

export {
  _isSupportSharedArrayBuffer ,
  newSharedArrayBuffer ,
  
}
/* No side effect */
