open StateDataType;

open BasicMaterialType;

open CreateBasicMaterialMainService;

open GameObjectBasicMaterialService;

open OperateBasicMaterialMainService;

open DisposeBasicMaterialService;

let createBasicMaterial = (state) => [@bs] create(state);

let unsafeGetBasicMaterialGameObject = (material, state: StateDataType.state) => {
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
    StateData.stateData.isDebug
  );
  unsafeGetGameObject(material, state.basicMaterialRecord)
};

let unsafeGetBasicMaterialColor = (material, state: StateDataType.state) => {
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
    StateData.stateData.isDebug
  );
  unsafeGetColor(material, state)
};

let setBasicMaterialColor = (material, color, state: StateDataType.state) => {
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
    StateData.stateData.isDebug
  );
  setColor(material, color, state)
};