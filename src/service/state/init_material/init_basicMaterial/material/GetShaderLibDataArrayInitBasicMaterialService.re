open StateInitBasicMaterialType;

open RenderConfigType;

let _getMaterialShaderLibDataArrByStaticBranch =
  [@bs]
  (
    (
      (name, isSourceInstance, isSupportInstance),
      (staticBranchs: array(shaderMapData), shaderLibs),
      resultDataArr
    ) =>
      switch name {
      | "modelMatrix_instance" =>
        let {value}: shaderMapData =
          JobConfigService.unsafeFindFirst(
            staticBranchs,
            name,
            (item) => JobConfigService.filterTargetName(item.name, name)
          );
        GetShaderLibDataArrayInitMaterialService.getMaterialShaderLibDataArrByStaticBranchInstance(
          (isSourceInstance, isSupportInstance),
          (shaderLibs, value),
          resultDataArr
        )
      | _ =>
        GetShaderLibDataArrayInitMaterialService.handleUnknownNameWhenGetMaterialShaderLibDataArrByStaticBranch(
          name,
          staticBranchs
        )
      }
  );

let _isPass =
  [@bs]
  (
    (materialIndex, condition, {materialRecord} as state) =>
      switch condition {
      | "basic_has_map" =>
        MapUnitService.hasMap(
          OperateTypeArrayBasicMaterialService.getMapUnit(materialIndex, materialRecord.mapUnits)
        )
      | _ =>
        WonderLog.Log.fatal(
          WonderLog.Log.buildFatalMessage(
            ~title="_isPass",
            ~description={j|unknown condition:$condition|j},
            ~reason="",
            ~solution={j||j},
            ~params={j||j}
          )
        )
      }
  );

let getMaterialShaderLibDataArr =
  [@bs]
  (
    (
      materialIndex,
      (isSourceInstance, isSupportInstance),
      ({staticBranchs, dynamicBranchs, groups}, shaderLibItems, shaderLibs: shaderLibs),
      state
    ) =>
      shaderLibItems
      |> WonderCommonlib.ArrayService.reduceOneParam(
           [@bs]
           (
             (resultDataArr, {type_, name}: shaderLibItem) =>
               switch type_ {
               | None =>
                 resultDataArr
                 |> ArrayService.push(
                      GetShaderLibDataArrayInitMaterialService.findFirstShaderData(
                        name,
                        shaderLibs
                      )
                    )
               | Some(type_) =>
                 GetShaderLibDataArrayInitMaterialService.getMaterialShaderLibDataArrByType(
                   (materialIndex, type_, groups, name, isSourceInstance, isSupportInstance),
                   (shaderLibs, staticBranchs, dynamicBranchs, state),
                   (_getMaterialShaderLibDataArrByStaticBranch, _isPass),
                   resultDataArr
                 )
               }
           ),
           WonderCommonlib.ArrayService.createEmpty()
         )
  );