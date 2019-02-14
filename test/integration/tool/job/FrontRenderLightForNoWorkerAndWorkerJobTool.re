open Sinon;

let prepareForUseProgramCase = (sandbox, state) => {
  let (state, _, _, _, _) =
    FrontRenderLightJobTool.prepareGameObject(sandbox, state);
  let (state, _, _, _) = CameraTool.createCameraGameObject(state);
  state;
};

let setFakeGlForLight = (sandbox, nameArr, state) => {
  let uniform1f = createEmptyStubWithJsObjSandbox(sandbox);
  let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
  let posArr = nameArr |> Js.Array.mapi((_, index) => index);
  let getUniformLocation =
    GLSLLocationTool.getUniformLocationWithNameArr(
      sandbox,
      Sinon.createEmptyStubWithJsObjSandbox(sandbox),
      nameArr,
      posArr,
    );
  let state =
    state
    |> FakeGlWorkerTool.setFakeGl(
         FakeGlWorkerTool.buildFakeGl(
           ~sandbox,
           ~uniform1f,
           ~uniform3f,
           ~getUniformLocation,
           (),
         ),
       );
  (state, posArr, (uniform1f, uniform3f));
};

let prepareOneForDirectionLight = (sandbox, state) => {
  let (state, gameObject, _, material, _) =
    FrontRenderLightJobTool.prepareGameObject(sandbox, state);
  let (state, lightGameObject, light) =
    DirectionLightTool.createGameObject(state);
  let (state, _, cameraTransform, _) =
    CameraTool.createCameraGameObject(state);
  (state, lightGameObject, material, light, cameraTransform);
};

let prepareOneForPointLight = (sandbox, state) => {
  let (state, gameObject, _, material, _) =
    FrontRenderLightJobTool.prepareGameObject(sandbox, state);
  let (state, lightGameObject1, light1) =
    PointLightTool.createGameObject(state);
  let (state, _, cameraTransform, _) =
    CameraTool.createCameraGameObject(state);
  (state, lightGameObject1, material, light1, cameraTransform);
};

let prepareFourForPointLight = (sandbox, state) => {
  let (state, gameObject, _, material, _) =
    FrontRenderLightJobTool.prepareGameObject(sandbox, state);
  let (state, lightGameObject1, light1) =
    PointLightTool.createGameObject(state);
  let (state, lightGameObject2, light2) =
    PointLightTool.createGameObject(state);
  let (state, lightGameObject3, light3) =
    PointLightTool.createGameObject(state);
  let (state, lightGameObject4, light4) =
    PointLightTool.createGameObject(state);
  let (state, _, cameraTransform, _) =
    CameraTool.createCameraGameObject(state);
  (
    state,
    (lightGameObject1, lightGameObject2, lightGameObject3, lightGameObject4),
    material,
    (light1, light2, light3, light4),
    cameraTransform,
  );
};

module TestSendDirection = {
  let testOneLight = (sandbox, state, prepareOneFunc, execAndJudgeFunc) => {
    let (state, lightGameObject, material, light, cameraTransform) =
      prepareOneFunc(sandbox, state^);
    let state =
      state
      |> TransformAPI.setTransformLocalRotation(
           GameObjectAPI.unsafeGetGameObjectTransformComponent(
             lightGameObject,
             state,
           ),
           (0.1, 10.5, 1.5, 1.),
         );

    let (state, posArr, (uniform1f, uniform3f)) =
      setFakeGlForLight(
        sandbox,
        [|"u_directionLights[0].direction"|],
        state,
      );

    execAndJudgeFunc(
      sandbox,
      [|
        posArr[0] |> Obj.magic,
        0.0809289658069698,
        0.7083167921793907,
        (-0.7012402045020751),
      |],
      uniform3f,
      state,
    );
  };
};