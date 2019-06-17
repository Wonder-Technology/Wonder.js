open PointLightGLSLDataStructureMemberType;

open SubStateSendRenderDataType;

open RenderPointLightType;

let getLightGLSLDataStructureMemberNameArr = () => [|
  {
    position: "u_pointLights[0].position",
    color: "u_pointLights[0].color",
    intensity: "u_pointLights[0].intensity",
    constant: "u_pointLights[0].constant",
    linear: "u_pointLights[0].linear",
    quadratic: "u_pointLights[0].quadratic",
    range: "u_pointLights[0].range",
  },
  {
    position: "u_pointLights[1].position",
    color: "u_pointLights[1].color",
    intensity: "u_pointLights[1].intensity",
    constant: "u_pointLights[1].constant",
    linear: "u_pointLights[1].linear",
    quadratic: "u_pointLights[1].quadratic",
    range: "u_pointLights[1].range",
  },
  {
    position: "u_pointLights[2].position",
    color: "u_pointLights[2].color",
    intensity: "u_pointLights[2].intensity",
    constant: "u_pointLights[2].constant",
    linear: "u_pointLights[2].linear",
    quadratic: "u_pointLights[2].quadratic",
    range: "u_pointLights[2].range",
  },
  {
    position: "u_pointLights[3].position",
    color: "u_pointLights[3].color",
    intensity: "u_pointLights[3].intensity",
    constant: "u_pointLights[3].constant",
    linear: "u_pointLights[3].linear",
    quadratic: "u_pointLights[3].quadratic",
    range: "u_pointLights[3].range",
  },
|];

let _sendAttenuation =
    (
      light,
      (gl, program, uniformCacheMap, uniformLocationMap),
      {constant, linear, quadratic, range},
      pointLightRecord,
    ) => {
  SendGLSLDataService.sendFloat(.
    gl,
    uniformCacheMap,
    (
      constant,
      AllGLSLLocationService.getUniformLocationAndCache(
        program,
        constant,
        uniformLocationMap,
        gl,
      ),
    ),
    GetDataRenderPointLightService.getConstant(light, pointLightRecord),
  );
  SendGLSLDataService.sendFloat(.
    gl,
    uniformCacheMap,
    (
      linear,
      AllGLSLLocationService.getUniformLocationAndCache(
        program,
        linear,
        uniformLocationMap,
        gl,
      ),
    ),
    GetDataRenderPointLightService.getLiear(light, pointLightRecord),
  );
  SendGLSLDataService.sendFloat(.
    gl,
    uniformCacheMap,
    (
      quadratic,
      AllGLSLLocationService.getUniformLocationAndCache(
        program,
        quadratic,
        uniformLocationMap,
        gl,
      ),
    ),
    GetDataRenderPointLightService.getQuadratic(light, pointLightRecord),
  );
  SendGLSLDataService.sendFloat(.
    gl,
    uniformCacheMap,
    (
      range,
      AllGLSLLocationService.getUniformLocationAndCache(
        program,
        range,
        uniformLocationMap,
        gl,
      ),
    ),
    GetDataRenderPointLightService.getRange(light, pointLightRecord),
  );
  pointLightRecord;
};

let send =
  (. gl, (program, uniformCacheMap, uniformLocationMap), {pointLightRecord}) => {
    WonderLog.Contract.requireCheck(
      () => {
        open WonderLog;
        open Contract;
        open Operators;
        let maxCount = BufferPointLightService.getBufferMaxCount();
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
    let lightGLSLDataStructureMemberNameArr =
      getLightGLSLDataStructureMemberNameArr();
    let {positionMap, renderLightArr} as pointLightRecord = pointLightRecord;
    renderLightArr
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (. pointLightRecord, light, index) => {
           let {
                 position,
                 color,
                 intensity,
                 constant,
                 linear,
                 quadratic,
                 range,
               } as structureMemberNameData = lightGLSLDataStructureMemberNameArr[index];

           SendGLSLDataService.sendVec3(.
             gl,
             uniformCacheMap,
             (
               position,
               AllGLSLLocationService.getUniformLocationAndCache(
                 program,
                 position,
                 uniformLocationMap,
                 gl,
               ),
             ),
             LightPositionService.getPosition(light, positionMap),
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
             GetDataRenderPointLightService.getColor(light, pointLightRecord),
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
             GetDataRenderPointLightService.getIntensity(
               light,
               pointLightRecord,
             ),
           );
           _sendAttenuation(
             light,
             (gl, program, uniformCacheMap, uniformLocationMap),
             structureMemberNameData,
             pointLightRecord,
           );
         },
         pointLightRecord,
       )
    |> ignore;
  };