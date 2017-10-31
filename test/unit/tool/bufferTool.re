open BufferConfigSystem;

/* let minBufferSize (state: StateDataType.state) => {
     (getBufferConfig state).transformDataBufferCount = 5;
     state
   }; */
let setBufferSize = (~transformDataBufferCount=10, state: StateDataType.state) => {
  getBufferConfig(state).transformDataBufferCount = transformDataBufferCount;
  state
};
