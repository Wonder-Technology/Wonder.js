module wd{
    export class LineGeometry extends Geometry{
        public static create(){
            var geom = new this();

            geom.initWhenCreate();

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

        //private _texCoords:Array<number> = [];
        //@cloneAttributeAsCustomType(function(source:ModelGeometry, target:ModelGeometry, memberName:string){
        //    target[memberName] = CloneUtils.cloneArray(source[memberName]);
        //})
        //get texCoords(){
        //    return this._texCoords;
        //}
        //set texCoords(texCoords:Array<number>){
        //    this._texCoords = texCoords;
        //
        //    if(this.buffers) {
        //        this.buffers.geometryData.texCoords = texCoords;
        //        this.buffers.removeCache(EBufferDataType.TEXCOORD);
        //    }
        //}

        //todo support color
        //private _colors:Array<number> = [];
        //@cloneAttributeAsCustomType(function(source:ModelGeometry, target:ModelGeometry, memberName:string){
        //    target[memberName] = CloneUtils.cloneArray(source[memberName]);
        //})
        //get colors(){
        //    return this._colors;
        //}
        //set colors(colors:Array<number>){
        //    this._colors = colors;
        //    if(this.buffers) {
        //        this.buffers.geometryData.colors = colors;
        //        this.buffers.removeCache(EBufferDataType.COLOR);
        //    }
        //}

        private _indices:Array<number> = [];
        @cloneAttributeAsCustomType(function(source:ModelGeometry, target:ModelGeometry, memberName:string){
            target[memberName] = CloneUtils.cloneArray(source[memberName]);
        })
        get indices(){
            return this._indices;
        }
        set indices(indices:Array<number>){
            this._indices = indices;
            if(this.buffers) {
                this.buffers.geometryData.faces = GeometryUtils.convertToFaces(indices, this.normals);
                this.buffers.removeCache(EBufferDataType.INDICE);
            }
        }

        get normals(){
            return null;
        }

        public initWhenCreate(){
            this.drawMode = wd.EDrawMode.LINES;
        }

        public computeData(){
            return {
                vertices: this.vertices,
                //faces: GeometryUtils.convertToFaces(this.indices, this.normals),
                faces: GeometryUtils.convertToFaces(this.indices, this.normals)
                //texCoords: this.texCoords,
                //colors: this.colors
            };
        }
    }
}

