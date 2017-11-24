open ComponentSystem;

open RenderConfigSystem;

open StateDataType;

open MaterialSystem;

open GlType;

open MaterialType;

open MaterialStateUtils;

open Contract;

/* let getMaxCount = (state: StateDataType.state) =>
   BufferConfigSystem.getConfig(state).basicMaterialDataBufferCount; */
let create = (state: StateDataType.state) => BasicMaterialCreateUtils.create(state);

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
            MaterialDisposeComponentUtils.isNotDisposed(MaterialStateUtils.getMaterialData(state))
            |> assertTrue
        )
      )
  );
  ArraySystem.range(0, MaterialStateUtils.getMaterialData(state).index - 1)
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
           MaterialInitComponentUtils.initMaterial(
             gl,
             materialIndex,
             /* Js.Option.getExn(MaterialSystem.getGameObject(materialIndex, state)), */
             state
           )
       ),
       state
     )
};