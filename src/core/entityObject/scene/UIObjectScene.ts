module wd {
    export class UIObjectScene extends Scene{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        private _startLoopSubscription:wdFrp.IDisposable = null;
        private _endLoopSubscription:wdFrp.IDisposable = null;

        public init(){
            var self = this;

            super.init();

            this._startLoopSubscription = EventManager.fromEvent(<any>EEngineEvent.STARTLOOP)
            .subscribe(() => {
                self._sortSiblingChildren();
            });

            this._endLoopSubscription = EventManager.fromEvent(<any>EEngineEvent.ENDLOOP)
                .subscribe(() => {
                    self._resetAllRendererClearCanvasFlag();
                });

            return this;
        }

        public update(elapsed:number){
            super.update(elapsed);

            UIEngine.getInstance().update(elapsed);
        }

        public onDispose(){
            super.onDispose();

            this._startLoopSubscription.dispose();
            this._endLoopSubscription.dispose();
        }

        @require(function(){
            this.forEach((child:UIObject) => {
                assert(child instanceof UIObject, Log.info.FUNC_MUST_BE("child", "UIObject"));
                assert(child.hasComponent(TwoDUI), Log.info.FUNC_SHOULD("UIObject", "contain ui component"))
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

            UIEngine.getInstance().render();
        }

        protected createTransform(){
            return null;
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

