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

let isNotDisposed = ({disposedIndexArray}) => disposedIndexArray |> Js.Array.length == 0;