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
        gameObject.actionManager.update(50);

        expect(action.isFinish).toBeFalsy();

        gameObject.actionManager.update(100);

        expect(action.isFinish).toBeTruthy();
    });

    describe("clone", function(){
        it("return clone one", function () {
            var a = action.clone();

            expect(a).toBeInstanceOf(DelayTime);
            expect(a === action).toBeFalsy();
        });
    });

    describe("start,stop", function(){
        it("when start agian after stop, it will restart the action", function () {
            action = wd.DelayTime.create(100);
            gameObject.addComponent(action);

            action.start();
            gameObject.actionManager.update(50);
            action.stop();
            gameObject.actionManager.update(150);
            expect(action.isFinish).toBeFalsy();

            window.performance.now.returns(150);
            action.start();
            gameObject.actionManager.update(200);
            expect(action.isFinish).toBeFalsy();

            gameObject.actionManager.update(250);
            expect(action.isFinish).toBeTruthy();
        });
    });

    describe("pause,resume", function(){
        it("can pause action and continue action", function () {
            action = wd.DelayTime.create(100);
            gameObject.addComponent(action);

            action.start();
            gameObject.actionManager.update(50);
            window.performance.now.returns(50);
            action.pause();

            gameObject.actionManager.update(100);
            expect(action.isFinish).toBeFalsy();
            window.performance.now.returns(100);
            action.resume();

            gameObject.actionManager.update(120);
            expect(action.isFinish).toBeFalsy();

            gameObject.actionManager.update(150);
            expect(action.isFinish).toBeTruthy();
        });
    });
});


