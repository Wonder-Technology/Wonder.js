module wd{
    export class TerrainGeometry extends Geometry{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _heightMapAsset:ImageTextureAsset = null;
        @cloneAttributeAsCustomType(function(source:Geometry, target:Geometry, memberName:string){
            if(source[memberName]){
                target[memberName] = ImageTextureAsset.create(source[memberName].source);
            }
        })
        @requireSetter(function(heightMapAsset:ImageTextureAsset){
            it("heightMapAsset should be ImageTextureAsset", function () {
                expect(heightMapAsset).instanceOf(ImageTextureAsset);
            });
        })
        get heightMapAsset(){
            return this._heightMapAsset;
        }
        set heightMapAsset(heightMapAsset:ImageTextureAsset){
            if(!JudgeUtils.isEqual(this._heightMapAsset, heightMapAsset)){
                this._heightMapAsset = heightMapAsset;

                this._clearCache();
            }
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

        private _heightMapImageDataCache:Uint8Array = null;
        private _heightMapImageDataCacheWidth:number = null;
        private _heightMapImageDataCacheHeight:number = null;
        private _heightCache:Array<number> = [];

        public getHeightAtCoordinates(x:number, z:number):number {
            var transform = this.entityObject.transform,
                heightFromHeightMapData:number = null;

            if(!this._isReadHeightMapData()){
                this._readHeightMapData();
            }

            if(this._heightCache.length > 0){
                heightFromHeightMapData = this._heightCache[this._buildHeightCacheKey(this.subdivisions, this._computeHeightMapRow(z), this._computeHeightMapCol(x))];
            }
            else{
                heightFromHeightMapData = this._getHeightByReadHeightMapData(this._computeHeightMapRow(z), this._computeHeightMapCol(x));
            }

            return heightFromHeightMapData * transform.scale.y + transform.position.y;
        }

        public computeData(): GeometryDataType{
            if(!this._isReadHeightMapData()){
                this._readHeightMapData();
            }

            return this._createGroundFromHeightMap();
        }

        private _isReadHeightMapData(){
            return this._heightMapImageDataCache !== null;
        }

        private _readHeightMapData(){
            var image:HTMLImageElement = this.heightMapAsset.source,
                heightMapImageDataWidth = image.width,
                heightMapImageDataHeight = image.height,
                canvas = document.createElement("canvas"),
                context = canvas.getContext("2d");

            canvas.width = heightMapImageDataWidth;
            canvas.height = heightMapImageDataHeight;

            context.drawImage(image, 0, 0);

            this._heightMapImageDataCache = <Uint8Array>context.getImageData(0, 0, heightMapImageDataWidth, heightMapImageDataHeight).data;
            this._heightMapImageDataCacheWidth = heightMapImageDataWidth;
            this._heightMapImageDataCacheHeight = heightMapImageDataHeight;
        }

        private _createGroundFromHeightMap(){
            var vertices = [],
                normals = [],
                texCoords = [],
                subdivisions = this.subdivisions,
                width = this.range.width,
                height = this.range.height,
                heightCache = this._heightCache;

            for (let row = 0; row <= subdivisions; row++) {
                for (let col = 0; col <= subdivisions; col++) {
                    let x = (col * width) / subdivisions - (width / 2.0),
                        z = ((subdivisions - row) * height) / subdivisions - (height / 2.0),
                        heightMapRow = this._computeHeightMapRow(z),
                        heightMapCol = this._computeHeightMapCol(x),
                        y:number = null;

                    y = this._getHeightByReadHeightMapData(heightMapRow, heightMapCol);

                    heightCache[this._buildHeightCacheKey(subdivisions, heightMapRow, heightMapCol)] = y;

                    vertices.push(x, y, z);
                    texCoords.push(col / subdivisions, 1.0 - row / subdivisions);
                }
            }

            return {
                vertices: vertices,
                faces: GeometryUtils.convertToFaces(this._getIndices(), normals),
                texCoords: texCoords
            };
        }

        private _buildHeightCacheKey(subdivisions:number, heightMapRow:number, heightMapCol:number){
            return heightMapRow * subdivisions + heightMapCol;
        }

        private _computeHeightMapCol(x:number){
            var heightMapImageDataWidth = this._heightMapImageDataCacheWidth,
                width = this.range.width;

            return Math.floor((((x + width / 2) / width) * (heightMapImageDataWidth - 1)));
        }

        private _computeHeightMapRow(z:number){
            var heightMapImageDataHeight = this._heightMapImageDataCacheHeight,
                height = this.range.height;

            return Math.floor(((1.0 - (z + height / 2) / height) * (heightMapImageDataHeight - 1)));
        }

        private _getHeightByReadHeightMapData(heightMapRow:number, heightMapCol:number){
            var heightMapImageData = this._heightMapImageDataCache,
                heightMapImageDataWidth = this._heightMapImageDataCacheWidth,
                pos = (heightMapCol + heightMapRow * heightMapImageDataWidth) * 4,
            /*!
             compute gradient from rgb heightMap->r,g,b components
             */
                r = heightMapImageData[pos] / 256.0,
                g = heightMapImageData[pos + 1] / 256.0,
                b = heightMapImageData[pos + 2] / 256.0,
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

        private _clearCache(){
            this._heightCache = [];

            this._heightMapImageDataCache = null;
            this._heightMapImageDataCacheWidth = null;
            this._heightMapImageDataCacheHeight = null;
        }
    }

    export type Range = {
        width:number;
        height:number;
    }
}
