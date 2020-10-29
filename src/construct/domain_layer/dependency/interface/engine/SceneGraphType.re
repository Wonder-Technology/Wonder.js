type gameObject;

type position = (float, float, float);

type rotation = (float, float, float, float);

type scale = (float, float, float);

type localToWorldMatrix = Js.Typed_array.Float32Array.t;

type normalMatrix = Js.Typed_array.Float32Array.t;

// type transform = {
//   localPosition: position,
//   localRotation: rotation,
//   localScale: scale,
//   worldPosition: position,
//   worldRotation: rotation,
//   worldScale: scale,
//   localToWorldMatrix,
//   normalMatrix,
// };

type transform;