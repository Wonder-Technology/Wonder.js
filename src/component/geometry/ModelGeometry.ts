/// <reference path="../../definitions.d.ts"/>
module dy{
    export class ModelGeometry extends Geometry{
        public static create(){
            var geom = new this();

            return geom;
        }

        public vertices:Array<Vector3> = null;
        public colors:Array<Vector3> = null;
        public texCoords:Array<Vector2> = null;
        public faces:Array<Face3> = null;

        protected computeData(){
            return <any>{
                vertices: this.vertices,
                faces: this.faces,
                texCoords: this.texCoords,
                colors: this.colors
            };
        }
    }
}

