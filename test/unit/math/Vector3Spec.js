describe("Vector3", function(){
    var vec = null;
    var sandbox = null;
    var Vector3 = wd.Vector3;

    beforeEach(function(){
        vec = new Vector3(1,2,3);
        sandbox = sinon.sandbox.create();
    });

    describe("normalize", function(){
        it("normalize values", function(){
            vec.normalize();

            expect(mathTestUtils.getValues(vec.values)).toEqual(
                [0.2672612, 0.5345225, 0.8017837]
            );
        });
    });

    describe("toVector4", function(){
        it("convert to vector4", function(){
            var result = vec.toVector4();

            expect(mathTestUtils.getValues(result.values)).toEqual(
                [1, 2, 3, 1 ]
            );
        });
    });

    describe("cross", function(){
        it("Returns the result of a cross product operation performed on the two specified 3-dimensional vectors", function(){
            expect(Vector3.create().cross(Vector3.right, Vector3.up)).toEqual(Vector3.forward);
        });
    });

    describe("lerp", function(){
        it("Returns the result of a linear interpolation between two specified 3-dimensional vectors", function(){
            var a = Vector3.create(0, 0, 0);
            var b = Vector3.create(10, 10, 10);

            expect(Vector3.create().lerp(a, b, 0)).toEqual(a);
            expect(Vector3.create().lerp(a, b, 0.5)).toEqual(Vector3.create(5, 5, 5));
            expect(Vector3.create().lerp(a, b, 1)).toEqual(b);
        });
    });
});