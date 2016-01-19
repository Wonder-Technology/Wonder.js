module wd {
    function _canUseNewCanvasBlendModes(){
        var canvas = null,
            context = null;

        if (typeof document === 'undefined'){
            return false;
        }

        canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;

        context = canvas.getContext('2d');
        context.fillStyle = '#000';
        context.fillRect(0,0,1,1);
        context.globalCompositeOperation = 'multiply';
        context.fillStyle = '#fff';
        context.fillRect(0,0,1,1);

        return context.getImageData(0,0,1,1).data[0] === 0;
    }
    //todo support .gif animation(now can only show static picture)
    //todo support draw a part of image asset
    export class Image extends UI {
        /*!
         can't change prototype directly
         (as:
         Image.prototype._blendColorWithSource = _canUseNewCanvasBlendModes() ?
         Image.prototype._blendByMultiply : Image.prototype._blendByPerPixel;
         )
         because it pass compile that says it can't invoke private method(_blendxxx is private method)
         so use hack here.
         see more info: https://typescript.codeplex.com/discussions/444777
         */
        public static constructorForBlend = function(obj) {
            obj._blendColorWithSource = _canUseNewCanvasBlendModes() ?
                obj._blendByMultiply : obj._blendByPerPixel;
            return true;
        };

        public static constructorInitForBlend = Image.constructorForBlend(Image.prototype);

        public static create() {
            var obj = new this();

            return obj;
        }

        private _source:ImageTextureAsset = null;
        get source(){
            return this._source;
        }
        set source(source:ImageTextureAsset){
            if(source !== this._source){
                this._source = source;

                this.dirty = true;
            }
        }

        public color:Color = null;
        public targetSource:ImageTextureAsset = null;

        //implement it in STATIC_CONSTRUCTOR
        private _blendColorWithSource:Function;

        protected shouldNotUpdate(){
            return this._getDrawSource() === null && this.color === null;
        }

        protected draw(elapsedTime:number){
            if(this.color !== null){
                let position = this.entityObject.transform.position;

                this.context.fillStyle = this.color.toString();

                if(this.color.a !== 1){
                    this._setGlobalAlpha(this.context, this.color.a);
                }

                //todo move to utils
                this.context.fillRect(position.x - this.width / 2, position.y - this.height / 2, this.width, this.height);

                if(this._getDrawSource()){
                    this._blendColorWithSource();
                }
            }
            else{
                this.drawInCenterPoint(this.context, this._getDrawSource().source, this.entityObject.transform.position, this.width, this.height);
            }
        }

        private _getDrawSource():ImageTextureAsset{
            if(this.targetSource){
                return this.targetSource;
            }

            return this.source;
        }

        @require(function(){
            assert(!!this._getDrawSource(), Log.info.FUNC_SHOULD("source", "exist"));
        })
        private _blendByMultiply(){
            this._setGlobalCompositeOperation(this.context, "multiply");

            this.drawInCenterPoint(this.context, this._getDrawSource().source, this.entityObject.transform.position, this.width, this.height);
        }

        @require(function(){
            assert(!!this._getDrawSource(), Log.info.FUNC_SHOULD("source", "exist"));
        })
        private _blendByPerPixel(){
            var context = this.context,
                canvas = this.getCanvas(),
                r = this.color.r,
                g = this.color.g,
                b = this.color.b,
                pixelData = null,
                pixels = null;

            context.globalCompositeOperation = "copy";

            this.drawInCenterPoint(this.context, this._getDrawSource().source, this.entityObject.transform.position, this.width, this.height);

            pixelData = context.getImageData(0, 0, canvas.width, canvas.height);
            pixels = pixelData.data;

            for (let i = 0, len = pixels.length; i < len; i += 4) {
                pixels[i] *= r;
                pixels[i + 1] *= g;
                pixels[i + 2] *= b;
            }

            context.putImageData(pixelData, 0, 0);
        }

        private _setGlobalCompositeOperation(context:any, mode:string){
            context.globalCompositeOperation = mode;
        }

        private _setGlobalAlpha(context:any, alpha:number){
            context.globalAlpha = alpha;
        }
    }
}

