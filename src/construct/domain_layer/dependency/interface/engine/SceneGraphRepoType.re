type gameObject;

type sceneGameObject = gameObject;

type transform;

type directionLight;

type basicCameraView;

type perspectiveCameraProjection;

type bsdfMaterial;

type geometry;

type position = (float, float, float);

type rotation = (float, float, float, float);

type eulerAngles = (float, float, float);

type scale = (float, float, float);

type localToWorldMatrix = Js.Typed_array.Float32Array.t;

type normalMatrix = Js.Typed_array.Float32Array.t;

type color3 = (float, float, float);

type color4 = (float, float, float, float);

type intensity = float;

type direction = (float, float, float);

type far = float;

type near = float;

type aspect = float;

type fovy = float;

type viewWorldToCameraMatrix = Js.Typed_array.Float32Array.t;

type projectionMatrix = Js.Typed_array.Float32Array.t;

type diffuse = color4;

type emissionColor = color3;

type specularColor = color3;

type imageId = string;

type imageData = {
  width: int,
  height: int,
  data: Js.Typed_array.Uint8Array.t,
};

// TODO use enum
// type wrap =
//   | ClampToEdge
//   | Repeat
//   | Mirror;
type wrap = int;

type wrapData = (wrap, wrap);
