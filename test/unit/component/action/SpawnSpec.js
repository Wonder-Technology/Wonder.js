describe("Spawn", function () {
    var sandbox = null;
    var gameObject = null;
    var action = null;
    var Spawn = wd.Spawn;

    beforeEach(function () {
        testTool.closeContractCheck(sandbox);

        sandbox = sinon.sandbox.create();
        action = new Spawn();
        gameObject = wd.GameObject.create();
        sandbox.stub(window.performance, "now").returns(0);
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("exec inner actions at the same time", function(){
        var x1 = null;
        var x2 = null;
        var tween1 = wd.Tween.create();
        tween1.from({x:0}).to({x: 10}, 100)
            .easing( wd.Tween.Easing.Linear.None)
            .onUpdate(function(){
                x1 = this.x;
            });
        var tween2 = wd.Tween.create();
        tween2.from({x:0}).to({x: -4}, 40)
            .easing( wd.Tween.Easing.Linear.None)
            .onUpdate(function(){
                x2 = this.x;
            });

        action = Spawn.create(
            tween1,
            tween2
        );
        gameObject.addComponent(action);

        action.start();
        testTool.updateAction(10, gameObject);
        expect(x1).toEqual(1);
        expect(x2).toEqual(-1);
        testTool.updateAction(40, gameObject);
        expect(tween2.isFinish).toBeTruthy();
        expect(x1).toEqual(4);
        expect(x2).toEqual(-4);
        testTool.updateAction(100, gameObject);
        expect(tween1.isFinish).toBeTruthy();
        expect(x1).toEqual(10);
        expect(x2).toEqual(-4);
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
            action = Spawn.create(fakeAction1, fakeAction2);
            var a = action.clone();

            expect(a).toBeInstanceOf(Spawn);
            expect(a === action).toBeFalsy();
            expect(a.getInnerActions().getChildren()).toEqual([copy1, copy2]);
        });
    });

    describe("start,stop", function(){
        it("when start agian after stop, it will restart the action", function () {
            var x1 = null;
            var x2 = null;
            var tween1 = wd.Tween.create();
            tween1.from({x:0}).to({x: 10}, 100)
                .easing( wd.Tween.Easing.Linear.None)
                .onUpdate(function(){
                    x1 = this.x;
                });
            var tween2 = wd.Tween.create();
            tween2.from({x:0}).to({x: -4}, 40)
                .easing( wd.Tween.Easing.Linear.None)
                .onUpdate(function(){
                    x2 = this.x;
                });

            action = Spawn.create(
                tween1,
                tween2
            );
            gameObject.addComponent(action);

            action.start();
            testTool.updateAction(10, gameObject);
            expect(x1).toEqual(1);
            expect(x2).toEqual(-1);

            action.stop();
            testTool.updateAction(40, gameObject);
            expect(tween2.isFinish).toBeFalsy();
            expect(x1).toEqual(1);
            expect(x2).toEqual(-1);


            action.start();
            testTool.updateAction(80, gameObject);
            expect(x1).toEqual(4);
            expect(x2).toEqual(-4);
            expect(tween2.isFinish).toBeTruthy();

            action.stop();
            testTool.updateAction(130, gameObject);
            expect(tween1.isFinish).toBeFalsy();
            expect(x1).toEqual(4);
            expect(x2).toEqual(-4);


            action.start();
            testTool.updateAction(230, gameObject);
            expect(x1).toEqual(10);
            expect(x2).toEqual(-4);
            expect(tween1.isFinish).toBeTruthy();
        });
    });

    describe("pause,resume", function(){
        it("can pause action and continue action", function () {
            var x1 = null;
            var x2 = null;
            var tween1 = wd.Tween.create();
            tween1.from({x:0}).to({x: 10}, 100)
                .easing( wd.Tween.Easing.Linear.None)
                .onUpdate(function(){
                    x1 = this.x;
                });
            var tween2 = wd.Tween.create();
            tween2.from({x:0}).to({x: -4}, 40)
                .easing( wd.Tween.Easing.Linear.None)
                .onUpdate(function(){
                    x2 = this.x;
                });

            action = Spawn.create(
                tween1,
                tween2
            );
            gameObject.addComponent(action);

            action.start();
            testTool.updateAction(10, gameObject);
            expect(x1).toEqual(1);
            expect(x2).toEqual(-1);

            action.pause();
            testTool.updateAction(40, gameObject);
            expect(tween2.isFinish).toBeFalsy();
            expect(x1).toEqual(1);
            expect(x2).toEqual(-1);
            action.resume();


            testTool.updateAction(70, gameObject);
            expect(x1).toEqual(4);
            expect(x2).toEqual(-4);
            expect(tween2.isFinish).toBeTruthy();

            testTool.updateAction(100, gameObject);
            expect(x1).toEqual(7);
            expect(x2).toEqual(-4);
            expect(tween1.isFinish).toBeFalsy();

            testTool.updateAction(130, gameObject);
            expect(x1).toEqual(10);
            expect(x2).toEqual(-4);
            expect(tween1.isFinish).toBeTruthy();
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

            action = Spawn.create(action1, action2);
            gameObject.addComponent(action);
            action.reverse();
            action.start();
            wd.ActionEngine.getInstance().update();
            wd.ActionEngine.getInstance().update();

            expect(context.name).toEqual("ba");
        });
    });
});

