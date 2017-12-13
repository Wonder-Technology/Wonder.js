open MaterialType;

open ComponentDisposeComponentCommon;

open MaterialStateCommon;

open Contract;

let isAlive = (material: material, state: StateDataType.state) =>
  ComponentDisposeComponentCommon.isAlive(material, getMaterialData(state).disposedIndexArray);

let _disposeData = (material: material, state: StateDataType.state) => {
  let {colorMap, shaderIndexMap, groupCountMap, gameObjectMap} as data = getMaterialData(state);
  groupCountMap |> WonderCommonlib.SparseMapSystem.set(material, 0);
  disposeSparseMapData(material, colorMap) |> ignore;
  disposeSparseMapData(material, shaderIndexMap) |> ignore;
  disposeSparseMapData(material, gameObjectMap) |> ignore;
  state
};

let handleDisposeComponent = (material: material, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        ComponentDisposeComponentCommon.checkComponentShouldAlive(material, isAlive, state)
      )
  );
  let {disposedIndexArray} = getMaterialData(state);
  switch (MaterialGroupCommon.isGroupMaterial(material, state)) {
  | false =>
    disposedIndexArray |> Js.Array.push(material) |> ignore;
    state |> _disposeData(material)
  | true => MaterialGroupCommon.decreaseGroupCount(material, state)
  }
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (materialArray: array(material), gameObjectUidMap: array(bool), state: StateDataType.state) => {
      requireCheck(
        () =>
          Contract.Operators.(
            materialArray
            |> WonderCommonlib.ArraySystem.forEach(
                 [@bs]
                 (
                   (material) =>
                     ComponentDisposeComponentCommon.checkComponentShouldAlive(
                       material,
                       isAlive,
                       state
                     )
                 )
               )
          )
      );
      let {disposedIndexArray} as data = getMaterialData(state);
      materialArray
      |> ArraySystem.reduceState(
           [@bs]
           (
             (state, material) =>
               switch (MaterialGroupCommon.isGroupMaterial(material, state)) {
               | false =>
                 disposedIndexArray |> Js.Array.push(material) |> ignore;
                 state |> _disposeData(material)
               | true => MaterialGroupCommon.decreaseGroupCount(material, state)
               }
           ),
           state
         )
    }
  );

let isNotDisposed = ({disposedIndexArray}) => disposedIndexArray |> Js.Array.length == 0;