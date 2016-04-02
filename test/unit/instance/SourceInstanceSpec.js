describe("SourceInstance", function(){
    var sandbox;

    var box1,box1Instance1;
    var box1Child1;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        wd.DebugStatistics.clear();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        box1 = instanceTool.createBox();
    });
    afterEach(function () {
        testTool.clearInstance();

        sandbox.restore();
    });

    describe("toRenderInstanceListForDraw(getter)", function(){
        beforeEach(function(){
        });

        it("if not has to render Instance, return self entityObject and instanceList", function(){
            box1Instance1 = instanceTool.cloneInstance(box1, "instance1");

            expect(box1.getComponent(wd.SourceInstance).toRenderInstanceListForDraw).toEqual(wdCb.Collection.create(
                [
                    box1, box1Instance1
                ]
            ))
        });
        it("else, return to render list", function () {
            testTool.closeContractCheck(sandbox);
            var toRenderIntance = prepareTool.createSphere();

            box1.getComponent(wd.SourceInstance).addToRenderIntance(toRenderIntance);

            expect(box1.getComponent(wd.SourceInstance).toRenderInstanceListForDraw).toEqual(wdCb.Collection.create(
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
                expect(box1Instance1.hasComponent(wd.SourceInstance)).toBeFalsy();
            });

            describe("test lod component", function(){
                beforeEach(function(){
                });

                it("if hardware support instance, instance object don't add lod component", function(){
                    wd.GPUDetector.getInstance().extensionInstancedArrays = {};
                    box1.addComponent(wd.LOD.create());
                    box1Instance1 = instanceTool.cloneInstance(box1, "instance1");

                    expect(box1Instance1.hasComponent(wd.LOD)).toBeFalsy();
                });

                it("else, instance->lod clone source->lod and share geometry with source->lod->geometry", function () {
                    wd.GPUDetector.getInstance().extensionInstancedArrays = null;
                    box1.addComponent(wd.LOD.create());
                    box1Instance1 = instanceTool.cloneInstance(box1, "instance1");


                    expect(box1Instance1.getComponent(wd.LOD) !== box1.getComponent(wd.LOD)).toBeTruthy();

                    var instanceLevelList = box1Instance1.getComponent(wd.LOD).levelList;
                    var sourceLevelList = box1.getComponent(wd.LOD).levelList;
                    instanceLevelList.forEach(function(data, index){
                        expect(data.geometry === sourceLevelList.getChild(index).geometry).toBeTruthy();
                    })
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
            });

            describe("clone other components", function () {
                beforeEach(function(){
                    box1.forEachComponent(function(component){
                        sandbox.spy(component, "clone");
                    });
                });

                it("test", function () {
                    box1Instance1 = instanceTool.cloneInstance(box1, "instance1");

                    box1.components
                        .filter(function(component){
                            return !(component instanceof wd.Geometry) && !(component instanceof wd.SourceInstance) && !(component instanceof wd.Transform);
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

                    expect(box1Child1.hasComponent(wd.SourceInstance)).toBeTruthy();
                    expect(box1Child1.getComponent(wd.SourceInstance) !== box1.getComponent(wd.SourceInstance)).toBeTruthy();
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


        //todo test more(clone scriptList? ...)
    });

    describe("clear toRenderInstanceList on endLoop", function(){
        beforeEach(function(){
            var toRenderIntance = prepareTool.createSphere();
            box1.getComponent(wd.SourceInstance).addToRenderIntance(toRenderIntance);
        });

        it("bind the event when init", function () {
            box1.init();

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.ENDLOOP));


            expect(box1.getComponent(wd.SourceInstance)._toRenderInstanceList.getCount()).toEqual(0);
        });
        it("unbind when dispose", function () {
            box1.init();

            box1.getComponent(wd.SourceInstance).dispose();

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.ENDLOOP));


            expect(box1.getComponent(wd.SourceInstance)._toRenderInstanceList.getCount()).toEqual(1);
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

    describe("dispose", function(){
        var sourceInstance;

        beforeEach(function(){
            sourceInstance = box1.getComponent(wd.SourceInstance);
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
});
