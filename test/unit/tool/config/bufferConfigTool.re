open BufferConfigSystem;

/* let minBufferSize (state: StateDataType.state) => {
     (getConfig state).transformDataBufferCount = 5;
     state
   }; */
let setBufferSize =
    (state: StateDataType.state, ~transformDataBufferCount=10, ~meshRendererDataBufferCount=10, ()) => {
  getConfig(state).transformDataBufferCount = transformDataBufferCount;
  getConfig(state).meshRendererDataBufferCount = meshRendererDataBufferCount;
  state
};
