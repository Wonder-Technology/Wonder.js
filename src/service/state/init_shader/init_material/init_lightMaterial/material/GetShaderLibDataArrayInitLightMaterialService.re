open StateInitLightMaterialType;

open AllRenderConfigType;

let _getMaterialShaderLibDataArrByStaticBranch =
  (.
    (name, isSourceInstance, isSupportInstance),
    (staticBranchs: array(shaderMapData), shaderLibs),
    resultDataArr,
  ) =>
    switch (name) {
    | "modelMatrix_instance"
    | "normalMatrix_instance" =>
      let {value}: shaderMapData =
        ArrayService.unsafeFindFirst(staticBranchs, name, item =>
          item.name === name
        );
      GetShaderLibDataArrayInitMaterialAllService.getMaterialShaderLibDataArrByStaticBranchInstance(
        (isSourceInstance, isSupportInstance),
        (shaderLibs, value),
        resultDataArr,
      );
    | _ =>
      GetShaderLibDataArrayInitMaterialAllService.handleUnknownNameWhenGetMaterialShaderLibDataArrByStaticBranch(
        name,
        staticBranchs,
      )
    };

let _isPass =
  (. materialIndex, condition, {materialRecord} as state) =>
    switch (condition) {
    | "light_has_map" =>
      TextureIndexService.isTextureNotDefaultValue(
        OperateTypeArrayAllLightMaterialService.getTextureIndex(.
          materialIndex,
          materialRecord.diffuseTextureIndices,
        ),
      )
      || TextureIndexService.isTextureNotDefaultValue(
           OperateTypeArrayAllLightMaterialService.getTextureIndex(.
             materialIndex,
             materialRecord.specularTextureIndices,
           ),
         )
    | "has_diffuse_map" =>
      TextureIndexService.isTextureNotDefaultValue(
        OperateTypeArrayAllLightMaterialService.getTextureIndex(.
          materialIndex,
          materialRecord.diffuseTextureIndices,
        ),
      )
    | "has_specular_map" =>
      TextureIndexService.isTextureNotDefaultValue(
        OperateTypeArrayAllLightMaterialService.getTextureIndex(.
          materialIndex,
          materialRecord.specularTextureIndices,
        ),
      )
    | _ =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="_isPass",
          ~description={j|unknown condition:$condition|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      )
    };

let getMaterialShaderLibDataArr =
  (.
    materialIndex: int,
    (isSourceInstance, isSupportInstance),
    shaderLibTuple,
    state: initLightMaterialState,
  ) =>
    GetShaderLibDataArrayInitMaterialAllService.getMaterialShaderLibDataArr(
      (materialIndex, isSourceInstance, isSupportInstance),
      shaderLibTuple,
      (_getMaterialShaderLibDataArrByStaticBranch, _isPass),
      state,
    );