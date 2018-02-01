open StateDataType;

open AmbientLightType;

let getLightData = (state: StateDataType.state) => state.ambientLightData;

let deepCopyStateForRestore = (state: StateDataType.state) => {
  let {index, buffer, colors, gameObjectMap} = state |> getLightData;
  {
    ...state,
    ambientLightData: {
      index,
      /* TODO test */
      buffer: CopyStateUtils.copyArrayBuffer(buffer),
      colors: CopyStateUtils.copyFloat32TypeArrayFromBuffer(buffer),
      gameObjectMap: gameObjectMap |> SparseMapSystem.copy
    }
  }
};

let restore = (currentState, targetState) => targetState;