module wd {
    export class ProgressBar extends UI {
        public static create() {
            var obj = new this();

            return obj;
        }

        //todo test
        private _percent:number = 0;
        get percent(){
            return this._percent;
        }
        set percent(percent:number){
            if(this._percent !== percent){
                this._percent = percent;

                this.dirty = true;
            }
        }

        public borderStyle:string = "rgba(0, 0, 0, 1)";
        public fillStyle:string = "rgba(255, 0, 0, 1)";
        public radius:number = 5;

        private _offScreenCanvas:HTMLCanvasElement = null;
        private _offScreenContext:CanvasRenderingContext2D = null;

        public init(){
            super.init();

            this._createOffScreenCanvas();

            this._drawProgressBar();
        }

        protected shouldNotUpdate(){
            return this.percent <= 0;
        }

        @require(function(elapsedTime:number){
            assert(this.percent >= 0 && this.percent <= 1, Log.info.FUNC_SHOULD("percent", " >= 0 and <= 1"));
        })
        protected draw(elapsedTime:number){
            var position = this.entityObject.transform.position;

            //todo test
            this._drawFromLeft(position);
            this._drawBorder(position);
        }

        private _drawFromLeft(position){
            var offscreenCanvas = this._offScreenCanvas,
                loadedWidth = this.width * this.percent;

            this.drawInCenterPoint(this.context, offscreenCanvas, 0, 0, loadedWidth, this.height,
                Vector2.create(position.x - this.width / 2 + loadedWidth / 2, position.y), loadedWidth, this.height);
        }

        private _drawBorder(position:Vector2){
            RoundedRectUtils.drawRoundedRect(this.context, this.borderStyle, null, position.x - this.width / 2, position.y - this.height / 2, this.width, this.height, this.radius);
        }

        private _createOffScreenCanvas(){
            var canvas = wdCb.DomQuery.create("<canvas></canvas>");

            canvas.attr("width", this.context.canvas.width);
            canvas.attr("height", this.context.canvas.height);

            this._offScreenCanvas = canvas.get(0);

            this._offScreenContext = this._offScreenCanvas.getContext("2d");
        }

        private _drawProgressBar(){
            this._offScreenContext.clearRect(0, 0, this._offScreenCanvas.width, this._offScreenCanvas.height);

            RoundedRectUtils.drawRoundedRect(this._offScreenContext, this.borderStyle, this.fillStyle, 0, 0, this.width, this.height, this.radius);
        }
    }
}

