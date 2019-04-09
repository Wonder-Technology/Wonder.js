open StateDataMainType;

let build = (scriptDataMap, {scriptRecord} as state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(GenerateCommon.checkShouldHasNoSlot(scriptDataMap))
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  scriptDataMap
  |> WonderCommonlib.MutableSparseMapService.reduceValid(
       (. scriptDataArr, script) =>
         scriptDataArr
         |> ArrayService.push(
              {
                eventFunctionDataMapStr:
                  ConvertScriptDataUtils.unsafeGetEventFunctionDataMapStr(
                    script,
                    state,
                  ),
                /* OperateScriptDataMainService.unsafeGetScriptEventFunctionDataEntries(
                     script,
                     state,
                   )
                   |> Js.Array.map(((name, eventFunctionData)) =>
                        (
                          name,
                          SerializeService.serializeFunction(
                            eventFunctionData,
                          ),
                        )
                      ), */
                attributeMapStr:
                  /* OperateScriptDataMainService.unsafeGetScriptAttributeEntries(
                       script,
                       state,
                     )
                     |> Js.Array.map(((name, attribute)) =>
                          (name, SerializeService.serializeFunction(attribute))
                        ), */
                  ConvertScriptDataUtils.unsafeGetAttributeMapStr(
                    script,
                    state,
                  ),
              }: GenerateSceneGraphType.scriptData,
            ),
       [||],
     );
};