describe("SpriteTransition", function() {
    var sandbox = null;
    var SpriteTransition = wd.SpriteTransition;
    var State = wd.EUIState;
    var transition;


    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        transition = new SpriteTransition();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("changeState", function(){
        var normalSprite,
            highlightSprite,
            pressedSprite,
            disabledSprite;

        beforeEach(function(){
            normalSprite = {};
            highlightSprite = {};
            pressedSprite = {};
            disabledSprite = {};

            transition.normalSprite = normalSprite;
            transition.highlightSprite = highlightSprite;
            transition.pressedSprite = pressedSprite;
            transition.disabledSprite = disabledSprite;
        });

        it("set target by state", function(){
            transition.changeState(State.NORMAL);

            expect(transition.target).toEqual(normalSprite);


            transition.changeState(State.HIGHLIGHT);

            expect(transition.target).toEqual(highlightSprite);


            transition.changeState(State.PRESSED);

            expect(transition.target).toEqual(pressedSprite);


            transition.changeState(State.DISABLED);

            expect(transition.target).toEqual(disabledSprite);
        });
    });
});

