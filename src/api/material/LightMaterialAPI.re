open StateDataType;

open LightMaterialType;

open CreateLightMaterialMainService;

open GameObjectLightMaterialService;

open OperateLightMaterialMainService;

open DisposeLightMaterialService;

let createLightMaterial = (state) => [@bs] create(state);

let unsafeGetLightMaterialGameObject = (material, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              state.lightMaterialRecord
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  unsafeGetGameObject(material, state.lightMaterialRecord)
};

let unsafeGetLightMaterialDiffuseColor = (material, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              state.lightMaterialRecord
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  unsafeGetDiffuseColor(material, state)
};

let setLightMaterialDiffuseColor = (material, color, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              state.lightMaterialRecord
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  setDiffuseColor(material, color, state)
};

let unsafeGetLightMaterialSpecularColor = (material, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              state.lightMaterialRecord
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  unsafeGetSpecularColor(material, state)
};

let setLightMaterialSpecularColor = (material, color, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              state.lightMaterialRecord
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  setSpecularColor(material, color, state)
};

let unsafeGetLightMaterialShininess = (material, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              state.lightMaterialRecord
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  unsafeGetShininess(material, state)
};

let setLightMaterialShininess = (material, shininess, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              state.lightMaterialRecord
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  setShininess(material, shininess, state)
};