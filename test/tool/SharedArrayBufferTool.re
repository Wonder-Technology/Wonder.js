let setSharedArrayBufferToBeArrayBuffer = [%bs.raw
  {|
  function(){
    window.SharedArrayBuffer = window.ArrayBuffer;
  }
  |}
];