module wd {
    export class BitmapFontBufferContainer extends CommonBufferContainer{
        public static create(entityObject:GameObject) {
            var obj = new this(entityObject);

            return obj;
        }

        public geometryData:BitmapFontGeometryData;

        private _pageBuffer:ArrayBuffer = null;

        public createBuffersFromGeometryData(){
            super.createBuffersFromGeometryData();

            this.getChild(EBufferDataType.CUSTOM, "pages");
        }

        public getBufferForRenderSort():Buffer{
            var buffer = this.getChild(EBufferDataType.VERTICE);

            if(!buffer){
                return null;
            }

            return buffer;
        }

        @cacheBufferForBufferContainer()
        protected getCustomData(dataName:string){
            var geometryData = this.geometryData[dataName];

            if(!this.hasData(geometryData)){
                return null;
            }

            this.createOnlyOnceAndUpdateArrayBuffer("_pageBuffer", geometryData, 1);

            return this._pageBuffer;
        }
    }
}


