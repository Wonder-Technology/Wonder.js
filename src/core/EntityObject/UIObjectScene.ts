module wd {
    export class UIObjectScene extends EntityObject{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public init(){
            var self = this;

            super.init();

            //todo refactor

            //todo bind on it default
            EventManager.fromEvent(document.body, EventName.CLICK)
                .map((e:MouseEvent) => {
                    var triggerList = wdCb.Collection.create<EventTriggerListData>(),
                        resultList:wdCb.Collection<UIObject> = null,
                        topUIObject:UIObject = null,
                        selectedUIObject:wdCb.Collection<UIObject> = null;

                    self.filter((entityObject:EntityObject) => {
                            return entityObject.hasComponent(EventTriggerDetector);
                        })
                        .forEach((entityObject:EntityObject) => {
                            var detector = entityObject.getComponent<EventTriggerDetector>(EventTriggerDetector);

                            if(detector.isTrigger(e)){
                                triggerList.addChild({
                                    entityObject: entityObject
                                    , triggerMode: detector.triggerMode
                                });
                            }
                        });


                    topUIObject = UIEventTriggerUtils.getTopUIObject(triggerList.filter((data:EventTriggerListData) => {
                            return data.triggerMode === EventTriggerMode.TOP
                        })
                        .map((data:EventTriggerListData) => {
                            return data.entityObject;
                        })
                    );

                    selectedUIObject = triggerList.filter((data:EventTriggerListData) => {
                            return data.triggerMode === EventTriggerMode.SELECTED;
                        })
                        .map((data:EventTriggerListData) => {
                            return data.entityObject;
                        });

                    resultList = topUIObject ? selectedUIObject.addChild(topUIObject) : selectedUIObject;

                    return [resultList, e]
                })
                .subscribe(([triggerList, e]) => {
                    triggerList.forEach((uiObject:UIObject) => {
                        uiObject.execEventScript(EventTriggerTable.getScriptHandlerName(e.name), e);
                    })
                });

            return this;
        }

        public onEndLoop() {
            super.onEndLoop();

            this._resetAllTransformState();
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

            this._removeAllTopUIObjectMarks();

            this.forEach((child:UIObject) => {
                var uiRenderer = self._getUIRenderer(child);
                if(self._isAnyOneOfAllUIDirty(child)){
                    if(uiRenderer){
                        uiRenderer.clearCanvas();
                    }

                    self._markTopUIObject(child, true);
                    self._resetAllDirty(child);
                }
                else{
                    self._markTopUIObject(child, false);
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

        private _isAnyOneOfAllUIDirty(uiObject:UIObject){
            var isDirty = false,
                isEnd = false;

            var search = (uiObject:UIObject) => {
                uiObject.forEachComponent((component:Component) => {
                    if(component instanceof UI && component.dirty){
                        isEnd = true;
                        isDirty = true;
                        return wdCb.$BREAK;
                    }
                });

                if(isEnd){
                    return;
                }

                uiObject.forEach((child:UIObject) => {
                    //todo optimize: tail recursion
                    search(child);

                    if(isEnd){
                        return wdCb.$BREAK;
                    }
                })
            }

            search(uiObject);

            return isDirty;
        }

        private _markTopUIObject(uiObject:UIObject, isDirty:boolean){
            var tag = isDirty ? UITag.DIRTY : UITag.NOT_DIRTY;

            uiObject.addTag(<any>tag);
        }

        private _removeAllTopUIObjectMarks(){
            this.forEach((child:UIObject) => {
                child.removeTag(<any>UITag.DIRTY);
                child.removeTag(<any>UITag.NOT_DIRTY);
            });
        }

        private _resetAllDirty(uiObject:UIObject){
            var reset = (uiObject:UIObject) => {
                var ui = uiObject.getComponent<UI>(UI);

                ui.dirty = false;

                uiObject.forEach((child:UIObject) => {
                    reset(child);
                });
            }

            reset(uiObject);
        }
        private _resetAllTransformState(){
            var self = this;

            var reset = (uiObject:UIObject) => {
                if(self._isNotDirtyDuringThisLoop(uiObject)){
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

        private _isNotDirtyDuringThisLoop(uiObject:UIObject){
            var result:boolean = true;

            var judge = (uiObject:UIObject) => {
                if(uiObject.getComponent<UI>(UI).dirty){
                    result = false;
                    return;
                }

                uiObject.forEach((child:UIObject) => {
                    judge(child);
                });
            }

            judge(uiObject);

            return result;
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

    type EventTriggerListData = {
        entityObject:EntityObject,
        triggerMode:EventTriggerMode
    }
}

