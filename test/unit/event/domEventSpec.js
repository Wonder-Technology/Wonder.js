describe("dom event", function () {
    var manager = null;
    var sandbox = null;
    var target = null;
    var director, scene, camera;
    var fakeEvent;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        target = wd.GameObject.create();
        manager = wd.EventManager;



        fakeEvent = {
            pageX:10,
            pageY:10
        };



        director = wd.Director.getInstance();

        scene = director.scene;

        camera =  testTool.createCamera();

        scene.addChild(camera);


        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        sandbox.stub(wd.DeviceManager.getInstance(), "view", {
            width:100,
            height:100,
            offset:{
                x:0,
                y:0
            }
        });
    });
    afterEach(function () {
        manager.off();
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    it("can bind the same dom event multi handler that it only bind dom event once", function () {
        manager.off();


        var sum = 0;
        sandbox.spy(wd.MouseEventHandler.getInstance(), "triggerDomEvent");


        director._init();


        var subscription = manager.fromEvent(scene, wd.EEngineEvent.POINT_DOWN).subscribe(function(e){
            sum++;
        });
        manager.on(scene, wd.EEngineEvent.POINT_DOWN, function(e){
            sum++;
        });

        eventTool.triggerDomEvent(wd.EEventName.MOUSEDOWN, document.body, fakeEvent);

        expect(sum).toEqual(2);
        expect(wd.MouseEventHandler.getInstance().triggerDomEvent).toCalledOnce();
    });

    describe("can judge browser to bind correspond eventName to dom", function(){
        describe("test mousewheel event", function(){
            it("firefox", function(){
                var sum = 0;
                sandbox.spy(wd.MouseEventHandler.getInstance(), "triggerDomEvent");
                sandbox.stub(bowser, "firefox", true);


                director._init();


                manager.on(scene, wd.EEngineEvent.POINT_SCALE, function(e){
                    sum++;
                });

                YYC.Tool.event.triggerEvent(document.body, "DOMMouseScroll", fakeEvent);

                expect(wd.MouseEventHandler.getInstance().triggerDomEvent).toCalledOnce();
                expect(sum).toEqual(1);
            });
            it("chrome", function(){
                var sum = 0;
                sandbox.spy(wd.MouseEventHandler.getInstance(), "triggerDomEvent");
                sandbox.stub(bowser, "firefox", false);
                sandbox.stub(bowser, "chrome", true);

                director._init();



                manager.on(scene, wd.EEngineEvent.POINT_SCALE, function(e){
                    sum++;
                });

                YYC.Tool.event.triggerEvent(document.body, "mousewheel", fakeEvent);

                expect(wd.MouseEventHandler.getInstance().triggerDomEvent).toCalledOnce();
                expect(sum).toEqual(1);
            });
        });
    });

    describe("test off", function(){
        var sum1 = 0,
            sum2 = 0,
            sum3 = 0,
            sum4 = 0;

        beforeEach(function(){
            director._init();

            sum1 = 0;
            sum2 = 0;
            sum3 = 0;
            sum4 = 0;

            manager.on(scene, wd.EEngineEvent.POINT_SCALE, function(e){
                sum1++;
            });
            manager.on(scene, wd.EEngineEvent.POINT_DOWN, function(e){
                sum2++;
            });
            manager.on(scene, wd.EEngineEvent.POINT_DOWN, function(e){
                sum3++;
            });
            manager.on(wd.EEventName.KEYUP, function(e){
                sum4++;
            });



            eventTool.triggerDomEvent(wd.EEventName.MOUSEWHEEL, document.body, fakeEvent);
            eventTool.triggerDomEvent(wd.EEventName.MOUSEDOWN, document.body, fakeEvent);
            eventTool.triggerDomEvent(wd.EEventName.KEYUP, document.body);

            expect(sum1).toEqual(1);
            expect(sum2).toEqual(1);
            expect(sum3).toEqual(1);
            expect(sum4).toEqual(1);
        });

        it("test off()", function(){
            manager.off();

            eventTool.triggerDomEvent(wd.EEventName.MOUSEWHEEL, document.body, fakeEvent);
            eventTool.triggerDomEvent(wd.EEventName.MOUSEDOWN, document.body, fakeEvent);
            eventTool.triggerDomEvent(wd.EEventName.KEYUP, document.body);

            expect(sum1).toEqual(1);
            expect(sum2).toEqual(1);
            expect(sum3).toEqual(1);
            expect(sum4).toEqual(1);
        });
        it("test off(dom)", function(){
            eventTool.triggerDomEvent(wd.EEventName.MOUSEWHEEL, document.body, fakeEvent);
            eventTool.triggerDomEvent(wd.EEventName.MOUSEDOWN, document.body, fakeEvent);
            eventTool.triggerDomEvent(wd.EEventName.KEYUP, document.body);


            //not off

            expect(sum1).toEqual(2);
            expect(sum2).toEqual(2);
            expect(sum3).toEqual(2);
            expect(sum4).toEqual(2);



            manager.off(scene);

            eventTool.triggerDomEvent(wd.EEventName.MOUSEWHEEL, document.body, fakeEvent);
            eventTool.triggerDomEvent(wd.EEventName.MOUSEDOWN, document.body, fakeEvent);
            eventTool.triggerDomEvent(wd.EEventName.KEYUP, document.body);


            expect(sum1).toEqual(2);
            expect(sum2).toEqual(2);
            expect(sum3).toEqual(2);
            expect(sum4).toEqual(3);




            manager.off(document.body);

            eventTool.triggerDomEvent(wd.EEventName.KEYUP, document.body);


            expect(sum4).toEqual(3);
        });
    });

    describe("fix bug", function(){
        beforeEach(function(){
        });

        it("if dispose one handler of the dom event which is binded multi handler, the other handlers should keep binded", function () {
            fakeEvent = eventTool.buildFakeTouchEvent(10, 10);

            sandbox.stub(director.domEventManager._pointEventBinder, "_isSupportTouch").returns(true);


            var EEventName = wd.EEventName;

            var touchdown = manager.fromEvent(EEventName.TOUCHDOWN);

            var sum1 = 0,
                sum2 = 0;

            var sub1 = touchdown.subscribe(function(){
                sum1++;
            });

            var sub2 = touchdown.subscribe(function(){
                sum2++;
            });

            eventTool.triggerDomEvent(wd.EEventName.TOUCHDOWN, document.body, fakeEvent);

            expect(sum1).toEqual(1);
            expect(sum2).toEqual(1);

            sub1.dispose();

            eventTool.triggerDomEvent(wd.EEventName.TOUCHDOWN, document.body, fakeEvent);

            expect(sum1).toEqual(1);
            expect(sum2).toEqual(2);
        });
    });
});
