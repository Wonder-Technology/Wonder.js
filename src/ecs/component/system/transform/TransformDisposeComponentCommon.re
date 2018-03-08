open TransformType;

open ComponentDisposeComponentCommon;

open TransformStateCommon;

let isAlive = (transform: transform, state: StateDataType.state) =>
  ComponentDisposeComponentCommon.isAlive(transform, getTransformData(state).disposedIndexArray);

let _disposeFromParentAndChildMap = (transform, data) => {
  data
  |> TransformHierachyCommon.unsafeGetChildren(transform)
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs]
       ((data, child: transform) => TransformHierachyCommon.removeFromParentMap(child, data)),
       data
     );
  switch (TransformHierachyCommon.getParent(transform, data)) {
  | None => data
  | Some(parent) => data |> TransformHierachyCommon.removeFromChildMap(parent, transform, false)
  }
};

let _disposeData = (transform: transform, state: StateDataType.state) => {
  let state = {
    ...state,
    transformData: _disposeFromParentAndChildMap(transform, getTransformData(state))
  };
  let {localToWorldMatrixMap, localPositionMap, parentMap, childMap, dirtyMap, gameObjectMap} as data =
    getTransformData(state);
  let state =
    TransformTypeArrayPoolCommon.addTypeArrayToPool(
      transform,
      MemoryConfigSystem.getMaxTypeArrayPoolSize(state),
      (localToWorldMatrixMap, localPositionMap),
      state
    );
  {
    ...state,
    transformData: {
      ...data,
      localToWorldMatrixMap: localToWorldMatrixMap |> disposeSparseMapData(transform),
      localPositionMap: localPositionMap |> disposeSparseMapData(transform),
      parentMap: parentMap |> disposeSparseMapData(transform),
      childMap: childMap |> disposeSparseMapData(transform),
      dirtyMap: dirtyMap |> disposeSparseMapData(transform),
      gameObjectMap: gameObjectMap |> disposeSparseMapData(transform)
    }
  }
};

let handleDisposeComponent = (transform: transform, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            ComponentDisposeComponentCommon.checkComponentShouldAlive(transform, isAlive, state)
          )
        )
      ),
    StateData.stateData.isDebug
  );
  let state = _disposeData(transform, state);
  let {disposedIndexArray} as data = getTransformData(state);
  {
    ...state,
    transformData: {...data, disposedIndexArray: disposedIndexArray |> ArraySystem.push(transform)}
  }
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (transformArray: array(transform), isGameObjectDisposedMap: array(bool), state: StateDataType.state) => {
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                ComponentDisposeComponentCommon.checkComponentShouldAliveWithBatchDispose(
                  transformArray,
                  isAlive,
                  state
                )
              )
            )
          ),
        StateData.stateData.isDebug
      );
      let {disposedIndexArray} as data = getTransformData(state);
      let state = {
        ...state,
        transformData: {
          ...data,
          disposedIndexArray: disposedIndexArray |> Js.Array.concat(transformArray)
        }
      };
      /* TODO optimize: batch remove parent,child? */
      transformArray
      |> ArraySystem.reduceState(
           [@bs] ((state, transform) => _disposeData(transform, state)),
           state
         )
    }
  );