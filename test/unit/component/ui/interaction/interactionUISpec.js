describe("InteractionUI", function() {
    var sandbox = null;
    var InteractionUI = wd.InteractionUI;
    var ui;


    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        ui = new InteractionUI();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    //describe("transitionMode", function(){
    //    beforeEach(function(){
    //    });
    //
    //    describe("set transitionMode", function(){
    //        describe("createTransitionInstance", function(){
    //            beforeEach(function(){
    //                expect(ui.transition).toBeNull();
    //            });
    //
    //            it("if mode is SPRITE, create SpriteTransition", function(){
    //                ui.transitionMode = wd.ETransitionMode.SPRITE;
    //
    //                expect(ui.transition).toBeInstanceOf(wd.SpriteTransition);
    //            });
    //        })
    //    });
    //});
});
