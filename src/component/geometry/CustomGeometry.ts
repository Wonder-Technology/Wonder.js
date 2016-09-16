module wd{
    //todo support morphTargets?
    export class CustomGeometry extends Geometry{
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
            this._indices = indices;

            if(this.buffers) {
                this.buffers.geometryData.faces = GeometryUtils.convertToFaces(indices, this.normals);
            }
        }

        private _normals:Array<number> = [];
        @cloneAttributeAsCustomType(function(source:ModelGeometry, target:ModelGeometry, memberName:string){
            target[memberName] = CloneUtils.cloneArray(source[memberName]);
        })
        get normals(){
            return this._normals;
        }
        set normals(normals:Array<number>){
            this._normals = normals;

            if(this.buffers) {
                this.buffers.geometryData.faces = GeometryUtils.convertToFaces(this.indices, normals);
            }
        }

        public computeData(){
            return {
                vertices: this.vertices,
                faces: GeometryUtils.convertToFaces(this.indices, this.normals),
                texCoords: this.texCoords,
                colors: this.colors
            };
        }
    }
}

