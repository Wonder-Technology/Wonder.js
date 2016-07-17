module wd{
    export abstract class LineGeometry extends Geometry{
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

        public computeData(){
            return {
                vertices: this.computeVertices()
            };
        }

        protected abstract computeVertices():Array<number>;
    }
}

