/**3D学习
 * 作者：YYC
 * 日期：2015-03-18
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
module Cubic {
export class Sphere{
        constructor(){}

        private _vertices:number[] = [];
        private _indices:number[] = [];
        private _vLen:number = null;


        getSphereDataByDecomposition(pointX, pointY, pointZ, count, radius): {
            vertices: Float32Array
            indices: Uint8Array
        } {
            var originVertices = [
                [ radius, 0, 0],
                [-radius, 0, 0],
                [0, radius, 0],
                [0, -radius, 0],
                [0, 0, radius],
                [0, 0, -radius]
            ];
            var originIndices = [
                //[2,4,0],[2,0,5],[2,5,1],[2,1,4],   [3,0,4],[3,5,0],[3,1,5],[3,4,1]
                [2,4,0]
            ];
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

            var vertices = new Float32Array(this._vertices);
            var indices = new Uint8Array(this._indices);





            return {
                vertices: vertices,
                indices: indices
            }
        }

        private _subDivide(v1, v2, v3, ind,count, radius): void{
            if(count <= 0){
            ////加入顶点和索引
            //vertices = vertices.concat(v1, v2, v3);
            ////indices = indices.concat(indi);
            //indices = indices.concat(in1, in2, in3, in4);
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
        //
        ////继续切分三角形
        //subDivide(v1,v12,v31,count-1); //对所产生的4个新的三角面再进行等分
        //subDivide(v2,v23,v12,count-1);
        //subDivide(v3,v31,v23,count-1);
        //subDivide(v12,v23,v31,count-1);



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
        this._subDivide(v2,v23,v12, in2, count-1, radius);
        this._subDivide(v3,v31,v23, in3, count-1, radius);
        this._subDivide(v12,v23,v31, in4, count-1, radius);
    }

    normalize(v:number[], radius:number): number[]{
        var d = Math.sqrt(
            v[0] * v[0] + v[1] * v[1] + v[2] * v[2]
        );

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
}
