open MaterialType;

open MaterialStateUtils;

open Contract;

let isAlive = (material: material, state: StateDataType.state) =>
  ComponentDisposeComponentUtils.isAlive(material, getMaterialData(state).disposedIndexArray);

let handleDisposeComponent = (material: material, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        ComponentDisposeComponentUtils.checkComponentShouldAlive(material, isAlive, state)
      )
  );
  let {disposedIndexArray} = getMaterialData(state);
  disposedIndexArray |> Js.Array.push(material) |> ignore;
  state
};

let handleBatchDisposeComponent =
    (materialArray: array(material), gameObjectUidMap, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        materialArray
        |> WonderCommonlib.ArraySystem.forEach(
             [@bs]
             (
               (material) =>
                 ComponentDisposeComponentUtils.checkComponentShouldAlive(material, isAlive, state)
             )
           )
      )
  );
  let {disposedIndexArray} as data = getMaterialData(state);
  data.disposedIndexArray = disposedIndexArray |> Js.Array.concat(materialArray);
  state
};

let isNotDisposed = ({disposedIndexArray}) => disposedIndexArray |> Js.Array.length == 0;