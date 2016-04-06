describe("Matrix3", function(){
    var Matrix3 = wd.Matrix3;
    var matrix = wd.matrix;
    var Vector3 = wd.Vector3;

    function getValues(values, digit){
        if(values){
            return testTool.getValues(values, digit);
        }

        return mathTestUtils.getValues(matrix.values, digit);
    }

    beforeEach(function(){
        matrix = new Matrix3();
    });

    describe("clone", function(){
        it("return matrix clone", function(){
            var clone = matrix.clone();

            matrix.translate(10,11);

            mathTestUtils.isMatrixEqual(clone, Matrix3.create());
        });
    });

    describe("cloneToArray", function(){
        beforeEach(function(){
        });

        it("clone value to array", function(){
            var arr = new Float32Array(10);
            arr[0] = 100;

            matrix.cloneToArray(arr, 1);

            expect(testTool.getValues(arr)).toEqual(
                [ 100, 1, 0, 0, 0, 1, 0, 0, 0, 1 ]
            );
        });
    });
});
