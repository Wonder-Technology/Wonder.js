open MainStateDataType;

open LightMaterialType;

open CreateLightMaterialMainService;

open GameObjectLightMaterialService;

open OperateLightMaterialMainService;

open DisposeLightMaterialService;

let createLightMaterial = (state) => [@bs] create(state);

let unsafeGetLightMaterialGameObject = (material, state: MainStateDataType.state) => {
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
    MainStateData.stateData.isDebug
  );
  unsafeGetGameObject(material, state.lightMaterialRecord)
};

let unsafeGetLightMaterialDiffuseColor = (material, state: MainStateDataType.state) => {
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
    MainStateData.stateData.isDebug
  );
  unsafeGetDiffuseColor(material, state)
};

let setLightMaterialDiffuseColor = (material, color, state: MainStateDataType.state) => {
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
    MainStateData.stateData.isDebug
  );
  setDiffuseColor(material, color, state)
};

let unsafeGetLightMaterialSpecularColor = (material, state: MainStateDataType.state) => {
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
    MainStateData.stateData.isDebug
  );
  unsafeGetSpecularColor(material, state)
};

let setLightMaterialSpecularColor = (material, color, state: MainStateDataType.state) => {
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
    MainStateData.stateData.isDebug
  );
  setSpecularColor(material, color, state)
};

let unsafeGetLightMaterialShininess = (material, state: MainStateDataType.state) => {
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
    MainStateData.stateData.isDebug
  );
  unsafeGetShininess(material, state)
};

let setLightMaterialShininess = (material, shininess, state: MainStateDataType.state) => {
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
    MainStateData.stateData.isDebug
  );
  setShininess(material, shininess, state)
};