open ComponentSystem;

open StateDataType;

open MaterialSystem;

open GlType;

open MaterialType;

open MaterialStateCommon;

open Contract;

/* let getMaxCount = (state: StateDataType.state) =>
   BufferConfigCommon.getConfig(state).basicMaterialDataBufferCount; */
let create = (state: StateDataType.state) => BasicMaterialCreateCommon.create(state);

/* let buildInitShaderFuncTuple = () => ShaderSourceBuildCommon.buildGLSLSource;

   let initMaterialShaders = (gl, state: state) : state => {
     let {basic_material} = getShaders(state);
     MaterialCommon.initMaterialShaders(gl, basic_material, buildInitShaderFuncTuple(), state)
   }; */
let init = (gl, state: state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "shouldn't dispose any material before init",
          () =>
            MaterialDisposeComponentCommon.isNotDisposed(
              MaterialStateCommon.getMaterialData(state)
            )
            |> assertTrue
        )
      )
  );
  ArraySystem.range(0, MaterialStateCommon.getMaterialData(state).index - 1)
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
           MaterialInitComponentCommon.initMaterial(
             gl,
             materialIndex,
             /* Js.Option.getExn(MaterialCommon.getGameObject(materialIndex, state)), */
             state
           )
       ),
       state
     )
};