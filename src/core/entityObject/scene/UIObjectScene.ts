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

            TwoDUIComponentContainer.getInstance().update(elapsed);
        }

        public onDispose(){
            super.onDispose();

            this._startLoopSubscription.dispose();
            this._endLoopSubscription.dispose();
        }

        @require(function(){
            it("child must be UIObject", () => {
                this.forEach((child:UIObject) => {
                    expect(child).instanceof(UIObject);
                });
            });
        })
        public render() {
            var self = this;

            this._resetAllRendererState();

            this.forEach((child:UIObject) => {
                let renderer = self._getUIRenderer(child);

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

            TwoDUIComponentContainer.getInstance().render();
        }

        protected createTransform(){
            return null;
        }

        @require(function(uiObject:UIObject){
            it("uiObject shouldn't contain more than 1 uiRenderer component", () => {
                expect(uiObject.getComponentCount(UIRenderer)).lte(1);
            });
        })
        private _getUIRenderer(uiObject:UIObject):UIRenderer{
            return UIRendererUtils.getUIRenderer(uiObject);
        }

        @ensure(function(){
            it("should reset all UIRenderers->isClearCanvas", () => {
                this.getAllChildren().forEach((child:EntityObject) => {
                    var renderer = this._getUIRenderer(child);

                    expect(renderer.isClearCanvas).false;
                });
            }, this);
        })
        private _resetAllRendererClearCanvasFlag(){
            var self = this;

            this.forEach((child:UIObject) => {
                var renderer = self._getUIRenderer(child);
                renderer.isClearCanvas = false;
            });
        }

        @ensure(function(){
            it("should reset all UIRenderers->isClearCanvas", () => {
                this.getAllChildren().forEach((child:EntityObject) => {
                    var renderer = this._getUIRenderer(child);

                    expect(renderer.state).equals(EUIRendererState.NORMAL);
                });
            }, this);
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

