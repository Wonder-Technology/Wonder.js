describe("TransitionManager", function() {
    var sandbox = null;
    var TransitionManager = wd.TransitionManager;
    var ObjectName = wd.EButtonObjectName;
    var manager;
    var ui;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        ui = {
            transitionMode:null
        };

        manager = TransitionManager.create(ui);
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("getObjectTransition", function(){
        beforeEach(function(){

        });

        describe("if transition mode === SPRITE", function() {
            beforeEach(function(){
                ui.transitionMode = wd.ETransitionMode.SPRITE;
            });

            it("if transition not create, create it", function () {
                var result = manager.getObjectTransition(ObjectName.BACKGROUND);

                expect(result).toBeInstanceOf(wd.SpriteTransition);
            });
        });
    });

    describe("getObjectTarget", function(){
        beforeEach(function(){

        });

        it("get object->transition target", function(){
            var target = {c:1};
            ui.transitionMode = wd.ETransitionMode.SPRITE;

            manager.getObjectTransition(ObjectName.BACKGROUND).target = target;

            expect(manager.getObjectTarget(ObjectName.BACKGROUND)).toEqual(target);
        });
    });

    describe("changeState", function(){
        beforeEach(function(){

        });

        it("change all transition->state", function(){
            ui.transitionMode = wd.ETransitionMode.SPRITE;
            var background = manager.getObjectTransition(ObjectName.BACKGROUND);
            var text = manager.getObjectTransition(ObjectName.TEXT);
            sandbox.stub(background, "changeState");
            sandbox.stub(text, "changeState");

            manager.changeState(wd.EUIState.DISABLED);

            expect(background.changeState).toCalledWith(wd.EUIState.DISABLED);
            expect(text.changeState).toCalledWith(wd.EUIState.DISABLED);
        });
    });
});
