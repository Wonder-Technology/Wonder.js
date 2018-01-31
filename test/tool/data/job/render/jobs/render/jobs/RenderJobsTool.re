let _getDefaultRenderJobConfig = () => RenderJobConfigTool.buildRenderJobConfig();

let initWithJobConfig = (sandbox) =>
  TestTool.initWithJobConfig(
    ~sandbox,
    ~bufferConfig=Js.Nullable.return(GeometryTool.buildBufferConfig(1000)),
    ~logicJobConfig=LogicJobConfigTool.buildLogicJobConfig(),
    ~renderJobConfig=_getDefaultRenderJobConfig(),
    ()
  );

let initWithJobConfigWithoutBuildFakeDom = (sandbox) =>
  TestTool.initWithJobConfigWithoutBuildFakeDom(
    ~sandbox,
    ~bufferConfig=Js.Nullable.return(GeometryTool.buildBufferConfig(1000)),
    ~logicJobConfig=LogicJobConfigTool.buildLogicJobConfig(),
    ~renderJobConfig=_getDefaultRenderJobConfig(),
    ()
  );

let initWithJobConfigAndBufferConfig = (sandbox, bufferConfig) =>
  TestTool.initWithJobConfig(
    ~sandbox,
    ~bufferConfig,
    ~logicJobConfig=LogicJobConfigTool.buildLogicJobConfig(),
    ~renderJobConfig=_getDefaultRenderJobConfig(),
    ()
  );

let prepareGameObject = (sandbox, state) => {
  open GameObject;
  open BasicMaterial;
  open BoxGeometry;
  open MeshRenderer;
  open Sinon;
  let (state, material) = createBasicMaterial(state);
  let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
  let (state, meshRenderer) = createMeshRenderer(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectBasicMaterialComponent(gameObject, material)
    |> addGameObjectGeometryComponent(gameObject, geometry)
    |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
  (state, gameObject, geometry, material, meshRenderer)
};

let initSystemAndRender = (state: StateDataType.state) =>
  state |> JobTool.init |> DirectorTool.initSystem |> WebGLRenderTool.init;

let updateSystem = (state: StateDataType.state) => state |> DirectorTool.updateSystem;

let passGl = (sandbox, state: StateDataType.state) =>
  state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));

let buildConfigData = (~flags=None, ~shader=None, ()) => (flags, shader);