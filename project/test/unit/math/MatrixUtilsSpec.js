describe("MatrixUtils", function(){
    var MatrixUtils = Engine3D.Math.MatrixUtils;
    var Matrix= Engine3D.Math.Matrix;
    var Vector4= Engine3D.Math.Vector4;

    beforeEach(function(){
    });

describe("multiply", function(){
    it("matrix * matrix", function(){
        var mat1 = Matrix.create();
        var mat2 = Matrix.create();
        mat1.setTranslate(1,2,3);
        mat2.setTranslate(2,3,4);

        var result = MatrixUtils.multiply(mat1, mat2);

        mathMatcher.isMatrixEqual(result, Matrix.create(new Float32Array([
            1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 3, 5, 7, 1
        ])));
    });
});

    describe("multiplyVector4", function(){
        it("matrix * vector4", function(){
            var mat1 = Matrix.create();
            var vec = Vector4.create(2,3,4, 5);
            mat1.setTranslate(1,2,3);

            var result = MatrixUtils.multiplyVector4(mat1, vec);

            mathMatcher.isMatrixEqual(result, Matrix.create(new Float32Array([
                7, 13, 19, 5
            ])));
        });
    });
});