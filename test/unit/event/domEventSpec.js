describe("dom event", function () {
    var manager = null;
    var Listener = null;
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
        wd.DeviceManager.getInstance().createGL("#event-test");
        target = wd.GameObject.create();
        manager = wd.EventManager;
        Listener = wd.EventListener;
    });
    afterEach(function () {
        removeDom();
        manager.off();
        testTool.clearInstance();
        sandbox.restore();
    });

    it("can bind the same dom event multi handler that it only bind dom event once", function () {
        var sum = 0;
        sandbox.spy(wd.MouseEventHandler.getInstance(), "triggerDomEvent");
        target = wd.Director.getInstance().scene;

        subscription = manager.fromEvent(wd.EventName.MOUSEDOWN).subscribe(function(e){
            sum++;
        });
        manager.on(wd.EventName.MOUSEDOWN, function(e){
            sum++;
        });

        eventTool.triggerDomEvent(wd.EventName.MOUSEDOWN);

        expect(sum).toEqual(2);
        expect(wd.MouseEventHandler.getInstance().triggerDomEvent).toCalledOnce();
    });

    describe("can judge browser to bind correspond eventName to dom", function(){
        describe("test mousewheel event", function(){
            it("firefox", function(){
                var sum = 0;
                sandbox.spy(wd.MouseEventHandler.getInstance(), "triggerDomEvent");
                sandbox.stub(bowser, "firefox", true);
                target = wd.Director.getInstance().scene;

                manager.on(wd.EventName.MOUSEWHEEL, function(e){
                    sum++;
                });

                YYC.Tool.event.triggerEvent(document.getElementById("event-test"), "DOMMouseScroll");

                expect(wd.MouseEventHandler.getInstance().triggerDomEvent).toCalledOnce();
            });
            it("chrome", function(){
                var sum = 0;
                sandbox.spy(wd.MouseEventHandler.getInstance(), "triggerDomEvent");
                sandbox.stub(bowser, "firefox", false);
                sandbox.stub(bowser, "chrome", true);
                target = wd.Director.getInstance().scene;

                manager.on(wd.EventName.MOUSEWHEEL, function(e){
                    sum++;
                });

                YYC.Tool.event.triggerEvent(document.getElementById("event-test"), "mousewheel");

                expect(wd.MouseEventHandler.getInstance().triggerDomEvent).toCalledOnce();
            });
        });
    });

    describe("test off", function(){
        var sum1 = 0,
            sum2 = 0,
            sum3 = 0,
            sum4 = 0;

        beforeEach(function(){
            sum1 = 0;
            sum2 = 0;
            sum3 = 0;
            sum4 = 0;

            manager.on(wd.EventName.MOUSEWHEEL, function(e){
                sum1++;
            });
            manager.on(document.body, wd.EventName.MOUSEDOWN, function(e){
                sum2++;
            });
            manager.on(document.body, wd.EventName.MOUSEDOWN, function(e){
                sum3++;
            });
            manager.on(wd.EventName.KEYUP, function(e){
                sum4++;
            });



            eventTool.triggerDomEvent(wd.EventName.MOUSEWHEEL);
            eventTool.triggerDomEvent(wd.EventName.MOUSEDOWN, document.body);
            eventTool.triggerDomEvent(wd.EventName.KEYUP, document.body);

            expect(sum1).toEqual(1);
            expect(sum2).toEqual(1);
            expect(sum3).toEqual(1);
            expect(sum4).toEqual(1);
        });

        it("test off()", function(){
            manager.off();

            eventTool.triggerDomEvent(wd.EventName.MOUSEWHEEL);
            eventTool.triggerDomEvent(wd.EventName.MOUSEDOWN, document.body);
            eventTool.triggerDomEvent(wd.EventName.KEYUP, document.body);

            expect(sum1).toEqual(1);
            expect(sum2).toEqual(1);
            expect(sum3).toEqual(1);
            expect(sum4).toEqual(1);
        });
        it("test off(dom)", function(){
            manager.off(wd.DeviceManager.getInstance().view.dom);

            eventTool.triggerDomEvent(wd.EventName.MOUSEWHEEL);
            eventTool.triggerDomEvent(wd.EventName.MOUSEDOWN, document.body);
            eventTool.triggerDomEvent(wd.EventName.KEYUP, document.body);

            expect(sum1).toEqual(1);
            expect(sum2).toEqual(2);
            expect(sum3).toEqual(2);
            expect(sum4).toEqual(2);
        });
    });
});
