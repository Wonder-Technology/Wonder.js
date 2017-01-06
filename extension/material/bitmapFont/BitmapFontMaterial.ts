module wd{
    export class BitmapFontMaterial extends StandardLightMaterial{
        public static create() {
        	var obj = new this();

            obj.initWhenCreate();

        	return obj;
        }

        public geometry:BitmapFontGeometry;

        @cloneAttributeAsBasicType()
        public enableSdf:boolean = false;
        @cloneAttributeAsBasicType()
        public sdfType:SdfBitmapFontType = SdfBitmapFontType.SMOOTH;
        @cloneAttributeAsBasicType()
        public alphaTest:number = 0.0001;

        private _bitmap:ImageTexture = null;
        @requireSetter(function(map:ImageTexture){
            it("should add ImageTexture", function () {
                expect(map).instanceOf(ImageTexture);
            });
        })
        @cloneAttributeAsCloneable()
        get bitmap(){
            return this._bitmap;
        }
        set bitmap(map:ImageTexture){
            this.mapManager.addMap(map, {
                samplerVariableName: VariableNameTable.getVariableName("bitmap")
            });

            this._bitmap = map;
        }

        private _pageMapData:Array<ImageTexture> = null;
        @requireSetter(function(pageMapData:Array<ImageTexture>){
            it("pageMapData should be Array type", function () {
                expect(pageMapData).be.a("array");
            });
        })
        @cloneAttributeAsCustomType(function(source:BitmapFontMaterial, target:BitmapFontMaterial, memberName:string){
            target[memberName] = CloneUtils.cloneArray(source[memberName], true);
        })
        get pageMapData(){
            return this._pageMapData;
        }
        set pageMapData(pageMapData:Array<ImageTexture>){
            this._pageMapData = pageMapData;
        }

        @virtual
        @require(function(){
            it("should only set pageMap or bitmap ", function () {
                expect(
                    (this.pageMapData !== null && this.bitmap === null)
                    || (this.pageMapData === null && this.bitmap !== null)
                ).true;
            }, this);

            describe("if has multi pages", function(){
                it("each map in pageMapData should be all flipY or all not", function () {
                    var count = this.pageMapData.filter((map:ImageTexture) => {
                        return map.flipY === true;
                    }).length;

                    expect(count === 0 || count === this.pageMapData.length).true;
                });
            }, function(){
                return this.pageMapData !== null && this.pageMapData.length > 0;
            }, this);
        })
        public isMapFlipY():boolean{
            if(this.pageMapData !== null && this.pageMapData.length > 0){
                return this.pageMapData[0].flipY;
            }

            return this.bitmap.flipY;
        }

        public initWhenCreate(){
            super.initWhenCreate();

            this.blend = true;
        }

        public init(){
            if(this._hasMultiPages()){
                this.mapManager.addMapArray("u_pageSampler2Ds", this.pageMapData);
            }

            super.init();
        }

        public getTextureForRenderSort():Texture{
            if(this.bitmap){
                return this.bitmap;
            }

            if(this.pageMapData){
                return this.pageMapData[0];
            }

            return null;
        }

        protected addExtendShaderLib(){
            if(this._hasMultiPages()){
                this.shader.addLib(MultiPagesBitmapFontShaderLib.create());
            }
            else if(!this._isSdfFont()){
                this.shader.addLib(BasicBitmapFontShaderLib.create());
            }
        }

        protected addEndShaderLib(){
            this.shader.addLib(CommonBitmapFontShaderLib.create());

            if(this._isSdfFont()){
                switch (this.sdfType){
                    case SdfBitmapFontType.SMOOTH:
                        this.shader.addLib(SdfBitmapFontSmoothShaderLib.create());
                        break;
                    default:
                        Log.error(true, Log.info.FUNC_UNKNOW(`sdfType:${this.sdfType}`));
                }
            }
        }

        @ensure(function(hasMultiPages:boolean){
            if(hasMultiPages){
                it("should has one page map at least", function () {
                    expect(this.pageMapData.length).greaterThan(0);
                }, this);
            }
        })
        private _hasMultiPages(){
            return this.geometry.hasMultiPages();
        }

        private _isSdfFont(){
            return this.enableSdf;
        }
    }
}

