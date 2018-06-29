let addChildrenToParent = (parent, children, (parentMap, childMap)) => (
  children
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. parentMap, child) =>
         /* TODO duplicate with HierachyTransformService */
         WonderCommonlib.SparseMapService.set(
           child,
           TransformType.transformToJsUndefine(parent),
           parentMap,
         ),
       parentMap,
     ),
  WonderCommonlib.SparseMapService.set(parent, children, childMap),
);

let checkNotDisposedBefore = disposedIndexArray =>
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|not disposed before|j},
                ~actual={j|do|j},
              ),
              () =>
              disposedIndexArray |> Js.Array.length == 0
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

let _isArrayEmpty = arr => arr |> Js.Array.length === 0;

let getOnlyHasOneTypeImage =
    (uriImages, uint8ArrayImages, (imageBase64Arr, imageUint8ArrayArr)) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|only has one type image|j},
                ~actual={j|not|j},
              ),
              () =>
              (
                uriImages
                |> Js.Option.isNone
                && uint8ArrayImages
                |> Js.Option.isSome
                || uint8ArrayImages
                |> Js.Option.isNone
                && uriImages
                |> Js.Option.isSome
              )
              |> assertTrue
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  uriImages |> Js.Option.isNone ?
    (None, Some(imageUint8ArrayArr)) : (Some(imageBase64Arr), None);
};