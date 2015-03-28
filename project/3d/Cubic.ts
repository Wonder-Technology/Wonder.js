/**3D学习
 * 作者：YYC
 * 日期：2015-03-18
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
module Engine3D.Cubic {
    export class Sphere{
        constructor(){}

        private _vertices:number[] = [];
        private _indices:number[] = [];
        private _normals:number[] = [];
        private _texCoords:number[] = [];

        private _vLen:number = null;

         getSphereDataByLatitudeLongtitude(pointX, pointY, pointZ, latitudeBands, longitudeBands, radius){
            //var normalData = [];
            //维度
            for (var latNumber = 0; latNumber <= latitudeBands; latNumber++) {
                var theta = latNumber * Math.PI / latitudeBands;
                var sinTheta = Math.sin(theta);
                var cosTheta = Math.cos(theta);

                //经度
                for (var longNumber = 0; longNumber <= longitudeBands; longNumber++) {
                    var phi = longNumber * 2 * Math.PI / longitudeBands;
                    var sinPhi = Math.sin(phi);
                    var cosPhi = Math.cos(phi);

                    var x = radius * cosPhi * sinTheta + pointX;
                    var y = radius *cosTheta + pointY;
                    var z = radius *sinPhi * sinTheta + pointZ;
                    var u = 1 - (longNumber / longitudeBands);
                    var v = 1 - (latNumber / latitudeBands);

                    this._normals.push(x);
                    this._normals.push(y);
                    this._normals.push(z);
                    this._texCoords.push(u);
                    this._texCoords.push(v);
                    this._vertices.push(x);
                    this._vertices.push(y);
                    this._vertices.push(z);
                }
            }



            //一圈有经度点longitudeBands个
            for (var latNumber = 0; latNumber < latitudeBands; latNumber++) {
                for (var longNumber = 0; longNumber < longitudeBands; longNumber++) {
                    var first = latNumber * (longitudeBands + 1) + longNumber;
                    var second = first + longitudeBands + 1;
                    this._indices.push(first);
                    this._indices.push(second);
                    this._indices.push(first + 1);

                    this._indices.push(second);
                    this._indices.push(second + 1);
                    this._indices.push(first + 1);
                }
            }


             var vertices = this._vertices;
             var indices = this._indices;

             return {
                 vertices: new Float32Array(vertices),
                 /*!
                 indices类型改为UNSIGHED_SHORT，即可支持Uint16Array

                  //照理说webgl应该支持Uint16Array的！但是此处就是不支持！！？？
                  //因此现在count不能超过2，否则会这样导致indices值可能超过256！
                  */
                 indices: new Uint16Array(indices),
                 normals: new Float32Array(this._normals),
                 texCoords: new Float32Array(this._texCoords)
             }
        }

        //todo 设置球心坐标
        getSphereDataByDecomposition(pointX, pointY, pointZ, count, radius): {
            vertices: Float32Array
            indices: Uint16Array
        } {
            //var originVertices = [
            //    [0,1,0],
            //    [-1,0,0],
            //    [1,0,0],
            //    [0, -1, 0]
            //];
            //var originIndices = [
            //    //[2,4,0],[2,0,5],[2,5,1],[2,1,4],   [3,0,4],[3,5,0],[3,1,5],[3,4,1]
            //    //[2,4,0]
            //    [0,1,2],
            //    [1,3,2]
            //];

            var originVertices = [
                [radius, 0, 0],
                [-radius, 0, 0],
                [0, radius, 0],
                [0, -radius, 0],
                [0, 0, radius],
                [0, 0, -radius]
            ];
            var originIndices = [
                //[2,4,0],[2,0,5],[2,5,1],[2,1,4],   [3,0,4],[3,5,0],[3,1,5],[3,4,1]
                //[2,4,0]
                [2,4,0],[2,0,5],[2,5,1],[2,1,4],
                [3,0,4],[3,5,0],[3,1,5],[3,4,1]
            ];


            //var originVertices = [
            //    [1, 0, 0],
            //    [0, 0, -1],
            //    [-1, 0, 0],
            //    [0, 0, 1],
            //    [0, -1, 0],
            //    [0, 1, 0]
            //];
            //var originIndices = [
            //    [0,3,4]
            //    //[0,1,4],
            //    //[1,2,4],
            //    //[2,3,4],
            //    //
            //    //[3,0, 5]
            //    //[0,1, 5],
            //    //[2,1, 5],
            //    //[2,3, 5]
            //];


            this._vLen = originVertices.length;

            var j = 0;
            var len = originVertices.length;
            for(j = 0; j < len; j ++){
                this._vertices = this._vertices.concat(originVertices[j]);
            }

            var j = 0,
                len = originIndices.length;  //8面体

            for (j = 0; j < len; j ++){
                //for (i = 0; i < count; i++){
                //this._vertices = this._vertices.concat(originVertices[originIndices[j][0]],
                //    originVertices[originIndices[j][1]],
                //    originVertices[originIndices[j][2]]);

                this._subDivide(originVertices[originIndices[j][0]],
                    originVertices[originIndices[j][1]],
                    originVertices[originIndices[j][2]],
                    originIndices[j],
                    count,
                    radius);

                //}

            }

            //var vertices = new Float32Array(this._vertices);
            //var indices = new Uint8Array(this._indices);
            //var indices = new Uint16Array(this._indices);
            var vertices = this._vertices;
            var indices = this._indices;

            return {
                vertices: new Float32Array(vertices),
                indices: new Uint16Array(indices)
            }
        }

        private _subDivide(v1, v2, v3, ind,count, radius): void{
            if(count <= 0){
                this._indices = this._indices.concat(ind);

                return;
            }
            //
            var i = 0;
            var v12 = [],
                v23 = [],
                v31 = [];

            //求向量中心点
            for(i = 0; i < 3; i++){
                v12[i] = (v1[i]+v2[i])/2;  //求取等分的中点坐标
                v23[i] = (v2[i]+v3[i])/2;
                v31[i] = (v3[i]+v1[i])/2;
            }

            //模长扩展
            this.normalize(v12, radius);
            this.normalize(v23, radius);
            this.normalize(v31, radius);



            this._vertices = this._vertices.concat(v12, v23, v31);

            var iV1 = ind[0],
                iV2 = ind[1],
                iV3 = ind[2],
                iV12 =this._vLen,
                iV23 =this._vLen + 1,
                iV31 =this._vLen + 2;

            var in1 =[
                iV1, iV12, iV31
            ];
            var in2 =[
                iV31, iV12, iV23
            ];
            var in3 =[
                iV12, iV2, iV23
            ];
            var in4 =[
                iV31, iV23, iV3
            ];







            this._vLen =this._vLen + 3;



            //继续切分三角形
            this._subDivide(v1,v12,v31,in1, count-1, radius); //对所产生的4个新的三角面再进行等分
            this._subDivide(v31,v12, v23, in2, count-1, radius);
            this._subDivide(v12, v2, v23, in3, count-1, radius);
            this._subDivide(v31, v23, v3, in4, count-1, radius);
        }

        normalize(v:number[], radius:number): number[]{
            var d = Math.sqrt(
                v[0] * v[0] + v[1] * v[1] + v[2] * v[2]
            );

            if(d === 0){
                return [0, 0, 0];
            }

            v[0] = radius * v[0] / d;
            v[1] = radius * v[1] / d;
            v[2] = radius * v[2] / d;

            return v;
        }

        initWhenCreate(){

        }

        public static create():Sphere {
            var cubic = new Sphere();

            return cubic;
        }
    }

    export class Cube{
        constructor(){}

        //getCubicData(pointX, pointY, pointZ, length){
        //    var vertices = new Float32Array([
        //
        //        1.0,  1.0,  1.0,
        //        -1.0,  1.0,  1.0,
        //        -1.0, -1.0,  1.0,
        //        1.0, -1.0,  1.0,
        //        1.0, -1.0, -1.0,
        //        1.0,  1.0, -1.0,
        //        -1.0,  1.0, -1.0,
        //        -1.0, -1.0, -1.0,
        //    ]);
        //
        //    // Indices of the vertices
        //    var indices = new Uint8Array([
        //        0, 1, 2,   0, 2, 3,    // front
        //        0, 3, 4,   0, 4, 5,    // right
        //        0, 5, 6,   0, 6, 1,    // up
        //        1, 6, 7,   1, 7, 2,    // left
        //        7, 4, 3,   7, 3, 2,    // down
        //        4, 7, 6,   4, 6, 5     // back
        //    ]);
        //
        //    return {
        //        vertices: vertices,
        //        indices: indices
        //    }
        //}

        //todo 可指定中心点和边长
        getCubeData(pointX, pointY, pointZ, length): {}{
            // Create a cube
            //    v6----- v5
            //   /|      /|
            //  v1------v0|
            //  | |     | |
            //  | |v7---|-|v4
            //  |/      |/
            //  v2------v3

            var vertices = new Float32Array([   // Vertex coordinates
                0.2, 0.2, 0.2,  -0.2, 0.2, 0.2,  -0.2,-0.2, 0.2,   0.2,-0.2, 0.2,    // v0-v1-v2-v3 front
                0.2, 0.2, 0.2,   0.2,-0.2, 0.2,   0.2,-0.2,-0.2,   0.2, 0.2,-0.2,    // v0-v3-v4-v5 right
                0.2, 0.2, 0.2,   0.2, 0.2,-0.2,  -0.2, 0.2,-0.2,  -0.2, 0.2, 0.2,    // v0-v5-v6-v1 up
                -0.2, 0.2, 0.2,  -0.2, 0.2,-0.2,  -0.2,-0.2,-0.2,  -0.2,-0.2, 0.2,    // v1-v6-v7-v2 left
                -0.2,-0.2,-0.2,   0.2,-0.2,-0.2,   0.2,-0.2, 0.2,  -0.2,-0.2, 0.2,    // v7-v4-v3-v2 down
                0.2,-0.2,-0.2,  -0.2,-0.2,-0.2,  -0.2, 0.2,-0.2,   0.2, 0.2,-0.2     // v4-v7-v6-v5 back
            ]);

            var normals = new Float32Array([   // Normal
                0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,     // v0-v1-v2-v3 front
                1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,     // v0-v3-v4-v5 right
                0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,     // v0-v5-v6-v1 up
                -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,     // v1-v6-v7-v2 left
                0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,     // v7-v4-v3-v2 down
                0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0      // v4-v7-v6-v5 back
            ]);

            var texCoords = new Float32Array([   // Texture coordinates
                1.0, 1.0,   0.0, 1.0,   0.0, 0.0,   1.0, 0.0,    // v0-v1-v2-v3 front
                0.0, 1.0,   0.0, 0.0,   1.0, 0.0,   1.0, 1.0,    // v0-v3-v4-v5 right
                1.0, 0.0,   1.0, 1.0,   0.0, 1.0,   0.0, 0.0,    // v0-v5-v6-v1 up
                1.0, 1.0,   0.0, 1.0,   0.0, 0.0,   1.0, 0.0,    // v1-v6-v7-v2 left
                0.0, 0.0,   1.0, 0.0,   1.0, 1.0,   0.0, 1.0,    // v7-v4-v3-v2 down
                0.0, 0.0,   1.0, 0.0,   1.0, 1.0,   0.0, 1.0     // v4-v7-v6-v5 back
            ]);

            var indices = new Uint8Array([        // Indices of the vertices
                0, 1, 2,   0, 2, 3,    // front
                4, 5, 6,   4, 6, 7,    // right
                8, 9,10,   8,10,11,    // up
                12,13,14,  12,14,15,    // left
                16,17,18,  16,18,19,    // down
                20,21,22,  20,22,23     // back
            ]);

            return {
                vertices: vertices,
                texCoords: texCoords,
                indices: indices,
                normals: normals
            }
        }

        public static create():Cube {
            var cubic = new this();

            return cubic;
        }
    }
}

