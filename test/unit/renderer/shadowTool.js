var shadowTool = {
    createDirectionLight: function (shadowList) {
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

        directionLightComponent.shadowRenderList = shadowList;

        var directionLight = wd.GameObject.create();
        directionLight.addComponent(directionLightComponent);

        directionLight.transform.translate(wd.Vector3.create(0, 50, 50));

        return directionLight;
    },
    createPointLight: function (listArr) {
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

        pointLightComponent.shadowRenderList = {
            px: listArr,
            nx: listArr,
            py: listArr,
            ny: listArr,
            pz: listArr,
            nz: listArr
        };

        var pointMaterial = wd.BasicMaterial.create();
        pointMaterial.color = wd.Color.create("#ffffff");

        var geometry = wd.SphereGeometry.create();
        geometry.material = pointMaterial;
        geometry.radius = 1;
        geometry.segment = 20;


        var pointLight = wd.GameObject.create();
        pointLight.addComponent(pointLightComponent);
        pointLight.addComponent(geometry);
        pointLight.addComponent(wd.MeshRenderer.create());

        return pointLight;
    },
    getDefaultMapManager: function (obj){
        return obj.getComponent(wd.Geometry).material.getShader(wd.EShaderMapKey.DEFAULT).mapManager;
    },
    getBuildShadowMapMapManager:function (obj){
        return obj.getComponent(wd.Geometry).material.getShader(wd.EShaderMapKey.BUILD_SHADOWMAP).mapManager;
    }
}
