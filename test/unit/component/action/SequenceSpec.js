describe("Sequence", function () {
    var sandbox = null;
    var gameObject = null;
    var action = null;
    var Sequence = dy.Sequence;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        action = new Sequence();
        gameObject = dy.GameObject.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("exec inner actions in order", function(){
        sandbox.stub(window.performance, "now").returns(0);
        var action1 = dy.DelayTime.create(100);
        var context = {
            a:1
        };
        gameObject.name = "test";
        var action2 = dy.CallFunc.create(function(gameObject, dataArr){
                    this.name = gameObject.name;
                    this.a = dataArr.getChild(0) + dataArr.getChild(1);
                }, context, 3, 4);
        var x = null;
        var tween = dy.Tween.create();
        tween.from({x:0}).to({x: 4}, 100)
            .easing( dy.Tween.Easing.Linear.None)
            .onUpdate(function(){
                x = this.x;
            });

        action = Sequence.create(
            action1,
            action2,
            tween
        );
        gameObject.addComponent(action);

        action.start();
        gameObject._actionManager.update(50);
        expect(action1.isFinish).toBeFalsy();
        gameObject._actionManager.update(150);
        expect(action1.isFinish).toBeTruthy();
        gameObject._actionManager.update(200);
        expect(action2.isFinish).toBeTruthy();
        expect(context).toEqual({
            name:"test",
            a:7
        });
        window.performance.now.returns(200);
        gameObject._actionManager.update(250);
        expect(x).toEqual(2);
        gameObject._actionManager.update(300);
        expect(x).toEqual(4);
        expect(tween.isFinish).toBeTruthy();
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
            action = Sequence.create(fakeAction1, fakeAction2);
            var a = action.copy();

            expect(a).toBeInstanceOf(Sequence);
            expect(a === action).toBeFalsy();
            expect(a.getInnerActions().getChildren()).toEqual([copy1, copy2]);
        });
    });

    describe("start,stop", function(){
        it("when start agian after stop, it will restart the action", function () {
            sandbox.stub(window.performance, "now").returns(0);

            var action1 = dy.DelayTime.create(100);
            var x = null;
            var tween = dy.Tween.create();
            tween.from({x:0}).to({x: 4}, 100)
                .easing( dy.Tween.Easing.Linear.None)
                .onUpdate(function(){
                    x = this.x;
                });

            action = Sequence.create(
                action1,
                tween
            );
            gameObject.addComponent(action);

            action.start();
            gameObject._actionManager.update(50);
            action.stop();
            gameObject._actionManager.update(150);
            expect(action1.isFinish).toBeFalsy();

            window.performance.now.returns(150);
            action.start();
            gameObject._actionManager.update(250);
            expect(action1.isFinish).toBeTruthy();

            gameObject._actionManager.update(300);
            expect(tween.isFinish).toBeTruthy();
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

            action = Sequence.create(action1, action2);
            gameObject.addComponent(action);
            action.reverse();
            action.start();
            gameObject._actionManager.update();
            gameObject._actionManager.update();

            expect(context.name).toEqual("ba");
        });
    });

    describe("reset", function(){
        it("test", function(){
            //todo
        });
    });
});

