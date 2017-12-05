open ComponentSystem;

open RenderConfigSystem;

open StateDataType;

open MaterialSystem;

open GlType;

open MaterialType;

open MaterialStateSystem;

open Contract;

/* let getMaxCount = (state: StateDataType.state) =>
   BufferConfigSystem.getConfig(state).basicMaterialDataBufferCount; */
let create = (state: StateDataType.state) => BasicMaterialCreateSystem.create(state);

/* let buildInitShaderFuncTuple = () => ShaderSourceBuildSystem.buildGLSLSource;

   let initMaterialShaders = (gl, state: state) : state => {
     let {basic_material} = getShaders(state);
     MaterialSystem.initMaterialShaders(gl, basic_material, buildInitShaderFuncTuple(), state)
   }; */
let init = (gl, state: state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "shouldn't dispose any material before init",
          () =>
            MaterialDisposeComponentSystem.isNotDisposed(
              MaterialStateSystem.getMaterialData(state)
            )
            |> assertTrue
        )
      )
  );
  ArraySystem.range(0, MaterialStateSystem.getMaterialData(state).index - 1)
  |> ArraySystem.reduceState(
       [@bs]
       (
         (state, materialIndex: int) =>
           /* _initMaterialShader(
                gl,
                materialIndex,
                material_shader,
                attributeLocationMap,
                uniformLocationMap,
                initShaderFuncTuple,
                state
              ) */
           MaterialInitComponentSystem.initMaterial(
             gl,
             materialIndex,
             /* Js.Option.getExn(MaterialSystem.getGameObject(materialIndex, state)), */
             state
           )
       ),
       state
     )
};