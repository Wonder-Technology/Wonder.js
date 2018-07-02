open BlobType;

/* [@bs.new]
   external newBlobFromArrayBuffer :
     (array(Js.Typed_array.ArrayBuffer.t), Js.t({. type: string})) => blob =
     "Blob"; */

let newBlobFromArrayBuffer = [%raw
  (arrayBuffer, type_) => {|
return new Blob([arrayBuffer], {type: type_})
  |}
];

let createObjectURL = [%raw
  blob => {|
     return URL.createObjectURL( blob )
    |}
];

let revokeObjectURL = [%raw
  blob => {|
     URL.revokeObjectURL( blob );
    |}
];