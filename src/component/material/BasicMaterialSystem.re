open ComponentSystem;

open RenderConfigSystem;

open StateDataType;

open MaterialSystem;

open GlType;

open MaterialType;

open MaterialStateUtils;

open Contract;

let getMaxCount = (state: StateDataType.state) =>
  BufferConfigSystem.getConfig(state).basicMaterialDataBufferCount;

let create = (state: StateDataType.state) => {
  let {index, disposedIndexArray} as data = getMaterialData(state);
  let index = generateIndex(getMaxCount(state), index, disposedIndexArray);
  data.index = succ(index);
  (state, index)
  |> ensureCheck(
       ((state, _)) => {
         open Contract.Operators;
         let {index} = getMaterialData(state);
         let maxCount = getMaxCount(state);
         test(
           {j|have create too many components(the count of transforms shouldn't exceed $maxCount)|j},
           () => index <= maxCount
         )
       }
     )
  /* MaterialSystem.create(state); */
};

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