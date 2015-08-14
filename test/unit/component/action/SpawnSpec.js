describe("Spawn", function () {
    var sandbox = null;
    var gameObject = null;
    var action = null;
    var Spawn = dy.Spawn;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        action = new Spawn();
        gameObject = dy.GameObject.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("exec inner actions at the same time", function(){
        sandbox.stub(window.performance, "now").returns(0);
        var x1 = null;
        var x2 = null;
        var tween1 = dy.Tween.create();
        tween1.from({x:0}).to({x: 10}, 100)
            .easing( dy.Tween.Easing.Linear.None)
            .onUpdate(function(){
                x1 = this.x;
            });
        var tween2 = dy.Tween.create();
        tween2.from({x:0}).to({x: -4}, 40)
            .easing( dy.Tween.Easing.Linear.None)
            .onUpdate(function(){
                x2 = this.x;
            });

        action = Spawn.create(
            tween1,
            tween2
        );
        gameObject.addComponent(action);

        action.start();
        gameObject._actionManager.update(10);
        expect(x1).toEqual(1);
        expect(x2).toEqual(-1);
        gameObject._actionManager.update(40);
        expect(tween2.isFinish).toBeTruthy();
        expect(x1).toEqual(4);
        expect(x2).toEqual(-4);
        gameObject._actionManager.update(100);
        expect(tween1.isFinish).toBeTruthy();
        expect(x1).toEqual(10);
        expect(x2).toEqual(-4);
    });

    describe("copy", function(){
        it("return copy one, copy inner action", function () {
            var copy1 = {},
                copy2 = {a:1};
            var fakeAction1 = {
                    copy:sandbox.stub().returns(copy1)
                },
                fakeAction2 = {
                    copy:sandbox.stub().returns(copy2)
                };
            action = Spawn.create(fakeAction1, fakeAction2);
            var a = action.copy();

            expect(a).toBeInstanceOf(Spawn);
            expect(a === action).toBeFalsy();
            expect(a.getInnerActions().getChildren()).toEqual([copy1, copy2]);
        });
    });

    describe("start,stop", function(){
        it("when start agian after stop, it will restart the action", function () {
            sandbox.stub(window.performance, "now").returns(0);
            var x1 = null;
            var x2 = null;
            var tween1 = dy.Tween.create();
            tween1.from({x:0}).to({x: 10}, 100)
                .easing( dy.Tween.Easing.Linear.None)
                .onUpdate(function(){
                    x1 = this.x;
                });
            var tween2 = dy.Tween.create();
            tween2.from({x:0}).to({x: -4}, 40)
                .easing( dy.Tween.Easing.Linear.None)
                .onUpdate(function(){
                    x2 = this.x;
                });

            action = Spawn.create(
                tween1,
                tween2
            );
            gameObject.addComponent(action);

            action.start();
            gameObject._actionManager.update(10);
            expect(x1).toEqual(1);
            expect(x2).toEqual(-1);

            action.stop();
            gameObject._actionManager.update(40);
            expect(tween2.isFinish).toBeFalsy();
            expect(x1).toEqual(1);
            expect(x2).toEqual(-1);

            window.performance.now.returns(40);
            action.start();
            gameObject._actionManager.update(80);
            expect(x1).toEqual(4);
            expect(x2).toEqual(-4);
            expect(tween2.isFinish).toBeTruthy();

            action.stop();
            gameObject._actionManager.update(130);
            expect(tween1.isFinish).toBeFalsy();
            expect(x1).toEqual(4);
            expect(x2).toEqual(-4);

            window.performance.now.returns(130);
            action.start();
            gameObject._actionManager.update(230);
            expect(x1).toEqual(10);
            expect(x2).toEqual(-4);
            expect(tween1.isFinish).toBeTruthy();
        });
    });

    describe("reverse", function(){
        it("reverse action order", function(){
            var context = {
                name:""
            };
            var action1 = dy.CallFunc.create(function(gameObject, dataArr){
                this.name += "a";
            }, context);
            var action2 = dy.CallFunc.create(function(gameObject, dataArr){
                this.name += "b";
            }, context);

            action = Spawn.create(action1, action2);
            gameObject.addComponent(action);
            action.reverse();
            action.start();
            gameObject._actionManager.update();
            gameObject._actionManager.update();

            expect(context.name).toEqual("ba");
        });
    });
});

