open StateDataType;

open PointLightType;

let getLightData = (state: StateDataType.state) => state.pointLightData;

let deepCopyStateForRestore = (state: StateDataType.state) => {
  open PointLightHelper;
  let {index, buffer, colors, intensities, constants, linears, quadratics, ranges, gameObjectMap} =
    state |> getLightData;
  let copiedBuffer = CopyStateUtils.copyArrayBuffer(buffer);
  {
    ...state,
    pointLightData: {
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
      constants:
        CopyStateUtils.copyFloat32TypeArrayFromBufferRange(
          copiedBuffer,
          getConstantsOffset(),
          getConstantsLength()
        ),
      linears:
        CopyStateUtils.copyFloat32TypeArrayFromBufferRange(
          copiedBuffer,
          getLinearsOffset(),
          getLinearsLength()
        ),
      quadratics:
        CopyStateUtils.copyFloat32TypeArrayFromBufferRange(
          copiedBuffer,
          getQuadraticsOffset(),
          getQuadraticsLength()
        ),
      ranges:
        CopyStateUtils.copyFloat32TypeArrayFromBufferRange(
          copiedBuffer,
          getRangesOffset(),
          getRangesLength()
        ),
      mappedIndexMap: gameObjectMap |> SparseMapSystem.copy,
      gameObjectMap: gameObjectMap |> SparseMapSystem.copy
    }
  }
};

let restore = (currentState, targetState) => targetState;