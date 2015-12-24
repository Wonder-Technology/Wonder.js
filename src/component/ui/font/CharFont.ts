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
        public width:number = 0;
        public height:number = 0;
        public isNewLine:boolean = false;
        public isFullLine:boolean = false;

        get x(){
            return this.gameObject.transform.position.x;
        }
        set x(x:number){
            var position = this.gameObject.transform.position;

            this.gameObject.transform.position = Vector3.create(x, position.y, position.z);
        }

        get y(){
            return this.gameObject.transform.position.y;
        }

        public init(){
        }

        @require(function(elapsedTime:number){
            assert(this.context !== null, Log.info.FUNC_SHOULD("set context"));
        })
        public update(elapsedTime:number){
            var position = null,
                scale = null,
                dx = null,
                dy = null;

            if(this.rectRegion === null){
                return;
            }

            position = this.gameObject.transform.position;
            dx = position.x;
            dy = position.y;

            scale = this.gameObject.transform.scale;

            this.context.drawImage(this.image,
                this.rectRegion.x, this.rectRegion.y, this.rectRegion.width, this.rectRegion.height,
                dx, dy, this.width * scale.x, this.height * scale.y
            );
        }

        //todo remove
        protected updateWhenDirty() {
        }
    }
}

