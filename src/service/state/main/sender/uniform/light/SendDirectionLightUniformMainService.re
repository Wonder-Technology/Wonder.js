open MainStateDataType;

open DirectionLightType;

let send =
  [@bs]
  (
    (gl, (program, uniformCacheMap, uniformLocationMap), state: MainStateDataType.state) => {
      WonderLog.Contract.requireCheck(
        () => {
          open WonderLog;
          open Contract;
          open Operators;
          let maxCount = RecordDirectionLightService.getBufferMaxCount();
          test(
            Log.buildAssertMessage(
              ~expect={j|max buffer count === 4|j},
              ~actual={j|is $maxCount|j}
            ),
            () => maxCount == 4
          )
        },
        IsDebugMainService.getIsDebug(MainStateData.stateData)
      );
      let {index} = state.directionLightRecord;
      let lightGLSLDataStructureMemberNameArr = [|
        {
          position: "u_directionLights[0].position",
          color: "u_directionLights[0].color",
          intensity: "u_directionLights[0].intensity"
        },
        {
          position: "u_directionLights[1].position",
          color: "u_directionLights[1].color",
          intensity: "u_directionLights[1].intensity"
        },
        {
          position: "u_directionLights[2].position",
          color: "u_directionLights[2].color",
          intensity: "u_directionLights[2].intensity"
        },
        {
          position: "u_directionLights[3].position",
          color: "u_directionLights[3].color",
          intensity: "u_directionLights[3].intensity"
        }
      |];
      WonderCommonlib.ArrayService.range(0, index - 1)
      |> ReduceStateMainService.reduceState(
           [@bs]
           (
             (state, index) => {
               let {position, color, intensity} = lightGLSLDataStructureMemberNameArr[index];
               [@bs]
               SendGLSLDataMainService.sendVec3(
                 gl,
                 uniformCacheMap,
                 (
                   position,
                   GLSLLocationMainService.getUniformLocation(program, position, uniformLocationMap, gl)
                 ),
                 PositionDirectionLightMainService.getPosition(index, state)
               );
               [@bs]
               SendGLSLDataMainService.sendFloat3(
                 gl,
                 uniformCacheMap,
                 (
                   color,
                   GLSLLocationMainService.getUniformLocation(program, color, uniformLocationMap, gl)
                 ),
                 OperateDirectionLightService.getColor(index, state.directionLightRecord)
               );
               [@bs]
               SendGLSLDataMainService.sendFloat(
                 gl,
                 uniformCacheMap,
                 (
                   intensity,
                   GLSLLocationMainService.getUniformLocation(
                     program,
                     intensity,
                     uniformLocationMap,
                     gl
                   )
                 ),
                 OperateDirectionLightService.getIntensity(index, state.directionLightRecord)
               );
               state
             }
           ),
           state
         )
    }
  );