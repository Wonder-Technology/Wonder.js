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

        public isDY:boolean = false;


        protected computeData(){
            var vertices = this._convertVector3ToArray(this.vertices),
                texCoords = this._convertVector2ToArray(this.texCoords),
            colors = this._convertVector3ToArray(this.colors);

            //todo refacto OBJParser-> Collection<Vector3> to Collection<number>
            if(this.isDY){
                return <any>{
                    vertices: this.vertices.toArray(),
                    faces: this.faces.toArray(),
                    texCoords: this.texCoords.toArray(),
                    colors: this.colors.toArray()
                };
            }

            return {
                vertices: vertices,
                //indices: indices,
                //normals: normals,
                texCoords: texCoords,
                colors: colors
            };
        }

        private _convertVector3ToArray(list:dyCb.Collection<Vector3>){
            var result = [];

             for(var item of list.toArray()){
                 result.push(item.x);
                 result.push(item.y);
                 result.push(item.z);
            }

            return result;
        }

        private _convertVector2ToArray(list:dyCb.Collection<Vector2>){
            var result = [];

            for(var item of list.toArray()){
                result.push(item.x);
                result.push(item.y);
            }

            return result;
        }
    }
}

