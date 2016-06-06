module wd {
    export class UIObjectScene extends Scene{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public onEndLoop() {
            super.onEndLoop();

            this._resetAllRendererClearCanvasFlag();
        }

        public onStartLoop(){
            super.onStartLoop();

            this._sortSiblingChildren();
        }

        @require(function(){
            this.forEach((child:UIObject) => {
                assert(child instanceof UIObject, Log.info.FUNC_MUST_BE("child", "UIObject"));
                assert(child.hasComponent(UI), Log.info.FUNC_SHOULD("UIObject", "contain ui component"))
            });
        })
        public render() {
            var self = this;

            this._resetAllRendererState();

            this.forEach((child:UIObject) => {
                var renderer = self._getUIRenderer(child);

                if(renderer.dirty){
                    if(!renderer.isClearCanvas) {
                        renderer.clearCanvas();
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

            this.forEach((child:UIObject) => {
                child.render();
            });
        }

        protected createTransform(){
            return null;
        }

        protected bindStartLoopEvent(){
            EventManager.on(this, <any>EEngineEvent.STARTLOOP, this.startLoopHandler);
        }

        protected bindEndLoopEvent(){
            EventManager.on(this, <any>EEngineEvent.ENDLOOP, this.endLoopHandler);
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

