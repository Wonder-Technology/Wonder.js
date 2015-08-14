describe("DelayTime", function () {
    var sandbox = null;
    var gameObject = null;
    var action = null;
    var DelayTime = dy.DelayTime;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        action = new DelayTime();
        gameObject = dy.GameObject.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("delay time", function(){
        sandbox.stub(window.performance, "now").returns(0);
        action = DelayTime.create(100);
        gameObject.addComponent(action);

        action.start();
        gameObject._actionManager.update(50);

        expect(action.isFinish).toBeFalsy();

        gameObject._actionManager.update(100);

        expect(action.isFinish).toBeTruthy();
    });

    describe("copy", function(){
        it("return copy one", function () {
            var a = action.copy();

            expect(a).toBeInstanceOf(DelayTime);
            expect(a === action).toBeFalsy();
        });
    });

    describe("start", function(){
        it("when start agian after stop, it will restart the action", function () {
            sandbox.stub(window.performance, "now").returns(100);

            action = dy.DelayTime.create(100);
            gameObject.addComponent(action);

            action.start();
            gameObject._actionManager.update(50);
            action.stop();
            gameObject._actionManager.update(150);
            expect(action.isFinish).toBeFalsy();

            window.performance.now.returns(150);
            action.start();
            gameObject._actionManager.update(200);
            expect(action.isFinish).toBeFalsy();

            gameObject._actionManager.update(250);
            expect(action.isFinish).toBeTruthy();
        });
    });
});


