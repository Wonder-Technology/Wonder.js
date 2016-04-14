describe("dynamicCubemap", function() {
    var sandbox = null;
    var shadow = null;

    var deviceManager;

    var director;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        director = wd.Director.getInstance();

        deviceManager = wd.DeviceManager.getInstance();

        sandbox.stub(deviceManager, "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance(sandbox);
    });

    describe("integrate test", function() {
        var sphere;
        var dynamicObj;
        var light;

        var renderer;

        function createSphere() {
            return prepareTool.createSphere();
        }

        function createObjectWithDynamicRenderTargetRenderer(renderList, mode){
            var sphere = wd.GameObject.create();


            var texture = wd.DynamicCubemapTexture.create();
            var list = renderList;

            texture.renderList = {
                px: list,
                nx: list,
                py: list,
                ny: list,
                pz: list,
                nz: list
            };

            texture.near = 0.1;
            texture.far = 1000;
            texture.size = 256;
            texture.mode = mode;


            var material = wd.LightMaterial.create();
            material.envMap = texture;


            var geometry = wd.SphereGeometry.create();
            geometry.radius = 10;
            geometry.segments = 20;


            geometry.material = material;


            sphere.addComponent(wd.MeshRenderer.create());
            sphere.addComponent(geometry);

            return sphere;
        }

        beforeEach(function () {
            renderer = wd.WebGLRenderer.create();

            sphere = createSphere();
            sphere.name = "sphere";

            dynamicObj = createObjectWithDynamicRenderTargetRenderer([sphere], wd.EEnvMapMode.REFLECTION);
            dynamicObj.name = "dynamicObj";

            light = shadowTool.createDirectionLight();

            director.scene.addChild(sphere);
            director.scene.addChild(dynamicObj);
            director.scene.addChild(light);


            director.scene.addChild(testTool.createCamera());

            prepareTool.prepareForMap(sandbox);
        });

        it("create gl texture", function () {
            var gl = wd.DeviceManager.getInstance().gl;

            director._init();

            expect(gl.createTexture).toCalledOnce();
        });
        it("set shadow map->texParameteri", function () {
            var gl = wd.DeviceManager.getInstance().gl;

            director._init();

            expect(gl.texParameteri.withArgs(sinon.match.any, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)).toCalledOnce();
            expect(gl.texParameteri.withArgs(sinon.match.any, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)).toCalledOnce();
            expect(gl.texParameteri.withArgs(sinon.match.any, gl.TEXTURE_MAG_FILTER, gl.LINEAR)).toCalledOnce();
            expect(gl.texParameteri.withArgs(sinon.match.any, gl.TEXTURE_MIN_FILTER, gl.LINEAR)).toCalledOnce();
        });
    });
});

