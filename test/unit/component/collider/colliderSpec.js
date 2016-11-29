describe("collider", function () {
    var sandbox = null;
    var collider = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        collider = new wd.BoxCollider();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("test collision event", function () {
        var box1, box2;
        var director;
        var script1, script2;

        function judgeCollide() {
            expect(script1.onContact).toCalledOnce();
            expect(script2.onContact).toCalledOnce();
            expect(script1.onContact).toCalledWith(wdCb.Collection.create([box2]));
            expect(script2.onContact).toCalledWith(wdCb.Collection.create([box1]));
        }

        function judgeNotCollide() {
            expect(script1.onContact).not.toCalled();
            expect(script2.onContact).not.toCalled();
        }

        function judgeCollideCount(num){
            expect(script1.onContact.callCount).toEqual(num);
            expect(script2.onContact.callCount).toEqual(num);
        }

        beforeEach(function () {
            box1 = colliderTool.createBox();
            box2 = colliderTool.createBox();

            script1 = {
                onContact: sandbox.stub(),
                onCollisionStart: sandbox.stub(),
                onCollisionEnd: sandbox.stub()
            };
            prepareTool.addScript(box1, script1);

            script2 = {
                onContact: sandbox.stub(),
                onCollisionStart: sandbox.stub(),
                onCollisionEnd: sandbox.stub()
            };
            prepareTool.addScript(box2, script2);


            director = wd.Director.getInstance();


            director.scene.addChild(box1);
            director.scene.addChild(box2);

            director.scene.addChild(testTool.createCamera());
        });

        it("trigger onContact event during collision", function () {
            director._init();

            box1.transform.translate(0, 8, 0);
            box2.transform.translate(0, -2, 0);


            director._loopBody(1);

            //judgeCollide();
            expect(script1.onContact).toCalledOnce();
            expect(script2.onContact).toCalledOnce();
            expect(script1.onContact).toCalledWith(wdCb.Collection.create([box2]));
            expect(script2.onContact).toCalledWith(wdCb.Collection.create([box1]));
        });
        it("trigger onCollisionStart event at first collision", function(){
            director._init();

            box1.transform.translate(0, 8, 0);
            box2.transform.translate(0, -2, 0);


            director._loopBody(1);


            expect(script1.onCollisionStart).toCalledOnce();
            expect(script2.onCollisionStart).toCalledOnce();

            expect(script1.onContact).toCalledOnce();
            expect(script2.onContact).toCalledOnce();
            expect(script1.onContact).toCalledWith(wdCb.Collection.create([box2]));
            expect(script2.onContact).toCalledWith(wdCb.Collection.create([box1]));


            director._loopBody(1);

            expect(script1.onCollisionStart).toCalledOnce();
            expect(script2.onCollisionStart).toCalledOnce();

            expect(script1.onContact).toCalledTwice();
            expect(script2.onContact).toCalledTwice();
        });
        it("trigger onCollisionEnd event at the first frame that after collision", function(){
            director._init();

            box1.transform.translate(0, 8, 0);
            box2.transform.translate(0, -2, 0);


            director._loopBody(1);


            expect(script1.onCollisionEnd).not.toCalled();
            expect(script2.onCollisionEnd).not.toCalled();


            box1.transform.translate(0, 0.1, 0);

            director._loopBody(1);

            expect(script1.onCollisionEnd).toCalledOnce();
            expect(script2.onCollisionEnd).toCalledOnce();
        });
    });

    describe("test sphere-aabb collision", function () {
        var director;
        var script1, script2;
        var box1,sphere2;

        function judgeNotCollide() {
            expect(script1.onContact).not.toCalled();
            expect(script2.onContact).not.toCalled();
        }

        function judgeCollideCount(num) {
            expect(script1.onContact.callCount).toEqual(num);
            expect(script2.onContact.callCount).toEqual(num);
        }

        function judgeCollide() {
            expect(script1.onContact).toCalledOnce();
            expect(script2.onContact).toCalledOnce();
            expect(script1.onContact).toCalledWith(wdCb.Collection.create([sphere2]));
            expect(script2.onContact).toCalledWith(wdCb.Collection.create([box1]));
        }

        beforeEach(function () {
            box1 = colliderTool.createBox();
            sphere2 = colliderTool.createSphere();

            script1 = {
                onContact: sandbox.stub()
            };
            prepareTool.addScript(box1, script1);

            script2 = {
                onContact: sandbox.stub()
            };
            prepareTool.addScript(sphere2, script2);


            director = wd.Director.getInstance();


            director.scene.addChild(box1);
            director.scene.addChild(sphere2);

            director.scene.addChild(testTool.createCamera());
        });

        it("test1", function(){
            director._init();

            box1.transform.translate(8, 0, 0);
            sphere2.transform.translate(-2, 0, 0);

            director._loopBody(1);

            judgeCollide();


            box1.transform.translate(0.1, 0, 0);

            director._loopBody(1);

            judgeCollideCount(1);


            box1.transform.position = wd.Vector3.create(-9, 9, 0);
            sphere2.transform.position = wd.Vector3.create(0, 0, 0);

            director._loopBody(1);

            judgeCollideCount(1);
        });
    });

    it("support add collider to CONTAINER gameObject", function () {
        // sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        var objModel = wd.GameObject.create();
        objModel.addTag(wd.EWDTag.CONTAINER);

        var child = wd.GameObject.create();

        child.addComponent(geometryTool.createGeometryWithFakeGeometryData());

        objModel.addChild(child);





        objModel.addComponent(wd.BoxCollider.create());

        objModel.init();





        var shape = objModel.getComponent(wd.BoxCollider).shape;
        expect(shape.halfExtents).toBeInstanceOf(wd.Vector3);

    });
});
