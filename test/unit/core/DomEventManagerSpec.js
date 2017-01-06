describe("DomEventManager", function () {
    var sandbox = null;
    var EventManager = wd.EventManager;
    var manager;
    var EEventName = wd.EEventName;
    var EEngineEvent = wd.EEngineEvent;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        manager = wd.DomEventManager.create();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("dispose", function(){
        beforeEach(function(){

        });

        it("remove point tap,down,up,move,scale event", function(){
            var sum1 = 0,
                sum2 = 0,
                sum3 = 0,
                sum4 = 0,
                sum5 = 0;
            var fakeEvent = eventTool.buildFakeMouseEvent(10, 20);

            manager.initDomEvent();

            EventManager.on(EEngineEvent.POINT_TAP, function(){
                sum1++;
            });

            EventManager.on(EEngineEvent.POINT_MOVE, function(){
                sum2++;
            });

            EventManager.on(EEngineEvent.POINT_DOWN, function(){
                sum3++;
            });

            EventManager.on(EEngineEvent.POINT_UP, function(){
                sum4++;
            });

            EventManager.on(EEngineEvent.POINT_SCALE, function(){
                sum5++;
            });

            eventTool.triggerDomEvent(EEventName.CLICK, document.body, fakeEvent);
            eventTool.triggerDomEvent(EEventName.MOUSEMOVE, document.body, fakeEvent);
            eventTool.triggerDomEvent(EEventName.MOUSEDOWN, document.body, fakeEvent);
            eventTool.triggerDomEvent(EEventName.MOUSEUP, document.body, fakeEvent);
            eventTool.triggerDomEvent(EEventName.MOUSEWHEEL, document.body, fakeEvent);

            expect(sum1).toEqual(1);
            expect(sum2).toEqual(1);
            expect(sum3).toEqual(1);
            expect(sum4).toEqual(1);
            expect(sum5).toEqual(1);






            manager.dispose();


            eventTool.triggerDomEvent(EEventName.CLICK, document.body, fakeEvent);
            eventTool.triggerDomEvent(EEventName.MOUSEMOVE, document.body, fakeEvent);
            eventTool.triggerDomEvent(EEventName.MOUSEDOWN, document.body, fakeEvent);
            eventTool.triggerDomEvent(EEventName.MOUSEUP, document.body, fakeEvent);
            eventTool.triggerDomEvent(EEventName.MOUSEWHEEL, document.body, fakeEvent);


            expect(sum1).toEqual(1);
            expect(sum2).toEqual(1);
            expect(sum3).toEqual(1);
            expect(sum4).toEqual(1);
            expect(sum5).toEqual(1);
        });
    });
});

