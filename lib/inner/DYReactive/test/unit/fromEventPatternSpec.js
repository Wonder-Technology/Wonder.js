describe("fromEventPattern", function () {
    var rt = dyRt,
        TestScheduler = rt.TestScheduler,
        next = TestScheduler.next,
        completed = TestScheduler.completed;
    var scheduler = null;
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        scheduler = TestScheduler.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("DYEngine event test", function(){
        var canvasId = null;
        var scene = null;

        beforeEach(function(){
            canvasId = "test_engine";
            scene = new Engine3D.GameObject();
            $("body").append($("<canvas id=" + canvasId + "></canvas>"));

            Engine3D.WebGLContext.createGL("#" + canvasId);
        });
        afterEach(function(){
            $("#" + canvasId).remove();
        });

        it("single handler", function(){
            var priority = 0;
            var eventTriggered = null,
                isOff = false,
                sum = 0;

            var subscription = rt.fromEventPattern(
                function(handler){
                    Engine3D.EventManager.on(scene, "mousedown", handler, priority);
                },
                function(handler){
                    Engine3D.EventManager.off(scene, "mousedown", handler);
                    isOff = true;
                })
                .subscribe(function(e){
                    eventTriggered = e;
                    sum ++;
                });

            var fakeEvent = {
                pageX:10,
                pageY:10
            };
            Engine3D.EventManager.trigger(scene, Engine3D.MouseEvent.create(fakeEvent, Engine3D.EventType.MOUSEDOWN));

            expect(eventTriggered).toBeInstanceOf(Engine3D.MouseEvent);
            expect(sum).toEqual(1);

            subscription.dispose();
            Engine3D.EventManager.trigger(scene, Engine3D.MouseEvent.create(fakeEvent, Engine3D.EventType.MOUSEDOWN));

            expect(isOff).toBeTruthy();
            expect(sum).toEqual(1);
        });

        describe("multi handler for one eventType", function(){
            describe("subject", function(){
                var priority = 0;
                var eventTriggered = null,
                    eventTriggered2 = null,
                    isOff = false,
                    sum = 0,
                    sum2 = 0;
                var fakeEvent = null;
                var subject = null;
                var subscription1 = null,
                    subscription2 = null;

                beforeEach(function(){
                    priority = 0;
                    eventTriggered = null;
                    eventTriggered2 = null;
                    isOff = false;
                    sum = 0;
                    sum2 = 0;

                    subject = rt.Subject.create();

                    rt.fromEventPattern(
                        function(handler){
                            Engine3D.EventManager.on(scene, "mousedown", handler, priority);
                        },
                        function(handler){
                            Engine3D.EventManager.off(scene, "mousedown", handler);
                            isOff = true;
                        })
                        .subscribe(subject);

                    subscription1 = subject.subscribe(function(e){
                        eventTriggered = e;
                        sum ++;
                    });
                    subscription2 = subject.subscribe(function(e){
                        eventTriggered2 = e;
                        sum2 ++;
                    });
                    subject.start();

                    fakeEvent = {
                        pageX:10,
                        pageY:10
                    };
                });

                it("trigger", function(){
                    Engine3D.EventManager.trigger(scene, Engine3D.MouseEvent.create(fakeEvent, Engine3D.EventType.MOUSEDOWN));

                    expect(eventTriggered).toBeInstanceOf(Engine3D.MouseEvent);
                    expect(eventTriggered2).toBeInstanceOf(Engine3D.MouseEvent);
                    expect(sum).toEqual(1);
                    expect(sum2).toEqual(1);
                });
                it("it will invoke removeHandler when disposing arbitrary one", function(){
                    subscription2.dispose();
                    Engine3D.EventManager.trigger(scene, Engine3D.MouseEvent.create(fakeEvent, Engine3D.EventType.MOUSEDOWN));

                    expect(isOff).toBeTruthy();
                    expect(sum).toEqual(0);
                    expect(sum2).toEqual(0);
                });
            });

            describe("multi invoke fromEventPattern", function(){
                var priority1 = null,
                    priority2 = null;
                var eventTriggered = null,
                    eventTriggered2 = null,
                    isOff = false,
                    sum = 0,
                    sum2 = 0;
                var fakeEvent = null;
                var subscription1 = null,
                    subscription2 = null;
                var fakeObj = null;

                beforeEach(function(){
                    priority1 = 0;
                    priority2 = 1;
                    eventTriggered = null;
                    eventTriggered2 = null;
                    isOff = false;
                    sum = 0;
                    sum2 = 0;

                    fakeObj = {
                        a:sandbox.stub(),
                        b:sandbox.stub()
                    };


                    subscription1 = rt.fromEventPattern(
                        function(handler){
                            Engine3D.EventManager.on(scene, "mousedown", handler, priority1);
                        },
                        function(handler){
                            Engine3D.EventManager.off(scene, "mousedown", handler);
                            isOff = true;
                        })
                        .subscribe(function(e){
                            eventTriggered = e;
                            sum ++;
                            fakeObj.a();
                    });

                    subscription2 = rt.fromEventPattern(
                        function(handler){
                            Engine3D.EventManager.on(scene, "mousedown", handler, priority2);
                        },
                        function(handler){
                            Engine3D.EventManager.off(scene, "mousedown", handler);
                            isOff = true;
                        })
                        .subscribe(function(e){
                            eventTriggered2 = e;
                            sum2 ++;
                            fakeObj.b();
                        });

                    fakeEvent = {
                        pageX:10,
                        pageY:10
                    };
                });

                it("trigger", function(){
                    Engine3D.EventManager.trigger(scene, Engine3D.MouseEvent.create(fakeEvent, Engine3D.EventType.MOUSEDOWN));

                    expect(eventTriggered).toBeInstanceOf(Engine3D.MouseEvent);
                    expect(eventTriggered2).toBeInstanceOf(Engine3D.MouseEvent);
                    expect(sum).toEqual(1);
                    expect(sum2).toEqual(1);
                });
                it("it will invoke the specify removeHandler when disposing", function(){
                    subscription2.dispose();
                    Engine3D.EventManager.trigger(scene, Engine3D.MouseEvent.create(fakeEvent, Engine3D.EventType.MOUSEDOWN));

                    expect(isOff).toBeTruthy();
                    expect(sum).toEqual(1);
                    expect(sum2).toEqual(0);
                });
                it("test priority", function(){
                    Engine3D.EventManager.trigger(scene, Engine3D.MouseEvent.create(fakeEvent, Engine3D.EventType.MOUSEDOWN));

                    expect(fakeObj.b).toCalledBefore(fakeObj.a);
                });
            });
        });
    });
});
