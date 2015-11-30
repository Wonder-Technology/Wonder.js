describe("action integration test", function () {
    var sandbox = null;
    var gameObject = null;
    var action = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        gameObject = wd.GameObject.create();
        sandbox.stub(window.performance, "now").returns(0);
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("Repeat,Sequence,Spawn", function () {
        var x;
        var action1 = wd.Tween.create().from({x: 0}).to({x: 5}, 100)
            .onUpdate(function () {
                x = this.x;
            });
        var action2 = wd.DelayTime.create(50);
        var action3 = wd.DelayTime.create(30);
        var sum = 0;
        var action4 = wd.CallFunc.create(function () {
            sum = 100;
        });

        action = wd.Repeat.create(wd.Spawn.create(wd.Repeat.create(action1, 2), wd.Sequence.create(wd.Sequence.create(action2, action3), action4)), 1);

        gameObject.addComponent(action);

        action.start();
        gameObject.actionManager.update(50);
        expect(x).toEqual(2.5);
        expect(action2.isFinish).toBeTruthy();

        gameObject.actionManager.update(80);
        expect(action3.isFinish).toBeTruthy();
        expect(action4.isFinish).toBeFalsy();

        gameObject.actionManager.update(81);
        expect(action4.isFinish).toBeTruthy();
        expect(sum).toEqual(100);

        window.performance.now.returns(100);
        gameObject.actionManager.update(100);
        expect(x).toEqual(5);

        gameObject.actionManager.update(200);
        expect(action1.isFinish).toBeTruthy();
        expect(x).toEqual(5);
        expect(action.isFinish).toBeTruthy();
    });
});
