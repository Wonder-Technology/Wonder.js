open DirectionLightGLSLDataStructureMemberType;

let send =
  [@bs]
  (
    (
      gl,
      (program, uniformCacheMap, uniformLocationMap),
      (getColorFunc, getIntensityFunc),
      (index, positionArr, directionLightRecord)
    ) => {
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
        IsDebugMainService.getIsDebug(StateDataMain.stateData)
      );
      /* let {index} = directionLightRecord; */
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
      |> WonderCommonlib.ArrayService.reduceOneParam(
           [@bs]
           (
             (directionLightRecord, index) => {
               let {position, color, intensity} = lightGLSLDataStructureMemberNameArr[index];
               [@bs]
               SendGLSLDataService.sendVec3(
                 gl,
                 uniformCacheMap,
                 (
                   position,
                   GLSLLocationService.getUniformLocation(
                     program,
                     position,
                     uniformLocationMap,
                     gl
                   )
                 ),
                 /* PositionDirectionLightMainService.getPosition(index, state) */
                 GetLightPositionService.getPosition(index, positionArr)
               );
               [@bs]
               SendGLSLDataService.sendFloat3(
                 gl,
                 uniformCacheMap,
                 (
                   color,
                   GLSLLocationService.getUniformLocation(program, color, uniformLocationMap, gl)
                 ),
                 getColorFunc(index, directionLightRecord)
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
                 getIntensityFunc(index, directionLightRecord)
               );
               directionLightRecord
             }
           ),
           directionLightRecord
         )
    }
  );