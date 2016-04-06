describe("Material", function() {
    var sandbox = null;
    var material = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        wd.Material.prototype.createShader = function(){
            return wd.CommonShader.create();
        };

        material = new wd.Material();
        material.initWhenCreate();
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    it("test default value", function(){
        expect(material.color).toEqual(wd.Color.create("#ffffff"));
    });

    describe("updateShader", function(){
        var scene;

        beforeEach(function(){
            scene = wd.Director.getInstance().scene;
        });

        it("if specify scene shader, update the specified shader", function(){
            scene.useShader(wd.EShaderMapKey.BUILD_SHADOWMAP);
            var shader = wd.CommonShader.create();
            sandbox.stub(shader, "update");

            material.addShader(wd.EShaderMapKey.BUILD_SHADOWMAP, shader);
            var quadCmd = {};

            material.updateShader(quadCmd);

            expect(shader.update).toCalledWith(quadCmd, material);
        });
        it("else, update current shader", function () {
            var quadCmd = {};
            sandbox.stub(material.shader, "update");

            material.updateShader(quadCmd);

            expect(material.shader.update).toCalledWith(quadCmd, material);
        });
    });
    
    //describe("fix bug: if create material and init material in script, Material->init->'after init logic' should be executed", function(){
    //    var newMaterial;
    //
    //    function MaterialScript(){
    //    }
    //
    //    MaterialScript.prototype.onEnter = function(){
    //
    //    }
    //
    //    MaterialScript.prototype.init = function(){
    //        newMaterial = new wd.Material();
    //
    //
    //        sandbox.stub(newMaterial, "_addTopShaderLib");
    //        sandbox.stub(newMaterial, "addShaderLib");
    //
    //        newMaterial.init();
    //
    //    }
    //
    //    beforeEach(function(){
    //    });
    //
    //    it("test", function(){
    //        var director = wd.Director.getInstance();
    //
    //        director._init();
    //
    //        wd.Script.create()._handlerAfterLoadedScript({name: "material", class: MaterialScript}, director.scene);
    //
    //
    //        director._loopBody(1);
    //
    //        expect(newMaterial._addTopShaderLib).toCalledOnce();
    //        expect(newMaterial.addShaderLib).toCalledOnce();
    //    });
    //});

    describe("dispose", function(){
        beforeEach(function(){
            
        });

        it("dispose shader", function(){
            sandbox.stub(material.shader, "dispose");

            material.dispose();

            expect(material.shader.dispose).toCalledOnce();
        });
        it("dispose mapManager", function(){
            sandbox.stub(material.mapManager, "dispose");

            material.dispose();

            expect(material.mapManager.dispose).toCalledOnce();
        });
        //it("dispose 'after init event' subscription", function(){
        //    sandbox.stub(material, "addShaderLib");
        //
        //    material.init();
        //
        //
        //    wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.AFTER_GAMEOBJECT_INIT));
        //
        //
        //    expect(material.addShaderLib).toCalledOnce();
        //
        //    material.dispose();
        //
        //    wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.AFTER_GAMEOBJECT_INIT));
        //
        //    expect(material.addShaderLib).not.toCalledTwice();
        //});
    });
});
