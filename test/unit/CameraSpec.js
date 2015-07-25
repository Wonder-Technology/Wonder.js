describe("Camera", function(){
   var obj = null;

    function getVal(val){
        return YYC.Tool.math.toFixed(val, 5);
    }

    beforeEach(function(){
        obj = new dy.Camera({}, {});
    });

    describe("测试移动", function(){
        function judgeMoveZ(funcName, x1, y1, z1, x2, y2, z2, x3, y3, z3){
            describe("此处移动距离是针对视图坐标系的（先旋转，然后平移），因此需要计算视图坐标系旋转后移动的距离。",function(){
                it("测试1", function(){
                    obj._rotateAngleY = 0;
                    obj._rotateAngleX = 0;
                    obj._moveX = 0;
                    obj._moveZ = 0;

                    obj[funcName]();

                    expect(getVal(obj._moveX)).toEqual(x1);
                    expect(getVal(obj._moveY)).toEqual(y1);
                    expect(getVal(obj._moveZ)).toEqual(z1);
                });
                it("测试2", function(){
                    obj._rotateAngleY = 30;
                    obj._rotateAngleX = 30;
                    obj._moveX = 0;
                    obj._moveZ = 0;

                    obj[funcName]();

                    expect(getVal(obj._moveX)).toEqual(x2);
                    expect(getVal(obj._moveY)).toEqual(y2);
                    expect(getVal(obj._moveZ)).toEqual(z2);
                });
                it("测试3", function(){
                    obj._rotateAngleY = 120;
                    obj._rotateAngleX = 120;
                    obj._moveX = 0;
                    obj._moveZ = 0;

                    obj[funcName]();

                    expect(getVal(obj._moveX)).toEqual(x3);
                    expect(getVal(obj._moveY)).toEqual(y3);
                    expect(getVal(obj._moveZ)).toEqual(z3);
                });
            });
        }

        beforeEach(function(){
            obj.moveSpeed = 0.1;
        });

        describe("moveBack", function(){
            judgeMoveZ("moveBack", 0, 0, 0.1, 0.0433, -0.05, 0.075, -0.0433, -0.0866, 0.025);
        });

        //describe("moveFront", function(){
        //    judgeMoveZ("moveFront", 0, 0.1, -0.05, 0.0866, -0.0866, -0.05);
        //});
        //
        //describe("moveLeft", function(){
        //    judgeMoveZ("moveLeft", 0, 0.1, -0.05, 0.0866, -0.0866, -0.05);
        //    //it("因为绕x轴旋转，所以旋转时投影xy平面为垂直移动，不会影响移动）", function(){
        //    //    obj._rotateAngleX = 30;
        //    //    obj._moveX = 0;
        //    //    obj._moveY = 0;
        //    //
        //    //    obj.moveLeft();
        //    //
        //    //    expect(obj._moveX).toEqual(-0.1);
        //    //});
        //});
        //
        //describe("moveRight", function(){
        //    it("因为绕x轴旋转，所以旋转时投影xy平面为垂直移动，不会影响移动）", function(){
        //        obj._rotateAngleX = 30;
        //        obj._moveX = 0;
        //        obj._moveY = 0;
        //
        //        obj.moveRight();
        //
        //        expect(obj._moveX).toEqual(0.1);
        //    });
        //});
    });
});