describe("matrix", function(){
    var matrix = null;

    function createIdentityMat(){
        //return matrix.setIdentity([]);
    }
    function getValues(){
        return matrix.getValues_forTest();
    }

    beforeEach(function(){
        matrix = Math3D.Matrix.create();
    });

    //describe("createMatrix", function(){
    //    it("创建Float32Array数组", function(){
    //        expect(matrix.createMatrix()).toBeInstanceOf(Float32Array);
    //        expect(matrix.createMatrix().length).toEqual(16);
    //    });
    //});

    describe("setIdentity", function(){
        it("设置为单元矩阵", function(){
            //var mat = createIdentityMat();
            matrix.setIdentity();

            expect(getValues()).toEqual( [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ]);
        });
    });

    describe("setTranslate", function(){
        it("设置平移矩阵", function(){
            matrix.setTranslate(10, 20, 30);

            expect(getValues()).toEqual(
                [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 10, 20, 30, 1 ]
            );
        });
    });

    describe("translate", function(){
        it("平移 ", function(){
            matrix.setIdentity();

            matrix.translate(10, 20, 30);

            expect(getValues()).toEqual(
                [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 10, 20, 30, 1 ]
            );
        });
    });

//    describe("scale", function(){
//        it("缩放矩阵", function(){
//            var mat = createIdentityMat();
//            var dest = createIdentityMat();
//
//            matrix.scale(mat, 10, 20, 30, dest);
//
//            expect(dest).toEqual(
//                [ 10, 0, 0, 0, 0, 20, 0, 0, 0, 0, 30, 0, 0, 0, 0, 1 ]
//            );
//        });
//    });
//
    describe("setRotate", function(){
        var cos = null,
            sin = null,
            angle = 45;

        beforeEach(function(){
            cos = Math.cos(Math.toFixed(7).PI / 4);
            sin = Math.sin(Math.toFixed(7).PI / 4);
        });

        describe("绕坐标轴旋转", function(){
            it("绕x轴旋转", function(){
                matrix.setRotate(angle, 1, 0, 0);

                expect(getValues()).toEqual(
                    [1, 0, 0, 0,
                        0, cos, sin, 0,
                        0, -sin, cos, 0,
                        0, 0, 0, 1]
                );
            });
            it("绕y轴旋转", function(){
                matrix.setRotate(angle, 0, 1, 0);

                expect(getValues()).toEqual(
                    [cos, 0, -sin, 0,
                        0, 1, 0, 0,
                        sin, 0, cos, 0,
                        0, 0, 0, 1]
                );
            });
            it("绕z轴旋转", function(){
                matrix.setRotate(angle, 0, 0, 1);

                expect(getValues()).toEqual(
                    [cos, sin, 0, 0,
                        -sin, cos, 0, 0,
                        0, 0, 1, 0,
                        0, 0, 0, 1]
                );
            });
        });
        it("绕任意轴旋转", function(){
            var nx = 1,
                ny = -2,
                nz = 3;

            matrix.setRotate(angle, nx, ny, nz);

            expect(getValues()).toEqual(
                [nx * nx * (1 - cos) + cos, nx * ny * (1 - cos) + nz * sin, nx * nz * (1 - cos) - ny * sin, 0,
                    nx * ny * (1 - cos) - nz * sin, ny * ny * (1 - cos) + cos, ny * nz * (1 - cos) + nx * sin, 0,
                    nx * nz * (1 - cos) + ny * sin, ny * nz * (1 - cos) - nx * sin, nz * nz * (1 - cos) + cos, 0,
                    0, 0, 0, 1
                ]
            );
        });
    });
//
//    describe("lookAt", function(){
//        it("根据视点、观察点、up向量，给出视图矩阵", function(){
//var eye = [1, 2, 1],
//    center = [1, 2, -1],
//    up = [0, 1, 0];
//            var dest = createIdentityMat();
//
//            matrix.lookAt(eye[0], eye[1], eye[2], center[0], center[1], center[2], up[0], up[1], up[2], dest);
//
//            expect(dest).toEqual(
//                [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -1, -2, -1, 1 ]
//            );
//        });
//    });
//
//    describe("ortho", function(){
//        it("根据近裁剪平面距离和远裁剪平面距离，给出正交投影矩阵", function(){
//            var n = 0.1,
//                f = 10;
//            var dest = createIdentityMat();
//
//            matrix.ortho(n, f, dest);
//
//            expect(dest).toEqual(
//                [1, 0, 0, 0,
//                0, 1, 0, 0,
//                0, 0, 2 / (n - f), 0,
//                0, 0, (n + f) / (n - f), 1]
//            )
//        })
//
//    });
//
//    describe("perspective", function(){
//        it("根据近裁剪平面距离和远裁剪平面距离，给出正交投影矩阵", function(){
//            var n = 0.1,
//                f = 10;
//            var dest = createIdentityMat();
//
//            matrix.ortho(n, f, dest);
//
//            expect(dest).toEqual(
//                [1, 0, 0, 0,
//                    0, 1, 0, 0,
//                    0, 0, 2 / (n - f), 0,
//                    0, 0, (n + f) / (n - f), 1]
//            )
//        })
//
//    });


    describe("集成测试", function(){

    });
});
