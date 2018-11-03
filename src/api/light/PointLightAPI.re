open StateDataMainType;

open PointLightType;

open CreatePointLightService;

open GameObjectPointLightService;

open DisposePointLightService;

open OperatePointLightService;

let createPointLight = state => CreatePointLightMainService.create(. state);

let unsafeGetPointLightGameObject = (light, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              RecordPointLightMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetGameObject(light, RecordPointLightMainService.getRecord(state));
};

let getPointLightColor = (light, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              RecordPointLightMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getColor(light, RecordPointLightMainService.getRecord(state));
};

let setPointLightColor = (light, color, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              RecordPointLightMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  {
    ...state,
    pointLightRecord:
      Some(
        setColor(light, color, RecordPointLightMainService.getRecord(state)),
      ),
  };
};

let getPointLightIntensity = (light, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              RecordPointLightMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getIntensity(light, RecordPointLightMainService.getRecord(state));
};

let setPointLightIntensity =
    (light, intensity, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              RecordPointLightMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  {
    ...state,
    pointLightRecord:
      Some(
        setIntensity(
          light,
          intensity,
          RecordPointLightMainService.getRecord(state),
        ),
      ),
  };
};

let getPointLightConstant = (light, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              RecordPointLightMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getConstant(light, RecordPointLightMainService.getRecord(state));
};

let setPointLightConstant = (light, constant, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              RecordPointLightMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  {
    ...state,
    pointLightRecord:
      Some(
        setConstant(
          light,
          constant,
          RecordPointLightMainService.getRecord(state),
        ),
      ),
  };
};

let getPointLightLinear = (light, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              RecordPointLightMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getLinear(light, RecordPointLightMainService.getRecord(state));
};

let setPointLightLinear = (light, linear, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              RecordPointLightMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  {
    ...state,
    pointLightRecord:
      Some(
        setLinear(
          light,
          linear,
          RecordPointLightMainService.getRecord(state),
        ),
      ),
  };
};

let getPointLightQuadratic = (light, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              RecordPointLightMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getQuadratic(light, RecordPointLightMainService.getRecord(state));
};

let setPointLightQuadratic =
    (light, quadratic, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              RecordPointLightMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  {
    ...state,
    pointLightRecord:
      Some(
        setQuadratic(
          light,
          quadratic,
          RecordPointLightMainService.getRecord(state),
        ),
      ),
  };
};

let getPointLightRange = (light, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              RecordPointLightMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getRange(light, RecordPointLightMainService.getRecord(state));
};

let setPointLightRange = (light, range, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              RecordPointLightMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  {
    ...state,
    pointLightRecord:
      Some(
        setRange(light, range, RecordPointLightMainService.getRecord(state)),
      ),
  };
};

let setPointLightRangeLevel = (light, level, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              RecordPointLightMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  {
    ...state,
    pointLightRecord:
      Some(
        setRangeLevel(
          light,
          level,
          RecordPointLightMainService.getRecord(state),
        ),
      ),
  };
};

let getPointLightIsRender = (light, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              RecordPointLightMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getIsRender(light, RecordPointLightMainService.getRecord(state));
};

let setPointLightIsRender = (light, isRender, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              RecordPointLightMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  {
    ...state,
    pointLightRecord:
      Some(
        setIsRender(
          light,
          isRender,
          RecordPointLightMainService.getRecord(state),
        ),
      ),
  };
};

let isMaxCount = state =>
  MaxCountLightService.isMaxCount(
    RecordPointLightMainService.getRecord(state).renderLightArr,
    BufferPointLightService.getBufferMaxCount(),
  );