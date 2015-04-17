/// <reference path="SphereDrawMode.ts"/>
/// <reference path="../render/ArrayBuffer.ts"/>
/// <reference path="../render/ElementBuffer.ts"/>
/// <reference path="../material/MeshMaterial.ts"/>
module Engine3D{
    export class SphereGeometry{
        public static create(radius, drawMode:SphereDrawMode, segments:number,  material:MeshMaterial):SphereGeometry {
            var geom = new this();

            geom.initWhenCreate(radius, drawMode, segments, material);

            return geom;
        }

        private _vertices:ArrayBuffer = null;
        get vertices(){
            return this._vertices;
        }
        set vertices(vertices:ArrayBuffer){
            this._vertices = vertices;
        }

        private _indices:ElementBuffer = null;
        get indices(){
            return this._indices;
        }
        set indices(indices:ElementBuffer){
            this._indices = indices;
        }

        private _colors:ArrayBuffer = null;
        get colors(){
            return this._colors;
        }
        set colors(colors:ArrayBuffer){
            this._colors = colors;
        }

        constructor(){
        }

        public initWhenCreate(radius, drawMode, segments, material){
            var data = this._computeData(radius, drawMode, segments);

            this._vertices = data.vertices;
            this._indices = data.indices;

            this._colors = this._computeColorsBuffer(material);
        }

        private _computeData(radius:number, drawMode:SphereDrawMode, segments:number){
            var data = null;

            if(drawMode === SphereDrawMode.LATITUDELONGTITUDE){
                data = GetDataByLatitudeLongtitude.create(radius, segments).getData();
            }
            else if(drawMode === SphereDrawMode.DECOMPOSITION){
                data = GetDataByDecomposition.create(radius, segments).getData();
            }

            return data;
        }


        private _computeColorsBuffer(material:MeshMaterial){
            var arr = [],
                color = material.color,
                i = 0,
                len = this._vertices.count;

            for(i = 0; i < len; i++){
                arr.push( color.r, color.g, color.b, 1.0);
            }

            return ArrayBuffer.create(new Float32Array(arr), 4, BufferType.FLOAT);
        }
    }

    class GetDataByLatitudeLongtitude{
        public static create(radius:number, bands:number):GetDataByLatitudeLongtitude {
            var geom = new this(radius, bands);

            return geom;
        }

        private _vertices:number[] = [];
        get vertices(){
            return this._vertices;
        }
        set vertices(vertices:number[]){
            this._vertices = vertices;
        }

        private _indices:number[] = [];
        get indices(){
            return this._indices;
        }
        set indices(indices:number[]){
            this._indices = indices;
        }

        private _radius:number = null;
        private _latitudeBands:number = null;
        private _longitudeBands:number = null;

        constructor(radius, bands){
            this._radius = radius;
            this._latitudeBands = bands;
            this._longitudeBands = bands;
        }

        public getData(){
            //维度
            for (var latNumber = 0; latNumber <= this._latitudeBands; latNumber++) {
                var theta = latNumber * Math.PI / this._latitudeBands;
                var sinTheta = Math.sin(theta);
                var cosTheta = Math.cos(theta);

                //经度
                for (var longNumber = 0; longNumber <= this._longitudeBands; longNumber++) {
                    var phi = longNumber * 2 * Math.PI / this._longitudeBands;
                    var sinPhi = Math.sin(phi);
                    var cosPhi = Math.cos(phi);

                    //var x = this._radius * cosPhi * sinTheta + pointX;
                    //var y = this._radius *cosTheta + pointY;
                    //var z = this._radius *sinPhi * sinTheta + pointZ;
                    var x = this._radius * cosPhi * sinTheta;
                    var y = this._radius *cosTheta;
                    var z = this._radius *sinPhi * sinTheta;
                    var u = 1 - (longNumber / this._longitudeBands);
                    var v = 1 - (latNumber / this._latitudeBands);

                    //normals.push(x);
                    //normals.push(y);
                    //normals.push(z);
                    //texCoords.push(u);
                    //texCoords.push(v);
                    this._vertices.push(x);
                    this._vertices.push(y);
                    this._vertices.push(z);
                }
            }



            //this._一圈有经度点longitudeBands个
            for (var latNumber = 0; latNumber < this._latitudeBands; latNumber++) {
                for (var longNumber = 0; longNumber < this._longitudeBands; longNumber++) {
                    var first = latNumber * (this._longitudeBands + 1) + longNumber;
                    var second = first + this._longitudeBands + 1;
                    this._indices.push(first);
                    this._indices.push(second);
                    this._indices.push(first + 1);

                    this._indices.push(second);
                    this._indices.push(second + 1);
                    this._indices.push(first + 1);
                }
            }

            return {
                vertices: ArrayBuffer.create(new Float32Array(this._vertices),
                    3, BufferType.FLOAT),
                indices: ElementBuffer.create(new Uint16Array(this._indices),
                    BufferType.UNSIGNED_SHORT)
                //normals: new Float32Array(normals),
                //texCoords: new Float32Array(texCoords)
            }
        }

    }

    class GetDataByDecomposition{
        public static create(radius:number, count:number):GetDataByDecomposition {
            var geom = new this(radius, count);

            return geom;
        }

        private _vertices:number[] = [];
        get vertices(){
            return this._vertices;
        }
        set vertices(vertices:number[]){
            this._vertices = vertices;
        }

        private _indices:number[] = [];
        get indices(){
            return this._indices;
        }
        set indices(indices:number[]){
            this._indices = indices;
        }

        private _vLen:number = null;
        private _radius:number = null;
        private _count:number = null;

        constructor(radius, count){
            this._radius = radius;
            this._count = count;
        }

        //todo add texCoords
        public getData(){
            var originVertices = [
                [this._radius, 0, 0],
                [-this._radius, 0, 0],
                [0, this._radius, 0],
                [0, -this._radius, 0],
                [0, 0, this._radius],
                [0, 0, -this._radius]
            ];
            var originIndices = [
                //[2,4,0],[2,0,5],[2,5,1],[2,1,4],   [3,0,4],[3,5,0],[3,1,5],[3,4,1]
                //[2,4,0]
                [2,4,0],[2,0,5],[2,5,1],[2,1,4],
                [3,0,4],[3,5,0],[3,1,5],[3,4,1]
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
                //for (i = 0; i < this._count; i++){
                //this._vertices = this._vertices.concat(originVertices[originIndices[j][0]],
                //    originVertices[originIndices[j][1]],
                //    originVertices[originIndices[j][2]]);

                this._subDivide(originVertices[originIndices[j][0]],
                    originVertices[originIndices[j][1]],
                    originVertices[originIndices[j][2]],
                    originIndices[j],
                    this._count,
                    this._radius);

                //}

            }

            return {
                vertices: ArrayBuffer.create(new Float32Array(this._vertices),
                    3, BufferType.FLOAT),
                indices: ElementBuffer.create(new Uint16Array(this._indices),
                    BufferType.UNSIGNED_SHORT)
            }
        }

        private _subDivide(v1:number[], v2:number[], v3:number[], ind:number[],count:number, radius:number): void{
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
            this._normalize(v12, radius);
            this._normalize(v23, radius);
            this._normalize(v31, radius);

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

        private _normalize(v:number[], radius:number): number[]{
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
    }
}
