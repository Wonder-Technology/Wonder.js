//todo test
module wd{
    export class MultiPagesBitmapFontMaterial extends BitmapFontMaterial{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        private _pageMapList:wdCb.Collection<ImageTexture> = null;
        @requireSetter(function(pageMapList:wdCb.Collection<ImageTexture>){
            it("pageMapList should be Collection type", function () {
                expect(pageMapList).instanceOf(wdCb.Collection);
            });
        })
        @cloneAttributeAsCloneable()
        get pageMapList(){
            return this._pageMapList;
        }
        set pageMapList(pageMapList:wdCb.Collection<ImageTexture>){
            this._pageMapList = pageMapList;
        }

        @require(function(){
            var self = this;

            it("should has at least 1 pageMap", function () {
                expect(self.pageMapList.getCount()).greaterThan(0);
            });

            it("each map in pageMapList should be all flipY or all not", function () {
                var count = self.pageMapList.filter((map:ImageTexture) => {
                    return map.flipY === true;
                }).getCount();

                expect(count === 0 || count === self.pageMapList.getCount()).true;
            });
        })
        public isMapFlipY():boolean{
            return this.pageMapList.getChild(0).flipY;
        }

        protected addExtendShaderLib(){
            if(this.geometry.hasMultiPages()){
                this.shader.addLib(MultiPagesBitmapFontShaderLib.create());
            }
            else{
                this.shader.addLib(BasicBitmapFontShaderLib.create());
            }
        }

        public init(){
            this.mapManager.addMapArray("u_pageSampler2Ds", this.pageMapList.toArray());

            super.init();
        }
    }
}
