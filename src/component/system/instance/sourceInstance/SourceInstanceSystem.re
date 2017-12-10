open SourceInstanceType;

open Contract;

let create = (state: StateDataType.state) => SourceInstanceCreateCommon.create(state);

let getSourceInstanceData = SourceInstanceStateCommon.getSourceInstanceData;

let isSendModelMatrix = SourceInstanceStaticCommon.isSendModelMatrix;

let markSendModelMatrix = SourceInstanceStaticCommon.markSendModelMatrix;

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
    SourceInstanceStateCommon.getSourceInstanceData(state).objectInstanceListMap
  );

let _addObjectInstnace = (sourceInstance, uid, {objectInstanceListMap} as data) => {
  objectInstanceListMap |> _getObjectInstanceList(sourceInstance) |> Js.Array.push(uid) |> ignore;
  data
};

let createInstance = (sourceInstance, state: StateDataType.state) => {
  open GameObjectComponentCommon;
  let (state, uid) = GameObjectCreateCommon.create(state);
  _addObjectInstnace(sourceInstance, uid, SourceInstanceStateCommon.getSourceInstanceData(state)) |> ignore;
  let (state, transform) = TransformUtils.create(state);
  /* todo add ObjectInstance to instance */
  (addTransformComponent(uid, transform, state), uid)
};

let getGameObject = (sourceInstance: sourceInstance, state: StateDataType.state) =>
  ComponentSystem.getComponentGameObject(
    sourceInstance,
    SourceInstanceStateCommon.getSourceInstanceData(state).gameObjectMap
  );

let markModelMatrixIsStatic = SourceInstanceStaticCommon.markModelMatrixIsStatic;

let isModelMatrixIsStatic = SourceInstanceStaticCommon.isModelMatrixIsStatic;

let initData = () => {
  index: 0,
  gameObjectMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  objectInstanceListMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  modelMatrixFloat32ArrayMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  modelMatrixInstanceBufferCapacityMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  isModelMatrixStaticMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  isSendModelMatrixDataMap: WonderCommonlib.SparseMapSystem.createEmpty()
};