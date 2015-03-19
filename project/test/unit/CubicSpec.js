/**3D学习
 * 作者：YYC
 * 日期：2015-03-18
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("Cubic", function(){
   var cubic = null;
    var sandbox = null;

    beforeEach(function(){
        cubic = new Cubic.Sphere();
        sandbox = sinon.sandbox.create();
    });
    afterEach(function(){
        sandbox.restore();
    });

    describe("getSphereDataByDecomposition", function(){
        var pointX = 0.6,
            pointY = 0.2,
            pointZ = -0.1;
        var radius = 1.0;

      it("测试count=0的情况", function(){
          var count = 0;

          var data = cubic.getSphereDataByDecomposition(pointX, pointY, pointZ, count, radius);

          var vertices = Helper.Tool.getValues_forTest(data.vertices);
          var indices = Helper.Tool.getValues_forTest(data.indices);
          expect(vertices.length).toEqual(6 * 3);
          expect(vertices).toEqual(
              [ 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1 ]
          );
          expect(indices.length).toEqual(8 * 3);
          expect(indices).toEqual(
              [ 2, 4, 0, 2, 0, 5, 2, 5, 1, 2, 1, 4, 3, 0, 4, 3, 5, 0, 3, 1, 5, 3, 4, 1 ]
          );
      });
        it("测试count=1的情况", function(){
            var count = 1;

            var data = cubic.getSphereDataByDecomposition(pointX, pointY, pointZ, count, radius);

            var vertices = Helper.Tool.getValues_forTest(data.vertices);
            var indices = Helper.Tool.getValues_forTest(data.indices);
            expect(vertices.length).toEqual(6 * 3 + 3 * 8 * 3);
            expect(vertices).toEqual(
                [ 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1 ]
            );
            expect(indices.length).toEqual(4 * 8 * 3);
            expect(indices).toEqual(
                [ 2, 4, 0, 2, 0, 5, 2, 5, 1, 2, 1, 4, 3, 0, 4, 3, 5, 0, 3, 1, 5, 3, 4, 1 ]
            );
        });
        it("测试count=2的情况", function(){
            var count = 2;

            var data = cubic.getSphereDataByDecomposition(pointX, pointY, pointZ, count, radius);

            var vertices = Helper.Tool.getValues_forTest(data.vertices);
            var indices = Helper.Tool.getValues_forTest(data.indices);
            //expect(vertices.length).toEqual(6 * 3 + (3 * 4 + 3) * 8 * 3);
            //expect(vertices).toEqual(
            //    [0, 1, 0]
            //);
            //expect(indices.length).toEqual(4 * 4 * 8 * 3);
            expect(indices).toEqual(
                [ 2, 4, 0, 2, 0, 5, 2, 5, 1, 2, 1, 4, 3, 0, 4, 3, 5, 0, 3, 1, 5, 3, 4, 1 ]
            );
        });
    });
});