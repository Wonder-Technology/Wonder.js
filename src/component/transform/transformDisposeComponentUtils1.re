open TransformType;

open TransformStateUtils;

open Contract;

let handleDisposeComponent =
    (transform: transform, state: StateDataType.state) => {
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
  let {disposedIndexArray} as data = getTransformData(state);
  disposedIndexArray |> Js.Array.push(transform) |> ignore;
  let transformStr = Js.Int.toString(transform);
  data
  |> TransformHierachySystem.unsafeGetChildren(transformStr)
  |> WonderCommonlib.ArraySystem.forEach(
       [@bs]
       (
         (child: transform) =>
           TransformHierachySystem.removeFromParentMap(Js.Int.toString(child), data)
           |> ignore
       )
     );
  switch (TransformHierachySystem.getParent(transformStr, data)) {
  | None => ()
  | Some(parent) =>
    data
    |> TransformHierachySystem.removeFromChildMap(Js.Int.toString(parent), transform)
    |> ignore
  };
  state
};