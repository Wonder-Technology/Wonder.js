describe("ColorTransition", function() {
    var sandbox = null;
    var ColorTransition = wd.ColorTransition;
    var State = wd.UIState;
    var transition;


    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        transition = new ColorTransition();
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("changeState", function(){
        var normalColor,
            highlightColor,
            pressedColor,
            disabledColor;

        beforeEach(function(){
            normalColor = {};
            highlightColor = {};
            pressedColor = {};
            disabledColor = {};

            transition.normalColor = normalColor;
            transition.highlightColor = highlightColor;
            transition.pressedColor = pressedColor;
            transition.disabledColor = disabledColor;
        });

        it("set target by state", function(){
            transition.changeState(State.NORMAL);

            expect(transition.target).toEqual(normalColor);


            transition.changeState(State.HIGHLIGHT);

            expect(transition.target).toEqual(highlightColor);


            transition.changeState(State.PRESSED);

            expect(transition.target).toEqual(pressedColor);


            transition.changeState(State.DISABLED);

            expect(transition.target).toEqual(disabledColor);
        });
    });
});

