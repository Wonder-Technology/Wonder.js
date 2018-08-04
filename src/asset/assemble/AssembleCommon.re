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