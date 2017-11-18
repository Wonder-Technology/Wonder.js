open RenderConfigSystem;

open StateDataType;

open MaterialSystem;

open GlType;

let create = (state: StateDataType.state) => MaterialSystem.create(state);

/* let buildInitShaderFuncTuple = () => ShaderSourceBuildSystem.buildGLSLSource;

   let initMaterialShaders = (gl, state: state) : state => {
     let {basic_material} = getShaders(state);
     MaterialSystem.initMaterialShaders(gl, basic_material, buildInitShaderFuncTuple(), state)
   }; */
let init = (gl, state: state) =>
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
             Js.Option.getExn(MaterialSystem.getGameObject(materialIndex, state)),
             state
           )
       ),
       state
     );
/* state |> initMaterialShaders(gl); */
/* let init = (state: StateDataType.state) => state; */