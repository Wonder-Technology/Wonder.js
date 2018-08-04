let build = ((basicMaterial, name), materialDataArr, state) => {
  let color = OperateBasicMaterialMainService.getColor(basicMaterial, state);

  materialDataArr
  |> ArrayService.push(
       {colorFactor: Some([|color[0], color[1], color[2], 1.0|]), name}: GenerateSceneGraphType.basicMaterialData,
     );
};