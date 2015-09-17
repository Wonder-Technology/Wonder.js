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

        protected computeData(){
            var width = this.width,
                height = this.height,
                widthSegments = this.widthSegments,
                heightSegments = this.heightSegments,
                x = null,
                y = null,
                z = null,
                u = null,
                v = null,
                i = null,
                j = null,
                vertices = [],
                texCoords = [],
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

                    vertices.push(x, y, z);
                    normals.push(0.0, 1.0, 0.0);
                    texCoords.push(u, v);

                    if ((i < widthSegments) && (j < heightSegments)) {
                        indices.push(j + i * (widthSegments + 1),       j + (i + 1) * (widthSegments + 1),     j + i * (widthSegments + 1) + 1);
                        indices.push(j + (i + 1) * (widthSegments + 1), j + (i + 1) * (widthSegments + 1) + 1, j + i * (widthSegments + 1) + 1);
                    }
                }
            }

            return {
                vertices: ArrayBuffer.create(new Float32Array(vertices),
                    3, BufferType.FLOAT),
                indices: ElementBuffer.create(new Uint16Array(indices),
                    BufferType.UNSIGNED_SHORT),
                normals: ArrayBuffer.create(new Float32Array(normals),
                    3, BufferType.FLOAT),
                texCoords: ArrayBuffer.create(new Float32Array(texCoords),
                    2, BufferType.FLOAT),
                tangents: ArrayBuffer.create(new Float32Array(this.calculateTangents(vertices, normals, texCoords, indices)),
                    3, BufferType.FLOAT),
            };
        }
    }
}

