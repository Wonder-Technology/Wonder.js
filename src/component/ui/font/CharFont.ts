/// <reference path="../../../filePath.d.ts"/>
module wd {
    export class CharFont extends Font {
        public static create() {
            var obj = new this();

            return obj;
        }

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

        get dirty(){
            var transform = null;

            if(this.p_dirty){
                return true;
            }

            transform = this.gameObject.transform;

            return transform.isTranslate || transform.isRotate || transform.isScale;
        }

        private _char:string = null;
        get char(){
            return this._char;
        }
        set char(char:string){
            if(char !== this._char){
                this._char = char;
                this.p_dirty = true;
            }
        }

        public startPosX:number = null;
        public xAdvance:number = null;
        public image:HTMLImageElement = null;
        public rectRegion:RectRegion = null;
        public width:number = 0;
        public height:number = 0;
        public isNewLine:boolean = false;
        public isFullLine:boolean = false;

        public init(){
            this.context = this.getContext();
        }

        public dispose(){
        }

        @require(function(elapsedTime:number){
            assert(this.context !== null, Log.info.FUNC_SHOULD("set context"));
        })
        public update(elapsedTime:number){
            var transform:Transform = null,
                position:Vector2 = null,
                dx = null,
                dy = null,
                dw = null,
                dh = null;

            super.update(elapsedTime);

            if(this.rectRegion === null){
                return;
            }


            dw = this.width;
            dh = this.height;

            if(dw === 0 && dh === 0){
                return;
            }

            transform = this.gameObject.transform;
            position = CoordinateUtils.convertWebGLPositionToCanvasPosition(transform.position);

            dx = position.x;
            dy = position.y;


            this.context.save();

            if(transform.isRotate){
                this._rotateAroundImageCenter(dx, dy, dw, dh);
            }

            if(transform.isScale){
                this._scaleAroundImageCenter(dx, dy, dw, dh)
            }

            this.context.drawImage(this.image,
                this.rectRegion.x, this.rectRegion.y, this.rectRegion.width, this.rectRegion.height,
                dx, dy, dw, dh);


            this.context.restore();
        }

        protected updateWhenDirty(){
        }

        private _rotateAroundImageCenter(dx:number, dy:number, dw:number, dh:number){
            var values = this.gameObject.transform.localToWorldMatrix.values;

            this.context.translate(dx + dw / 2, dy + dh / 2);
            this.context.transform(
                values[0], values[4], values[1], values[5], 0, 0
            );
            this.context.translate(- (dx + dw / 2), -(dy + dh / 2));
        }

        private _scaleAroundImageCenter(dx:number, dy:number, dw:number, dh:number){
            var scale = this.gameObject.transform.scale;

            this.context.translate(dx + dw / 2, dy + dh / 2);
            this.context.scale(scale.x, scale.y);
            this.context.translate(- (dx + dw / 2), -(dy + dh / 2));
        }
    }
}

