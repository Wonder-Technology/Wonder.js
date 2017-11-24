open GeometryType;

open BoxGeometry;

let computeData = (geometry, state: StateDataType.state) =>
  BoxGeometryCreateUtils._computeData(geometry, state);

let getDefaultIndicesArray = () => [|
  0,
  2,
  1,
  2,
  3,
  1,
  4,
  6,
  5,
  6,
  7,
  5,
  8,
  10,
  9,
  10,
  11,
  9,
  12,
  14,
  13,
  14,
  15,
  13,
  16,
  18,
  17,
  18,
  19,
  17,
  20,
  22,
  21,
  22,
  23,
  21
|];

let getDefaultIndices = () => Js.Typed_array.Uint16Array.make(getDefaultIndicesArray());

let getDefaultVertices = () =>
  Js.Typed_array.Float32Array.make([|
    (-10.),
    (-10.),
    10.,
    (-10.),
    10.,
    10.,
    10.,
    (-10.),
    10.,
    10.,
    10.,
    10.,
    10.,
    (-10.),
    (-10.),
    10.,
    10.,
    (-10.),
    (-10.),
    (-10.),
    (-10.),
    (-10.),
    10.,
    (-10.),
    (-10.),
    10.,
    10.,
    (-10.),
    10.,
    (-10.),
    10.,
    10.,
    10.,
    10.,
    10.,
    (-10.),
    10.,
    (-10.),
    10.,
    10.,
    (-10.),
    (-10.),
    (-10.),
    (-10.),
    10.,
    (-10.),
    (-10.),
    (-10.),
    10.,
    (-10.),
    10.,
    10.,
    10.,
    10.,
    10.,
    (-10.),
    (-10.),
    10.,
    10.,
    (-10.),
    (-10.),
    (-10.),
    (-10.),
    (-10.),
    10.,
    (-10.),
    (-10.),
    (-10.),
    10.,
    (-10.),
    10.,
    10.
  |]);

let setDefaultConfigData = (geometry: geometry, state: StateDataType.state) =>
  state
  |> setBoxGeometryConfigData(
       geometry,
       GeometryTool.buildBoxGeometryConfigDataJsObj(
         ~width=Js.Nullable.return(10.),
         ~height=Js.Nullable.return(10.),
         ~depth=Js.Nullable.return(10.),
         ()
       )
     );

let createBoxGeometry = (state: StateDataType.state) => {
  let (state, geometry) = createBoxGeometry(state);
  let state = state |> setDefaultConfigData(geometry);
  (state, geometry)
};

let createGameObject = (state: StateDataType.state) => {
  let (state, geometry) = createBoxGeometry(state);
  let state = state |> setDefaultConfigData(geometry);
  let (state, gameObject) = GameObject.createGameObject(state);
  let state = state |> GameObject.addGameObjectGeometryComponent(gameObject, geometry);
  (state, gameObject, geometry)
};