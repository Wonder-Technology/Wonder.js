open StateDataType;

open AmbientLightType;

let getLightData = (state: StateDataType.state) => state.ambientLightData;

let deepCopyStateForRestore = (state: StateDataType.state) => {
  let {index, buffer, colors, isColorDirtys, gameObjectMap} = state |> getLightData;
  {
    ...state,
    ambientLightData: {
      index,
      /* TODO test */
      buffer: CopyStateUtils.copyArrayBuffer(buffer),
      colors: CopyStateUtils.copyFloat32TypeArrayFromBuffer(buffer),
      isColorDirtys: CopyStateUtils.copyUint8TypeArrayFromBuffer(buffer),
      gameObjectMap: gameObjectMap |> SparseMapSystem.copy
    }
  }
};

let restore = (currentState, targetState) => targetState;