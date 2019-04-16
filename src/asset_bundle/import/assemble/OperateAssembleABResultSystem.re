/* TODO finish */
module SAB = {
  let findGameObjectByName = (sabRelativePath, gameObjectName, state) => 0;

  let findAllGameObjects = (sabRelativePath, state) => [|0|];
};

module RAB = {
  let findLightMaterialByName = (sabRelativePath, name, state) => 0;

  let findBasicMaterialByName = (sabRelativePath, name, state) => 0;

  let findImageByName = (sabRelativePath, name, state) => Obj.magic(-1);

  let findBasicSourceTextureByName = (sabRelativePath, name, state) => 0;

  let findGeometryByName = (sabRelativePath, name, state) => 0;

  let findScriptEventFunctionByName = (sabRelativePath, name, state) =>
    Obj.magic(-1);

  let findScriptAttributeByName = (sabRelativePath, name, state) =>
    Obj.magic(-1);
};