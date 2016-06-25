module wd{
    export class LineGeometry extends Geometry{
        public static create(){
            var geom = new this();

            geom.initWhenCreate();

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

        public initWhenCreate(){
            this.drawMode = wd.EDrawMode.LINE_STRIP;
        }

        public computeData(){
            return {
                vertices: this.vertices
            };
        }
    }
}

