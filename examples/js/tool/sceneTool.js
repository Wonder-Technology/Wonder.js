var sceneTool = (function () {
    var _getScene = function (){
        return wd.Director.getInstance().scene;
    }

    return {
        getScene: function (){
            return _getScene();
        },
        resetData: function(){
            wd.initSceneData(wd.SceneData);
        },
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

            return cameraObj;
        },
        createGameObject: function(geometry){
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

            return {
                geometry:geo,
                gameObject:obj,
                material:material
            }
        },
        prepareGameObjectAndAddToScene: function(isNotAddCamera, geometry) {
            var isNotAddCamera$ = isNotAddCamera === true ? true : false;
            var data = sceneTool.createGameObject(geometry);

            sceneTool.addGameObject(data.gameObject);

            var cameraObj = null;

            if(!isNotAddCamera$){
                cameraObj = sceneTool.addCameraObject();
            }


            return {
                gameObject:data.gameObject,
                cameraGameObject: cameraObj,
                geometry:data.geometry,
                material:data.material
            }
        }
    }
})()

