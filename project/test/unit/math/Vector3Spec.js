describe("Vector3", function(){
    var vec = null;
    var sandbox = null;
    var Vector3 = Engine3D.Math.Vector3;

    beforeEach(function(){
        vec = new Vector3(1,2,3);
        sandbox = sinon.sandbox.create();
    });

    describe("normalize", function(){
        it("normalize values", function(){
            vec.normalize();

            expect(mathMatcher.getValues(vec.values)).toEqual(
                [0.2672612, 0.5345225, 0.8017837]
            );
        });
    });

    describe("toVec4", function(){
        it("convert to vector4", function(){
            var result = vec.toVec4();

            expect(mathMatcher.getValues(result.values)).toEqual(
                [1, 2, 3, 1 ]
            );
        });
    });
});