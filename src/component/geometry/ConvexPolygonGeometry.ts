module wd{
    export class ConvexPolygonGeometry extends Geometry{
        public static create(){
            var geom = new this();

            return geom;
        }

        private _customGeometry:CustomGeometry = CustomGeometry.create();

        @cloneAttributeAsCustomType(function(source:ModelGeometry, target:ModelGeometry, memberName:string){
            target[memberName] = CloneUtils.cloneArray(source[memberName]);
        })
        get vertices(){
            return this._customGeometry.vertices;
        }
        set vertices(vertices:Array<number>){
            this._customGeometry.vertices = vertices;
        }

        @cloneAttributeAsCustomType(function(source:ModelGeometry, target:ModelGeometry, memberName:string){
            target[memberName] = CloneUtils.cloneArray(source[memberName]);
        })
        get texCoords(){
            return this._customGeometry.texCoords;
        }
        set texCoords(texCoords:Array<number>){
            this._customGeometry.texCoords = texCoords;
        }

        @cloneAttributeAsCustomType(function(source:ModelGeometry, target:ModelGeometry, memberName:string){
            target[memberName] = CloneUtils.cloneArray(source[memberName]);
        })
        get colors(){
            return this._customGeometry.colors;
        }
        set colors(colors:Array<number>){
            this._customGeometry.colors = colors;
        }

        @cloneAttributeAsCustomType(function(source:ModelGeometry, target:ModelGeometry, memberName:string){
            target[memberName] = CloneUtils.cloneArray(source[memberName]);
        })
        get indices(){
            return this._customGeometry.indices;
        }
        set indices(indices:Array<number>){
            this._customGeometry.indices = indices;
        }

        @cloneAttributeAsCustomType(function(source:ModelGeometry, target:ModelGeometry, memberName:string){
            target[memberName] = CloneUtils.cloneArray(source[memberName]);
        })
        get normals(){
            return this._customGeometry.normals;
        }
        set normals(normals:Array<number>){
            this._customGeometry.normals = normals;
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

