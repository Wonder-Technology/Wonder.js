open StateDataMainType;

open LightMaterialType;

open CreateLightMaterialMainService;

open GameObjectLightMaterialService;

open OperateLightMaterialMainService;

open DisposeLightMaterialMainService;

let createLightMaterial = state => create(. state);

let unsafeGetLightMaterialGameObjects =
    (material, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordLightMaterialMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetGameObjects(
    material,
    RecordLightMaterialMainService.getRecord(state),
  );
};

let getLightMaterialDiffuseColor = (material, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordLightMaterialMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getDiffuseColor(material, state);
};

let setLightMaterialDiffuseColor =
    (material, color, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordLightMaterialMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  setDiffuseColor(material, color, state);
};

let getLightMaterialSpecularColor = (material, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordLightMaterialMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getSpecularColor(material, state);
};

let setLightMaterialSpecularColor =
    (material, color, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordLightMaterialMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  setSpecularColor(material, color, state);
};

let getLightMaterialShininess = (material, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordLightMaterialMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getShininess(material, state);
};

let setLightMaterialShininess =
    (material, shininess, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordLightMaterialMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  setShininess(material, shininess, state);
};

let unsafeGetLightMaterialDiffuseMap = (material, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordLightMaterialMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetDiffuseMap(material, state);
};

let setLightMaterialDiffuseMap = (material, texture, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordLightMaterialMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  setDiffuseMap(material, texture, state);
};

let hasLightMaterialDiffuseMap = (material, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordLightMaterialMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  hasDiffuseMap(material, state);
};

let removeLightMaterialDiffuseMap = (material, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordLightMaterialMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  removeDiffuseMap(material, state);
};

let unsafeGetLightMaterialSpecularMap = (material, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordLightMaterialMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetSpecularMap(material, state);
};

let setLightMaterialSpecularMap = (material, texture, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordLightMaterialMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  setSpecularMap(material, texture, state);
};

let hasLightMaterialSpecularMap = (material, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordLightMaterialMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  hasSpecularMap(material, state);
};

let removeLightMaterialSpecularMap = (material, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordLightMaterialMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  removeSpecularMap(material, state);
};

let unsafeGetLightMaterialName = (material, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordLightMaterialMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  NameLightMaterialMainService.unsafeGetName(material, state);
};

let setLightMaterialName = (material, name, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordLightMaterialMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  NameLightMaterialMainService.setName(material, name, state);
};

let reInitMaterials = (materials, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            materials
            |> WonderCommonlib.ArrayService.forEach((. material) =>
                 AliveComponentService.checkComponentShouldAlive(
                   material,
                   isAlive,
                   RecordLightMaterialMainService.getRecord(state),
                 )
               )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  InitLightMaterialMainService.reInitComponents(materials, state);
};

let getAllLightMaterials = state => {
  let {index, disposedIndexArray} =
    RecordLightMaterialMainService.getRecord(state);

  GetAllComponentService.getAllComponents(index, disposedIndexArray);
};

let batchDisposeLightMaterial = (materialArr, state) =>
  DisposeComponentGameObjectMainService.batchDisposeLightMaterialComponent(
    materialArr,
    false,
    state,
  );

let batchDisposeLightMaterialRemoveTexture = (materialArr, state) =>
  DisposeComponentGameObjectMainService.batchDisposeLightMaterialComponent(
    materialArr,
    true,
    state,
  );