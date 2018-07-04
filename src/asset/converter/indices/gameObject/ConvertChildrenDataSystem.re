let convertToChildrenTransformIndexData =
    (transformGameObjectIndexData: WDType.componentGameObjectIndexData, nodes) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|every node should has one transform component|j},
                ~actual={j|not|j},
              ),
              () =>
              transformGameObjectIndexData.gameObjectIndices
              |> Js.Array.length == (nodes |> Js.Array.length)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  let (parentTransformIndices, childrenTransformIndices) =
    nodes
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           (parentTransformIndices, childrenTransformIndices),
           {children}: GLTFType.node,
           index,
         ) =>
           switch (children) {
           | None => (parentTransformIndices, childrenTransformIndices)
           | Some(children) => (
               parentTransformIndices |> ArrayService.push(index),
               childrenTransformIndices |> ArrayService.push(children),
             )
           },
         ([||], [||]),
       );
  (
    {parentTransformIndices, childrenTransformIndices}: WDType.childrenTransformIndexData
  )
  |> WonderLog.Contract.ensureCheck(
       (
         {parentTransformIndices, childrenTransformIndices}: WDType.childrenTransformIndexData,
       ) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect=
                     {j|parentTransformIndices' count === childrenTransformIndices' count|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 parentTransformIndices
                 |>
                 Js.Array.length == (
                                      childrenTransformIndices
                                      |> Js.Array.length
                                    )
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );
};