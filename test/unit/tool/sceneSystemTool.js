var SceneSystemTool = YYC.Class({
    Public: {
        addCameraObject: function(){
            var cameraObj = gameObjectSystemTool.create();
            var cameraController = cameraControllerSystemTool.create();

            cameraControllerSystemTool.setCameraNear(cameraController, 0.1);
            cameraControllerSystemTool.setCameraFar(cameraController, 1000);
            cameraControllerSystemTool.setPerspectiveCameraFovy(cameraController, 60);
            cameraControllerSystemTool.setPerspectiveCameraAspect(cameraController, 1);

            gameObjectSystemTool.addComponent(cameraObj, cameraController);

            this.addGameObject(cameraObj);

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

            var obj = gameObjectSystemTool.create();

            gameObjectSystemTool.addComponent(obj, mat);
            gameObjectSystemTool.addComponent(obj, meshRendererTool.create());


            if(!!geometry){
                geo = geometry;
            }
            else{
                geo = boxGeometryTool.create();
            }

            gameObjectSystemTool.addComponent(obj, geo);

            return {
                geometry:geo,
                gameObject:obj,
                material:mat
            }
        },
        prepareGameObjectAndAddToScene: function(isNotAddCamera, geometry, material) {
            var isNotAddCamera$ = isNotAddCamera === true ? true : false;
            var data = this.createGameObject(geometry, material);

            this.addGameObject(data.gameObject);

            var cameraObj = null;

            if(!isNotAddCamera$){
                cameraObj = this.addCameraObject();
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


            var obj = gameObjectSystemTool.create();

            gameObjectSystemTool.addComponent(obj, ambientLightComponent);


            if(!!pos){
                var transform = gameObjectSystemTool.getTransform(obj);

                threeDTransformTool.setPosition(transform, pos);
            }

            this.addGameObject(obj)

            return obj;
        },
        addDirectionLight: function(pos, color, intensity){
            var directionLightComponent = directionLightTool.create();
            directionLightTool.setColor(directionLightComponent, color || wd.Color.create("#ffffff"));
            directionLightTool.setIntensity(directionLightComponent, intensity || 1);


            var obj = gameObjectSystemTool.create();

            gameObjectSystemTool.addComponent(obj, directionLightComponent);



            if(!!pos){
                var transform = gameObjectSystemTool.getTransform(obj);

                threeDTransformTool.setPosition(transform, pos);
            }

            this.addGameObject(obj)

            return obj;
        },
        addPointLight: function(pos, color, intensity, constant, linear, quadratic, range, rangeLevel){
            var pointLightComponent = pointLightTool.create();

            if(!!color){
                pointLightTool.setColor(pointLightComponent, color);
            }

            if(!!intensity){
                pointLightTool.setIntensity(pointLightComponent, intensity );
            }

            if(!!constant){
                pointLightTool.setConstant(pointLightComponent, constant);
            }

            if(!!linear){
                pointLightTool.setLinear(pointLightComponent, linear);
            }

            if(!!quadratic){
                pointLightTool.setQuadratic(pointLightComponent, quadratic);
            }

            if(!!range){
                pointLightTool.setRange(pointLightComponent, range);
            }

            if(!!rangeLevel){
                pointLightTool.setRangeLevel(pointLightComponent, rangeLevel);
            }


            var obj = gameObjectSystemTool.create();

            gameObjectSystemTool.addComponent(obj, pointLightComponent);



            if(!!pos){
                var transform = gameObjectSystemTool.getTransform(obj);

                threeDTransformTool.setPosition(transform, pos);
            }

            this.addGameObject(obj);

            return obj;
        },
        resetData: function(){
            wd.initSceneData(wd.SceneData);
        }
    }
});

var sceneSystemTool = new SceneSystemTool();

YYC.Tool.extend.extend(sceneSystemTool, sceneTool);
