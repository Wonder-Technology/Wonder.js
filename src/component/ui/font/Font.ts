/// <reference path="../../../filePath.d.ts"/>
module wd {
    export abstract class Font extends UI {
        private _isFirstUpdate:boolean = true;
        private _sizeChangeEventDescription:wdFrp.IDisposable = null;

        public init() {
            var self = this;

            this.context = this.getContext();

            this._sizeChangeEventDescription = EventManager.fromEvent(this.gameObject, <any>EngineEvent.UI_WIDTH_CHANGE)
                .merge(EventManager.fromEvent(this.gameObject, <any>EngineEvent.UI_HEIGHT_CHANGE))
                .subscribe(() => {
                    self.p_dirty = true;
                });
        }

        public dispose(){
            this._sizeChangeEventDescription.dispose();
        }

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

        protected getLeftCornerPosition(){
            var transform = this.gameObject.transform,
                position = transform.position;


            return Vector2.create(position.x - transform.width / 2, position.y - transform.height / 2);
        }
    }
}

