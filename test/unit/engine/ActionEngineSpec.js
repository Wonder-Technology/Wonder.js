describe("ActionComponentContainer", function () {
    var sandbox = null;
    var Engine = null;
    var gameObject = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        gameObject = wd.GameObject.create();

        Engine = wd.ActionComponentContainer.getInstance();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("update", function(){
        function prepare(actionArr){
            for(var i = 0, len = actionArr.length; i < len; i++){
                gameObject.addComponent(actionArr[i]);
            }

            gameObject.init();

            Engine.update(1);
            Engine.update(2);
        }

        beforeEach(function(){

        });

        describe("if child finish", function(){
            var action;

            beforeEach(function(){
                action = wd.CallFunc.create(function(){
                });
                prepare([action]);
            });

            it("remove from ActionComponentContainer", function(){
                expect(Engine.hasChild(action)).toBeFalsy();
            });
            it("remove from GameObject->components", function(){
                expect(gameObject.hasComponent(action)).toBeFalsy();
            });
        });

        it("if remove other action of children when invoke 'child.update', it will error in iteration after", function(){
            var action1 = wd.RepeatForever.create(wd.CallFunc.create(function(){}));

            var action2 = wd.CallFunc.create(function(){ });
            prepare([action1, action2]);

            expect(Engine.hasChild(action1)).toBeTruthy();
            expect(Engine.hasChild(action2)).toBeFalsy();
        });
    });
});

