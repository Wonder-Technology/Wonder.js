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

let getOnlyHasOneTypeImage = ((imageBase64Arr, imageUint8ArrayArr)) => {
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
                _isArrayEmpty(imageBase64Arr)
                && ! _isArrayEmpty(imageUint8ArrayArr)
                || _isArrayEmpty(imageUint8ArrayArr)
                && ! _isArrayEmpty(imageBase64Arr)
              )
              |> assertTrue
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  _isArrayEmpty(imageBase64Arr) ?
    (None, Some(imageUint8ArrayArr)) : (Some(imageBase64Arr), None);
};