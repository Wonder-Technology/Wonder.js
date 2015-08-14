describe("Tween", function () {
    var sandbox = null;
    var gameObject = null;
    var action = null;
    var Tween = dy.Tween;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        action = Tween.create();
        gameObject = dy.GameObject.create();
        sandbox.stub(window.performance, "now").returns(0);
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("from,to, onUpdate,onFinish,onStart,onStop, start,stop", function(){
        it("test", function(){
            var startCount = 0;
            var stopCount = 0;
            var finishCount = 0;
            var x,y;
            action.from({x:0, y:0}).to({x: 4, y:10}, 100)
                .easing( dy.Tween.Easing.Linear.None)
                .onStart(function(){
                    startCount++;
                })
                .onStop(function(){
                    stopCount++;
                })
                .onFinish(function(){
                    finishCount++;
                })
                .onUpdate(function(){
                    x = this.x;
                    y = this.y;
                });

            gameObject.addComponent(action);

            action.start();
            expect(startCount).toEqual(0);

            gameObject._actionManager.update(1);
            expect(startCount).toEqual(1);

            gameObject._actionManager.update(50);
            expect(x).toEqual(2);
            expect(y).toEqual(5);

            action.stop();
            expect(stopCount).toEqual(1);

            gameObject._actionManager.update(100);
            expect(x).toEqual(2);
            expect(y).toEqual(5);
            expect(action.isFinish).toBeFalsy();

            window.performance.now.returns(100);
            action.start();
            expect(startCount).toEqual(1);

            gameObject._actionManager.update(101);
            expect(startCount).toEqual(2);

            gameObject._actionManager.update(125);
            expect(x).toEqual(1);
            expect(y).toEqual(2.5);

            gameObject._actionManager.update(200);
            expect(x).toEqual(4);
            expect(y).toEqual(10);
            expect(action.isFinish).toBeTruthy();
            expect(finishCount).toEqual(1);
        });
    });

    describe("easing", function(){
        it("the function which computes the value in the progress", function(){
            var x;
            action.from({x:0}).to({x: 1}, 100)
                .easing( Tween.Easing.Quadratic.In )
                .onUpdate(function(){
                    x = this.x;
                });
            gameObject.addComponent(action);

            action.start();
            gameObject._actionManager.update(50);

            expect(x).toEqual(Tween.Easing.Quadratic.In(0.5));
        });
    });

    describe("interpolation", function(){
        it("when the tween has just started (progress is 0), the interpolation function will return the first value in the array. " +
            "When the tween is halfway, the interpolation function will return a value approximately in the middle of the array," +
            " and when the tween is at the end, the interpolation function will return the last value", function () {
            var x;
            action.from({x:0}).to({x: [0, 50, 100]}, 100)
                .easing( Tween.Easing.Linear.None)
                .interpolation( Tween.Interpolation.Linear )
                .onUpdate(function(){
                    x = this.x;
                });
            gameObject.addComponent(action);

            action.start();
            gameObject._actionManager.update(0);
            expect(x).toEqual(0);

            gameObject._actionManager.update(50);
            expect(x).toEqual(25);

            gameObject._actionManager.update(100);
            expect(x).toEqual(100);
            expect(action.isFinish).toBeTruthy();
        });
    });
    
    describe("copy", function(){
        it("return copy one, copy inner action", function () {
            var onStart = onStop = onFinish = onUpdate = function(){};
            action.from({x:0}).to({x: [0, 50, 100]}, 100)
                .easing( dy.Tween.Easing.Linear.None)
                .interpolation( Tween.Interpolation.Linear )
                .onStart(onStart)
                .onStop(onStop)
                .onFinish(onFinish)
                .onUpdate(onUpdate);

            var a = action.copy();

            expect(a).toBeInstanceOf(Tween);
            expect(a === action).toBeFalsy();
            expect(a._valuesStart.getChildren()).toEqual({x:0});
            expect(a._valuesEnd.getChildren()).toEqual(
                {x: [0, 50, 100]}
            );
            expect(a._duration).toEqual(100);
            expect(a._onStartCallback).toEqual(action._onStartCallback);
            expect(a._onStopCallback).toEqual(action._onStopCallback);
            expect(a._onUpdateCallback).toEqual(action._onUpdateCallback);
            expect(a._onFinishCallback).toEqual(action._onFinishCallback);
        });
    });
    
    describe("reverse", function(){
        it("reverse from and to", function(){
            var x,y;
            action.from({x:0, y:0}).to({x: 4, y:10}, 100)
                .easing( dy.Tween.Easing.Linear.None)
                .onUpdate(function(){
                    x = this.x;
                    y = this.y;
                });

            gameObject.addComponent(action);
            action.reverse();
            action.start();

            gameObject._actionManager.update(10);
            expect(x).toEqual(3.6);
            expect(y).toEqual(9);

            gameObject._actionManager.update(100);
            expect(x).toEqual(0);
            expect(y).toEqual(0);
        });
    });
});
