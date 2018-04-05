let send =
  [@bs]
  (
    (gl, (program, uniformCacheMap, uniformLocationMap), (index, ambientLightRecord)) =>
      WonderCommonlib.ArrayService.range(0, index - 1)
      |> WonderCommonlib.ArrayService.reduceOneParam(
           [@bs]
           (
             (ambientLightRecord, index) => {
               let name = "u_ambient";
               [@bs]
               SendGLSLDataService.sendFloat3(
                 gl,
                 uniformCacheMap,
                 (
                   name,
                   GLSLLocationService.getUniformLocation(program, name, uniformLocationMap, gl)
                 ),
                 OperateAmbientLightSendUniformService.getColor(index, ambientLightRecord)
               );
               ambientLightRecord
             }
           ),
           ambientLightRecord
         )
  );