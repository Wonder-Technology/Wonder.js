//has geometry vertices,indices,texCoords,normals data
module Engine3D{
    declare var gl:any;

    export class RectGeometry{
        public static create(width, height, depth):RectGeometry {
            var geom = new this();

            geom.initWhenCreate(width, height, depth);

            return geom;
        }

        private _vertices:Float32Array = null;
        get vertices(){
            return this._vertices;
        }
        set vertices(vertices:Float32Array){
            this._vertices = vertices;
        }
        
        private _indices:Uint16Array = null;
        get indices(){
            return this._indices;
        }
        set indices(indices:Uint16Array){
            this._indices = indices;
        }
        
        private _normals:Float32Array = null;
        get normals(){
            return this._normals;
        }
        set normals(normals:Float32Array){
            this._normals = normals;
        }

        private _texCoords:Float32Array = null;
        get texCoords(){
            return this._texCoords;
        }
        set texCoords(texCoords:Float32Array){
            this._texCoords = texCoords;
        }

        constructor(){
        }

        public initWhenCreate(width, height, depth){
            this._vertices = this._computeVertices(width, height, depth);
            this._indices = this._computeIndices();
            this._normals = this._computeNormals();
            this._texCoords = this._computeTexCoords();
        }

        private _computeVertices(width, height, depth){
            var left = -width / 2,
                right = width / 2,
                up = height / 2,
                down = -height / 2;

            return new Float32Array([
                right, up, depth,
                left, up, depth,
                left, down, depth,
                right, down, depth
            ]);
        }

        private _computeIndices(){
            return new Uint16Array([
                0, 1, 2,   0, 2, 3
            ]);
        }
        //todo set data
        private _computeNormals(){
            return null;
        }
        //todo set data
        private _computeTexCoords(){
            return null;
        }
    }
}

