open MainStateDataType;

open AmbientLightType;

let send =
  [@bs]
  (
    (gl, (program, uniformCacheMap, uniformLocationMap), state: MainStateDataType.state) => {
      let {index} = state.ambientLightRecord;
      WonderCommonlib.ArraySystem.range(0, index - 1)
      |> ReduceStateMainService.reduceState(
           [@bs]
           (
             (state, index) => {
               let name = "u_ambient";
               [@bs]
               SendGLSLDataMainService.sendFloat3(
                 gl,
                 uniformCacheMap,
                 (
                   name,
                   GLSLLocationMainService.getUniformLocation(
                     program,
                     name,
                     uniformLocationMap,
                     gl
                   )
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