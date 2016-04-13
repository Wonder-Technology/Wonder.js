var shadowTool = {
    createDirectionLight: function () {
        var SHADOW_MAP_WIDTH = 1024,
            SHADOW_MAP_HEIGHT = 1024;

        var directionLightComponent = wd.DirectionLight.create();
        directionLightComponent.color = wd.Color.create("#ffffff");
        directionLightComponent.intensity = 1;
        directionLightComponent.castShadow = true;
        directionLightComponent.shadowCameraLeft = -100;
        directionLightComponent.shadowCameraRight = 100;
        directionLightComponent.shadowCameraTop = 100;
        directionLightComponent.shadowCameraBottom = -100;
        directionLightComponent.shadowCameraNear = 0.1;
        directionLightComponent.shadowCameraFar = 1000;
        directionLightComponent.shadowBias = 0.002;
        directionLightComponent.shadowDarkness = 0.2;
        directionLightComponent.shadowMapWidth = SHADOW_MAP_WIDTH;
        directionLightComponent.shadowMapHeight = SHADOW_MAP_HEIGHT;

        //directionLightComponent.shadowRenderList = shadowList;

        var directionLight = wd.GameObject.create();
        directionLight.addComponent(directionLightComponent);

        directionLight.transform.translate(wd.Vector3.create(0, 50, 50));

        return directionLight;
    },
    createPointLight: function () {
        var SHADOW_MAP_WIDTH = 1024,
            SHADOW_MAP_HEIGHT = 1024;

        var pointLightComponent = wd.PointLight.create();
        pointLightComponent.color = wd.Color.create("#ffffff");
        pointLightComponent.intensity = 1;
        pointLightComponent.rangeLevel = 10;
        pointLightComponent.castShadow = true;
        pointLightComponent.shadowCameraNear = 0.1;
        pointLightComponent.shadowCameraFar = 1000;
        pointLightComponent.shadowBias = 0.01;
        pointLightComponent.shadowDarkness = 0.2;
        pointLightComponent.shadowMapWidth = SHADOW_MAP_WIDTH;
        pointLightComponent.shadowMapHeight = SHADOW_MAP_HEIGHT;

        //pointLightComponent.shadowRenderList = {
        //    px: listArr,
        //    nx: listArr,
        //    py: listArr,
        //    ny: listArr,
        //    pz: listArr,
        //    nz: listArr
        //};

        var pointMaterial = wd.BasicMaterial.create();
        pointMaterial.color = wd.Color.create("#ffffff");

        var geometry = wd.SphereGeometry.create();
        geometry.material = pointMaterial;
        geometry.radius = 1;
        geometry.segment = 20;


        var pointLight = wd.GameObject.create();
        pointLight.addComponent(pointLightComponent);
        //pointLight.addComponent(geometry);
        //pointLight.addComponent(wd.MeshRenderer.create());

        return pointLight;
    },
    getDefaultMapManager: function (obj){
        return obj.getComponent(wd.Geometry).material.shader.mapManager;
    },
    getBuildShadowMapRenderer: function(){
        if(arguments.length === 0){
            return wd.Director.getInstance().scene.gameObjectScene._renderTargetRendererList.getChild(0);
        }
        else if(arguments.length === 1 && wd.JudgeUtils.isNumber(arguments[0])){
            var rendererIndex = arguments[0];

            return wd.Director.getInstance().scene.gameObjectScene._renderTargetRendererList.getChild(rendererIndex);
        }
        else if(arguments.length === 1){
            var layer = arguments[0];

            return wd.Director.getInstance().scene.gameObjectScene._renderTargetRendererList
                .filter(function(rttRenderer){
                    return rttRenderer._layer === layer;
                })
                .getChild(0);
        }
        else if(arguments.length === 2){
            var layer = arguments[0],
                light = arguments[1].getComponent(wd.Light);

            return wd.Director.getInstance().scene.gameObjectScene._renderTargetRendererList
                .filter(function(rttRenderer){
                    return rttRenderer._layer === layer && wd.JudgeUtils.isEqual(rttRenderer._light, light);
                })
                .getChild(0);
        }
    },
    //getBuildShadowMapMapManager:function (){
    //    return this.getBuildShadowMapRenderer.apply(this, arguments)._shadowMapRendererUtils.mapManager;
    //},
    getBuildShadowMap:function(){
        return this.getBuildShadowMapRenderer.apply(this, arguments).texture;
    },
    setTwoDBuildShadowMapShaderAndProgramHelper: function (sandbox, obj, handleProgramFunc, setFunc, isInstance) {
        var isInstance = isInstance === undefined ? false : isInstance;
        var director = wd.Director.getInstance(),
            useShaderType = director.scene.useShaderType;

        sandbox.stub(director.scene, "useShaderType", function (type) {
            useShaderType.call(director.scene, type);

            var shader;

            if(isInstance){
                shader = director.scene.getShader(wd.EShaderMapKeyOfScene.BUILD_TWOD_SHADOWMAP_INSTANCE);
            }
            else{
                shader = director.scene.getShader(wd.EShaderMapKeyOfScene.BUILD_TWOD_SHADOWMAP_NO_INSTANCE);
            }

            var program = shader.program;


            setFunc(shader, program);

            if (handleProgramFunc) {
                handleProgramFunc(program);
            }
        });
    },
    setCubemapBuildShadowMapShaderAndProgramHelper: function (sandbox, obj, handleProgramFunc, setFunc, isInstance) {
        var isInstance = isInstance === undefined ? false : isInstance;
        var director = wd.Director.getInstance(),
            useShaderType = director.scene.useShaderType;

        sandbox.stub(director.scene, "useShaderType", function (type) {
            useShaderType.call(director.scene, type);

            var shader;

            if(isInstance){
                shader = director.scene.getShader(wd.EShaderMapKeyOfScene.BUILD_CUBEMAP_SHADOWMAP_INSTANCE);
            }
            else{
                shader = director.scene.getShader(wd.EShaderMapKeyOfScene.BUILD_CUBEMAP_SHADOWMAP_NO_INSTANCE);
            }

            var program = shader.program;


            setFunc(shader, program);

            if (handleProgramFunc) {
                handleProgramFunc(program);
            }
        });
    },
    setDrawShadowMapShaderAndProgramHelper:function (sandbox, obj, isNotStub){
        var shader = obj.getComponent(wd.Geometry).material.shader;

        var program = shader.program;

        if(!isNotStub){
            sandbox.stub(program, "sendUniformData");
        }

        return {
            shader: shader,
            program: program
        };
    },
    createSphere: function(){
        var material = wd.LightMaterial.create();
        material.specularColor = wd.Color.create("#ffdd99");
        material.shininess = 16;
        material.diffuseMap = wd.ImageTexture.create({});
        material.shading = wd.EShading.SMOOTH;


        var geometry = wd.SphereGeometry.create();
        geometry.material = material;
        geometry.radius = 20;
        geometry.segment = 20;


        var gameObject = wd.GameObject.create();

        gameObject.addComponent(wd.MeshRenderer.create());
        gameObject.addComponent(geometry);


        var shadow = wd.Shadow.create();
        shadow.receive = true;
        shadow.cast = true;

        gameObject.addComponent(shadow);



        //gameObject.transform.translate(wd.Vector3.create(-30, 20, 0));

        return gameObject;
    }
}
