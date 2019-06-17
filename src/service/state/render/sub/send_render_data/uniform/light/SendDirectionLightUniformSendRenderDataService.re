open DirectionLightGLSLDataStructureMemberType;

open SubStateSendRenderDataType;

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
    let {directionMap, renderLightArr} as directionLightRecord = directionLightRecord;

    renderLightArr
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (. directionLightRecord, light, index) => {
           let {direction, color, intensity} = lightGLSLDataStructureMemberNameArr[index];

           SendGLSLDataService.sendVec3(.
             gl,
             uniformCacheMap,
             (
               direction,
               AllGLSLLocationService.getUniformLocationAndCache(
                 program,
                 direction,
                 uniformLocationMap,
                 gl,
               ),
             ),
             DirectionLightService.getDirection(light, directionMap),
           );
           SendGLSLDataService.sendFloat3(.
             gl,
             uniformCacheMap,
             (
               color,
               AllGLSLLocationService.getUniformLocationAndCache(
                 program,
                 color,
                 uniformLocationMap,
                 gl,
               ),
             ),
             GetDataRenderDirectionLightService.getColor(
               light,
               directionLightRecord,
             ),
           );
           SendGLSLDataService.sendFloat(.
             gl,
             uniformCacheMap,
             (
               intensity,
               AllGLSLLocationService.getUniformLocationAndCache(
                 program,
                 intensity,
                 uniformLocationMap,
                 gl,
               ),
             ),
             GetDataRenderDirectionLightService.getIntensity(
               light,
               directionLightRecord,
             ),
           );
           directionLightRecord;
         },
         directionLightRecord,
       )
    |> ignore;
  };