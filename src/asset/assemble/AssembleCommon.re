let addChildrenToParent = (parent, children, (parentMap, childMap)) => (
  children
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. parentMap, child) =>
         /* TODO duplicate with HierachyTransformService */
         WonderCommonlib.MutableSparseMapService.set(
           child,
           TransformType.transformToJsUndefine(parent),
           parentMap,
         ),
       parentMap,
     ),
  WonderCommonlib.MutableSparseMapService.set(parent, children, childMap),
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