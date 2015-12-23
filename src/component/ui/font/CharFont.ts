/// <reference path="../../../filePath.d.ts"/>
module wd {
    export class CharFont extends Font {
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public char:string = null;
        public startPosX:number = null;
        public xAdvance:number = null;
        public image:HTMLImageElement = null;
        public rectRegion:RectRegion = null;
        public width:number = null;
        public height:number = null;

        public init(){
        }

        @require(function(elapsedTime:number){
            assert(this.context !== null, Log.info.FUNC_SHOULD("set context"));
        })
        public update(elapsedTime:number){
            var position = this.gameObject.transform.position,
                dx = position.x,
                dy = position.y;

            this.context.drawImage(this.image,
                this.rectRegion.x, this.rectRegion.y, this.rectRegion.width, this.rectRegion.height,
                dx, dy, this.width, this.height
            );
        }
    }
}

