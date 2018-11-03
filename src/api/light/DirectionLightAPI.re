open StateDataMainType;

open DirectionLightType;

open CreateDirectionLightService;

open GameObjectDirectionLightService;

open DisposeDirectionLightService;

open OperateDirectionLightService;

let createDirectionLight = state =>
  CreateDirectionLightMainService.create(. state);

let unsafeGetDirectionLightGameObject =
    (light, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              RecordDirectionLightMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetGameObject(
    light,
    RecordDirectionLightMainService.getRecord(state),
  );
};

let getDirectionLightColor = (light, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              RecordDirectionLightMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getColor(light, RecordDirectionLightMainService.getRecord(state));
};

let setDirectionLightColor = (light, color, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              RecordDirectionLightMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  {
    ...state,
    directionLightRecord:
      Some(
        setColor(
          light,
          color,
          RecordDirectionLightMainService.getRecord(state),
        ),
      ),
  };
};

let getDirectionLightIntensity = (light, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              RecordDirectionLightMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getIntensity(light, RecordDirectionLightMainService.getRecord(state));
};

let setDirectionLightIntensity =
    (light, intensity, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              RecordDirectionLightMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  {
    ...state,
    directionLightRecord:
      Some(
        setIntensity(
          light,
          intensity,
          RecordDirectionLightMainService.getRecord(state),
        ),
      ),
  };
};

let getDirectionLightIsRender = (light, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              RecordDirectionLightMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getIsRender(light, RecordDirectionLightMainService.getRecord(state));
};

let setDirectionLightIsRender = (light, isRender, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              RecordDirectionLightMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  {
    ...state,
    directionLightRecord:
      Some(
        setIsRender(
          light,
          isRender,
          RecordDirectionLightMainService.getRecord(state),
        ),
      ),
  };
};

let isMaxCount = state =>
  MaxCountLightService.isMaxCount(
    RecordDirectionLightMainService.getRecord(state).renderLightArr,
    BufferDirectionLightService.getBufferMaxCount(),
  );