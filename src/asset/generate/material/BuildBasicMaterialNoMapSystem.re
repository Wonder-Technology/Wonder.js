let build = ((basicMaterial, name), materialDataArr, state) => {
  let color = OperateBasicMaterialMainService.getColor(basicMaterial, state);

  materialDataArr
  |> ArrayService.push(
       {colorFactor: BuildMaterialUtils.buildColorFactor(color), name}: GenerateSceneGraphType.basicMaterialData,
     );
};