/// <reference path="../../definitions.d.ts"/>
module dy{
    export class ModelGeometry extends Geometry{
        public static create(){
            var geom = new this();

            return geom;
        }

        public vertices:dyCb.Collection<Vector3> = dyCb.Collection.create<Vector3>();
        public colors:dyCb.Collection<Vector3> = dyCb.Collection.create<Vector3>();
        public texCoords:dyCb.Collection<Vector2> = dyCb.Collection.create<Vector2>();
        public faces:dyCb.Collection<Face3> = dyCb.Collection.create<Face3>();


        protected computeData(){
            return <any>{
                vertices: this.vertices.toArray(),
                faces: this.faces.toArray(),
                texCoords: this.texCoords.toArray(),
                colors: this.colors.toArray()
            };
        }
    }
}

