let setSharedArrayBufferToBeArrayBuffer =
  [@bs] [%bs.raw {|
  function(param){
    window.SharedArrayBuffer = window.ArrayBuffer;
  }
  |}];