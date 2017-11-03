open RenderConfigSystem;

open StateDataType;

open MaterialSystem;

let buildInitShaderFuncTuple = () => (
  ShaderSourceBuildSystem.buildGLSLSource,
  DeviceManagerSystem.getGL
);

let _initMaterialShader = (materialIndex: int, initShaderFuncTuple, state: StateDataType.state) => {
  let {groups, basic_material: basic_materialShaders} = getShaders(state);
  let shaderLibs = getShaderLibs(state);
  /* switch(getGameObject(materialIndex, state)){
     | None => ()
     | Some (gameObject) =>  */
  let gameObject = Js.Option.getExn(getGameObject(materialIndex, state));
  let geometry = Js.Option.getExn(GameObjectSystem.getGeometryComponent(gameObject, state));
  basic_materialShaders
  |> ArraySystem.forEach(
       ({name, shader_libs}) =>
         ShaderSystem.initMaterialShader(
           materialIndex,
           geometry,
           gameObject,
           name,
           getMaterialShaderLibDataArr(materialIndex, groups, shader_libs, shaderLibs),
           initShaderFuncTuple,
           state
         )
         |> ignore
     )
};

let initMaterialShaders = (state: StateDataType.state) => {
  let initShaderFuncTuple = buildInitShaderFuncTuple();
  /* let {groups, basic_material: basic_materialShaders} = getShaders(state); */
  /* todo check dispose:shouldn't dispose before init render! */
  ArraySystem.range(0, MaterialStateUtils.getMaterialData(state).index - 1)
  |> ArraySystem.forEach(
       (materialIndex: int) => _initMaterialShader(materialIndex, initShaderFuncTuple, state)
     );
  state
};

let init = (state: StateDataType.state) => state |> initMaterialShaders;
/* let init = (state: StateDataType.state) => state; */