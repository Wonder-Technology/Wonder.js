open StateDataMainType;

open LightMaterialType;

open CreateLightMaterialMainService;

open GameObjectLightMaterialService;

open OperateLightMaterialMainService;

open DisposeLightMaterialMainService;

let createLightMaterial = (state) => [@bs] create(state);

let unsafeGetLightMaterialGameObject = (material, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordLightMaterialMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  unsafeGetGameObject(material, RecordLightMaterialMainService.getRecord(state))
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
              RecordLightMaterialMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  getDiffuseColor(material, state)
};

let setLightMaterialDiffuseColor = (material, color, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordLightMaterialMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  setDiffuseColor(material, color, state)
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
              RecordLightMaterialMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  getSpecularColor(material, state)
};

let setLightMaterialSpecularColor = (material, color, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordLightMaterialMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  setSpecularColor(material, color, state)
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
              RecordLightMaterialMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  getShininess(material, state)
};

let setLightMaterialShininess = (material, shininess, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordLightMaterialMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  setShininess(material, shininess, state)
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
              RecordLightMaterialMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  unsafeGetDiffuseMap(material, state)
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
              RecordLightMaterialMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  setDiffuseMap(material, texture, state)
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
              RecordLightMaterialMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  unsafeGetSpecularMap(material, state)
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
              RecordLightMaterialMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  setSpecularMap(material, texture, state)
};