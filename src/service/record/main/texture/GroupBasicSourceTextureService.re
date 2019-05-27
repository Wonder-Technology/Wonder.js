open BasicSourceTextureType;

let addMaterial = (materialData, texture, record) => {
  ...record,
  materialsMap:
    GroupTextureService.addMaterial(
      materialData,
      texture,
      record.materialsMap,
    ),
};

let isGroupBasicSourceTexture = (texture, record) =>
  GroupTextureService.isGroup(texture, record.materialsMap);

let removeMaterial = (materialData, texture, {materialsMap} as record) => {
  ...record,
  materialsMap:
    GroupTextureService.removeMaterial(materialData, texture, materialsMap),
};

let clearMaterial = (texture, {materialsMap} as record) => {
  ...record,
  materialsMap: GroupTextureService.clearMaterial(texture, materialsMap),
};

let getMaterialDataArr = (texture, {materialsMap} as record) =>
  MaterialsMapService.getMaterialDataArr(texture, materialsMap);