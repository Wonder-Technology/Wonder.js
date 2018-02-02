open StateDataType;

open DirectionLightType;

let getLightData = (state: StateDataType.state) => state.directionLightData;

let deepCopyStateForRestore = (state: StateDataType.state) => {
  open DirectionLightHelper;
  let {index, buffer, colors, intensities, gameObjectMap} = state |> getLightData;
  let copiedBuffer = CopyStateUtils.copyArrayBuffer(buffer);
  {
    ...state,
    directionLightData: {
      index,
      buffer: copiedBuffer,
      colors:
        CopyStateUtils.copyFloat32TypeArrayFromBufferRange(
          copiedBuffer,
          getColorsOffset(),
          getColorsLength()
        ),
      intensities:
        CopyStateUtils.copyFloat32TypeArrayFromBufferRange(
          copiedBuffer,
          getIntensitiesOffset(),
          getIntensitiesLength()
        ),
      mappedIndexMap: gameObjectMap |> SparseMapSystem.copy,
      gameObjectMap: gameObjectMap |> SparseMapSystem.copy
    }
  }
};

let restore = (currentState, targetState) => targetState;