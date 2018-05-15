open MaterialType;

open LightMaterialType;

open StateDataMainType;

let getDiffuseColor = (material, state) =>
  OperateTypeArrayLightMaterialService.getDiffuseColor(
    material,
    RecordLightMaterialMainService.getRecord(state).diffuseColors
  );

let setDiffuseColor = (material, color: array(float), state) => {
  let {diffuseColors} as lightMaterialRecord = RecordLightMaterialMainService.getRecord(state);
  {
    ...state,
    lightMaterialRecord:
      Some({
        ...lightMaterialRecord,
        diffuseColors:
          OperateTypeArrayLightMaterialService.setDiffuseColor(material, color, diffuseColors)
      })
  }
};

let getSpecularColor = (material, state) =>
  OperateTypeArrayLightMaterialService.getSpecularColor(
    material,
    RecordLightMaterialMainService.getRecord(state).specularColors
  );

let setSpecularColor = (material, color: array(float), state) => {
  let {specularColors} as lightMaterialRecord = RecordLightMaterialMainService.getRecord(state);
  {
    ...state,
    lightMaterialRecord:
      Some({
        ...lightMaterialRecord,
        specularColors:
          OperateTypeArrayLightMaterialService.setSpecularColor(material, color, specularColors)
      })
  }
};

let getShininess = (material, state) =>
  OperateTypeArrayLightMaterialService.getShininess(
    material,
    RecordLightMaterialMainService.getRecord(state).shininess
  );

let setShininess = (material, value, state) => {
  let {shininess} as lightMaterialRecord = RecordLightMaterialMainService.getRecord(state);
  {
    ...state,
    lightMaterialRecord:
      Some({
        ...lightMaterialRecord,
        shininess: OperateTypeArrayLightMaterialService.setShininess(material, value, shininess)
      })
  }
};

let getDiffuseMap = (material, state) =>
  ManageMapLightMaterialMainService.getDiffuseMap(material, state);

let unsafeGetDiffuseMap = (material, state) =>
  ManageMapLightMaterialMainService.unsafeGetDiffuseMap(material, state);

let setDiffuseMap = (material, texture, state) =>
  ManageMapLightMaterialMainService.setDiffuseMap(material, texture, state);

let getSpecularMap = (material, state) =>
  ManageMapLightMaterialMainService.getSpecularMap(material, state);

let unsafeGetSpecularMap = (material, state) =>
  ManageMapLightMaterialMainService.unsafeGetSpecularMap(material, state);

let setSpecularMap = (material, texture, state) =>
  ManageMapLightMaterialMainService.setSpecularMap(material, texture, state);