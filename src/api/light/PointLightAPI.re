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
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetGameObject(light, state.pointLightRecord);
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
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getColor(light, state.pointLightRecord);
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
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  {
    ...state,
    pointLightRecord: setColor(light, color, state.pointLightRecord),
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
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getIntensity(light, state.pointLightRecord);
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
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  {
    ...state,
    pointLightRecord: setIntensity(light, intensity, state.pointLightRecord),
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
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getConstant(light, state.pointLightRecord);
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
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  {
    ...state,
    pointLightRecord: setConstant(light, constant, state.pointLightRecord),
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
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getLinear(light, state.pointLightRecord);
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
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  {
    ...state,
    pointLightRecord: setLinear(light, linear, state.pointLightRecord),
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
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getQuadratic(light, state.pointLightRecord);
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
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  {
    ...state,
    pointLightRecord: setQuadratic(light, quadratic, state.pointLightRecord),
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
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getRange(light, state.pointLightRecord);
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
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  {
    ...state,
    pointLightRecord: setRange(light, range, state.pointLightRecord),
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
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  {
    ...state,
    pointLightRecord: setRangeLevel(light, level, state.pointLightRecord),
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
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getIsRender(light, state.pointLightRecord);
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
              state.pointLightRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  {
    ...state,
    pointLightRecord: setIsRender(light, isRender, state.pointLightRecord),
  };
};

let isMaxCount = ({pointLightRecord}) =>
  MaxCountLightService.isMaxCount(
    pointLightRecord.renderLightArr,
    BufferPointLightService.getBufferMaxCount(),
  );