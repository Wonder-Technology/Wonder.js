/// <reference path="../../../filePath.d.ts"/>
module wd {
    export abstract class Font extends UI {
        private _isFirstUpdate:boolean = true;

        public update(elapsedTime:number){
            if(!this._isFirstUpdate){
                if(this.p_dirty){
                    this.updateWhenDirty();
                }
            }
            else{
                this._isFirstUpdate = false;
            }

            this.p_dirty = false;
        }

        protected abstract updateWhenDirty();

        protected getCanvasPosition();
        protected getCanvasPosition(gameObject:GameObject);

        protected getCanvasPosition(...args){
            var gameObject = null;

            if(args.length === 0){
                gameObject = this.gameObject;
            }
            else{
                gameObject = args[0];
            }

            return CoordinateUtils.convertWebGLPositionToCanvasPosition(gameObject.transform.position);
        }

    }
}

