open MaterialType;

/* open Js.Typed_array; */
open MaterialStateUtils;

open Contract;

open StateDataType;

let create = (state: StateDataType.state) => {
  let data = getMaterialData(state);
  let index = data.index;
  data.index = succ(data.index);
  (state, index)
};

let getGameObject = (material: material, state: StateDataType.state) =>
  ComponentSystem.getComponentGameObject(material, getMaterialData(state).gameObjectMap);

let getShaderIndex = (materialIndex: int, state: StateDataType.state) =>
  getMaterialData(state).shaderIndexMap
  |> HashMapSystem.unsafeGet(Js.Int.toString(materialIndex))
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "shaderIndex should exist",
             () =>
               getMaterialData(state).shaderIndexMap
               |> HashMapSystem.get(Js.Int.toString(materialIndex))
               |> assertExist
           )
         )
     );

let setShaderIndex = (materialIndex: int, shaderIndex: int, state: StateDataType.state) => {
  getMaterialData(state).shaderIndexMap
  |> HashMapSystem.set(Js.Int.toString(materialIndex), shaderIndex)
  |> ignore;
  state
};

let _initMaterialShader =
    (
      gl,
      materialIndex: int,
      materialShaders: array(shader),
      initShaderFuncTuple,
      state: StateDataType.state
    ) => {
  open RenderConfigSystem;
  let {groups} = getShaders(state);
  let shaderLibs = getShaderLibs(state);
  let gameObject = Js.Option.getExn(getGameObject(materialIndex, state));
  let geometry = Js.Option.getExn(GameObjectSystem.getGeometryComponent(gameObject, state));
  materialShaders
  |> ArraySystem.reduce(
       (state, {name, shader_libs}) => {
         let shaderIndex =
           ShaderSystem.initMaterialShader(
             gl,
             materialIndex,
             geometry,
             gameObject,
             name,
             getMaterialShaderLibDataArr(materialIndex, groups, shader_libs, shaderLibs),
             initShaderFuncTuple,
             state
           );
         setShaderIndex(materialIndex, shaderIndex, state)
       },
       state
     )
};

let initMaterialShaders =
    (gl, materialShaders: array(shader), initShaderFuncTuple, state: StateDataType.state) =>
  /* todo check dispose:shouldn't dispose before init render! */
  ArraySystem.range(0, MaterialStateUtils.getMaterialData(state).index - 1)
  |> ArraySystem.reduce(
       (state, materialIndex: int) =>
         _initMaterialShader(gl, materialIndex, materialShaders, initShaderFuncTuple, state),
       state
     );

/* let getShaderIndexDataSize = () => 1;

   /* let getColorDataSize = () => 3; */
   let getBasicMaterialBufferCount = (state: StateDataType.state) =>
     BufferConfigSystem.getBufferConfig(state).basicMaterialDataBufferCount;

   let getMaterialBufferSize = () =>
     /* Float32Array.BYTES_PER_ELEMENT * (getShaderIndexDataSize() + getColorDataSize()); */
     Float32Array._BYTES_PER_ELEMENT * getShaderIndexDataSize();

   let getBasicMaterialBufferSize = () => getMaterialBufferSize();

   let getTotalMaterialBufferCount = (state: StateDataType.state) =>
     getBasicMaterialBufferCount(state);

   let getBufferLength = (state: StateDataType.state) =>
     getBasicMaterialBufferCount(state) * getBasicMaterialBufferSize();

   let _createTypeArrays = (buffer, count: int) => {
     let offset = ref(0);
     let shaderIndices =
       Uint32Array.fromBufferRange(buffer, ~offset=offset^, ~length=count * getShaderIndexDataSize());
     offset := count * Uint32Array._BYTES_PER_ELEMENT * getShaderIndexDataSize();
     /* let colors =
          Float32Array.fromBufferRange(buffer, ~offset=offset^, ~length=count * getColorDataSize());
        offset := count * Float32Array._BYTES_PER_ELEMENT * getColorDataSize(); */
     (buffer, shaderIndices)
   };

   let _setDefaultTypeArrData = (state: StateDataType.state, count: int, (buffer, shaderIndices)) => {
     let materialData = getMaterialData(state);
     let defaultShaderIndex = 0;
     for (i in 0 to count - 1) {
       setShaderIndex(i, defaultShaderIndex, shaderIndices) |> ignore
     };
     (buffer, shaderIndices)
   };

   let _initBufferData = (state: StateDataType.state) => {
     let buffer = ArrayBuffer.make(getBufferLength(state));
     let count = getTotalMaterialBufferCount(state);
     _createTypeArrays(buffer, count) |> _setDefaultTypeArrData(state, count)
   }; */
let initData = (state: StateDataType.state) => {
  /* let (buffer, shaderIndices) = _initBufferData(state); */
  state.materialData =
    Some({
      index: 0,
      /* buffer, */
      shaderIndexMap: HashMapSystem.createEmpty(),
      gameObjectMap: HashMapSystem.createEmpty()
    });
  state
};