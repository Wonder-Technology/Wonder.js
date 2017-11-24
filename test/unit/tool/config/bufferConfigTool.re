open BufferConfigSystem;

let setBufferSize =
    (
      state: StateDataType.state,
      ~transformDataBufferCount=10,
      ~basicMaterialDataBufferCount=10,
      ~geometryPointDataBufferCount=100,
      ()
    ) => {
  getConfig(state).transformDataBufferCount = transformDataBufferCount;
  getConfig(state).basicMaterialDataBufferCount = basicMaterialDataBufferCount;
  getConfig(state).geometryPointDataBufferCount = geometryPointDataBufferCount;
  state
};

let buildBufferConfig = (count) => {
  "transformDataBufferCount": Js.Nullable.return(count),
  "geometryPointDataBufferCount": Js.Nullable.return(count),
  "basicMaterialDataBufferCount": Js.Nullable.return(count)
};