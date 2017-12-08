open SourceInstanceType;

open Contract;

let create = (state: StateDataType.state) => SourceInstanceCreateSystem.create(state);

let _getObjectInstanceList = (sourceInstance, objectInstanceListMap) =>
  objectInstanceListMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(sourceInstance)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             {j|objectInstanceList of sourceInstance:$sourceInstance should exist|j},
             () =>
               objectInstanceListMap
               |> WonderCommonlib.SparseMapSystem.get(sourceInstance)
               |> assertExist
           )
         )
     );

let getObjectInstanceList = (sourceInstance, state: StateDataType.state) =>
  _getObjectInstanceList(
    sourceInstance,
    SourceInstanceStateSystem.getData(state).objectInstanceListMap
  );

let _addObjectInstnace = (sourceInstance, uid, {objectInstanceListMap} as data) => {
  objectInstanceListMap |> _getObjectInstanceList(sourceInstance) |> Js.Array.push(uid) |> ignore;
  data
};

let createInstance = (sourceInstance, state: StateDataType.state) => {
  open GameObjectComponentSystem;
  let (state, uid) = GameObjectCreateSystem.create(state);
  _addObjectInstnace(sourceInstance, uid, SourceInstanceStateSystem.getData(state)) |> ignore;
  let (state, transform) = TransformSystem.create(state);
  /* todo add ObjectInstance to instance */
  (addTransformComponent(uid, transform, state), uid)
};

let getGameObject = (sourceInstance: sourceInstance, state: StateDataType.state) =>
  ComponentSystem.getComponentGameObject(
    sourceInstance,
    SourceInstanceStateSystem.getData(state).gameObjectMap
  );

let markModelMatrixIsStatic = SourceInstanceStaticSystem.markModelMatrixIsStatic;

let isModelMatrixIsStatic = SourceInstanceStaticSystem.isModelMatrixIsStatic;

let initData = () => {
  index: 0,
  gameObjectMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  objectInstanceListMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  modelMatrixFloat32ArrayMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  modelMatrixInstanceBufferCapacityMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  isModelMatrixStaticMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  isSendModelMatrixDataMap: WonderCommonlib.SparseMapSystem.createEmpty()
};