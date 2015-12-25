/// <reference path="../../../filePath.d.ts"/>
module wd {
    export abstract class CanvasFont extends Font {
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

        @require(function () {
            assert(this.gameObject.hasComponent(UIRenderer), Log.info.FUNC_SHOULD("gameObject", "contain UIRenderer"))
        })
        protected getContext() {
            var renderer = this.gameObject.getComponent<UIRenderer>(UIRenderer);

            return renderer.context;
        }

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

