module wd{
    export class TerrainGeometry extends Geometry{
        public static create() {
        	var obj = new this();

        	return obj;
        }


        //public material:TerrainMaterial;

        public subdivisions:number = 1;
        public range:Range = {
            width: 10,
            height: 10
        };
        public minHeight:number = 0;
        public maxHeight:number = 10;

        public heightMap:BasicTexture = null;


        protected computeData(): GeometryDataType{
            // Getting height map data
            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");
            //var material:TerrainMaterial = this.material;
            //var img:Texture = this.material.heightMap;
            var img:HTMLImageElement = this.heightMap.source;
            var bufferWidth = img.width;
            var bufferHeight = img.height;
            canvas.width = bufferWidth;
            canvas.height = bufferHeight;

            context.drawImage(img, 0, 0);

            // Create VertexData from map data
            // Cast is due to wrong definition in lib.d.ts from ts 1.3 - https://github.com/Microsoft/TypeScript/issues/949
            var buffer = <Uint8Array>(<any>context.getImageData(0, 0, bufferWidth, bufferHeight).data);


            return this._createGroundFromHeightMap(buffer, bufferWidth, bufferHeight);
        }

        private _createGroundFromHeightMap(buffer: Uint8Array, bufferWidth: number, bufferHeight: number ){
            var indices = [];
            var vertices = [];
            var normals = [];
            var texCoords = [];
            var row, col;
            var subdivisions = this.subdivisions,
                width = this.range.width,
                height = this.range.height,
                minHeight = this.minHeight,
                maxHeight = this.maxHeight;

            // Vertices
            for (row = 0; row <= subdivisions; row++) {
                for (col = 0; col <= subdivisions; col++) {
                    let x = (col * width) / subdivisions - (width / 2.0),
                        y = 0,
                        z = ((subdivisions - row) * height) / subdivisions - (height / 2.0);

                    // Compute height
                    var heightMapX = (((x + width / 2) / width) * (bufferWidth - 1)) | 0;
                    var heightMapY = ((1.0 - (z + height / 2) / height) * (bufferHeight - 1)) | 0;

                    var pos = (heightMapX + heightMapY * bufferWidth) * 4;
                    var r = buffer[pos] / 255.0;
                    var g = buffer[pos + 1] / 255.0;
                    var b = buffer[pos + 2] / 255.0;

                    var gradient = r * 0.3 + g * 0.59 + b * 0.11;

                    y = minHeight + (maxHeight - minHeight) * gradient;

                    vertices.push(x, y, z);
                    //normals.push(0, 0, 0);
                    texCoords.push(col / subdivisions, 1.0 - row / subdivisions);
                }
            }

            // Indices
            for (row = 0; row < subdivisions; row++) {
                for (col = 0; col < subdivisions; col++) {
                    indices.push(col + row * (subdivisions + 1));
                    indices.push(col + 1 + row * (subdivisions + 1));
                    indices.push(col + 1 + (row + 1) * (subdivisions + 1));

                    indices.push(col + row * (subdivisions + 1));
                    indices.push(col + 1 + (row + 1) * (subdivisions + 1));
                    indices.push(col + (row + 1) * (subdivisions + 1));
                }
            }

            // Normals
            //VertexData.ComputeNormals(vertices, indices, normals);

            // Result
            //var vertexData = new VertexData();

            return {
                vertices: vertices,
                faces: GeometryUtils.convertToFaces(indices, normals),
                texCoords: texCoords
            };
        }
    }

    export type Range = {
        width:number;
        height:number;
    }
}
