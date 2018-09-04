open DirectionLightGLSLDataStructureMemberType;

open StateRenderType;

open RenderDirectionLightType;

let send =
  (.
    gl,
    (program, uniformCacheMap, uniformLocationMap),
    {directionLightRecord},
  ) => {
    WonderLog.Contract.requireCheck(
      () => {
        open WonderLog;
        open Contract;
        open Operators;
        let maxCount = BufferDirectionLightService.getBufferMaxCount();
        test(
          Log.buildAssertMessage(
            ~expect={j|max buffer count === 4|j},
            ~actual={j|is $maxCount|j},
          ),
          () =>
          maxCount == 4
        );
      },
      IsDebugMainService.getIsDebug(StateDataMain.stateData),
    );
    let lightGLSLDataStructureMemberNameArr = [|
      {
        direction: "u_directionLights[0].direction",
        color: "u_directionLights[0].color",
        intensity: "u_directionLights[0].intensity",
      },
      {
        direction: "u_directionLights[1].direction",
        color: "u_directionLights[1].color",
        intensity: "u_directionLights[1].intensity",
      },
      {
        direction: "u_directionLights[2].direction",
        color: "u_directionLights[2].color",
        intensity: "u_directionLights[2].intensity",
      },
      {
        direction: "u_directionLights[3].direction",
        color: "u_directionLights[3].color",
        intensity: "u_directionLights[3].intensity",
      },
    |];
    let {index, directionMap} as directionLightRecord = directionLightRecord;

    WonderCommonlib.ArrayService.range(0, index - 1)
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. directionLightRecord, index) => {
           let {direction, color, intensity} = lightGLSLDataStructureMemberNameArr[index];
           SendGLSLDataService.sendVec3(.
             gl,
             uniformCacheMap,
             (
               direction,
               GLSLLocationService.getUniformLocation(
                 program,
                 direction,
                 uniformLocationMap,
                 gl,
               ),
             ),
             DirectionLightService.getDirection(index, directionMap),
           );
           SendGLSLDataService.sendFloat3(.
             gl,
             uniformCacheMap,
             (
               color,
               GLSLLocationService.getUniformLocation(
                 program,
                 color,
                 uniformLocationMap,
                 gl,
               ),
             ),
             GetDataRenderDirectionLightService.getColor(
               index,
               directionLightRecord,
             ),
           );
           SendGLSLDataService.sendFloat(.
             gl,
             uniformCacheMap,
             (
               intensity,
               GLSLLocationService.getUniformLocation(
                 program,
                 intensity,
                 uniformLocationMap,
                 gl,
               ),
             ),
             GetDataRenderDirectionLightService.getIntensity(
               index,
               directionLightRecord,
             ),
           );
           directionLightRecord;
         },
         directionLightRecord,
       )
    |> ignore;
  };