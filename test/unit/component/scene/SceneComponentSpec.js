describe("SceneComponent", function() {
    var sandbox = null;
    var Scene;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Scene = wd.SceneComponent;
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("addToObject", function(){
        beforeEach(function(){
        });

        it("the sub class->addToObject should trigger the check:should add to GameObjectScene", function(){
            testTool.openContractCheck(sandbox);

            function Sub(){
            }

            YYC.Tool.extend.inherit(Sub, Scene);

            var s = new Sub();

            expect(function(){
                var gameObject = wd.GameObject.create();

                s.addToObject(gameObject);
            }).toThrow();
            expect(function(){
                s.addToObject(wd.Director.getInstance().scene.gameObjectScene);
            }).not.toThrow();
        });
    });

    describe("clone", function(){
        beforeEach(function(){

        });

        it("not support clone", function(){
            expect(function(){
                new Scene().clone();
            }).toThrow();
        });
    });
});

