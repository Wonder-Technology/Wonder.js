module wd{
    export class LineMaterial extends StandardBasicMaterial{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        private _lineWidth:number = 1.0;
        @cloneAttributeAsBasicType()
        @requireSetter(function(lineWidth:number){
            it("lineWidth should <= 1", () => {
                expect(lineWidth).not.to.greaterThan(1);
            });
        })
        @ensureGetter(function(lineWidth:number){
            it("lineWidth should <= 1", () => {
                expect(lineWidth).not.to.greaterThan(1);
            });
        })
        get lineWidth(){
            return this._lineWidth;
        }
        set lineWidth(lineWidth:number){
            this._lineWidth = lineWidth;
        }

        public getTextureForRenderSort():Texture{
            return this.mapList.getChild(0);
        }
    }
}

