open PointLightType;

let send =
  [@bs]
  (
    (gl, (program, uniformCacheMap, uniformLocationMap), state: StateDataType.state) => {
      WonderLog.Contract.requireCheck(
        () => {
          open WonderLog;
          open Contract;
          open Operators;
          let maxCount = PointLightHelper.getBufferMaxCount();
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
      let {index} = PointLightAdmin.getLightData(state);
      let lightGLSLDataStructureMemberNameArr = [|
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
      WonderCommonlib.ArraySystem.range(0, index - 1)
      |> ArraySystem.reduceState(
           [@bs]
           (
             (state, index) => {
               let {position, color, intensity, constant, linear, quadratic, range} = lightGLSLDataStructureMemberNameArr[index];
               [@bs]
               GLSLSenderSystem.sendVec3(
                 gl,
                 uniformCacheMap,
                 (
                   position,
                   GLSLLocationSystem.getUniformLocation(program, position, uniformLocationMap, gl)
                 ),
                 PointLightAdmin.getPosition(index, state)
               );
               [@bs]
               GLSLSenderSystem.sendFloat3(
                 gl,
                 uniformCacheMap,
                 (
                   color,
                   GLSLLocationSystem.getUniformLocation(program, color, uniformLocationMap, gl)
                 ),
                 PointLightAdmin.getColor(index, state)
               );
               [@bs]
               GLSLSenderSystem.sendFloat(
                 gl,
                 uniformCacheMap,
                 (
                   intensity,
                   GLSLLocationSystem.getUniformLocation(
                     program,
                     intensity,
                     uniformLocationMap,
                     gl
                   )
                 ),
                 PointLightAdmin.getIntensity(index, state)
               );
               [@bs]
               GLSLSenderSystem.sendFloat(
                 gl,
                 uniformCacheMap,
                 (
                   constant,
                   GLSLLocationSystem.getUniformLocation(program, constant, uniformLocationMap, gl)
                 ),
                 PointLightAdmin.getConstant(index, state)
               );
               [@bs]
               GLSLSenderSystem.sendFloat(
                 gl,
                 uniformCacheMap,
                 (
                   linear,
                   GLSLLocationSystem.getUniformLocation(program, linear, uniformLocationMap, gl)
                 ),
                 PointLightAdmin.getLinear(index, state)
               );
               [@bs]
               GLSLSenderSystem.sendFloat(
                 gl,
                 uniformCacheMap,
                 (
                   quadratic,
                   GLSLLocationSystem.getUniformLocation(
                     program,
                     quadratic,
                     uniformLocationMap,
                     gl
                   )
                 ),
                 PointLightAdmin.getQuadratic(index, state)
               );
               [@bs]
               GLSLSenderSystem.sendFloat(
                 gl,
                 uniformCacheMap,
                 (
                   range,
                   GLSLLocationSystem.getUniformLocation(program, range, uniformLocationMap, gl)
                 ),
                 PointLightAdmin.getRange(index, state)
               );
               state
             }
           ),
           state
         )
    }
  );