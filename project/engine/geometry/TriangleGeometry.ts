module Engine3D{
    export class TriangleGeometry{
        public static create(width, height, depth):TriangleGeometry {
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
            this._normals = this._computeNormals();
            this._texCoords = this._computeTexCoords();
        }

        private _computeVertices(width, height, depth){
            var left = -width / 2,
                right = width / 2,
                up = height / 2,
                down = -height / 2;

            return new Float32Array([
                0.0, up, depth,
                left, down, depth,
                right, down, depth
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

