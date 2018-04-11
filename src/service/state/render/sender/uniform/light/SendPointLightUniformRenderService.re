open PointLightGLSLDataStructureMemberType;

open StateRenderType;

open RenderPointLightType;

let getLightGLSLDataStructureMemberNameArr = () => [|
  {
    position: "u_pointLights[0].position",
    color: "u_pointLights[0].color",
    intensity: "u_pointLights[0].intensity",
    constant: "u_pointLights[0].constant",
    linear: "u_pointLights[0].linear",
    quadratic: "u_pointLights[0].quadratic",
    range: "u_pointLights[0].range"
  },
  {
    position: "u_pointLights[1].position",
    color: "u_pointLights[1].color",
    intensity: "u_pointLights[1].intensity",
    constant: "u_pointLights[1].constant",
    linear: "u_pointLights[1].linear",
    quadratic: "u_pointLights[1].quadratic",
    range: "u_pointLights[1].range"
  },
  {
    position: "u_pointLights[2].position",
    color: "u_pointLights[2].color",
    intensity: "u_pointLights[2].intensity",
    constant: "u_pointLights[2].constant",
    linear: "u_pointLights[2].linear",
    quadratic: "u_pointLights[2].quadratic",
    range: "u_pointLights[2].range"
  },
  {
    position: "u_pointLights[3].position",
    color: "u_pointLights[3].color",
    intensity: "u_pointLights[3].intensity",
    constant: "u_pointLights[3].constant",
    linear: "u_pointLights[3].linear",
    quadratic: "u_pointLights[3].quadratic",
    range: "u_pointLights[3].range"
  }
|];

let _sendAttenuation =
    (
      index,
      (gl, program, uniformCacheMap, uniformLocationMap),
      {constant, linear, quadratic, range},
      pointLightRecord
    ) => {
  [@bs]
  SendGLSLDataService.sendFloat(
    gl,
    uniformCacheMap,
    (constant, GLSLLocationService.getUniformLocation(program, constant, uniformLocationMap, gl)),
    GetDataRenderPointLightService.getConstant(index, pointLightRecord)
  );
  [@bs]
  SendGLSLDataService.sendFloat(
    gl,
    uniformCacheMap,
    (linear, GLSLLocationService.getUniformLocation(program, linear, uniformLocationMap, gl)),
    GetDataRenderPointLightService.getLiear(index, pointLightRecord)
  );
  [@bs]
  SendGLSLDataService.sendFloat(
    gl,
    uniformCacheMap,
    (
      quadratic,
      GLSLLocationService.getUniformLocation(program, quadratic, uniformLocationMap, gl)
    ),
    GetDataRenderPointLightService.getQuadratic(index, pointLightRecord)
  );
  [@bs]
  SendGLSLDataService.sendFloat(
    gl,
    uniformCacheMap,
    (range, GLSLLocationService.getUniformLocation(program, range, uniformLocationMap, gl)),
    GetDataRenderPointLightService.getRange(index, pointLightRecord)
  );
  pointLightRecord
};

let send =
  [@bs]
  (
    (gl, (program, uniformCacheMap, uniformLocationMap), {pointLightRecord}) => {
      WonderLog.Contract.requireCheck(
        () => {
          open WonderLog;
          open Contract;
          open Operators;
          let maxCount = BufferPointLightService.getBufferMaxCount();
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
      let lightGLSLDataStructureMemberNameArr = getLightGLSLDataStructureMemberNameArr();
      let {index, positionMap} as pointLightRecord = pointLightRecord;
      WonderCommonlib.ArrayService.range(0, index - 1)
      |> WonderCommonlib.ArrayService.reduceOneParam(
           [@bs]
           (
             (pointLightRecord, index) => {
               let {position, color, intensity, constant, linear, quadratic, range} as structureMemberNameData = lightGLSLDataStructureMemberNameArr[index];
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
                 LightPositionService.getPosition(index, positionMap)
               );
               [@bs]
               SendGLSLDataService.sendFloat3(
                 gl,
                 uniformCacheMap,
                 (
                   color,
                   GLSLLocationService.getUniformLocation(program, color, uniformLocationMap, gl)
                 ),
                 GetDataRenderPointLightService.getColor(index, pointLightRecord)
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
                 GetDataRenderPointLightService.getIntensity(index, pointLightRecord)
               );
               _sendAttenuation(
                 index,
                 (gl, program, uniformCacheMap, uniformLocationMap),
                 structureMemberNameData,
                 pointLightRecord
               )
             }
           ),
           pointLightRecord
         )
      |> ignore
    }
  );