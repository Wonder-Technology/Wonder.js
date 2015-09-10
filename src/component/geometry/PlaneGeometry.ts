/// <reference path="../../definitions.d.ts"/>
module dy{
    export class PlaneGeometry extends Geometry{
        public static create(){
            var geom = new this();

            return geom;
        }

        public width:number = null;
        public height:number = null;
        public widthSegments:number = 1;
        public heightSegments:number = 1;

        private _data:{
            vertices;
            indices;
            normals;
            texCoords;
        } = null;

        public init() {
            this._data = this._computeData(this.width, this.height, this.widthSegments, this.heightSegments);

            super.init();
        }

        private _computeData(width, height, widthSegments, heightSegments){
            var x = null,
                y = null,
                z = null,
                u = null,
                v = null,
                i = null,
                j = null,
                positions = [],
                uvs = [],
                indices = [],
                normals = [];

            // Generate plane as follows (assigned UVs denoted at corners):
            // (0,1)x---------x(1,1)
            //      |         |
            //      |         |
            //      |    O--X |length
            //      |    |    |
            //      |    Z    |
            // (0,0)x---------x(1,0)
            //         width
            for (i = 0; i <= widthSegments; i++) {
                for (j = 0; j <= heightSegments; j++) {
                    x = -width + 2.0 * width * i / widthSegments;
                    y = 0.0;
                    z = -(-height + 2.0 * height * j / heightSegments);
                    u = i / widthSegments;
                    v = j / heightSegments;

                    positions.push(x, y, z);
                    normals.push(0.0, 1.0, 0.0);
                    uvs.push(u, v);

                    if ((i < widthSegments) && (j < heightSegments)) {
                        indices.push(j + i * (widthSegments + 1),       j + (i + 1) * (widthSegments + 1),     j + i * (widthSegments + 1) + 1);
                        indices.push(j + (i + 1) * (widthSegments + 1), j + (i + 1) * (widthSegments + 1) + 1, j + i * (widthSegments + 1) + 1);
                    }
                }
            }

            return {
                vertices: render.ArrayBuffer.create(new Float32Array(positions),
                    3, render.BufferType.FLOAT),
                indices: render.ElementBuffer.create(new Uint16Array(indices),
                    render.BufferType.UNSIGNED_SHORT),
                normals: render.ArrayBuffer.create(new Float32Array(normals),
                    3, render.BufferType.FLOAT),
                texCoords: render.ArrayBuffer.create(new Float32Array(uvs),
                    2, render.BufferType.FLOAT)
            };
        }

        protected computeVerticesBuffer(){
            return this._data.vertices;
        }

        protected computeIndicesBuffer(){
            return this._data.indices;
        }

        protected computeNormalsBuffer(){
            return this._data.normals;
        }

        protected computeTexCoordsBuffer():render.ArrayBuffer{
            return this._data.texCoords;
        }
    }
}

