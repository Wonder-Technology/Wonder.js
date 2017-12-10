open MaterialType;

open MaterialStateCommon;

open Contract;

let isAlive = (material: material, state: StateDataType.state) =>
  ComponentDisposeComponentSystem.isAlive(material, getMaterialData(state).disposedIndexArray);

let handleDisposeComponent = (material: material, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        ComponentDisposeComponentSystem.checkComponentShouldAlive(material, isAlive, state)
      )
  );
  let {disposedIndexArray} = getMaterialData(state);
  disposedIndexArray |> Js.Array.push(material) |> ignore;
  state
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
                     ComponentDisposeComponentSystem.checkComponentShouldAlive(
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
      state
    }
  );

let isNotDisposed = ({disposedIndexArray}) => disposedIndexArray |> Js.Array.length == 0;