/// <reference path="../../../filePath.d.ts"/>
module wd {
    export abstract class Font extends Component {
        public dirty:boolean = true;
        public context:CanvasRenderingContext2D = null;

        private _isFirstUpdate:boolean = true;

        public abstract init();

        public update(elapsedTime:number){
            if(!this._isFirstUpdate){
                if(this.dirty){
                    this.updateWhenDirty();
                }
            }
            else{
                this._isFirstUpdate = false;
            }

            this.dirty = false;
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

