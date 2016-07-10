module wd{
    export class BitmapFontGeometry extends Geometry{
        public static create(){
            var geom = new this();

            return geom;
        }

        public material:BasicMaterial;

        @require(function(){
            it("now only support BasicMaterial", function () {
                expect(this.material).instanceOf(BasicMaterial);
            }, this);
            it("should add only one bitmap texture to material", function () {
                expect(this.material.mapList.getCount()).to.equal(1);
                expect(this.material.mapList.getChild(0)).instanceOf(BasicTexture);
            }, this);
        })
        public computeData(){
            var bitmapFont = this.entityObject.getComponent<ThreeDBitmapFont>(ThreeDBitmapFont),
                layoutDataList = bitmapFont.layoutDataList,
                vertices = null,
                texCoords = null,
                indices = null;

            var fntData:FntData = LoaderManager.getInstance().get(bitmapFont.fntId);

            //todo get visible glyphs?

            if(layoutDataList){
                vertices = this._generateVertices(layoutDataList);
                texCoords = this._generateTexCoords(layoutDataList, fntData.scaleW, fntData.scaleH, (<BasicTexture>this.material.mapList.getChild(0)).flipY);
                indices = this._generateIndices(layoutDataList);
            }
            else {
                vertices = [];
                texCoords = [];
                indices = [];
            }

            return {
                vertices: vertices,
                faces: GeometryUtils.convertToFaces(indices, null),
                texCoords: texCoords
            };
        }

        public updateBuffers(){
            if(this.buffers){
                var geometryData = null,
                    {
                        vertices,
                        faces,
                        texCoords
                        //colors,
                        //morphTargets
                        } = this.computeData();

                this.buffers.geometryData.vertices = vertices;
                //this.buffers.removeCache(EBufferDataType.VERTICE);

                this.buffers.geometryData.faces = faces;
                //this.buffers.removeCache(EBufferDataType.INDICE);

                this.buffers.geometryData.texCoords = texCoords;
                //this.buffers.removeCache(EBufferDataType.TEXCOORD);
            }
        }

        private _generateVertices(layoutDataList:wdCb.Collection<LayoutCharData>){
            //var vertices = new Float32Array(glyphs.length * 4 * 2)
            var vertices = [];
            var i = 0

            layoutDataList.forEach(function (layoutCharData:LayoutCharData) {
                var rect = layoutCharData.data.rect;

                // bottom left position
                var x = layoutCharData.position[0];
                var y = layoutCharData.position[1];
                //todo remove z?
                var z = 0;

                // quad size
                var w = rect.width;
                var h = rect.height;

                // BL
                vertices[i++] = x
                vertices[i++] = -y
                vertices[i++] = z;

                // TL
                vertices[i++] = x
                vertices[i++] = -(y + h)
                vertices[i++] = z;
                // TR
                vertices[i++] = x + w
                vertices[i++] = -(y + h)
                vertices[i++] = z;
                // BR
                vertices[i++] = x + w
                vertices[i++] = -y
                vertices[i++] = z;
            })
            return vertices;
        }

        private _generateTexCoords(layoutDataList:wdCb.Collection<LayoutCharData>, textureWidth:number, textureHeight:number, flipY:boolean){
            var texCoords = [];
            var i = 0
            layoutDataList.forEach((layoutDataList:LayoutCharData) => {
                var rect = layoutDataList.data.rect;
                var bw = (rect.x + rect.width)
                var bh = (rect.y + rect.height)


                var u0 = rect.x / textureWidth;
                var v1 = rect.y / textureHeight;
                var u1 = bw / textureWidth;
                var v0 = bh / textureHeight;

                if (flipY) {
                    v1 = (textureHeight - rect.y) / textureHeight;
                    v0 = (textureHeight - bh) / textureHeight;
                }

                // BL
                texCoords[i++] = u0
                texCoords[i++] = v1
                // TL
                texCoords[i++] = u0
                texCoords[i++] = v0
                // TR
                texCoords[i++] = u1
                texCoords[i++] = v0
                // BR
                texCoords[i++] = u1
                texCoords[i++] = v1
            })
            return texCoords;
        }

        private _generateIndices(layoutDataList:wdCb.Collection<LayoutCharData>){
            var count = layoutDataList.getCount();
            var numIndices = count * 6

            //var indices = array || new (dtype(type))(numIndices)
            var indices = [];

            for (var i = 0, j = 0; i < numIndices; i += 6, j += 4) {
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

