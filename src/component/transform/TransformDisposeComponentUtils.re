open GameObjectType;

open TransformType;

open TransformStateUtils;

open Contract;

let handleDisposeComponent =
    (transform: transform, gameObject: gameObject, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "shouldn't dispose before",
          () => {
            let {disposedIndexArray} = getTransformData(state);
            disposedIndexArray |> Js.Array.includes(transform) |> assertFalse
          }
        )
      )
  );
  let {disposedIndexArray} as transformData = getTransformData(state);
  disposedIndexArray |> Js.Array.push(transform) |> ignore;
  let transformStr = Js.Int.toString(transform);
  transformData
  |> TransformHierachySystem.unsafeGetChildren(transformStr)
  |> WonderCommonlib.ArraySystem.forEach(
       [@bs]
       (
         (child: transform) =>
           TransformHierachySystem.removeFromParentMap(Js.Int.toString(child), transformData)
           |> ignore
       )
     );
  switch (TransformHierachySystem.getParent(transformStr, transformData)) {
  | None => ()
  | Some(parent) =>
    transformData
    |> TransformHierachySystem.removeFromChildMap(Js.Int.toString(parent), transform)
    |> ignore
  };
  state
};