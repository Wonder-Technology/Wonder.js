open GlType;

open StateRenderType;

let getColor = (material, {basicMaterialRecord}) =>
  OperateTypeArrayBasicMaterialService.getColor(material, basicMaterialRecord.colors);

let getMap = (material, state) => material;

/* TODO finish */
let getMapCount = (material, state) => 0;

/* let sendData =
  [@bs]
  (
    (
      gl,
      shaderCacheMap: GLSLSenderType.shaderCacheMap,
      (name: string, pos: uniformLocation),
      material: int
    ) => {
      /* TODO finish! */
    }
  ); */