open CameraControllerType;

open PerspectiveCameraType;

open ComponentDisposeComponentCommon;

let disposeData = (cameraController, state: StateDataType.state) => {
  let {nearMap, farMap, fovyMap, aspectMap} as data =
    CameraControllerStateCommon.getPerspectiveCameraData(state);
  {
    ...state,
    cameraControllerData: {
      ...CameraControllerStateCommon.getCameraControllerData(state),
      perspectiveCameraData: {
        ...data,
        nearMap: disposeSparseMapData(cameraController, nearMap),
        farMap: disposeSparseMapData(cameraController, farMap),
        fovyMap: disposeSparseMapData(cameraController, fovyMap),
        aspectMap: disposeSparseMapData(cameraController, aspectMap)
      }
    }
  }
};