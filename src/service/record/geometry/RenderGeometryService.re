open Gl;

open Js.Typed_array;

let getDrawMode = (gl) => getTriangles(gl);

/* TODO handle UInt32Array */
let getIndexType = (gl) => getUnsignedShort(gl);

let getIndexTypeSize = (gl) => Uint16Array._BYTES_PER_ELEMENT;