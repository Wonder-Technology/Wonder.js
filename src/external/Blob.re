open BlobType;

[@bs.new]
external newBlobFromArrayBuffer : array(Js.Typed_array.ArrayBuffer.t) => blob =
  "Blob";

let createObjectURL = [%raw
  blob => {|
     return URL.createObjectURL( blob )
    |}
];

let revokeObjectURL = [%raw
  blob => {|
     return URL.revokeObjectURL( blob )
    |}
];