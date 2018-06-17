let buildGLTFJsonOfMultiSceneGameObjects = () =>
  ConvertGLTFTool.buildGLTFJson(
    ~scenes=
      {|
        [
            {
                "nodes": [0,1]
            }
        ]
        |},
    ~nodes={|
    [
{
},
{
}
    ]
    |},
    (),
  );

let testResult = (gltfJson, testFunc, state) =>
  ConvertGLTFTool.testResult(gltfJson, data =>
    testFunc(AssembleWDSystem.assemble(data, state))
  );

let _getChildren = (parent, state) =>
  TransformAPI.unsafeGetTransformChildren(parent, state)
  |> Js.Array.sortInPlace;
let getAllChildrenTransform = (sceneGameObject, state) => {
  let rec _addChildren = (parentArr, state, childrenArr) => {
    let childrenArr = childrenArr |> Js.Array.concat(parentArr);
    parentArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. (state, childrenArr), parent) =>
           _addChildren(_getChildren(parent, state), state, childrenArr),
         (state, childrenArr),
       );
  };
  _addChildren(
    _getChildren(
      GameObjectAPI.unsafeGetGameObjectTransformComponent(
        sceneGameObject,
        state,
      ),
      state,
    ),
    state,
    [||],
  );
};
let getAllSortedTransforms = (sceneGameObject, state) => {
  let (state, allTransformChildren) =
    getAllChildrenTransform(sceneGameObject, state);
  let allTransformChildren = allTransformChildren |> Js.Array.sortInPlace;
  [|
    GameObjectAPI.unsafeGetGameObjectTransformComponent(
      sceneGameObject,
      state,
    ),
  |]
  |> Js.Array.concat(allTransformChildren);
};

let getAllGameObjects = (sceneGameObject, state) => {
  let (state, allTransformChildren) =
    getAllChildrenTransform(sceneGameObject, state);

  [|sceneGameObject|]
  |> Js.Array.concat(
       allTransformChildren
       |> Js.Array.map(transform =>
            TransformAPI.unsafeGetTransformGameObject(transform, state)
          ),
     );
};

let getAllGeometryData = (sceneGameObject, state) =>
  getAllGameObjects(sceneGameObject, state)
  |> Js.Array.filter(gameObject =>
       GameObjectAPI.hasGameObjectGeometryComponent(gameObject, state)
     )
  |> Js.Array.map(gameObject => {
       let geometry =
         GameObjectAPI.unsafeGetGameObjectGeometryComponent(
           gameObject,
           state,
         );

       GameObjectAPI.hasGameObjectBoxGeometryComponent(gameObject, state) ?
         (
           GameObjectAPI.unsafeGetGameObjectName(gameObject, state),
           (
             BoxGeometryAPI.getBoxGeometryVertices(state),
             BoxGeometryAPI.getBoxGeometryNormals(state),
             BoxGeometryAPI.getBoxGeometryTexCoords(state),
             BoxGeometryAPI.getBoxGeometryIndices(state),
           ),
         ) :
         (
           GameObjectAPI.unsafeGetGameObjectName(gameObject, state),
           (
             CustomGeometryTool.getMainVertices(geometry, state),
             CustomGeometryTool.getMainNormals(geometry, state),
             CustomGeometryTool.getMainTexCoords(geometry, state),
             CustomGeometryTool.getMainIndices(geometry, state),
           ),
         );
     });