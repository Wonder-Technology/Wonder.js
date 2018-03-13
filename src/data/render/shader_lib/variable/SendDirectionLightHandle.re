open StateDataType;

open DirectionLightType;

let send =
  [@bs]
  (
    (gl, (program, uniformCacheMap, uniformLocationMap), state: StateDataType.state) => {
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
        StateData.stateData.isDebug
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
      WonderCommonlib.ArraySystem.range(0, index - 1)
      |> ArraySystem.reduceState(
           [@bs]
           (
             (state, index) => {
               let {position, color, intensity} = lightGLSLDataStructureMemberNameArr[index];
               [@bs]
               SendGLSLDataService.sendVec3(
                 gl,
                 uniformCacheMap,
                 (
                   position,
                   GLSLLocationService.getUniformLocation(program, position, uniformLocationMap, gl)
                 ),
                 PositionDirectionLightService.getPosition(index, state)
               );
               [@bs]
               SendGLSLDataService.sendFloat3(
                 gl,
                 uniformCacheMap,
                 (
                   color,
                   GLSLLocationService.getUniformLocation(program, color, uniformLocationMap, gl)
                 ),
                 OperateDirectionLightService.getColor(index, state.directionLightRecord)
               );
               [@bs]
               SendGLSLDataService.sendFloat(
                 gl,
                 uniformCacheMap,
                 (
                   intensity,
                   GLSLLocationService.getUniformLocation(
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