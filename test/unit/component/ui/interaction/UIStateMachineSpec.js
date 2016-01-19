describe("UIStateMachine", function() {
    var sandbox = null;
    var Machine = wd.UIStateMachine;
    var State = wd.UIState;
    var machine;
    var director;
    var ui;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        director = wd.Director.getInstance();

        ui = {
            dirty:false,
            transitionManager:{
                changeState:sandbox.stub()
            }
        };

        machine = Machine.create(ui);
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("changeState", function(){
        beforeEach(function(){
            machine.changeState(State.HIGHLIGHT);
        });

        it("add to history", function(){
            expect(machine.getCurrentState()).toEqual(State.HIGHLIGHT);
        });
        it("change transition state", function(){
            expect(ui.transitionManager.changeState).toCalledWith(State.HIGHLIGHT);
        });
        it("set ui component dirty", function(){
            expect(ui.dirty).toBeTruthy();
        });
    });

    describe("backState", function(){
        it("if history not has last state, last state will be NORMAL", function(){
            machine.backState();

            expect(machine.getCurrentState()).toEqual(State.NORMAL);
        });

        describe("else", function(){
            beforeEach(function(){
                machine.changeState(State.PRESSED);
                machine.changeState(State.DISABLED);
                machine.backState();
            });

            it("history back to last state", function(){
                expect(machine.getCurrentState()).toEqual(State.PRESSED);
            });
            it("back transition state", function () {
                expect(ui.transitionManager.changeState).toCalledWith(State.PRESSED);
            });
            it("set ui component dirty", function () {
                expect(ui.dirty).toBeTruthy();
            });
        });
    });

    describe("getCurrentState", function(){
        beforeEach(function(){

        });

        it("return history top state", function(){
            machine.changeState(State.PRESSED);

            expect(machine.getCurrentState()).toEqual(State.PRESSED);
        });
        it("if history is empty, return NORMAL", function () {
            expect(machine.getCurrentState()).toEqual(State.NORMAL);
        });

    });
});
