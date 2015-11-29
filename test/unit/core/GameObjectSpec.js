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
                [ob2, ob3, ob1]
            );
        });
    });

    describe("findChildByUid", function(){
        it("match uid, return the first result. uid can be string/regex", function(){
            var parent = GameObject.create();
            var child1 = GameObject.create();
            child1.uid = 1;
            var child2 = GameObject.create();
            child2.uid = 2;
            var child3 = GameObject.create();
            child3.uid = 3;
            parent.addChild(child1);
            parent.addChild(child2);
            parent.addChild(child3);

            expect(parent.findChildByUid(2)).toEqual(child2);
            expect(parent.findChildByUid(3)).toEqual(child3);
        });
    });

    describe("findChildByName", function(){
        it("partial match name, return the first result. name can be string/regex", function(){
            var parent = GameObject.create();
            var child1 = GameObject.create();
            child1.name = "gogogo";
            var child2 = GameObject.create();
            child2.name = "hello";
            var child3 = GameObject.create();
            child3.name = "hello world";
            parent.addChild(child1);
            parent.addChild(child2);
            parent.addChild(child3);

            expect(parent.findChildByName("hello")).toEqual(child2);
            expect(parent.findChildByName(/go/)).toEqual(child1);
        });
    });

    describe("findChildrenByName", function(){
        it("partial match name, return the all matched results. name can be string/regex", function(){
            var parent = GameObject.create();
            var child1 = GameObject.create();
            child1.name = "hello";
            var child2 = GameObject.create();
            child2.name = "hello world";
            var child3 = GameObject.create();
            child3.name = "gogogo";
            parent.addChild(child1);
            parent.addChild(child2);
            parent.addChild(child3);

            expect(parent.findChildrenByName("hello").getChildren()).toEqual([child1, child2]);
            expect(parent.findChildrenByName(/go/).getChildren()).toEqual([child3]);
        });
    });

    describe("getTopUnderPoint", function(){
        //todo add Collider to test
    });

    describe("dispose", function(){

    });

    //todo move related SceneSpec here
});
