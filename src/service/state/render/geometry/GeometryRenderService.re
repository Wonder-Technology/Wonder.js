open WonderWebgl.Gl;

open StateRenderType;

open RenderGeometryType;

open Js.Typed_array;

let unsafeGetIndicesType = (geometry, {geometryRecord}) =>
  IndicesTypeAllGeometryService.unsafeGetIndicesType(
    geometry,
    geometryRecord.indicesTypeMap,
  );

let getIndexType = (gl, geometry, state) =>
  switch (unsafeGetIndicesType(geometry, state)) {
  | GeometryType.Short => getUnsignedShort(gl)
  | GeometryType.Int => getUnsignedInt(gl)
  };

let getIndexTypeSize = (gl, geometry, state) =>
  switch (unsafeGetIndicesType(geometry, state)) {
  | GeometryType.Short => Uint16Array._BYTES_PER_ELEMENT
  | GeometryType.Int => Uint32Array._BYTES_PER_ELEMENT
  };