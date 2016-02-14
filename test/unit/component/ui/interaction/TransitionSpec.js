describe("Transition", function() {
    var sandbox = null;
    var Transition = wd.Transition;
    var transition;


    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        transition = new Transition();
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("target", function(){
        beforeEach(function(){
        });

        describe("get transitionMode", function(){
            it("if target === null, change state to NORMAL", function(){
                transition.changeState = sandbox.stub();
                transition.target = null;

                var target = transition.target;

                expect(transition.changeState).toCalledWith(wd.EUIState.NORMAL);
            });
        });
    });
});
