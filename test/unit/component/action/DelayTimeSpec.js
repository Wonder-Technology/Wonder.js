describe("DelayTime", function () {
    var sandbox = null;
    var gameObject = null;
    var action = null;
    var DelayTime = wd.DelayTime;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        action = new DelayTime();
        gameObject = wd.GameObject.create();
        sandbox.stub(window.performance, "now").returns(0);
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("delay time", function(){
        action = DelayTime.create(100);
        gameObject.addComponent(action);

        action.start();
        wd.ActionManager.getInstance().update(50);

        expect(action.isFinish).toBeFalsy();

        wd.ActionManager.getInstance().update(100);

        expect(action.isFinish).toBeTruthy();
    });

    describe("clone", function(){
        it("return clone one", function () {
            action.duration = 1;

            var a = action.clone();

            expect(a).toBeInstanceOf(DelayTime);
            expect(a === action).toBeFalsy();
            expect(a.duration).toEqual(1);
        });
    });

    describe("start,stop", function(){
        it("when start agian after stop, it will restart the action", function () {
            action = wd.DelayTime.create(100);
            gameObject.addComponent(action);

            action.start();
            wd.ActionManager.getInstance().update(50);
            action.stop();
            wd.ActionManager.getInstance().update(150);
            expect(action.isFinish).toBeFalsy();

            window.performance.now.returns(150);
            action.start();
            wd.ActionManager.getInstance().update(200);
            expect(action.isFinish).toBeFalsy();

            wd.ActionManager.getInstance().update(250);
            expect(action.isFinish).toBeTruthy();
        });
    });

    describe("pause,resume", function(){
        it("can pause action and continue action", function () {
            action = wd.DelayTime.create(100);
            gameObject.addComponent(action);

            action.start();
            wd.ActionManager.getInstance().update(50);
            window.performance.now.returns(50);
            action.pause();

            wd.ActionManager.getInstance().update(100);
            expect(action.isFinish).toBeFalsy();
            window.performance.now.returns(100);
            action.resume();

            wd.ActionManager.getInstance().update(120);
            expect(action.isFinish).toBeFalsy();

            wd.ActionManager.getInstance().update(150);
            expect(action.isFinish).toBeTruthy();
        });
    });
});


