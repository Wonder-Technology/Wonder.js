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
                isActive:
                  IsActiveScriptMainService.unsafeGetIsActive(script, state),
                eventFunctionDataMapStr:
                  ConvertScriptDataUtils.unsafeGetEventFunctionDataMapStr(
                    script,
                    state,
                  ),
                attributeMapStr:
                  ConvertScriptDataUtils.unsafeGetAttributeMapStr(
                    script,
                    state,
                  ),
              }: GenerateSceneGraphType.scriptData,
            ),
       [||],
     );
};