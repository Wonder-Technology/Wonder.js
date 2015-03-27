describe("matrix", function(){
    var matrix = null;

    function getValues(values){
        if(values){
            return Helper.Tool.getValues_forTest(values);
        }
        return Helper.Tool.getValues_forTest(matrix.values);
    }

    function toFixed(num){
        return YYC.Tool.math.toFixed(num, 7);
    }

    beforeEach(function(){
        matrix = Math3D.Matrix.create();
    });

    describe("push", function(){
        it("保存当前值到队列中", function(){
            matrix.translate(1,2,3);

            matrix.push(matrix.values);

            expect(matrix._matrixArr.length).toEqual(1);
            expect(getValues(matrix._matrixArr[0])).toEqual(
                [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1 ]
            )
        })
    });

    describe("pop", function(){
        it("从队列中取出第一个，设置为当前值", function(){
            matrix.translate(1,2,3);
            matrix.push(matrix.values);
            matrix.translate(1,0,0);

            matrix.pop();

            expect(matrix._matrixArr.length).toEqual(0);
            expect(getValues()).toEqual(
                [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1 ]
            )
        })
    });
    describe("setIdentity", function(){
        it("设置为单元矩阵", function(){
            matrix.setIdentity();

            expect(getValues()).toEqual( [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ]);
        });
    });

    describe("setInverseOf", function(){
        it("设置为逆矩阵", function(){
            var mat = Math3D.Matrix.create();
            mat.values = new Float32Array([
                0, 0, 1, 1,
                0, 0, -2, 1,
                5, 2, 0, 0,
                2, 1, 0, 0
            ]);

            matrix.setInverseOf(mat);

            expect(getValues()).toEqual(
                [0, 0, 1, -2, 0, 0, -2, 5, 0.3333333, -0.3333333, 0, 0, 0.6666667, 0.3333333, 0, 0 ]
            )
        });
    });

    describe("transpose", function(){
        it("对自身进行转置", function(){
            matrix.values = new Float32Array([
                1,1,1,1,
                2, 3, 4, 5,
                0, 1, 1, 2,
                0, 3, 4, 4
            ]);

            matrix.transpose();

            expect(getValues()).toEqual(
                [1,2,0,0, 1,3,1,3, 1,4,1,4, 1,5,2,4]
            );
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

    //describe("translate", function(){
    //    it("平移 ", function(){
    //        matrix.setIdentity();
    //
    //        matrix.translate(10, 20, 30);
    //
    //        expect(getValues()).toEqual(
    //            [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 10, 20, 30, 1 ]
    //        );
    //    });
    //});

    describe("setScale", function(){
        it("设置缩放矩阵", function(){
            matrix.setScale(10, 20, 30);

            expect(getValues()).toEqual(
                [ 10, 0, 0, 0, 0, 20, 0, 0, 0, 0, 30, 0, 0, 0, 0, 1 ]
            );
        });
    });

    describe("setRotate", function(){
        var cos = null,
            sin = null,
            angle = 45;

        beforeEach(function(){
            cos = toFixed(Math.cos(Math.PI / 4));
            sin = toFixed(Math.sin(Math.PI / 4));
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
                //[nx * nx * (1 - cos) + cos, nx * ny * (1 - cos) + nz * sin, nx * nz * (1 - cos) - ny * sin, 0,
                //    nx * ny * (1 - cos) - nz * sin, ny * ny * (1 - cos) + cos, ny * nz * (1 - cos) + nx * sin, 0,
                //    nx * nz * (1 - cos) + ny * sin, ny * nz * (1 - cos) - nx * sin, nz * nz * (1 - cos) + cos, 0,
                //    0, 0, 0, 1
                //]
                [ 0.7280277, 0.5251048, 0.4407273, 0, -0.6087886, 0.7907906, 0.0634566, 0, -0.3152016, -0.3145079, 0.8953953, 0, 0, 0, 0, 1 ]
            );
        });
    });

    describe("setLookAt", function(){
        it("根据视点、观察点、up向量，给出视图矩阵", function(){
            var eye = [1, 2, 1],
                center = [1, 2, -1],
                up = [0, 1, 0];

            matrix.setLookAt(eye[0], eye[1], eye[2], center[0], center[1], center[2], up[0], up[1], up[2]);

            expect(getValues()).toEqual(
                [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -1, -2, -1, 1 ]
            );
        });
    });

    describe("setOrtho", function(){
        it("根据近裁剪平面距离和远裁剪平面距离，给出正交投影矩阵", function(){
            var n = 0.1,
                f = 10;

            matrix.setOrtho(n, f);

            expect(getValues()).toEqual(
                [1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, toFixed(2 / (n - f)), 0,
                0, 0, toFixed((n + f) / (n - f)), 1]
            )
        })

    });

    describe("setPerspective", function(){
        it("根据近裁剪平面距离和远裁剪平面距离，给出正交投影矩阵", function(){
            var near = 0.1,
                far = 10;
            var fovy_angle = 30;  //垂直视角
            var aspect = 100 / 50;  //宽/高

            matrix.setPerspective(fovy_angle, aspect, near, far);
            var result1 = Math3D.MatrixTool.multiplyVector4(matrix.values, Math3D.Vector4.create(-0.5, 0, -1, 1).values);
            var result2 = Math3D.MatrixTool.multiplyVector4(matrix.values, Math3D.Vector4.create(0.5, 0, -1, 1).values);
            var result3 = Math3D.MatrixTool.multiplyVector4(matrix.values, Math3D.Vector4.create(0, 1, -1, 1).values);

            expect(getValues(result1)).toEqual(
                [ -0.9330127, 0, 0.8181818, 1 ]
            );
            expect(getValues(result2)).toEqual(
                [ 0.9330127, 0, 0.8181818, 1 ]
            );
            expect(getValues(result3)).toEqual(
                [ 0, 3.7320509, 0.8181818, 1 ]
            );
        });
    });


    describe("集成测试", function(){
        it("平移->缩放->绕y轴旋转坐标", function(){
            var v =Math3D.Vector4.create(0, 0, 0, 1);

            matrix.translate(1, 1, 1);
            matrix.scale(2,2,2);
            matrix.rotate(45, 0, 1, 0);
            var result = Math3D.MatrixTool.multiplyVector4(matrix.values,v.values);

            expect(getValues(result)).toEqual(
                [ 2.8284271, 2, 0, 1 ]
            );
        });
        it("测试视图矩阵", function(){
            var v =Math3D.Vector4.create(1, 1, 1, 1);

           matrix.lookAt(1, 2, 1, 1, 2, -1, 0, 1, 0);
            var result = Math3D.MatrixTool.multiplyVector4(matrix.values,v.values);

            expect(getValues(result)).toEqual(
                [ 0, -1, 0, 1 ]
            );
        });
        it("旋转视图矩阵", function(){
            var v =Math3D.Vector4.create(1, 1, 1, 1);

            matrix.lookAt(0, 0, 5, 0, 0, -1, 0, 1, 0);
            matrix.rotate(90, 0, 1, 0);
            var result = Math3D.MatrixTool.multiplyVector4(matrix.values,v.values);

            expect(getValues(result)).toEqual(
                [-4, 1, -1, 1]
            );
        });
        it("视图变换->正交投影变换", function(){
            var v1 =Math3D.Vector4.create(1, 1, 1, 1);
            var v2 =Math3D.Vector4.create(1, 1, -5, 1);

            matrix.lookAt(0, 0, 0, 0, 0, -1, 0, 1, 0);
            matrix.ortho(0.1,10);
            var result1 = Math3D.MatrixTool.multiplyVector4(matrix.values, v1.values);
            var result2 = Math3D.MatrixTool.multiplyVector4(matrix.values, v2.values);

            //v2不在cvv中，而v1在cvv中
            expect(getValues(result1)).toEqual(
                [ 1, 1, -1.2222222, 1 ]
            );
            expect(getValues(result2)).toEqual(
                [ 1, 1, -0.0101011, 1 ]
            );
        });
        it("视图变换->透视投影变换", function(){
            var v1 =Math3D.Vector4.create(1, 1, 1, 1);
            var v2 =Math3D.Vector4.create(1, 1, -5, 1);

            //matrix.lookAt(-1, 0, 1, 0, 0, 1, 0, 1, 0);
            matrix.lookAt(0, 0, 0, 0, 0, -1, 0, 1, 0);
            matrix.setPerspective(30, 1, 0.1,10);
            var result1 = Math3D.MatrixTool.multiplyVector4(matrix.values, v1.values);
            var result2 = Math3D.MatrixTool.multiplyVector4(matrix.values, v2.values);

            //v2不在cvv中，而v1在cvv中
            expect(getValues(result1)).toEqual(
                [ 3.7320509, 3.7320509, -1.2222222, -1 ]
            );
            expect(getValues(result2)).toEqual(
                [ 3.7320509, 3.7320509, 4.89899, 5]
            );
        });
    });
});
