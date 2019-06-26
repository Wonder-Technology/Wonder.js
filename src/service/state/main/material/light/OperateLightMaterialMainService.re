open MaterialType;

open LightMaterialType;

open StateDataMainType;

let getDiffuseColor = (material, state) =>
  OperateTypeArrayAllLightMaterialService.getDiffuseColor(
    material,
    RecordLightMaterialMainService.getRecord(state).diffuseColors,
  );

let setDiffuseColor = (material, color: array(float), state) => {
  let {diffuseColors} as lightMaterialRecord =
    RecordLightMaterialMainService.getRecord(state);
  {
    ...state,
    lightMaterialRecord:
      Some({
        ...lightMaterialRecord,
        diffuseColors:
          OperateTypeArrayAllLightMaterialService.setDiffuseColor(
            material,
            color,
            diffuseColors,
          ),
      }),
  };
};

let getSpecularColor = (material, state) =>
  OperateTypeArrayAllLightMaterialService.getSpecularColor(
    material,
    RecordLightMaterialMainService.getRecord(state).specularColors,
  );

let setSpecularColor = (material, color: array(float), state) => {
  let {specularColors} as lightMaterialRecord =
    RecordLightMaterialMainService.getRecord(state);
  {
    ...state,
    lightMaterialRecord:
      Some({
        ...lightMaterialRecord,
        specularColors:
          OperateTypeArrayAllLightMaterialService.setSpecularColor(
            material,
            color,
            specularColors,
          ),
      }),
  };
};

let getShininess = (material, state) =>
  OperateTypeArrayAllLightMaterialService.getShininess(
    material,
    RecordLightMaterialMainService.getRecord(state).shininess,
  );

let setShininess = (material, value, state) => {
  let {shininess} as lightMaterialRecord =
    RecordLightMaterialMainService.getRecord(state);
  {
    ...state,
    lightMaterialRecord:
      Some({
        ...lightMaterialRecord,
        shininess:
          OperateTypeArrayAllLightMaterialService.setShininess(
            material,
            value,
            shininess,
          ),
      }),
  };
};

let getDiffuseMap = (material, state) =>
  ManageMapLightMaterialMainService.getDiffuseMap(material, state);

let unsafeGetDiffuseMap = (material, state) =>
  ManageMapLightMaterialMainService.unsafeGetDiffuseMap(material, state);

let setDiffuseMap = (material, texture, state) =>
  ManageMapLightMaterialMainService.setDiffuseMap(material, texture, state);

let hasDiffuseMap = (material, state) =>
  ManageMapLightMaterialMainService.hasDiffuseMap(material, state);

let removeDiffuseMap = (material, state) =>
  ManageMapLightMaterialMainService.removeDiffuseMap(material, state);

let getSpecularMap = (material, state) =>
  ManageMapLightMaterialMainService.getSpecularMap(material, state);

let unsafeGetSpecularMap = (material, state) =>
  ManageMapLightMaterialMainService.unsafeGetSpecularMap(material, state);

let setSpecularMap = (material, texture, state) =>
  ManageMapLightMaterialMainService.setSpecularMap(material, texture, state);

let hasSpecularMap = (material, state) =>
  ManageMapLightMaterialMainService.hasSpecularMap(material, state);

let removeSpecularMap = (material, state) =>
  ManageMapLightMaterialMainService.removeSpecularMap(material, state);