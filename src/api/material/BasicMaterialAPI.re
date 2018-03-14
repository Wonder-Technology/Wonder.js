open MainStateDataType;

open BasicMaterialType;

open CreateBasicMaterialMainService;

open GameObjectBasicMaterialService;

open OperateBasicMaterialMainService;

open DisposeBasicMaterialService;

let createBasicMaterial = (state) => [@bs] create(state);

let unsafeGetBasicMaterialGameObject = (material, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              state.basicMaterialRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  unsafeGetGameObject(material, state.basicMaterialRecord)
};

let unsafeGetBasicMaterialColor = (material, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              state.basicMaterialRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  unsafeGetColor(material, state)
};

let setBasicMaterialColor = (material, color, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              state.basicMaterialRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  setColor(material, color, state)
};