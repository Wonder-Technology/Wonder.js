open MaterialType;

open StateDataType;

let handleInitComponent = MaterialInitComponentCommon.handleInitComponent;

let getGameObject = (material: material, state: StateDataType.state) =>
  MaterialGameObjectCommon.getGameObject(material, state);

let getMaterialData = MaterialStateCommon.getMaterialData;

let unsafeGetShaderIndex = MaterialShaderIndexCommon.unsafeGetShaderIndex;

let setShaderIndex = MaterialShaderIndexCommon.setShaderIndex;

let isAlive = (material: material, state: StateDataType.state) =>
  MaterialDisposeComponentCommon.isAlive(material, state);

/* let getShaderIndexDataSize = () => 1;

   /* let getColorDataSize = () => 3; */
   let getBasicMaterialBufferCount = (state: StateDataType.state) =>
     BufferConfigCommon.getConfig(state).basicMaterialDataBufferCount;

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