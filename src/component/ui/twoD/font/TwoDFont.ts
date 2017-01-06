module wd {
    export abstract class TwoDFont extends TwoDUI {
        protected needFormat:boolean = false;

        private _sizeChangeEventSubscription:wdFrp.IDisposable = null;

        public init() {
            var self = this;

            super.init();

            this._sizeChangeEventSubscription = EventManager.fromEvent(this.entityObject, <any>EEngineEvent.UI_WIDTH_CHANGE)
                .merge(EventManager.fromEvent(this.entityObject, <any>EEngineEvent.UI_HEIGHT_CHANGE))
                .subscribe(() => {
                    self.dirty = true;
                    self.needFormat = true;
                });
        }

        public dispose(){
            if(this._sizeChangeEventSubscription){
                this._sizeChangeEventSubscription.dispose();
            }
        }

        public update(elapsed:number){
            if(this.needFormat){
                this.reFormat();

                this.needFormat = false;
            }
        }

        @virtual
        protected reFormat(){
        }

        protected getLeftCornerPosition(){
            var transform = this.entityObject.transform,
                position = transform.position;

            return Vector2.create(position.x - transform.width / 2, position.y - transform.height / 2);
        }
    }
}

