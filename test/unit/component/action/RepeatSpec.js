describe("Repeat", function () {
    var sandbox = null;
    var gameObject = null;
    var action = null;
    var Repeat = dy.Repeat;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        action = new Repeat();
        gameObject = dy.GameObject.create();
        sandbox.stub(window.performance, "now").returns(0);
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("repeat action for the specific times", function(){
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
        testTool.updateAction(10, gameObject);
        expect(x1).toEqual(1);
        testTool.updateAction(40, gameObject);
        expect(x1).toEqual(4);


        testTool.updateAction(100, gameObject);
        expect(tween1.isFinish).toBeFalsy();
        expect(action.isFinish).toBeFalsy();
        expect(x1).toEqual(10);

        testTool.updateAction(110, gameObject);
        expect(x1).toEqual(1);

        testTool.updateAction(200, gameObject);
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
            testTool.updateAction(10, gameObject);
            expect(x1).toEqual(1);

            action.stop();
            testTool.updateAction(100, gameObject);
            expect(tween1.isFinish).toBeFalsy();
            expect(x1).toEqual(1);


            action.start();
            testTool.updateAction(140, gameObject);
            expect(x1).toEqual(4);

            testTool.updateAction(240, gameObject);
            testTool.updateAction(340, gameObject);
            expect(x1).toEqual(10);
            expect(tween1.isFinish).toBeTruthy();
        });
    });

    describe("pause,resume", function(){
        it("can pause action and continue action", function () {
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
            testTool.updateAction(10, gameObject);
            expect(x1).toEqual(1);
            action.pause();

            testTool.updateAction(100, gameObject);
            expect(tween1.isFinish).toBeFalsy();
            expect(x1).toEqual(1);
            action.resume();

            testTool.updateAction(140, gameObject);
            expect(x1).toEqual(5);

            testTool.updateAction(190, gameObject);

            testTool.updateAction(290, gameObject);
            expect(x1).toEqual(10);
            expect(tween1.isFinish).toBeTruthy();
            expect(action.isFinish).toBeTruthy();
        });
    });
});

