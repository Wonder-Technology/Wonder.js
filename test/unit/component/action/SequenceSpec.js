describe("Sequence", function () {
    var sandbox = null;
    var gameObject = null;
    var action = null;
    var Sequence = wd.Sequence;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        action = new Sequence();
        gameObject = wd.GameObject.create();
        sandbox.stub(window.performance, "now").returns(0);
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("exec inner actions in order", function(){
        var action1 = wd.DelayTime.create(100);
        var context = {
            a:1
        };
        gameObject.name = "test";
        var action2 = wd.CallFunc.create(function(gameObject, dataArr){
                    this.name = gameObject.name;
                    this.a = dataArr.getChild(0) + dataArr.getChild(1);
                }, context, 3, 4);
        action2.target = gameObject;
        var x = null;
        var tween = wd.Tween.create();
        tween.from({x:0}).to({x: 4}, 100)
            .easing( wd.Tween.Easing.Linear.None)
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
        testTool.updateAction(50, gameObject);
        expect(action1.isFinish).toBeFalsy();
        testTool.updateAction(150, gameObject);
        expect(action1.isFinish).toBeTruthy();
        testTool.updateAction(200, gameObject);
        expect(action2.isFinish).toBeTruthy();
        expect(context).toEqual({
            name:"test",
            a:7
        });

        testTool.updateAction(250, gameObject);
        expect(x).toEqual(2);
        testTool.updateAction(300, gameObject);
        expect(x).toEqual(4);
        expect(tween.isFinish).toBeTruthy();
        expect(action.isFinish).toBeTruthy();
    });

    describe("clone", function(){
        it("return clone one, clone inner action", function () {
            var copy1 = {},
                copy2 = {a:1};
            var fakeAction1 = {
                    clone:sandbox.stub().returns(copy1)
                },
                fakeAction2 = {
                    clone:sandbox.stub().returns(copy2)
                };
            action = Sequence.create(fakeAction1, fakeAction2);
            var a = action.clone();

            expect(a).toBeInstanceOf(Sequence);
            expect(a === action).toBeFalsy();
            expect(a.getInnerActions().getChildren()).toEqual([copy1, copy2]);
        });
    });

    describe("start,stop", function(){
        it("when start agian after stop, it will restart the action", function () {
            var action1 = wd.DelayTime.create(100);
            var x = null;
            var tween = wd.Tween.create();
            tween.from({x:0}).to({x: 4}, 100)
                .easing( wd.Tween.Easing.Linear.None)
                .onUpdate(function(){
                    x = this.x;
                });

            action = Sequence.create(
                action1,
                tween
            );
            gameObject.addComponent(action);

            action.start();
            testTool.updateAction(50, gameObject);
            action.stop();

            testTool.updateAction(150, gameObject);
            expect(action1.isFinish).toBeFalsy();
            action.start();

            testTool.updateAction(250, gameObject);
            expect(action1.isFinish).toBeTruthy();

            testTool.updateAction(350, gameObject);
            expect(tween.isFinish).toBeTruthy();
        });
    });

    describe("pause,resume", function(){
        it("can pause and continue action", function () {
            var action1 = wd.DelayTime.create(100);
            var x = null;
            var tween = wd.Tween.create();
            tween.from({x:0}).to({x: 4}, 100)
                .easing( wd.Tween.Easing.Linear.None)
                .onUpdate(function(){
                    x = this.x;
                });

            action = Sequence.create(
                action1,
                tween
            );
            gameObject.addComponent(action);

            action.start();
            testTool.updateAction(50, gameObject);

            action.pause();

            testTool.updateAction(150, gameObject);
            expect(action1.isFinish).toBeFalsy();

            action.resume();

            testTool.updateAction(200, gameObject);
            expect(action1.isFinish).toBeTruthy();


            testTool.updateAction(250, gameObject);
            expect(tween.isFinish).toBeFalsy();
            expect(x).toEqual(2);

            testTool.updateAction(300, gameObject);
            expect(x).toEqual(4);
            expect(tween.isFinish).toBeTruthy();
            expect(action.isFinish).toBeTruthy();
        });
    });

    describe("reverse", function(){
        it("reverse action order", function(){
            var context = {
                name:""
            };
            var action1 = wd.CallFunc.create(function(gameObject, dataArr){
                this.name += "a";
            }, context);
            var action2 = wd.CallFunc.create(function(gameObject, dataArr){
                this.name += "b";
            }, context);

            action = Sequence.create(action1, action2);
            gameObject.addComponent(action);
            action.reverse();
            action.start();
            testTool.updateAction(0, gameObject);
            testTool.updateAction(0, gameObject);

            expect(context.name).toEqual("ba");
        });
    });

    describe("reset", function(){
        it("test", function(){
            //todo
        });
    });
});

