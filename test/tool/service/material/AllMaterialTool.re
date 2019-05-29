let pregetGLSLData = state =>
  state
  |> PregetGLSLDataTool.preparePrecision
  |> PregetGLSLDataJob.execJob(JobTool.getConfigRecord());

let prepareForInit = state => state |> pregetGLSLData;

let _testRemoveFromTypeArr =
    (
      state,
      (gameObject1, material1),
      (gameObject2, material2),
      (value1, value2),
      defaultValue,
      (disposeGameObjectMaterialComponentFunc, getValueFunc, setValueFunc),
    ) => {
  open Wonder_jest;
  open Expect;
  open Expect.Operators;
  open Sinon;

  TestTool.closeContractCheck();

  let state = state |> setValueFunc(material1, value1);
  let state = state |> setValueFunc(material2, value2);
  let state =
    state |> disposeGameObjectMaterialComponentFunc(gameObject1, material1);
  (getValueFunc(material1, state), getValueFunc(material2, state))
  |> expect == (defaultValue, value2);
};

let testRemoveFromTypeArr =
    (
      state,
      (value1, value2),
      defaultValue,
      (
        disposeGameObjectMaterialComponentFunc,
        createGameObjectFunc,
        getValueFunc,
        setValueFunc,
      ),
    ) => {
  let (state, gameObject1, material1) = createGameObjectFunc(state^);
  let (state, gameObject2, material2) = createGameObjectFunc(state);
  _testRemoveFromTypeArr(
    state,
    (gameObject1, material1),
    (gameObject2, material2),
    (value1, value2),
    defaultValue,
    (disposeGameObjectMaterialComponentFunc, getValueFunc, setValueFunc),
  );
};

let testRemoveFromTypeArrWithMap =
    (
      state,
      (value1, value2),
      defaultValue,
      (
        disposeGameObjectMaterialComponentFunc,
        createGameObjectFunc,
        getValueFunc,
        setValueFunc,
      ),
    ) => {
  let (state, gameObject1, (material1, _)) = createGameObjectFunc(state^);
  let (state, gameObject2, (material2, _)) = createGameObjectFunc(state);
  _testRemoveFromTypeArr(
    state,
    (gameObject1, material1),
    (gameObject2, material2),
    (value1, value2),
    defaultValue,
    (disposeGameObjectMaterialComponentFunc, getValueFunc, setValueFunc),
  );
};

let getShaderIndex = (material, state) => {
  open LightMaterialType;

  let {shaderIndices} = RecordLightMaterialMainService.getRecord(state);

  ShaderIndicesService.getShaderIndex(material, shaderIndices);
};