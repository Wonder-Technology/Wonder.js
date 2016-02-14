module wd {
    export class UIObjectScene extends Scene{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public onEndLoop() {
            super.onEndLoop();

            this._resetAllTransformState();
            this._resetAllRendererClearCanvasFlag();
        }

        public onStartLoop(){
            super.onStartLoop();

            this._sortSiblingChildren();
        }

        protected createTransform(){
            return null;
        }

        @require(function(elapsedTime:number){
            this.forEach((child:UIObject) => {
                assert(child instanceof UIObject, Log.info.FUNC_MUST_BE("child", "UIObject"));
                assert(child.hasComponent(UI), Log.info.FUNC_SHOULD("UIObject", "contain ui component"))
            });
        })
        protected beforeUpdateChildren(elapsedTime:number){
            var self = this;

            this._resetAllRendererState();

            this.forEach((child:UIObject) => {
                var renderer = self._getUIRenderer(child);

                if(renderer.dirty){
                    if(!renderer.isClearCanvas) {
                        renderer.clearCanvas();
                        renderer.dirtyDuringCurrentLoop = false;
                    }

                    renderer.state = EUIRendererState.DIRTY;

                    renderer.resetDirty();
                }
                else{
                    if(renderer.state !== EUIRendererState.DIRTY){
                        renderer.state = EUIRendererState.NOT_DIRTY;
                    }
                }
            });
        }

        protected bindStartLoopEvent(){
            EventManager.on(this, <any>EngineEvent.STARTLOOP, this.startLoopHandler);
        }

        protected bindEndLoopEvent(){
            EventManager.on(this, <any>EngineEvent.ENDLOOP, this.endLoopHandler);
        }

        @require(function(uiObject:UIObject){
            assert(uiObject.getComponentCount(UIRenderer) <= 1, Log.info.FUNC_SHOULD_NOT("uiObject", "contain more than 1 uiRenderer component"));
        })
        private _getUIRenderer(uiObject:UIObject):UIRenderer{
            return uiObject.getComponent<UIRenderer>(UIRenderer);
        }

        @ensure(function(){
            var self = this;

            this.getAllChildren().forEach((child:EntityObject) => {
                var renderer = self._getUIRenderer(child);

                assert(!renderer.isClearCanvas, Log.info.FUNC_SHOULD("reset all UIRenderers->isClearCanvas"));
            });
        })
        private _resetAllRendererClearCanvasFlag(){
            var self = this;

            this.forEach((child:UIObject) => {
                var renderer = self._getUIRenderer(child);
                renderer.isClearCanvas = false;
            });
        }

        @ensure(function(){
            var self = this;

            this.getAllChildren().forEach((child:EntityObject) => {
                var renderer = self._getUIRenderer(child);

                assert(renderer.state === EUIRendererState.NORMAL, Log.info.FUNC_SHOULD("reset all UIRenderers->state"));
            });
        })
        private _resetAllRendererState(){
            var self = this;

            this.forEach((child:UIObject) => {
                var renderer = self._getUIRenderer(child);

                renderer.state = EUIRendererState.NORMAL;
            });
        }

        private _resetAllTransformState(){
            var self = this;

            var reset = (uiObject:UIObject) => {
                if(self._isNotDirtyDuringThisLoop(self._getUIRenderer(uiObject))){
                    self._resetTransformFlag(uiObject);
                }

                uiObject.forEach((child:UIObject) => {
                    reset(child);
                });
            }

            this.forEach((child:UIObject) => {
                reset(child);
            });
        }

        private _isNotDirtyDuringThisLoop(renderer:UIRenderer){
            return !renderer.dirtyDuringCurrentLoop;
        }

        private _resetTransformFlag(uiObject:UIObject){
            var transform:RectTransform = uiObject.transform;

            transform.isTranslate = false;
            transform.isScale = false;
            transform.isRotate = false;
        }

        //todo support "put all children together, so it can sort all children by zIndex"?
        private _sortSiblingChildren(){
            var sort = (uiObject:EntityObject) => {
                uiObject.sort((a:UIObject, b:UIObject) => {
                    return a.transform.zIndex - b.transform.zIndex;
                }, true);

                uiObject.forEach((child:UIObject) => {
                    sort(child);
                });
            }

            sort(this);
        }
    }
}

