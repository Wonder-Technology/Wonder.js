describe("event", function () {
    var manager = null;
    var sandbox = null;
    var target = null;

    function insertDom() {
        $("html").append($("<canvas id='event-test'></canvas>"));
    }

    function removeDom() {
        $("#event-test").remove();
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        insertDom();
        prepareTool.createGL("event-test");

        manager = wd.EventManager;
        target = wd.GameObject.create();
    });
    afterEach(function () {
        removeDom();
        manager.off();
        sandbox.restore();
    });

    describe("off", function(){
        var eventTarget = null,
            eventTarget2 = null,
            sum = 0,
            sum2 = 0,
            sum22 = 0,
        sum3 = 0;
        var eventName1 = null;
        var eventName2 = null;
        var fakeEvent = null;
        var target2 = null;
        var dom = null;

        beforeEach(function(){
            dom = document.body;
            eventName1 = "custom1";
            eventName2 = "custom2";
            fakeEvent = {
                pageX:10,
                pageY:10
            };
            target2 = wd.GameObject.create();

            manager.on(dom, wd.EEventName.CLICK, function (e) {
                eventTarget = e;
                sum++;
            });

            manager.on(target, eventName1, function (e) {
                eventTarget2 = e;
                sum2++;
            });
            manager.on(target, eventName2, function (e) {
                sum22++;
            });

            manager.on(target2, eventName1, function (e) {
                sum3++;
            });
        });
        it("off target", function(){
            manager.off(target);
            manager.trigger(target, wd.CustomEvent.create(eventName1));
            manager.trigger(target, wd.CustomEvent.create(eventName2));

            expect(eventTarget2).toBeNull();
            expect(sum2).toEqual(0);
            expect(sum22).toEqual(0);
        });
        it("off all", function(){
            manager.off();
            manager.trigger(dom, wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));
            manager.trigger(target, wd.CustomEvent.create(eventName1));
            manager.trigger(target, wd.CustomEvent.create(eventName2));
            manager.trigger(target2, wd.CustomEvent.create(eventName1));

            expect(eventTarget).toBeNull();
            expect(eventTarget2).toBeNull();
            expect(sum).toEqual(0);
            expect(sum2).toEqual(0);
            expect(sum22).toEqual(0);
            expect(sum3).toEqual(0);
        });
    });

    describe("stopPropagation", function () {
        var mesh1, mesh2, mesh3, mesh4;
        var eventTarget1 = null,
            eventTarget2 = null,
            eventTarget3 = null,
            eventTarget4 = null;
        var fakeObj;
        var eventName = "custom";

        beforeEach(function () {
            mesh1 = wd.GameObject.create();
            mesh2 = wd.GameObject.create();
            mesh3 = wd.GameObject.create();
            mesh4 = wd.GameObject.create();
            mesh2.addChild(mesh1);
            mesh4.addChild(mesh2);
            mesh4.addChild(mesh3);
            fakeObj = {
                a: sandbox.stub(),
                b: sandbox.stub(),
                c: sandbox.stub(),
                d: sandbox.stub()
            }

            manager.fromEvent(mesh1, eventName)
                .subscribe(function (e) {
                    eventTarget1 = e.clone();
                    fakeObj.a();
                });
            manager.fromEvent(mesh2, eventName)
                .subscribe(function (e) {
                    e.stopPropagation();

                    eventTarget2 = e.clone();
                    fakeObj.b();
                });
            manager.fromEvent(mesh3, eventName)
                .subscribe(function (e) {
                    eventTarget3 = e.clone();
                    fakeObj.c();
                });
            manager.fromEvent(mesh4, eventName)
                .subscribe(function (e) {
                    eventTarget4 = e.clone();
                    fakeObj.d();
                });
        });

        describe("stopPropagation() can work in emited event", function () {
            it("single handler", function(){
                manager.emit(mesh1, wd.CustomEvent.create(eventName));

                expect(eventTarget1.phase).toEqual(wd.EEventPhase.EMIT);
                expect(eventTarget1.currentTarget.uid).toEqual(mesh1.uid);
                expect(eventTarget1.target.uid).toEqual(mesh1.uid);
                expect(eventTarget2.phase).toEqual(wd.EEventPhase.EMIT);
                expect(eventTarget2.currentTarget.uid).toEqual(mesh2.uid);
                expect(eventTarget2.target.uid).toEqual(mesh1.uid);
                expect(eventTarget3).toBeNull();
                expect(eventTarget4).toBeNull();
                expect(fakeObj.a).toCalledBefore(fakeObj.b);
            });
            it("if one of multi handler stopPropagation, then stop propagation", function(){
                var eventTarget5 = null;

                manager.fromEvent(mesh2, eventName)
                    .subscribe(function (e) {
                        eventTarget5 = e;
                        fakeObj.d();
                    });

                manager.emit(mesh1, wd.CustomEvent.create(eventName));

                expect(eventTarget1.phase).toEqual(wd.EEventPhase.EMIT);
                expect(eventTarget1.currentTarget.uid).toEqual(mesh1.uid);
                expect(eventTarget1.target.uid).toEqual(mesh1.uid);
                expect(eventTarget2.phase).toEqual(wd.EEventPhase.EMIT);
                expect(eventTarget2.currentTarget.uid).toEqual(mesh2.uid);
                expect(eventTarget2.target.uid).toEqual(mesh1.uid);
                expect(eventTarget5.phase).toEqual(wd.EEventPhase.EMIT);
                expect(eventTarget5.currentTarget.uid).toEqual(mesh2.uid);
                expect(eventTarget5.target.uid).toEqual(mesh1.uid);
                expect(eventTarget3).toBeNull();
                expect(eventTarget4).toBeNull();
                expect(fakeObj.a).toCalledBefore(fakeObj.b);
                expect(fakeObj.b).toCalledBefore(fakeObj.d);
            });
        });
        it("stopPropagation() not work in broadcasted event", function () {
            manager.broadcast(mesh4, wd.CustomEvent.create(eventName));

            expect(eventTarget4.phase).toEqual(wd.EEventPhase.BROADCAST);
            expect(eventTarget4.currentTarget.uid).toEqual(mesh4.uid);
            expect(eventTarget4.target.uid).toEqual(mesh4.uid);
            expect(eventTarget2.phase).toEqual(wd.EEventPhase.BROADCAST);
            expect(eventTarget2.currentTarget.uid).toEqual(mesh2.uid);
            expect(eventTarget2.target.uid).toEqual(mesh4.uid);
            expect(eventTarget1.phase).toEqual(wd.EEventPhase.BROADCAST);
            expect(eventTarget1.currentTarget.uid).toEqual(mesh1.uid);
            expect(eventTarget1.target.uid).toEqual(mesh4.uid);
            expect(eventTarget3.phase).toEqual(wd.EEventPhase.BROADCAST);
            expect(eventTarget3.currentTarget.uid).toEqual(mesh3.uid);
            expect(eventTarget3.target.uid).toEqual(mesh4.uid);
            expect(fakeObj.d).toCalledBefore(fakeObj.b);
            expect(fakeObj.b).toCalledBefore(fakeObj.a);
            expect(fakeObj.a).toCalledBefore(fakeObj.c);
        });
    });

    //describe("system event", function(){
    //    beforeEach(function(){
    //
    //    });
    //
    //    //should test in real environment(pc, mobile)
    //
    //    //write gulp task to sync to server for testing in mobile
    //    it("", function(){
    //
    //    });
    //
    //    //manager.on(scene,
    //    //    {
    //    //        eventName: EEventName.MOUSE,
    //
    //    //        onClick: function (e) {
    //    //            expect(e instanceof wd.Event).toBeTruthy();
    //    //            expect(e.target.id).toEqual("event-test");
    //    //            expect(e.mouseButton).toEqual(0);
    //    //            expect(e.type).toEqual(MouseEvent.CLICK);
    //    //        }
    //    //    });
    //    //
    //    //manager.trigger(dom, MouseEvent.CLICK);
    //
    //
    //    //write unit test to dispatch event
    //    it("", function(){
    //
    //    })
    //});
    //
    //
    //
    //
    //
    //describe("event test", function () {
    //    describe("system event", function () {
    //        describe("pc event", function () {
    //            beforeEach(function () {
    //
    //            });
    //
    //            it("bind event and trigger event", function () {
    //                //manager.on(dom,
    //                //    {
    //                //        event: Listener.MOUSE,
    //                //        onClick: function (e) {
    //                //            expect(e instanceof wd.Event).toBeTruthy();
    //                //            expect(e.target.id).toEqual("event-test");
    //                //            expect(e.mouseButton).toEqual(0);
    //                //            expect(e.type).toEqual(MouseEvent.CLICK);
    //                //        }
    //                //    });
    //                //
    //                //manager.trigger(dom, MouseEvent.CLICK);
    //            });
    //
    //            //describe("remove event bind", function () {
    //            //    var count = 0;
    //            //
    //            //    beforeEach(function () {
    //            //        manager.on(KeyboardEvent.KEY_DOWN, function (e) {
    //            //            count = count + 1;
    //            //        });
    //            //        manager.on(MouseEvent.CLICK, function (e) {
    //            //            count = count + 10;
    //            //        });
    //            //    });
    //            //
    //            //    it("remove specific event", function () {
    //            //        manager.off(MouseEvent.CLICK);
    //            //
    //            //        manager.trigger(MouseEvent.KEY_DOWN);
    //            //        manager.trigger(MouseEvent.CLICK);
    //            //
    //            //        expect(count).toEqual(10);
    //            //    });
    //            //    it("remove all event", function () {
    //            //        manager.off();
    //            //
    //            //        manager.trigger(MouseEvent.KEY_DOWN);
    //            //        manager.trigger(MouseEvent.CLICK);
    //            //
    //            //        expect(count).toEqual(0);
    //            //    });
    //            //});
    //        });
    //
    //        //todo support mobile event
    //        describe("mobile event", function () {
    //            //todo support acceleration event(like cocos2d)
    //        });
    //    });
    //});
    //
    //
    //describe("dispatch in event flow", function () {
    //    //var count = null,
    //    //    director = null,
    //    //    scene = null,
    //    //    mesh = null;
    //    //
    //    //function bindEventWithNoData() {
    //    //    manager.on(director, TouchEvent.TOUCH_START, function (data) {
    //    //        count = count + data;
    //    //    });
    //    //    manager.on(scene, TouchEvent.TOUCH_START, function (data) {
    //    //        count = count + 10 + data;
    //    //    });
    //    //    manager.on(mesh, TouchEvent.TOUCH_START, function (data) {
    //    //        count = count + 100 + data;
    //    //    });
    //    //}
    //    //
    //    //function bindEventWithData() {
    //    //    manager.on(director, CustomEvent.CUSTOM_EVENT, function (data) {
    //    //        count = count + 1;
    //    //    });
    //    //    manager.on(scene, CustomEvent.CUSTOM_EVENT, function (data) {
    //    //        count = count + 10;
    //    //    });
    //    //    manager.on(mesh, CustomEvent.CUSTOM_EVENT, function (data) {
    //    //        count = count + 100;
    //    //    });
    //    //}
    //
    //    beforeEach(function () {
    //        //count = 0;
    //        //director = wd.Director.getInstance();
    //        //scene = wd.SceneDispatcher.create(null, "", "");
    //        //mesh = wd.GameObject.create(null);
    //        //
    //        ////scene.add(mesh);
    //        //scene._meshes.addChildren(mesh);
    //        ////director.runWithScene(scene);
    //        //
    //        //director._scene = scene;
    //    });
    //
    //    describe("build flow relation", function () {
    //        it("can be hierarchy relation of node", function () {
    //
    //        });
    //        it("can be build by using setParent method", function () {
    //
    //        });
    //    });
    //
    //    it("trigger current target", function () {
    //
    //    });
    //
    //
    //    describe("broadcast (down in flow)", function () {
    //        it("broadcast system event", function () {
    //            //bindEventWithNoData();
    //            //
    //            //manager.broadcast(CustomEvent.create(scene, CustomEvent.CUSTOM_EVENT));
    //            //
    //            //expect(count).toEqual(110);
    //        });
    //        describe("broadcast custom event", function () {
    //            //it("test1", function () {
    //            //    bindEventWithData1();
    //            //
    //            //    director.broadcast("customEvent", 5);
    //            //
    //            //    expect(count).toEqual(125);
    //            //});
    //            //it("test2", function () {
    //            //    bindEventWithData2();
    //            //
    //            //    director.broadcast("customEvent", {
    //            //        count: 5
    //            //    });
    //            //
    //            //    expect(count).toEqual(125);
    //            //});
    //        });
    //    });
    //    it("emit (up in flow)", function () {
    //        it("emit dom event", function () {
    //            //bindEventWithNoData();
    //            //
    //            //scene.emit("customEvent");
    //            //
    //            //expect(count).toEqual(11);
    //        });
    //        describe("emit custom event", function () {
    //            //it("test1", function () {
    //            //    bindEventWithData1();
    //            //
    //            //    mesh.emit("customEvent", 5);
    //            //
    //            //    expect(count).toEqual(125);
    //            //});
    //            //it("test2", function () {
    //            //    bindEventWithData2();
    //            //
    //            //    mesh.emit("customEvent", {
    //            //        count: 5
    //            //    });
    //            //
    //            //    expect(count).toEqual(125);
    //            //});
    //        });
    //    });
    //});
    //
});
