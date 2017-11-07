open Jest;
let _ =
describe
("test get_render_list job", 
(
() => {
open Expect;
open Expect.Operators;
open Sinon;
let sandbox = getSandboxDefaultVal ();
let state = ref (StateSystem.createState ());
beforeEach(()=>{
sandbox := createSandbox ();
state := RenderJobsTool.initWithRenderConfig();

});
test
("set render list to state.renderData.renderList", 
(
() => {


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
    |> addGameObjectMaterialComponent(gameObject, material)
    |> addGameObjectGeometryComponent(gameObject, geometry)
    |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
  (state, gameObject, geometry, material, meshRenderer)
};

let (state, gameObject1, _, _, _) = prepareGameObject(sandbox, state^);
let (state, gameObject2, _, _, _) = prepareGameObject(sandbox, state);



let init = (state: StateDataType.state) =>
  state
  |> GeometryTool.initGeometrys
  /* |> DirectorTool.initSystem */
  |> WebGLRenderSystem.init;
  
  
  let _buildConfigData = () => {
    ([||], "")
  };
let render = (state: StateDataType.state) =>
  state
  |> GetRenderListJobSystem.getJob(
 _buildConfigData() ,
 [@bs] DeviceManagerSystem.getGL(state)
  );


  let shaderSource = createEmptyStubWithJsObjSandbox(sandbox);
  let createProgram = createEmptyStubWithJsObjSandbox(sandbox);
  let state =
    state
    |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~shaderSource, ~createProgram, ()));


  let state = state |> init |> render;

  state.renderData.renderList |> expect == Some(
      [|
      gameObject1, gameObject2|]
  );
})
);
})
);