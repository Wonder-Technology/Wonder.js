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

let testResult = (gltfJson, testFunc, state) => {
  open Js.Promise;
  let result = ref(Obj.magic(1));

  ConvertTool.buildFakeLoadImage();

  AssembleWDAPI.assembleGLTF(gltfJson, state)
  |> Most.forEach(data => result := data)
  |> then_(() => testFunc(result^) |> resolve);
};

let testGlb = (sandbox, glbFilePath, testFunc, state) => {
  open Js.Promise;

  let result = ref(Obj.magic(1));

  ConvertGLBTool.testResult(sandbox, glbFilePath, wdRecord =>
    AssembleWDAPI.assembleWD(wdRecord, state)
    |> Most.forEach(data => result := data)
    |> then_(() => testFunc(result^) |> resolve)
  );
};

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

let getAllDirectionLightData = (sceneGameObject, state) =>
  getAllGameObjects(sceneGameObject, state)
  |> Js.Array.filter(gameObject =>
       GameObjectAPI.hasGameObjectDirectionLightComponent(gameObject, state)
     )
  |> Js.Array.map(gameObject =>
       GameObjectAPI.unsafeGetGameObjectDirectionLightComponent(
         gameObject,
         state,
       )
     )
  |> Js.Array.map(light =>
       (
         DirectionLightAPI.getDirectionLightColor(light, state),
         DirectionLightAPI.getDirectionLightIntensity(light, state),
       )
     );

let getAllPointLightData = (sceneGameObject, state) =>
  getAllGameObjects(sceneGameObject, state)
  |> Js.Array.filter(gameObject =>
       GameObjectAPI.hasGameObjectPointLightComponent(gameObject, state)
     )
  |> Js.Array.map(gameObject =>
       GameObjectAPI.unsafeGetGameObjectPointLightComponent(gameObject, state)
     )
  |> Js.Array.map(light =>
       (
         PointLightAPI.getPointLightColor(light, state),
         PointLightAPI.getPointLightIntensity(light, state),
         PointLightAPI.getPointLightConstant(light, state),
         PointLightAPI.getPointLightLinear(light, state),
         PointLightAPI.getPointLightQuadratic(light, state),
         PointLightAPI.getPointLightRange(light, state),
       )
     );

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

let batchCreate = BatchCreateSystem.batchCreate;

let getAllLightMaterials = (sceneGameObject, state) =>
  getAllGameObjects(sceneGameObject, state)
  |> Js.Array.filter(gameObject =>
       GameObjectAPI.hasGameObjectLightMaterialComponent(gameObject, state)
     )
  |> Js.Array.map(gameObject =>
       GameObjectAPI.unsafeGetGameObjectLightMaterialComponent(
         gameObject,
         state,
       )
     );

let getAllDiffuseMaps = (sceneGameObject, state) =>
  getAllLightMaterials(sceneGameObject, state)
  |> Js.Array.filter(lightMaterial =>
       LightMaterialAPI.hasLightMaterialDiffuseMap(lightMaterial, state)
     )
  |> Js.Array.map(lightMaterial =>
       LightMaterialAPI.unsafeGetLightMaterialDiffuseMap(lightMaterial, state)
     );