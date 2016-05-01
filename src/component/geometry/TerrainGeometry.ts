module wd{
    export class TerrainGeometry extends Geometry{
        public static create() {
            var obj = new this();

            return obj;
        }

        @cloneAttributeAsBasicType()
        public subdivisions:number = 1;
        @cloneAttributeAsCustomType(function(source:Geometry, target:Geometry, memberName:string){
            target[memberName].width = source[memberName].width;
            target[memberName].height = source[memberName].height;
        })
        public range:Range = {
            width: 10,
            height: 10
        };
        @cloneAttributeAsBasicType()
        public minHeight:number = 0;
        @cloneAttributeAsBasicType()
        public maxHeight:number = 10;
        @cloneAttributeAsCustomType(function(source:Geometry, target:Geometry, memberName:string){
            if(source[memberName]){
                target[memberName] = ImageTextureAsset.create(source[memberName].source);
            }
        })
        public heightMapAsset:ImageTextureAsset = null;

        public computeData(): GeometryDataType{
            var image:HTMLImageElement = this.heightMapAsset.source,
                bufferWidth = image.width,
                bufferHeight = image.height;

            return this._createGroundFromHeightMap(this._readHeightMapData(image, bufferWidth, bufferHeight), bufferWidth, bufferHeight);
        }

        private _readHeightMapData(image:HTMLImageElement, bufferWidth:number, bufferHeight:number){
            var canvas = document.createElement("canvas"),
                context = canvas.getContext("2d");

            canvas.width = bufferWidth;
            canvas.height = bufferHeight;

            context.drawImage(image, 0, 0);

            return <Uint8Array>(<any>context.getImageData(0, 0, bufferWidth, bufferHeight).data);
        }

        private _createGroundFromHeightMap(buffer: Uint8Array, bufferWidth: number, bufferHeight: number ){
            var vertices = [],
                normals = [],
                texCoords = [],
                subdivisions = this.subdivisions,
                width = this.range.width,
                height = this.range.height;

            for (let row = 0; row <= subdivisions; row++) {
                for (let col = 0; col <= subdivisions; col++) {
                    let x = (col * width) / subdivisions - (width / 2.0),
                        z = ((subdivisions - row) * height) / subdivisions - (height / 2.0);

                    vertices.push(x, this._getHeight(x, z, buffer, bufferWidth, bufferHeight), z);
                    texCoords.push(col / subdivisions, 1.0 - row / subdivisions);
                }
            }

            return {
                vertices: vertices,
                faces: GeometryUtils.convertToFaces(this._getIndices(), normals),
                texCoords: texCoords
            };
        }

        private _getHeight(x:number, z:number, buffer: Uint8Array, bufferWidth: number, bufferHeight: number){
            var width = this.range.width,
                height = this.range.height,
                heightMapX = (((x + width / 2) / width) * (bufferWidth - 1)) | 0,
                heightMapY = ((1.0 - (z + height / 2) / height) * (bufferHeight - 1)) | 0,
                pos = (heightMapX + heightMapY * bufferWidth) * 4,
                r = buffer[pos] / 255.0,
                g = buffer[pos + 1] / 255.0,
                b = buffer[pos + 2] / 255.0,
                gradient = r * 0.3 + g * 0.59 + b * 0.11,
                minHeight = this.minHeight,
                maxHeight = this.maxHeight;

            return minHeight + (maxHeight - minHeight) * gradient;
        }

        private _getIndices(){
            var indices = [],
                subdivisions = this.subdivisions;

            for (let row = 0; row < subdivisions; row++) {
                for (let col = 0; col < subdivisions; col++) {
                    indices.push(col + row * (subdivisions + 1));
                    indices.push(col + 1 + row * (subdivisions + 1));
                    indices.push(col + 1 + (row + 1) * (subdivisions + 1));

                    indices.push(col + row * (subdivisions + 1));
                    indices.push(col + 1 + (row + 1) * (subdivisions + 1));
                    indices.push(col + (row + 1) * (subdivisions + 1));
                }
            }

            return indices;
        }
    }

    export type Range = {
        width:number;
        height:number;
    }
}
