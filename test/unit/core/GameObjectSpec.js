describe("GameObject", function() {
    var sandbox = null;
    var gameObject = null;
    var GameObject = null;
    var Vector3 = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        GameObject = dy.GameObject;
        gameObject = new GameObject();
        Vector3 = dy.Vector3;
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("sort", function(){
        it("sort children ascend by it's position.z", function(){
            var ob1 = GameObject.create();
            ob1.name = "a";
            ob1.transform.position = Vector3.create(0, 0, 10);
            var ob2 = GameObject.create();
            ob2.name = "b";
            ob2.transform.position = Vector3.create(0, 0, -1);
            var ob3 = GameObject.create();
            ob3.name = "c";
            ob3.transform.position = Vector3.create(0, 0, 5);

            gameObject._children.addChild(ob1);
            gameObject._children.addChild(ob2);
            gameObject._children.addChild(ob3);

            gameObject.sort();

            expect(gameObject.getChildren().toArray()).toEqual(
                [ob1, ob3, ob2]
            );
        });
    });

    describe("getTopUnderPoint", function(){
        //todo add Collider to test
    });
});
