open MaterialType;

open LightMaterialType;

open MainStateDataType;

let getDiffuseColor = (material, state) =>
  RecordLightMaterialMainService.getDiffuseColor(
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
          RecordLightMaterialMainService.setDiffuseColor(material, color, diffuseColors)
      })
  }
};

let getSpecularColor = (material, state) =>
  RecordLightMaterialMainService.getSpecularColor(
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
          RecordLightMaterialMainService.setSpecularColor(material, color, specularColors)
      })
  }
};

let getShininess = (material, state) =>
  RecordLightMaterialMainService.getShininess(
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
        shininess: RecordLightMaterialMainService.setShininess(material, value, shininess)
      })
  }
};