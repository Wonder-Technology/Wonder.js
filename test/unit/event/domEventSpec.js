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

        subscription = manager.fromEvent(target, wd.EventName.MOUSEDOWN).subscribe(function(e){
            sum++;
        });
        manager.on(target, wd.EventName.MOUSEDOWN, function(e){
            sum++;
        });

        YYC.Tool.event.triggerEvent(document.getElementById("event-test"), "mousedown");

        expect(sum).toEqual(2);
        expect(wd.MouseEventHandler.getInstance().triggerDomEvent).toCalledOnce();
    });
});
