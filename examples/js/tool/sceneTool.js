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
        createGameObject: function(geometry, material){
            var geo = null;
            var mat = null;

            if(!!material){
                mat = material;
            }
            else{
                mat = basicMaterialTool.create();
            }

            var obj = gameObjectTool.create();

            gameObjectTool.addComponent(obj, mat);
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
                material:mat
            }
        },
        prepareGameObjectAndAddToScene: function(isNotAddCamera, geometry, material) {
            var isNotAddCamera$ = isNotAddCamera === true ? true : false;
            var data = sceneTool.createGameObject(geometry, material);

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
        },
        addAmbientLight: function(pos, color){
            var ambientLightComponent = ambientLightTool.create();
            ambientLightTool.setColor(ambientLightComponent, color || wd.Color.create("#ffffff"));


            var obj = gameObjectTool.create();

            gameObjectTool.addComponent(obj, ambientLightComponent);


            if(!!pos){
                var transform = gameObjectTool.getTransform(obj);

                threeDTransformTool.setPosition(transform, pos);
            }

            sceneTool.addGameObject(obj)

            return obj;
        },
        addDirectionLight: function(pos, color, intensity){
            var directionLightComponent = directionLightTool.create();
            directionLightTool.setColor(directionLightComponent, color || wd.Color.create("#ffffff"));
            directionLightTool.setIntensity(directionLightComponent, intensity || 1);


            var obj = gameObjectTool.create();

            gameObjectTool.addComponent(obj, directionLightComponent);



            if(!!pos){
                var transform = gameObjectTool.getTransform(obj);

                threeDTransformTool.setPosition(transform, pos);
            }

            sceneTool.addGameObject(obj)

            return obj;
        }
    }
})()

