open StateDataMainType;

open BasicMaterialType;

open CreateBasicMaterialMainService;

open GameObjectBasicMaterialService;

open OperateBasicMaterialMainService;

open DisposeBasicMaterialMainService;

let createBasicMaterial = state => create(. state);

let unsafeGetBasicMaterialGameObjects =
    (material, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordBasicMaterialMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetGameObjects(
    material,
    RecordBasicMaterialMainService.getRecord(state),
  );
};

let getBasicMaterialColor = (material, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordBasicMaterialMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getColor(material, state);
};

let setBasicMaterialColor = (material, color, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordBasicMaterialMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  setColor(material, color, state);
};

let getBasicMaterialIsDepthTest = (material, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordBasicMaterialMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getIsDepthTest(material, state);
};

let setBasicMaterialIsDepthTest =
    (material, isDepthTest, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordBasicMaterialMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  setIsDepthTest(material, isDepthTest, state);
};

let getBasicMaterialAlpha = (material, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordBasicMaterialMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getAlpha(material, state);
};

let setBasicMaterialAlpha = (material, alpha, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordBasicMaterialMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  setAlpha(material, alpha, state);
};

let unsafeGetBasicMaterialName = (material, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordBasicMaterialMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  NameBasicMaterialMainService.unsafeGetName(material, state);
};

let setBasicMaterialName = (material, name, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordBasicMaterialMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  NameBasicMaterialMainService.setName(material, name, state);
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
                   RecordBasicMaterialMainService.getRecord(state),
                 )
               )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  InitBasicMaterialMainService.reInitComponents(materials, state);
};

let getAllBasicMaterials = state => {
  let {index, disposedIndexArray} =
    RecordBasicMaterialMainService.getRecord(state);

  GetAllComponentService.getAllComponents(index, disposedIndexArray);
};

let batchDisposeBasicMaterial = (materialArr, state) =>
  DisposeComponentGameObjectMainService.batchDisposeBasicMaterialComponent(
    materialArr,
    state,
  );