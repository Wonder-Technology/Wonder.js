describe("CallFunc", function () {
    var sandbox = null;
    var gameObject = null;
    var action = null;
    var CallFunc = dy.CallFunc;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        action = new CallFunc();
        gameObject = dy.GameObject.create();
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
        gameObject.actionManager.update();

        expect(context.name).toEqual("test");
        expect(context.a).toEqual(7);
    });

    describe("copy", function(){
        it("return copy one", function () {
            var a = action.copy();

            expect(a).toBeInstanceOf(CallFunc);
            expect(a === action).toBeFalsy();

        });
        it("deep copy the dataArr", function () {
            var data = {a: 1};
            action._dataArr = dyCb.Collection.create([data]);

            var a = action.copy();
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
