open StateInitNoMaterialShaderType;

open AllRenderConfigType;

let init =
    (
      gl,
      /* (materialIndex: int, isSourceInstance, isSupportInstance), */
      /* (
           initShaderFunc,
           buildGLSLSourceFunc,
           /* setShaderIndexFunc, */
           getShaderLibItemsFunc,
           getShaderLibDataArrFunc,
         ), */
      /* renderConfigRecord, */
      {renderConfigRecord} as state,
    ) => {
  let {noMaterialShaders} as shaders =
    GetDataRenderConfigService.getShaders(renderConfigRecord);
  /* setShaderIndexFunc(.
       materialIndex,
       initMaterialShaderFunc(
         materialIndex,
         (
           gl,
           getMaterialShaderLibDataArrFunc(.
             materialIndex,
             (isSourceInstance, isSupportInstance),
             (
               shaders,
               getShaderLibItemsFunc(shaders),
               GetDataRenderConfigService.getShaderLibs(renderConfigRecord),
             ),
             state,
           ),
         ),
         buildGLSLSourceFunc,
         state,
       ),
       shaderIndices,
     )
     |> ignore;
     state; */

  let shaderLibsData: shaderLibs =
    GetDataRenderConfigService.getShaderLibs(renderConfigRecord);

  noMaterialShaders
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, {name, shaderLibs as shaderLibItems}) => {
         let shaderIndex =
           InitShaderInitNoMaterialShaderService.init(
             (
               gl,
               GetShaderLibDataArrayInitNoMaterialShaderService.getShaderLibDataArr(
                 (shaders, shaderLibItems, shaderLibsData),
                 state,
               ),
               name,
             ),
             state,
           );

         let shaderRecord =
           NoMaterialShaderIndexAllShaderService.setShaderIndex(
             name,
             shaderIndex,
             state.shaderRecord,
           );

         /* {...state, shaderRecord}; */
         state;
       },
       state,
     );
  /* initShaderFunc(
       /* materialIndex, */
       (
         gl,
         getShaderLibDataArrFunc(.
           /* materialIndex,
              (isSourceInstance, isSupportInstance), */
           (
             shaders,
             getShaderLibItemsFunc(shaders),
             GetDataRenderConfigService.getShaderLibs(renderConfigRecord),
           ),
           state,
         ),
       ),
       buildGLSLSourceFunc,
       state,
     ); */
};