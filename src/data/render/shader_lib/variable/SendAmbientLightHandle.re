open StateDataType;

open AmbientLightType;

let send =
  [@bs]
  (
    (gl, (program, uniformCacheMap, uniformLocationMap), state: StateDataType.state) => {
      let {index} = state.ambientLightRecord;
      WonderCommonlib.ArraySystem.range(0, index - 1)
      |> ArraySystem.reduceState(
           [@bs]
           (
             (state, index) => {
               let name = "u_ambient";
               [@bs]
               SendGLSLDataService.sendFloat3(
                 gl,
                 uniformCacheMap,
                 (
                   name,
                   GLSLLocationService.getUniformLocation(program, name, uniformLocationMap, gl)
                 ),
                 OperateAmbientLightService.getColor(index, state.ambientLightRecord)
               );
               state
             }
           ),
           state
         )
    }
  );