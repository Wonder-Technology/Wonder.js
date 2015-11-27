/// <reference path="../../filePath.d.ts"/>
module dy{
    //todo support morphTargets?
    export class CustomGeometry extends Geometry{
        public static create(){
            var geom = new this();

            return geom;
        }

        public vertices:Array<number> = null;
        public texCoords:Array<number> = null;
        public colors:Array<number> = null;
        public indices:Array<number> = null;
        public normals:Array<number> = null;

        protected computeData(){
            return {
                vertices: this.vertices,
                faces: GeometryUtils.convertToFaces(this.indices, this.normals),
                texCoords: this.texCoords,
                colors: this.colors
            };
        }

        protected createBufferContainer():BufferContainer{
            return CommonBufferContainer.create();
        }
    }
}

