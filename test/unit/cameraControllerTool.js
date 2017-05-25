var cameraControllerTool = (function () {
    return {
        create: wd.createCameraController,
        setCameraNear: wd.setCameraNear,
        setCameraFar: wd.setCameraFar,
        setPerspectiveCameraFovy: wd.setPerspectiveCameraFovy,
        setPerspectiveCameraAspect: wd.setPerspectiveCameraAspect,

        resetData: function(){
            wd.initCameraControllerData(wd.CameraControllerData, wd.PerspectiveCameraData, wd.CameraData);
        }
    }
})()

