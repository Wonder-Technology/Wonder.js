open WonderWebgl.Gl;

open Js.Typed_array;

/* TODO handle Uint32Array */
let getIndexType = (gl) => getUnsignedShort(gl);

let getIndexTypeSize = (gl) => Uint16Array._BYTES_PER_ELEMENT;