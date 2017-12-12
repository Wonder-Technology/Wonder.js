open MaterialType;

open ComponentDisposeComponentCommon;

open MaterialStateCommon;

open Contract;

let isAlive = (material: material, state: StateDataType.state) =>
  ComponentDisposeComponentCommon.isAlive(material, getMaterialData(state).disposedIndexArray);

let _disposeData = (material: material, state: StateDataType.state) => {
  let {shaderIndexMap, gameObjectMap} as data = getMaterialData(state);
  disposeSparseMapData(material, gameObjectMap) |> ignore;
  disposeSparseMapData(material, shaderIndexMap) |> ignore;
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
  disposedIndexArray |> Js.Array.push(material) |> ignore;
  _disposeData(material, state)
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
      data.disposedIndexArray = disposedIndexArray |> Js.Array.concat(materialArray);
      materialArray
      |> ArraySystem.reduceState(
           [@bs] ((state, material) => state |> _disposeData(material)),
           state
         )
    }
  );

let isNotDisposed = ({disposedIndexArray}) => disposedIndexArray |> Js.Array.length == 0;