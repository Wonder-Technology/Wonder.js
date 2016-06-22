module wd{
    export class ConvexPolygonGeometry extends Geometry{
        public static create(){
            var geom = new this();

            return geom;
        }

        private _vertices:Array<number> = [];
        @cloneAttributeAsCustomType(function(source:ModelGeometry, target:ModelGeometry, memberName:string){
            target[memberName] = CloneUtils.cloneArray(source[memberName]);
        })
        get vertices(){
            return this._vertices;
        }
        set vertices(vertices:Array<number>){
            this._vertices = vertices;

            if(this.buffers){
                this.buffers.geometryData.vertices = vertices;
                this.buffers.removeCache(EBufferDataType.VERTICE);
            }
        }

        private _texCoords:Array<number> = [];
        @cloneAttributeAsCustomType(function(source:ModelGeometry, target:ModelGeometry, memberName:string){
            target[memberName] = CloneUtils.cloneArray(source[memberName]);
        })
        get texCoords(){
            return this._texCoords;
        }
        set texCoords(texCoords:Array<number>){
            this._texCoords = texCoords;

            if(this.buffers) {
                this.buffers.geometryData.texCoords = texCoords;
                this.buffers.removeCache(EBufferDataType.TEXCOORD);
            }
        }

        private _colors:Array<number> = [];
        @cloneAttributeAsCustomType(function(source:ModelGeometry, target:ModelGeometry, memberName:string){
            target[memberName] = CloneUtils.cloneArray(source[memberName]);
        })
        get colors(){
            return this._colors;
        }
        set colors(colors:Array<number>){
            this._colors = colors;
            if(this.buffers) {
                this.buffers.geometryData.colors = colors;
                this.buffers.removeCache(EBufferDataType.COLOR);
            }
        }

        private _indices:Array<number> = [];
        @cloneAttributeAsCustomType(function(source:ModelGeometry, target:ModelGeometry, memberName:string){
            target[memberName] = CloneUtils.cloneArray(source[memberName]);
        })
        get indices(){
            return this._indices;
        }
        set indices(indices:Array<number>){
            //todo refactor?
            this._indices = indices;
            if(this.buffers) {
                this.buffers.geometryData.faces = GeometryUtils.convertToFaces(indices, this.normals);
                this.buffers.removeCache(EBufferDataType.INDICE);
            }
        }

        get normals(){
            return null;
        }

        public computeData(){
            var indices = [];

            for(let i = 1, len = this.vertices.length / 3 - 1; i < len; i++){
                indices.push(0, i + 1, i);
            }

            this.indices = indices;

            return {
                vertices: this.vertices,
                faces: GeometryUtils.convertToFaces(this.indices, this.normals),
                texCoords: this.texCoords,
                colors: this.colors
            };
        }
    }
}

