open StateDataType;

open AmbientLightType;

let getLightData = (state: StateDataType.state) => state.ambientLightData;

let deepCopyForRestore = (state: StateDataType.state) => {
  let {index, buffer, colors, gameObjectMap} = state |> getLightData;
  let copiedBuffer = CopyStateUtils.copyArrayBuffer(buffer);
  {
    ...state,
    ambientLightData: {
      index,
      buffer: copiedBuffer,
      colors: CopyStateUtils.copyFloat32TypeArrayFromBuffer(copiedBuffer),
      mappedIndexMap: gameObjectMap |> SparseMapSystem.copy,
      gameObjectMap: gameObjectMap |> SparseMapSystem.copy
    }
  }
};

let restore = (currentState, targetState) => targetState;