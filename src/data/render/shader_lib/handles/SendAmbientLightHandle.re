open AmbientLightType;

let send =
  [@bs]
  (
    (gl, (program, uniformCacheMap, uniformLocationMap), state: StateDataType.state) => {
      let {index} = AmbientLightAdmin.getLightData(state);
      WonderCommonlib.ArraySystem.range(0, index - 1)
      |> ArraySystem.reduceState(
           [@bs]
           (
             (state, index) => {
               let name = "u_ambient";
               [@bs]
               GLSLSenderSystem.sendVec3(
                 gl,
                 uniformCacheMap,
                 (
                   name,
                   GLSLLocationSystem.getUniformLocation(program, name, uniformLocationMap, gl)
                 ),
                 AmbientLightAdmin.getColor(index, state)
               );
               state
             }
           ),
           state
         )
    }
  );