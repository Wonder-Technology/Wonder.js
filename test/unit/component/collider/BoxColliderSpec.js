describe("BoxCollider", function () {
    var sandbox = null;
    var collider = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        collider = new wd.BoxCollider();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });


    describe("test aabb-aabb collision", function () {
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
                onContact: sandbox.stub()
            };
            prepareTool.addScript(box1, script1);

            script2 = {
                onContact: sandbox.stub()
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

            judgeCollide();
        });
        it("test not collision", function () {
            director._init();

            box1.transform.translate(8, 0, 0);
            box2.transform.translate(-2, 0, 0);

            director._loopBody(1);

            judgeCollide();


            box1.transform.translate(0.1, 0, 0);

            director._loopBody(1);

            judgeCollideCount(1);
        });
        it("test first translate, then do nothing. it should only set shape once", function(){
            director._init();

            var shape1 = box1.getComponent(wd.Collider).boundingRegion.shape;

            sandbox.stub(shape1, "setFromTransformedAABB");


            box1.transform.translate(12, 0, 0);

            director._loopBody(1);


            expect(shape1.setFromTransformedAABB).toCalledOnce();


            director._loopBody(1);

            expect(shape1.setFromTransformedAABB).toCalledOnce();
        });
        it("test set gameObject's transform before building its bounding region", function(){
            box1.transform.translate(2, 0, 0);

            director._init();

            box1.transform.translate(6, 0, 0);
            box2.transform.translate(-2, 0, 0);

            director._loopBody(1);

            judgeCollide();


            box1.transform.translate(0.1, 0, 0);

            director._loopBody(1);

            judgeCollideCount(1);
        });

        describe("re-calculate aabb when gameObject transform change", function () {
            it("if gameObject translate or scale, just transform aabb", function () {
                director._init();

                box1.transform.translate(0, 0, 20);
                box2.transform.scale = wd.Vector3.create(0, 0, 2.9);

                director._loopBody(1);

                judgeNotCollide();


                box2.transform.scale = wd.Vector3.create(0, 0, 3);

                director._loopBody(2);

                judgeCollide();
            });

            describe("re-calculate aabb when gameObject rotate", function () {
                it("the new aabb should enclose the gameObject", function () {
                    box1.transform.rotate(0, 0, 45);


                    director._init();


                    box1.transform.rotate(0, 0, 45);
                    box2.transform.translate(10, 0, 0);


                    director._loopBody(1);


                    judgeCollide();


                    box2.transform.translate(0.1, 0, 0);

                    director._loopBody(1);

                    judgeCollideCount(1);
                });
            });
        });
    });
});
