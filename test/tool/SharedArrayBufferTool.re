let setSharedArrayBufferToBeArrayBuffer =
  [@bs] [%bs.raw {|
  function(){
    window.SharedArrayBuffer = window.ArrayBuffer;
  }
  |}];