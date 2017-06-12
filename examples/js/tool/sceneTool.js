var sceneTool = (function () {
    var _getScene = function (){
        return wd.Director.getInstance().scene;
    }

    return {
        addGameObject: function(gameObj){
            wd.addSceneChild(_getScene(), gameObj);
        },
        removeGameObject: function(gameObj){
            wd.removeSceneChild(_getScene(), gameObj);
        },
        addCameraObject: function(){
            var cameraObj = gameObjectTool.create();
            var cameraController = cameraControllerTool.create();

            cameraControllerTool.setCameraNear(cameraController, 0.1);
            cameraControllerTool.setCameraFar(cameraController, 1000);
            cameraControllerTool.setPerspectiveCameraFovy(cameraController, 60);
            cameraControllerTool.setPerspectiveCameraAspect(cameraController, 1);

            gameObjectTool.addComponent(cameraObj, cameraController);

            sceneTool.addGameObject(cameraObj);
        },
        prepareGameObjectAndAddToScene: function(isNotAddCamera, geometry) {
            var isNotAddCamera$ = isNotAddCamera === true ? true : false;
            var geo = null;


            var material = basicMaterialTool.create();

            var obj = gameObjectTool.create();

            gameObjectTool.addComponent(obj, material);
            gameObjectTool.addComponent(obj, meshRendererTool.create());


            if(!!geometry){
                geo = geometry;
            }
            else{
                geo = boxGeometryTool.create();
            }

            gameObjectTool.addComponent(obj, geo);

            sceneTool.addGameObject(obj);

            var cameraObj = null;
            var cameraController = null;

            if(!isNotAddCamera){
                sceneTool.addCameraObject();
            }


            return {
                gameObject:obj,
                cameraGameObject: cameraObj,
                geometry:geo,
                material:material
            }
        }
    }
})()

