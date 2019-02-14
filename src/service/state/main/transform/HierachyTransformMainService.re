let _changeChildOrder =
    (
      sourceTransfrom,
      targetTransform,
      children,
      action: TransformType.changeChildOrder,
    )
    : array(TransformType.transform) =>
  children
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. newChildren, child) =>
         switch (child) {
         | child when child === targetTransform =>
           switch (action) {
           | Before =>
             newChildren
             |> ArrayService.push(sourceTransfrom)
             |> ArrayService.push(targetTransform)
           | After =>
             newChildren
             |> ArrayService.push(targetTransform)
             |> ArrayService.push(sourceTransfrom)
           }
         | child when child === sourceTransfrom => newChildren
         | child => newChildren |> ArrayService.push(child)
         },
       [||],
     );

let changeChildOrder =
    (
      sourceTransfrom,
      targetTransform,
      targetParentTransform,
      action: TransformType.changeChildOrder,
      state,
    )
    : StateDataMainType.state => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|parent should be the parent of source and target|j},
                ~actual={j|not|j},
              ),
              () => {
                let record = RecordTransformMainService.getRecord(state);

                switch (
                  HierachyTransformService.getParent(sourceTransfrom, record),
                  HierachyTransformService.getParent(targetTransform, record),
                ) {
                | (Some(sourceParent), Some(targetParent)) =>
                  sourceParent == targetParent;
                  targetParentTransform == targetParent;
                | _ => assertFail()
                };
              },
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  let record = RecordTransformMainService.getRecord(state);

  {
    ...state,
    transformRecord:
      Some(
        _changeChildOrder(
          sourceTransfrom,
          targetTransform,
          HierachyTransformService.unsafeGetChildren(
            targetParentTransform,
            record,
          ),
          action,
        )
        |> HierachyTransformService.setChildren(record, targetParentTransform),
      ),
  };
};