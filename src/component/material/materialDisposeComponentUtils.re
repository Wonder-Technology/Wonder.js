open MaterialType;

open MaterialStateUtils;

open Contract;

let handleDisposeComponent =
    (material: material, gameObjectUid: string, state: StateDataType.state) => {
  /* todo refactor: duplicate */
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "shouldn't dispose before",
          () => {
            let {disposedIndexArray} = getMaterialData(state);
            disposedIndexArray |> Js.Array.includes(material) |> assertFalse
          }
        )
      )
  );
  let {disposedIndexArray} as materialData = getMaterialData(state);
  disposedIndexArray |> Js.Array.push(material) |> ignore;
  /* _removeFromRenderArray(gameObjectUid, materialData); */
  state
};