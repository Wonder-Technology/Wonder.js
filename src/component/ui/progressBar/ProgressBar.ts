/// <reference path="../../../filePath.d.ts"/>
module wd {
    export class ProgressBar extends UI {
        public static create() {
            var obj = new this();

            return obj;
        }

        //public width:number = 0;
        //public height:number = 0;
        public borderStyle:string = "rgba(0, 0, 0, 1)";
        public fillStyle:string = "rgba(255, 0, 0, 1)";
        public radius:number = 5;
        public percent:number = 0;

        private _offScreenCanvas:HTMLCanvasElement = null;
        private _offScreenContext:CanvasRenderingContext2D = null;
        private _isInit:boolean = false;

        public init(){
            //todo font also
            if(this._isInit){
                return;
            }

            this._isInit = true;


            this.context = this.getContext();

            this._createOffScreenCanvas();

            this._drawProgressBar();
        }

        @require(function(elapsedTime:number){
            assert(this.percent >= 0 && this.percent <= 1, Log.info.FUNC_SHOULD("percent", " >= 0 and <= 1"));
        })
        public update(elapsedTime:number){
            if(this.percent > 0){
                let offscreenCanvas = this._offScreenCanvas,
                position = this.gameObject.transform.position;

                this.context.save();

                this.setCanvasTransformForRotation();

                this._drawBorder(position);

                this.drawInCenterPoint(this.context, offscreenCanvas, 0, 0, this.width * this.percent, this.height, position, this.width * this.percent, this.height);

                this.context.restore();
            }
        }

        public dispose(){
        }

        private _drawBorder(position:Vector2){
            //todo refactor
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

