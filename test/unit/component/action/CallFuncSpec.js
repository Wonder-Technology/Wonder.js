describe("CallFunc", function () {
    var sandbox = null;
    var gameObject = null;
    var action = null;
    var CallFunc = wd.CallFunc;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        action = new CallFunc();
        gameObject = wd.GameObject.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("invoke function", function(){
        var context = {
            a:1
        };
        action = CallFunc.create(function(gameObject, dataArr){
                this.name = gameObject.name;
                this.a = dataArr.getChild(0) + dataArr.getChild(1);
            }, context, 3, 4);
        gameObject.name = "test";
        gameObject.addComponent(action);

        action.start();
        wd.ActionComponentContainer.getInstance().update();

        expect(context.name).toEqual("test");
        expect(context.a).toEqual(7);
    });

    describe("clone", function(){
        it("return clone one", function () {
            var func = function(){};
            var context = {};
            action = CallFunc.create(func, context);

            var a = action.clone();

            expect(a).toBeInstanceOf(CallFunc);
            expect(a !== action).toBeTruthy();

            expect(a._callFunc === func).toBeTruthy();
            expect(a._context === context).toBeTruthy();

        });
        it("deep clone the dataArr", function () {
            var data = {a: 1};
            action._dataArr = wdCb.Collection.create([data]);

            var a = action.clone();
            a._dataArr.getChildren().a = 100;

            expect(data.a).toEqual(1);
        });
    });

    describe("reverse", function(){
        it("return action directly", function () {
            expect(action.reverse()).toBeSame(action);
        });
    });
});
