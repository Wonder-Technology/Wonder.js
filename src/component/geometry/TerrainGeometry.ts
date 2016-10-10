module wd{
    export class TerrainGeometry extends Geometry{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _rangeWidth:number = null;
        @cloneAttributeAsBasicType()
        get rangeWidth(){
            if(this._rangeWidth !== null){
                return this._rangeWidth;
            }

            if(this._heightMapImageDataCacheWidth !== null){
                if(this.isHeightMapStoreHeightInEachPixel){
                    return this._heightMapImageDataCacheWidth * 4;
                }
                else{
                    return this._heightMapImageDataCacheWidth;
                }
            }

            return 256;
        }
        set rangeWidth(rangeWidth:number){
            this._rangeWidth = rangeWidth;
        }

        private _rangeHeight:number = null;
        @cloneAttributeAsBasicType()
        get rangeHeight(){
            if(this._rangeHeight !== null){
                return this._rangeHeight;
            }

            if(this._heightMapImageDataCacheHeight !== null){
                return this._heightMapImageDataCacheHeight;
            }

            return 256;
        }
        set rangeHeight(rangeHeight:number){
            this._rangeHeight = rangeHeight;
        }

        get heightMapImageDataWidth(){
            return this._heightMapImageDataCacheWidth;
        }

        get heightMapImageDataHeight(){
            return this._heightMapImageDataCacheHeight;
        }

        @cloneAttributeAsCustomType(function(source:Geometry, target:Geometry, memberName:string){
            if(source[memberName]){
                target[memberName] = ImageTextureAsset.create(source[memberName].source);
            }
        })
        public heightMapAsset:ImageTextureAsset = null;
        @cloneAttributeAsBasicType()
        public subdivisions:number = 1;
        @cloneAttributeAsBasicType()
        public minHeight:number = 0;
        @cloneAttributeAsBasicType()
        public maxHeight:number = 10;
        @cloneAttributeAsBasicType()
        public isHeightMapStoreHeightInEachPixel:boolean = true;

        private _heightMapImageDataCache:Uint8Array = null;
        private _heightMapImageDataCacheWidth:number = null;
        private _heightMapImageDataCacheHeight:number = null;
        private _heightCache:Array<number> = [];

        public getHeightAtCoordinates(x:number, z:number):number {
            var transform = this.entityObject.transform,
                heightFromHeightMapData:number = null,
                heightMapIndex:number = null;

            if(!this._isReadHeightMapData()){
                this._readHeightMapData();
            }

            heightMapIndex = this._computeHeightMapIndex(this._computeHeightMapRow(z), this._computeHeightMapCol(x));

            let cacheHeight = this._heightCache[heightMapIndex];

            if(cacheHeight !== void 0){
                heightFromHeightMapData = cacheHeight;
            }
            else{
                heightFromHeightMapData = this._getHeightByReadHeightMapData(heightMapIndex);

                this._heightCache[heightMapIndex] = heightFromHeightMapData;
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
                width = this.rangeWidth,
                height = this.rangeHeight,
                heightCache = this._heightCache;

            for (let row = 0; row <= subdivisions; row++) {
                for (let col = 0; col <= subdivisions; col++) {
                    let x = (col * width) / subdivisions - (width / 2.0),
                        z = ((subdivisions - row) * height) / subdivisions - (height / 2.0),
                        heightMapRow = this._computeHeightMapRow(z),
                        heightMapCol = this._computeHeightMapCol(x),
                        y:number = null,
                        heightMapIndex = this._computeHeightMapIndex(heightMapRow, heightMapCol),
                        cacheHeight:number = null;

                    y = this._getHeightByReadHeightMapData(heightMapIndex);

                    heightCache[heightMapIndex] = y;

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

        private _computeHeightMapCol(x:number){
            var heightMapImageDataWidth = this._heightMapImageDataCacheWidth,
                width = this.rangeWidth;

            return Math.floor((x + width / 2) / width * (heightMapImageDataWidth - 1));
        }

        private _computeHeightMapRow(z:number){
            var heightMapImageDataHeight = this._heightMapImageDataCacheHeight,
                height = this.rangeHeight;

            return Math.floor((1.0 - (z + height / 2) / height) * (heightMapImageDataHeight - 1));
        }

        private _computeHeightMapIndex(heightMapRow:number, heightMapCol:number){
            return (heightMapCol + heightMapRow * this._heightMapImageDataCacheWidth) * 4
        }

        private _getHeightByReadHeightMapData(heightMapIndex:number){
            var heightMapImageData = this._heightMapImageDataCache,
                /*!
                 compute gradient from rgb heightMap->r,g,b components
                 */
                r = heightMapImageData[heightMapIndex] / 256.0,
                g = heightMapImageData[heightMapIndex + 1] / 256.0,
                b = heightMapImageData[heightMapIndex + 2] / 256.0,
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
}

