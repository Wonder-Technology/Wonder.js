describe("Repeat", function () {
    var sandbox = null;
    var gameObject = null;
    var action = null;
    var Repeat = dy.Repeat;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        action = new Repeat();
        gameObject = dy.GameObject.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("repeat action for the specific times", function(){
        sandbox.stub(window.performance, "now").returns(0);
        var x1 = null;
        var tween1 = dy.Tween.create();
        tween1.from({x:0}).to({x: 10}, 100)
            .easing( dy.Tween.Easing.Linear.None)
            .onUpdate(function(){
                x1 = this.x;
            });

        action = Repeat.create(tween1, 2);
        gameObject.addComponent(action);

        action.start();
        gameObject._actionManager.update(10);
        expect(x1).toEqual(1);
        gameObject._actionManager.update(40);
        expect(x1).toEqual(4);

        window.performance.now.returns(100);
        gameObject._actionManager.update(100);
        expect(tween1.isFinish).toBeFalsy();
        expect(action.isFinish).toBeFalsy();
        expect(x1).toEqual(10);

        gameObject._actionManager.update(110);
        expect(x1).toEqual(1);

        gameObject._actionManager.update(200);
        expect(x1).toEqual(10);
        expect(tween1.isFinish).toBeTruthy();
        expect(action.isFinish).toBeTruthy();
    });

    describe("copy", function(){
        it("return copy one, copy inner action", function () {
            var copy1 = {};
            var fakeAction = {
                    copy:sandbox.stub().returns(copy1)
                };
            action = Repeat.create(fakeAction, 2);
            var a = action.copy();

            expect(a).toBeInstanceOf(Repeat);
            expect(a === action).toBeFalsy();
            expect(a._times).toEqual(2);
            expect(a.getInnerActions().getChildren()).toEqual([copy1]);
        });
    });

    describe("start,stop", function(){
        it("when start agian after stop, it will restart the action", function () {
            sandbox.stub(window.performance, "now").returns(0);
            var x1 = null;
            var tween1 = dy.Tween.create();
            tween1.from({x:0}).to({x: 10}, 100)
                .easing( dy.Tween.Easing.Linear.None)
                .onUpdate(function(){
                    x1 = this.x;
                });

            action = Repeat.create(tween1, 2);
            gameObject.addComponent(action);

            action.start();
            gameObject._actionManager.update(10);
            expect(x1).toEqual(1);

            action.stop();
            gameObject._actionManager.update(100);
            expect(tween1.isFinish).toBeFalsy();
            expect(x1).toEqual(1);

            window.performance.now.returns(100);
            action.start();
            gameObject._actionManager.update(140);
            expect(x1).toEqual(4);

            gameObject._actionManager.update(240);
            gameObject._actionManager.update(340);
            expect(x1).toEqual(10);
            expect(tween1.isFinish).toBeTruthy();
        });
    });
});

