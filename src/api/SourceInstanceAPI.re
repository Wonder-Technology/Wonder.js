open StateDataMainType;

open AllInstanceType;

open SourceInstanceType;

open DisposeSourceInstanceMainService;

open CreateObjectInstanceGameObjectMainService;

open GameObjectSourceInstanceService;

let createSourceInstance = CreateSourceInstanceMainService.create;

let unsafeGetSourceInstanceGameObject = (sourceInstance, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              sourceInstance,
              isAlive,
              RecordSourceInstanceMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  unsafeGetGameObject(sourceInstance, RecordSourceInstanceMainService.getRecord(state))
};

let createObjectInstanceGameObject = (sourceInstance, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              sourceInstance,
              isAlive,
              RecordSourceInstanceMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  createInstance(sourceInstance, state)
};

let getSourceInstanceObjectInstanceTransformArray =
    (sourceInstance, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              sourceInstance,
              isAlive,
              RecordSourceInstanceMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  GetObjectInstanceArrayMainService.getObjectInstanceTransformArray(sourceInstance, state)
};

let markSourceInstanceModelMatrixIsStatic =
    (sourceInstance: sourceInstance, isStatic: bool, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              sourceInstance,
              isAlive,
              RecordSourceInstanceMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  {
    ...state,
    sourceInstanceRecord:
      Some({
        ...RecordSourceInstanceMainService.getRecord(state),
        isTransformStatics:
          StaticTransformService.markModelMatrixIsStatic(
            sourceInstance,
            isStatic,
            RecordSourceInstanceMainService.getRecord(state).isTransformStatics
          )
      })
  }
};