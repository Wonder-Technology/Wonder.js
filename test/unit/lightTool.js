var lightTool = (function(){
    return {
        createDirectionLight:function(color){
            var directionLightComponent = wd.DirectionLight.create();

            if(color){
                directionLightComponent.color = color;
            }

//         directionLightComponent.intensity = 1;


            var directionLight = wd.GameObject.create();
            directionLight.addComponent(directionLightComponent);

            // directionLight.transform.translate(wd.Vector3.create(10, 20, 30));

            return directionLight;
        },
        createPointLight: function (color) {
            var pointLightComponent = wd.PointLight.create();

            if(color){
                pointLightComponent.color = color;
            }

            var pointSphereMaterial = wd.BasicMaterial.create();
            // pointSphereMaterial.color = wd.Color.create("#ffffff");

            var geometry = wd.SphereGeometry.create();
            geometry.material = pointSphereMaterial;
            geometry.radius = 1;
            geometry.segment = 20;


            var pointLight = wd.GameObject.create();
            pointLight.addComponent(pointLightComponent);
            pointLight.addComponent(geometry);
            pointLight.addComponent(wd.MeshRenderer.create());



            // pointLight.transform.position = pos;

            return pointLight;
        }
    }
})();
