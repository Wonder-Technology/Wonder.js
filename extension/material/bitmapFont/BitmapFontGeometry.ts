module wd{
    export class BitmapFontGeometry extends Geometry{
        public static create(){
            var geom = new this();

            return geom;
        }

        public material:BitmapFontMaterial;

        private _pages:Array<number> = null;

        public computeData(){
            var bitmapFont = this.entityObject.getComponent<ThreeDBitmapFont>(ThreeDBitmapFont),
                layoutDataList = bitmapFont.layoutDataList,
                vertices = null,
                texCoords = null,
                indices = null,
                fntData:FntData = LoaderManager.getInstance().get(bitmapFont.fntId);

            //todo get visible glyphs?

            if(layoutDataList){
                vertices = this._generateVertices(layoutDataList, bitmapFont.width, bitmapFont.height);
                texCoords = this._generateTexCoords(layoutDataList, fntData.scaleW, fntData.scaleH, this.material.isMapFlipY());
                indices = this._generateIndices(layoutDataList);

                if(fntData.isMultiPages){
                    this._pages = this._generatePages(layoutDataList);
                }
            }
            else {
                vertices = [];
                texCoords = [];
                indices = [];

                this._pages = [];
            }

            return {
                vertices: vertices,
                faces: GeometryUtils.convertToFaces(indices, null),
                texCoords: texCoords
            };
        }

        public updateBuffers(){
            if(this.buffers === null) {
                return;
            }

            let geometryData = null,
                {
                    vertices,
                    faces,
                    texCoords
                    } = this.computeData();

            this.buffers.geometryData.vertices = vertices;
            this.buffers.geometryData.faces = faces;
            this.buffers.geometryData.texCoords = texCoords;

            if(this.hasMultiPages()){
                (<BitmapFontBufferContainer>this.buffers).geometryData.pages = this._pages;
            }
        }

        public hasMultiPages(){
            return this._pages !== null && this._pages.length > 0;
        }

        protected createBufferContainer():BufferContainer{
            if(this.hasMultiPages()){
                return BitmapFontBufferContainer.create(this.entityObject);
            }

            return BasicBufferContainer.create(this.entityObject);
        }

        protected createGeometryData(computedData:GeometryDataType):GeometryData{
            if(this.hasMultiPages()){
                let {
                        vertices,
                        faces = [],
                        texCoords,
                        colors
                    } = computedData,
                    geometryData = BitmapFontGeometryData.create(this);

                geometryData.vertices = vertices;
                geometryData.faces = faces;
                geometryData.texCoords = texCoords;
                geometryData.colors = colors;
                geometryData.pages = this._pages;

                return geometryData;
            }

            return this.createBasicGeometryData(computedData);
        }

        private _generatePages(layoutDataList:wdCb.Collection<LayoutCharData>){
            var pages = [],
                i = 0;

            layoutDataList.forEach(function (layoutCharData:LayoutCharData) {
                let page = layoutCharData.data.page || 0;

                pages[i++] = page;
                pages[i++] = page;
                pages[i++] = page;
                pages[i++] = page;
            });

            return pages;
        }

        private _generateVertices(layoutDataList:wdCb.Collection<LayoutCharData>, bitmapFontWidth:number, bitmapFontHeight:number){
            var vertices = [],
                i = 0;

            layoutDataList.forEach(function (layoutCharData:LayoutCharData) {
                var rect = layoutCharData.data.rect,
                    z = 0,
                    w = rect.width,
                    h = rect.height,
                    position = CoordinateUtils.convertLeftCornerPositionToCenterPositionInWebGL(Vector2.create(layoutCharData.position[0], layoutCharData.position[1]), bitmapFontWidth, bitmapFontHeight),
                    x = position.x,
                    y = position.y;

                // BL
                vertices[i++] = x;
                vertices[i++] = -y;
                vertices[i++] = z;

                // TL
                vertices[i++] = x;
                vertices[i++] = -(y + h);
                vertices[i++] = z;
                // TR
                vertices[i++] = x + w;
                vertices[i++] = -(y + h);
                vertices[i++] = z;
                // BR
                vertices[i++] = x + w;
                vertices[i++] = -y;
                vertices[i++] = z;
            });

            return vertices;
        }

        private _generateTexCoords(layoutDataList:wdCb.Collection<LayoutCharData>, textureWidth:number, textureHeight:number, flipY:boolean){
            var texCoords = [],
                i = 0;

            layoutDataList.forEach((layoutDataList:LayoutCharData) => {
                var rect = layoutDataList.data.rect,
                    bw = (rect.x + rect.width),
                    bh = (rect.y + rect.height),
                    u0 = rect.x / textureWidth,
                    v0 = rect.y / textureHeight,
                    u1 = bw / textureWidth,
                    v1 = bh / textureHeight;

                if (flipY) {
                    v0= (textureHeight - rect.y) / textureHeight;
                    v1 = (textureHeight - bh) / textureHeight;
                }

                // BL
                texCoords[i++] = u0;
                texCoords[i++] = v0;
                // TL
                texCoords[i++] = u0;
                texCoords[i++] = v1;
                // TR
                texCoords[i++] = u1;
                texCoords[i++] = v1;
                // BR
                texCoords[i++] = u1;
                texCoords[i++] = v0;
            });

            return texCoords;
        }

        private _generateIndices(layoutDataList:wdCb.Collection<LayoutCharData>){
            var numIndices = layoutDataList.getCount() * 6,
                indices = [];

            for (let i = 0, j = 0; i < numIndices; i += 6, j += 4) {
                indices[i] = j;
                indices[i + 1] = j + 1;
                indices[i + 2] = j + 2;
                indices[i + 3] = j;
                indices[i + 4] = j + 2;
                indices[i + 5] = j + 3;
            }

            return indices;
        }
    }
}

