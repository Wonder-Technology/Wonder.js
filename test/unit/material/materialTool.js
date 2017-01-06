var materialTool = (function () {

    return {
        prepareMap: function(sandbox, model,geo,material) {
            prepareTool.prepareGeo(sandbox, model,geo,material,function(material){
            });
        },
        prepareEnvMap: function(sandbox, model,geo,material,envMap) {
            prepareTool.prepareGeo(sandbox, model,geo,material,function(material){
                envMap.near = 0.1;
                envMap.far = 1000;
                envMap.size = 256;

                material.envMap = envMap;

                sandbox.stub(envMap, "init");
            });
        },
        testOpacity: function(material){
            material.blend = false;
            material.opacity = 0.1;

            expect(material.blend).toBeFalsy();
            expect(material.opacity).toEqual(0.1);


            material.opacity = 0.0;

            expect(material.blend).toBeFalsy();
            expect(material.opacity).toEqual(0.0);

            material.blend = true;
            material.opacity = 1.0;

            expect(material.blend).toBeTruthy();
            expect(material.opacity).toEqual(1.0);
        },
        init:function(material){
            if(!material.geometry){
                material.geometry = {
                    entityObject: wd.GameObject.create(),
                    hasColors:function(){
                        return false;
                    }
                }
            }

            material.init();
        }
    }
})();

