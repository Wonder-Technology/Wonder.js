describe("SpriteTransition", function() {
    var sandbox = null;
    var SpriteTransition = wd.SpriteTransition;
    var State = wd.UIState;
    var transition;


    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        transition = new SpriteTransition();
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("changeState", function(){
        var normalSprite,
            hightlightSprite,
            pressedSprite,
            disabledSprite;

        beforeEach(function(){
            normalSprite = {};
            hightlightSprite = {};
            pressedSprite = {};
            disabledSprite = {};

            transition.normalSprite = normalSprite;
            transition.hightlightSprite = hightlightSprite;
            transition.pressedSprite = pressedSprite;
            transition.disabledSprite = disabledSprite;
        });

        it("set target by state", function(){
            transition.changeState(State.NORMAL);

            expect(transition.target).toEqual(normalSprite);


            transition.changeState(State.HIGHLIGHT);

            expect(transition.target).toEqual(hightlightSprite);


            transition.changeState(State.PRESSED);

            expect(transition.target).toEqual(pressedSprite);


            transition.changeState(State.DISABLED);

            expect(transition.target).toEqual(disabledSprite);
        });
    });
});

