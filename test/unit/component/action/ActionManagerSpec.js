describe("ActionManager", function () {
    var sandbox = null;
    var manager = null;
    var gameObject = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        gameObject = wd.GameObject.create();

        manager = wd.ActionManager.create();
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

            gameObject.update(1);
            gameObject.update(2);

            manager = gameObject.actionManager;
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

            it("remove from ActionManager", function(){
                expect(manager.hasChild(action)).toBeFalsy();
            });
            it("remove from GameObject->components", function(){
                expect(gameObject.hasComponent(action)).toBeFalsy();
            });
        });

        it("if remove other action of children when invoke 'child.update', it will error in iteration after", function(){
            var action1 = wd.RepeatForever.create(wd.CallFunc.create(function(){}));

            var action2 = wd.CallFunc.create(function(){ });
            prepare([action1, action2]);

            expect(manager.hasChild(action1)).toBeTruthy();
            expect(manager.hasChild(action2)).toBeFalsy();
        });
    });
});

