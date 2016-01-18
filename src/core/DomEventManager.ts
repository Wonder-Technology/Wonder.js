module wd{
    declare var document:any;

    export class DomEventManager{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        get scene():SceneDispatcher{
            return Director.getInstance().scene;
        }

        private _lastTriggerList:any = null;

        public initDomEvent(){
            var self = this;

            return wdFrp.fromArray(
                [
                    EventManager.fromEvent(EventName.CLICK),
                    EventManager.fromEvent(EventName.MOUSEDOWN),
                    EventManager.fromEvent(EventName.MOUSEUP),
                    EventManager.fromEvent(EventName.MOUSEWHEEL),

                    /*!
                     here bind on document(not on document.body), so the event handler binded will not affected by other event handler binded on the same event
                     */
                    EventManager.fromEvent(document, EventName.MOUSEDOWN)
                        .flatMap((e:MouseEvent) => {
                            return EventManager.fromEvent(document, EventName.MOUSEMOVE).takeUntil(EventManager.fromEvent(document, EventName.MOUSEUP));
                        })
                        .map((e:MouseEvent) => {
                            e.name = EventName.MOUSEDRAG;

                            return e;
                        })
                ]
                )
                .mergeAll()
                .map((e:MouseEvent) => {
                    return self._getMouseEventTriggerListData(e);
                })

                .merge(
                    EventManager.fromEvent(EventName.MOUSEMOVE)
                        .map((e:MouseEvent) => {
                            var triggerList = self._getMouseEventTriggerList(e),
                                objects = null;
                            var {mouseoverObjects, mouseoutObjects} = self._getMouseOverAndMouseOutObject(triggerList, self._lastTriggerList);

                            self._setMouseOverTag(mouseoverObjects);
                            self._setMouseOutTag(mouseoutObjects);

                            self._lastTriggerList = triggerList.copy();

                            triggerList.addChildren(mouseoutObjects);

                            return self._getMouseEventTriggerListData(e, triggerList);
                        })
                )
                .subscribe(([triggerList, e]) => {
                    //todo optimize:move to first to judge
                    if(Director.getInstance().isPause || triggerList.getCount() === 0){
                        return;
                    }

                    triggerList.forEach((entityObject:EntityObject) => {
                        self._trigger(e, entityObject);
                    })
                });
        }

        private _getMouseOverAndMouseOutObject(currentTriggerList:wdCb.Collection<EntityObject>, lastTriggerList:wdCb.Collection<EntityObject>){
            var mouseoverObjects = wdCb.Collection.create<EntityObject>(),
                mouseoutObjects = wdCb.Collection.create<EntityObject>();

            if(!lastTriggerList){
                mouseoverObjects = currentTriggerList;
            }
            else{
                //todo optimize
                lastTriggerList.forEach((lastObject:EntityObject) => {
                    if(!currentTriggerList.hasChild((currentObject:EntityObject) => {
                            return JudgeUtils.isEqual(currentObject, lastObject);
                        })){
                        mouseoutObjects.addChild(lastObject);
                    }
                });

                currentTriggerList.forEach((currentObject:EntityObject) => {
                    if(!lastTriggerList.hasChild((lastObject:EntityObject) => {
                            return JudgeUtils.isEqual(currentObject, lastObject);
                        })){
                        mouseoverObjects.addChild(currentObject);
                    }
                });
            }

            return {
                mouseoverObjects: mouseoverObjects,
                mouseoutObjects: mouseoutObjects
            }
        }

        private _setMouseOverTag(objects:wdCb.Collection<EntityObject>){
            objects.forEach((object:EntityObject) => {
                object.addTag(<any>EventTag.MOUSE_OVER);
            })
        }

        private _setMouseOutTag(objects:wdCb.Collection<EntityObject>){
            objects.forEach((object:EntityObject) => {
                object.addTag(<any>EventTag.MOUSE_OUT);
            })
        }

        private _setEventNameByEventTag(object:EntityObject, e:MouseEvent){
            if(object.hasTag(<any>EventTag.MOUSE_OVER)){
                e.name = EventName.MOUSEOVER;
            }
            else if(object.hasTag(<any>EventTag.MOUSE_OUT)){
                e.name = EventName.MOUSEOUT;
            }

            return e;
        }

        private _removeEventTag(object:EntityObject){
            object.removeTag(<any>EventTag.MOUSE_OVER);
            object.removeTag(<any>EventTag.MOUSE_OUT);
        }

        private _trigger(e:MouseEvent, entityObject:EntityObject);
        private _trigger(e:MouseEvent, entityObject:EntityObject, notSetTarget:boolean);

        private _trigger(...args) {
            var e:MouseEvent = args[0],
                entityObject:EntityObject = args[1],
                notSetTarget = false,
                event:MouseEvent = null,
                customEvent:CustomEvent = null,
                handlerName = null;

            if(args.length === 3){
                notSetTarget = args[2];
            }

            event = this._setEventNameByEventTag(entityObject, e);
            customEvent = null;
            handlerName = EventTriggerTable.getScriptHandlerName(event.name);

            this._removeEventTag(entityObject);



            customEvent = CustomEvent.create(<any>EngineEvent[EventTriggerTable.getScriptEngineEvent(event.name)]);


            customEvent.getDataFromDomEvent(event);

            //todo refactor: support directly trigger mouse event on target
            EventManager.trigger(entityObject, customEvent, event, notSetTarget);

            event.getDataFromCustomEvent(customEvent);

            entityObject.execEventScript(handlerName, event);


            if (!event.isStopPropagation && entityObject.bubbleParent) {
                this._trigger(event, entityObject.bubbleParent, true);
            }
        }

        private _getMouseEventTriggerList(e:MouseEvent){
            var gameObjectScene:GameObjectScene = this.scene.gameObjectScene,
                uiObjectScene:UIObjectScene = this.scene.uiObjectScene,
                triggerList = null;

            //todo move to SceneDispatcher?(forEach game scene and ui scene)
            triggerList = gameObjectScene.getMouseEventTriggerDataList(e).addChildren(uiObjectScene.getMouseEventTriggerDataList(e));

            if(this._isTriggerScene(e) && triggerList.getCount() === 0){
                triggerList.addChild(this.scene);
            }

            return triggerList;
        }

        private _isTriggerScene(e:MouseEvent){
            var detector = this.scene.getComponent<EventTriggerDetector>(EventTriggerDetector);

            return detector.isTrigger(e);
        }


        private _getMouseEventTriggerListData(e:MouseEvent);
        private _getMouseEventTriggerListData(e:MouseEvent, triggerList:wdCb.Collection<EntityObject>);

        private _getMouseEventTriggerListData(...args){
            if(args.length === 1){
                let e:MouseEvent = args[0];

                return [this._getMouseEventTriggerList(e), e];
            }
            else{
                let e:MouseEvent = args[0],
                    triggerList:wdCb.Collection<EntityObject> = args[1];

                return [triggerList, e];
            }
        }
    }

    enum EventTag{
        MOUSE_OVER = <any>"MOUSE_OVER",
        MOUSE_OUT = <any>"MOUSE_OUT"
    }
}
