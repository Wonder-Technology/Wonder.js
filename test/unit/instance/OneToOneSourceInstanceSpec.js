describe("OneToOneSourceInstance", function(){
    var sandbox;

    var box1,box1Instance1;
    var box1Child1;

    var sourceInstance;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        wd.DebugStatistics.resetData();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        box1 = instanceTool.createBox();
        sourceInstance = box1.getComponent(wd.OneToOneSourceInstance);
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);

        sandbox.restore();
    });

    describe("toRenderInstanceListForDraw(getter)", function(){
        beforeEach(function(){
        });

        it("if not has to render Instance, return self entityObject and instanceList", function(){
            box1Instance1 = instanceTool.cloneInstance(box1, "instance1");

            expect(box1.getComponent(wd.OneToOneSourceInstance).toRenderInstanceListForDraw).toEqual(wdCb.Collection.create(
                [
                    box1, box1Instance1
                ]
            ))
        });
        it("else, return to render list", function () {
            testTool.closeContractCheck(sandbox);
            var toRenderIntance = prepareTool.createSphere();

            box1.getComponent(wd.OneToOneSourceInstance).addToRenderIntance(toRenderIntance);

            expect(box1.getComponent(wd.OneToOneSourceInstance).toRenderInstanceListForDraw).toEqual(wdCb.Collection.create(
                [
                    toRenderIntance
                ]
            ))
        });
    });

    describe("cloneInstance", function(){
        beforeEach(function(){
        });

        it("test instance name", function () {
            box1Instance1 = instanceTool.cloneInstance(box1, "instance1");

            expect(box1Instance1.name).toEqual("instance1");
        });

        describe("test instance->components", function(){
            beforeEach(function(){
            });

            it("instance should add ObjectInstance component, not add source->SourceInstance", function () {
                box1Instance1 = instanceTool.cloneInstance(box1, "instance1");

                expect(box1Instance1.hasComponent(wd.ObjectInstance)).toBeTruthy();
                expect(box1Instance1.hasComponent(wd.OneToOneSourceInstance)).toBeFalsy();
            });

            describe("test lod component", function(){
                function judge(){
                    box1.addComponent(wd.GeometryLOD.create());
                    box1Instance1 = instanceTool.cloneInstance(box1, "instance1");

                    expect(box1Instance1.hasComponent(wd.GeometryLOD)).toBeFalsy();
                }

                beforeEach(function(){
                });

                it("if hardware support instance, instance object don't add lod component", function(){
                    wd.GPUDetector.getInstance().extensionInstancedArrays = {};

                    judge();
                });

                it("else, too", function () {
                    wd.GPUDetector.getInstance().extensionInstancedArrays = null;

                    judge();
                });
            });

            describe("test shared component", function(){
                beforeEach(function(){

                });

                it("share source->geometry", function(){
                    box1Instance1 = instanceTool.cloneInstance(box1, "instance1");

                    expect(box1Instance1.getComponent(wd.Geometry) === box1.getComponent(wd.Geometry)).toBeTruthy();
                });
                it("shared component should be init only once", function(){
                    var geo = box1.getComponent(wd.Geometry);

                    box1Instance1 = instanceTool.cloneInstance(box1, "instance1");

                    sandbox.spy(geo, "computeData");

                    box1.init();
                    box1Instance1.init();

                    expect(geo.computeData).toCalledOnce();
                });
                it("should remain shared component's entityObject", function () {
                    box1Instance1 = instanceTool.cloneInstance(box1, "instance1");

                    expect(box1Instance1.getComponent(wd.Geometry).entityObject === box1).toBeTruthy();
                    expect(box1.getComponent(wd.Geometry).entityObject === box1).toBeTruthy();
                });
            });

            describe("clone other components", function () {
                beforeEach(function(){
                    box1.forEachComponent(function(component){
                        sandbox.spy(component, "clone");
                    });
                });

                it("test", function () {
                    box1Instance1 = instanceTool.cloneInstance(box1, "instance1");

                    box1.getComponents()
                        .filter(function(component){
                            return !(component instanceof wd.Geometry) && !(component instanceof wd.OneToOneSourceInstance) && !(component instanceof wd.Transform);
                        })
                        .forEach(function(component){
                            expect(component.clone).toCalledOnce();
                    });
                });
                it("clone ThreeDTransform", function () {
                    box1Instance1 = instanceTool.cloneInstance(box1, "instance1");

                    expect(testTool.getAllComponents(box1Instance1, wd.ThreeDTransform).getCount()).toEqual(1);
                    expect(box1Instance1.getComponent(wd.ThreeDTransform) !== box1.getComponent(wd.ThreeDTransform)).toBeTruthy();
                });

                it("not clone SourceInstance", function () {
                    box1Instance1 = instanceTool.cloneInstance(box1, "instance1");

                    expect(box1Instance1.getComponent(wd.MeshRenderer) === box1.getComponent(wd.MeshRenderer)).toBeFalsy();
                });
            });

            describe("test with child", function(){
                beforeEach(function(){
                    box1Child1 = prepareTool.createBox();
                    box1.addChild(box1Child1);
                });

                it("entityObject->each child should add new SourceInstance component", function(){
                    box1Instance1 = instanceTool.cloneInstance(box1, "instance1");

                    expect(box1Child1.hasComponent(wd.OneToOneSourceInstance)).toBeTruthy();
                    expect(box1Child1.getComponent(wd.OneToOneSourceInstance) !== box1.getComponent(wd.OneToOneSourceInstance)).toBeTruthy();
                });
                it("instance object should has its independent children", function(){
                    box1Instance1 = instanceTool.cloneInstance(box1, "instance1");

                    expect(box1Instance1.getChildren().getCount()).toEqual(1);
                    var instanceChild = box1Instance1.getChild(0);
                    expect(instanceChild.hasComponent(wd.ObjectInstance)).toBeTruthy();
                    expect(instanceChild.getComponent(wd.ObjectInstance) !== box1Instance1.getComponent(wd.ObjectInstance)).toBeTruthy();
                    expect(instanceChild.getComponent(wd.ObjectInstance).sourceObject === box1Child1).toBeTruthy();
                });
                it("test instance's child name", function () {
                    box1Instance1 = instanceTool.cloneInstance(box1, "instance1");

                    var instanceChild = box1Instance1.getChild(0);
                    expect(instanceChild.name.indexOf("instance1_") > -1).toBeTruthy();
                });
            });
        });

        it("instance should copy source->tags", function () {
            box1.addTag("a");
            box1.addTag("b");

            box1Instance1 = instanceTool.cloneInstance(box1, "instance1");

            expect(box1Instance1.hasTag("a")).toBeTruthy();
            expect(box1Instance1.hasTag("b")).toBeTruthy();
        });
        it("instance should share parent,bubbleParent with source", function () {
            var parent = prepareTool.createBox();
            var bubbleParent = prepareTool.createBox();
            box1.parent = parent;
            box1.bubbleParent = bubbleParent;

            box1Instance1 = instanceTool.cloneInstance(box1, "instance1");

            expect(box1Instance1.parent === box1.parent).toBeTruthy();
            expect(box1Instance1.bubbleParent === box1.bubbleParent).toBeTruthy();
        });
        it("instance should as visible as source", function () {
            box1.isVisible = false;

            box1Instance1 = instanceTool.cloneInstance(box1, "instance1");

            expect(box1Instance1.isVisible).toBeFalsy();
        });

        describe("fix bug", function(){
            beforeEach(function(){
            });

            it("the instance's component should be added to corresponding component container", function () {
                box1.name = "box1";



                var child = wd.GameObject.create();


                child.addComponent(wd.DelayTime.create(100));

                box1.addChild(child);



                box1Instance1 = instanceTool.cloneInstance(box1, "instance1");

                expect(wd.ActionComponentContainer.getInstance().list.getCount()).toEqual(2);
            });
        });

        //todo test more(clone scriptList? ...)
    });

    describe("clear toRenderInstanceList on endLoop", function(){
        beforeEach(function(){
            var toRenderIntance = prepareTool.createSphere();
            box1.getComponent(wd.OneToOneSourceInstance).addToRenderIntance(toRenderIntance);
        });

        it("bind the event when init", function () {
            box1.init();

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.ENDLOOP));


            expect(box1.getComponent(wd.OneToOneSourceInstance)._toRenderInstanceList.getCount()).toEqual(0);
        });
        it("unbind when dispose", function () {
            box1.init();

            box1.getComponent(wd.OneToOneSourceInstance).dispose();

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.ENDLOOP));


            expect(box1.getComponent(wd.OneToOneSourceInstance)._toRenderInstanceList.getCount()).toEqual(1);
        });
    });

    describe("not dispose instance in instanceList(because instance is not only in instanceList, but also in the main loop, so it will be disposed in EntityObject->dispose)", function(){
        it("instance should be dispose one time when dispose", function () {
            box1Instance1 = instanceTool.cloneInstance(box1, "instance1");
            sandbox.stub(box1, "dispose");
            sandbox.stub(box1Instance1, "dispose");
            var director = wd.Director.getInstance();
            director.scene.addChildren([box1, box1Instance1]);

            director._init();

            director.scene.dispose();


            expect(box1.dispose).toCalledOnce();
            expect(box1Instance1.dispose).toCalledOnce();
        });
    });

    it("defer to create instance buffer until get it", function () {
        var gl = wd.DeviceManager.getInstance().gl;

        sourceInstance.init();

        expect(gl.createBuffer).not.toCalled();

        var instanceBuffer = sourceInstance.instanceBuffer;

        expect(gl.createBuffer).toCalledOnce();
    });

    describe("dispose", function(){
        beforeEach(function(){
            sourceInstance.init();
        });

        it("unbind endLoop event", function () {
            sandbox.stub(sourceInstance._toRenderInstanceList, "removeAllChildren");

            sourceInstance.dispose();

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.ENDLOOP));

            expect(sourceInstance._toRenderInstanceList.removeAllChildren).not.toCalled();
        });
        it("unbind enter event", function () {
            sandbox.stub(sourceInstance, "_addAllInstances");

            sourceInstance.dispose();

            wd.EventManager.trigger(box1Instance1, wd.CustomEvent.create(wd.EEngineEvent.ENTER));

            expect(sourceInstance._addAllInstances).not.toCalled();
        });
        it("unbind exit event", function () {
            sandbox.stub(sourceInstance, "_removeAllInstances");

            sourceInstance.dispose();

            wd.EventManager.trigger(box1Instance1, wd.CustomEvent.create(wd.EEngineEvent.EXIT));

            expect(sourceInstance._removeAllInstances).not.toCalled();
        });
    });

    describe("clone", function(){
        it("shallow clone instanceList", function(){
            var resultGameObject = {};
            var gameObject1 = {clone:sandbox.stub().returns(resultGameObject)};
            sourceInstance.instanceList.addChildren([gameObject1]);

            var result = sourceInstance.clone();

            expect(result === sourceInstance).toBeFalsy();
            expect(result.instanceList.getCount()).toEqual(1);
            expect(result.instanceList.getChild(0)).toEqual(gameObject1);
        });
    });
});
