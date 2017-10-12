var CameraControllerSystemTool = YYC.Class({
    Public: {
        getGameObject: wd.getCameraControllerGameObject,

        getCameraController: function(gameObject){
            return gameObjectSystemTool.getComponent(gameObject, wd.CameraController, wd.GameObjectData);
        },

        resetData: function(){
            wd.initCameraControllerData(wd.CameraControllerData, wd.PerspectiveCameraData, wd.CameraData);
        }
    }
});

var cameraControllerSystemTool = new CameraControllerSystemTool();

YYC.Tool.extend.extend(cameraControllerSystemTool, cameraControllerTool);
