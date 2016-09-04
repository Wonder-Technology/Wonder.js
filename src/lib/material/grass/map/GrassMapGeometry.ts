module wd{
    export class GrassMapGeometry extends Geometry{
        public static create(){
            var geom = new this();

            return geom;
        }

        @cloneAttributeAsBasicType()
        public width:number = null;
        @cloneAttributeAsBasicType()
        public height:number = null;

        private _vertices:Array<number> = [];
        private _texCoords:Array<number> = [];
        private _indices:Array<number> = [];
        private _normals:Array<number> = [];
        private _quadIndices:Array<number> = [];

        public computeData(){
            this._generateFirstRect();
            this._generateSecondRect();
            this._generateThirdRect();
            this._generateQuadIndices();

            return {
                vertices: this._vertices,
                faces: GeometryUtils.convertToFaces(this._indices, this._normals),
                texCoords: this._texCoords
            };
        }

        //todo assert must has quadIndices
        protected createBufferContainer():BufferContainer{
            return GrassMapBufferContainer.create(this.entityObject);
        }

        //todo assert must has quadIndices
        protected createGeometryData(vertices:Array<number>, faces:Array<Face3>, texCoords:Array<number>, colors:Array<number>, morphTargets:wdCb.Hash<MorphTargetsData>):GeometryData{
                var geometryData = GrassMapGeometryData.create(this);

                geometryData.vertices = vertices;
                geometryData.faces = faces;
                geometryData.texCoords = texCoords;
                geometryData.colors = colors;
                geometryData.quadIndices = this._quadIndices;

                return geometryData;
        }

        /*!
         horizontal rect
         */
        private _generateFirstRect(){
            this._generateRect(null, 0);
        }

        /*!
        + 45 rect
         */
        private _generateSecondRect(){
            this._generateRect(Matrix4.create().rotate(45, Vector3.up), 1);
        }

        /*!
         - 45 rect
         */
        private _generateThirdRect(){
            this._generateRect(Matrix4.create().rotate(-45, Vector3.up), 2);
        }

        private _generateRect(rotationMatrix:Matrix4, index:number){
            var width = this.width,
                height = this.height,
                left = -width / 2,
                right = width / 2,
                up = height / 2,
                down = -height / 2;

            //todo optimize:use temp vector3
            if(rotationMatrix === null){
                this._vertices = this._vertices.concat([
                    right, up, 0,
                    left, up, 0,
                    left, down, 0,
                    right, down, 0
                ]);
            }
            else{
                this._vertices = this._vertices.concat(
                    rotationMatrix.multiplyVector3(Vector3.create(right, up, 0)).toArray(),
                    rotationMatrix.multiplyVector3(Vector3.create(left, up, 0)).toArray(),
                    rotationMatrix.multiplyVector3(Vector3.create(left, down, 0)).toArray(),
                    rotationMatrix.multiplyVector3(Vector3.create(right, down, 0)).toArray()
                );
            }

            this._indices = this._indices.concat([
                0 + 4 * index, 1 + 4 * index, 2 + 4 * index,
                0 + 4 * index, 2 + 4 * index, 3 + 4 * index
            ]);

            this._texCoords = this._texCoords.concat([
                1.0, 1.0,
                0.0, 1.0,
                0.0, 0.0,
                1.0, 0.0
            ]);

            this._normals = this._normals.concat([
                0, 1, 0,
                0, 1, 0,
                0, 1, 0,
                0, 1, 0
            ]);
        }

        private _generateQuadIndices(){
            this._quadIndices = [
                0,0,0,0,
                1,1,1,1,
                2,2,2,2
            ]
        }
    }
}

