/// <reference path="../../definitions.d.ts"/>
module dy{
    export abstract class Geometry extends Component{
        private _material:Material = null;
        get material(){
            return this._material;
        }
        set material(material:Material){
            this._material = material;
            this._material.geometry = this;
        }

        get geometryData(){
            return this.buffers.geometryData;
        }

        public buffers:BufferContainer = null;

        public init(){
            var geometryData = null,
                {
                vertices,
                indices,
                normals,
                texCoords,
                colors
                } = this.computeData();

            this.buffers = BufferContainer.create();

            geometryData = GeometryData.create(this);
            geometryData.vertices = vertices;
            geometryData.indices = indices;
            geometryData.normals = normals;
            geometryData.texCoords = texCoords;
            geometryData.colors = colors;

            this.buffers.geometryData = geometryData;

            this._material.init();
        }

        public dispose(){
            this.buffers.dispose();

            this._material.dispose();
        }

        protected abstract computeData(): GeometryDataType;
    }

    export type GeometryDataType = {
        vertices:Array<number>;
        indices:Array<number>;
        normals:Array<number>;
        texCoords:Array<number>;
        colors?:Array<number>;
    };
}

