module wd {
    export class UIObjectScene extends Scene{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        //todo remove?
        protected eventTriggerUtils:UIObjectEventTriggerUtils = UIObjectEventTriggerUtils.create();

        public onEndLoop() {
            super.onEndLoop();

            this._resetAllTransformState();


            var self = this;

            //todo ensure all dirty=false
            this.forEach((child:UIObject) => {
                var renderer = self._getUIRenderer(child);
                renderer.isClearCanvas = false;
            });
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

            this._removeAllRendererMarks();

            this.forEach((child:UIObject) => {
                var renderer = self._getUIRenderer(child);


                if(renderer.dirty){
                    if(!renderer.isClearCanvas) {
                        renderer.clearCanvas();
                        renderer.dirtyDuringCurrentLoop = false;
                    }

                    self._markUIRenderer(renderer, true);
                    renderer.resetDirty();
                }
                else{
                    self._markUIRenderer(renderer, false);
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

        private _markUIRenderer(renderer:UIRenderer, isDirty:boolean){
            var tag = isDirty ? UITag.DIRTY : UITag.NOT_DIRTY;

            renderer.addTag(<any>tag);
        }

        //todo ensure remove all renderer
        private _removeAllRendererMarks(){
            var self = this;

            this.forEach((child:UIObject) => {
                var renderer = self._getUIRenderer(child);

                renderer.removeTag(<any>UITag.DIRTY);
                renderer.removeTag(<any>UITag.NOT_DIRTY);
            });
        }

        private _resetAllTransformState(){
            var self = this;

            var reset = (uiObject:UIObject) => {
                //todo change
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

