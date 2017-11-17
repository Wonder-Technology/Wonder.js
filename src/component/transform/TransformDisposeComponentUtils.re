open TransformType;

open TransformStateUtils;

open Contract;

let handleDisposeComponent = (transform: transform, state: StateDataType.state) => {
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
  let {disposedIndexArray} = getTransformData(state);
  disposedIndexArray |> Js.Array.push(transform) |> ignore;
  state
};

let getDisposedIndex = ({disposedIndexArray}) =>
  /* disposedIndexArray |> WonderCommonlib.ArraySystem.unsafePop */
  disposedIndexArray |> Js.Array.pop;

let isAlive = (transform, {disposedIndexArray}) =>
  ! Js.Array.includes(transform, disposedIndexArray);