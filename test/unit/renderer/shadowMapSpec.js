describe("shadow map", function() {
    var sandbox = null;
    var shadow = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance();
    });

    //describe("point shadow map", function(){
    //    var director;
    //    var boxArr,groundArr;
    //    var light;
    //
    //    function createBoxes() {
    //        return [
    //            createBox(wd.Vector3.create(20, 0, 0)),
    //            createBox(wd.Vector3.create(-20, 0, 0)),
    //            createBox(wd.Vector3.create(0, 20, 0)),
    //            createBox(wd.Vector3.create(0, -20, 0)),
    //            createBox(wd.Vector3.create(10, 0, 25)),
    //            createBox(wd.Vector3.create(0, 0, -20))
    //        ];
    //    }
    //
    //    function createBox(position) {
    //        var material = wd.LightMaterial.create();
    //        material.specularColor = wd.Color.create("#ffdd99");
    //        material.color = wd.Color.create("#666666");
    //        material.shininess = 16;
    //
    //
    //        var geometry = wd.BoxGeometry.create();
    //        geometry.material = material;
    //        geometry.width = 5;
    //        geometry.height = 5;
    //        geometry.depth = 5;
    //
    //
    //        var gameObject = wd.GameObject.create();
    //        gameObject.addComponent(wd.MeshRenderer.create());
    //        gameObject.addComponent(geometry);
    //
    //        gameObject.transform.translate(position);
    //
    //        return gameObject;
    //    }
    //
    //    function createGrounds() {
    //        var xzEu = wd.Vector3.create(0, 0, 0);
    //        var xzNeEu = wd.Vector3.create(0, 0, 180);
    //        var xyEu = wd.Vector3.create(90, 0, 0);
    //        var xyNeEu = wd.Vector3.create(-90, 0, 0);
    //        var yzEu = wd.Vector3.create(0, 0, 90);
    //        var yzNeEu = wd.Vector3.create(0, 0, -90);
    //
    //        return [
    //            createGround(wd.Vector3.create(30, 0, 0), yzEu),
    //            createGround(wd.Vector3.create(-30, 0, 0), yzNeEu),
    //            createGround(wd.Vector3.create(0, 30, 0), xzNeEu),
    //            createGround(wd.Vector3.create(0, -30, 0), xzEu),
    //            createGround(wd.Vector3.create(0, 0, 30), xyNeEu),
    //            createGround(wd.Vector3.create(0, 0, -30), xyEu)
    //        ];
    //    }
    //
    //    function createGround(position, eulerAngles) {
    //        var map = wd.ImageTexture.create();
    //        map.wrapS = wd.ETextureWrapMode.REPEAT;
    //        map.wrapT = wd.ETextureWrapMode.REPEAT;
    //        map.repeatRegion = wd.RectRegion.create(0.5, 0, 5, 5);
    //
    //
    //        var material = wd.LightMaterial.create();
    //        material.specularColor = wd.Color.create("#ffdd99");
    //        material.shininess = 32;
    //        material.side = wd.ESide.BOTH;
    //        material.diffuseMap = map;
    //
    //
    //        var plane = wd.PlaneGeometry.create();
    //        plane.width = 100;
    //        plane.height = 100;
    //        plane.material = material;
    //
    //
    //        var ground = wd.GameObject.create();
    //        ground.addComponent(wd.MeshRenderer.create());
    //        ground.addComponent(plane);
    //
    //        ground.transform.eulerAngles = eulerAngles;
    //        ground.transform.translate(position);
    //
    //        return ground;
    //    }
    //
    //    beforeEach(function(){
    //        director = wd.Director.getInstance();
    //
    //        boxArr = createBoxes();
    //        groundArr = createGrounds();
    //        light = shadowTool.createPointLight(boxArr.concat(groundArr));
    //
    //        director.scene.addChildren(boxArr);
    //        director.scene.addChildren(groundArr);
    //        director.scene.addChild(light);
    //
    //
    //        director.scene.addChild(testTool.createCamera());
    //
    //        prepareTool.prepareForMap(sandbox);
    //    });
    //
    //    it("add shadowMapRenderer to scene before init", function(){
    //        sandbox.stub(director.scene, "addRenderTargetRenderer");
    //        sandbox.stub(director.scene.gameObjectScene, "init");
    //
    //        director._init();
    //
    //        expect(director.scene.addRenderTargetRenderer).toCalledBefore(director.scene.gameObjectScene.init);
    //    });
    //
    //    describe("test compound gameObject", function(){
    //        var box1;
    //        var part1,part2;
    //
    //        beforeEach(function(){
    //            box1 = boxArr[0];
    //
    //            part1 = prepareTool.createBox();
    //            part2 = prepareTool.createBox();
    //
    //            part1.addChild(part2);
    //
    //            box1.addChild(part1);
    //        });
    //
    //        it("test container", function(){
    //            box1.removeComponent(wd.Geometry);
    //
    //            director._init();
    //
    //            var shadowRenderList = light.getComponent(wd.PointLight).shadowRenderList;
    //            expect(shadowRenderList.getChild("px").getCount()).toEqual(13);
    //            expect(shadowRenderList.getChild("px").hasChild(part1)).toBeTruthy();
    //            expect(shadowRenderList.getChild("px").hasChild(part2)).toBeTruthy();
    //            expect(shadowRenderList.getChild("px").hasChild(box1)).toBeFalsy();
    //        });
    //        it("test parent-child gameObject", function () {
    //            director._init();
    //
    //            var shadowRenderList = light.getComponent(wd.PointLight).shadowRenderList;
    //            expect(shadowRenderList.getChild("px").getCount()).toEqual(14);
    //            expect(shadowRenderList.getChild("px").hasChild(part1)).toBeTruthy();
    //            expect(shadowRenderList.getChild("px").hasChild(part2)).toBeTruthy();
    //            expect(shadowRenderList.getChild("px").hasChild(box1)).toBeTruthy();
    //        });
    //    });
    //});
});

