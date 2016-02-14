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
                    this._buildMouseDragStream()
                ]
                )
                .mergeAll()
                .filter((e:MouseEvent) => {
                    return !Director.getInstance().isPause ;
                })
                .map((e:MouseEvent) => {
                    return self._getMouseEventTriggerListData(e);
                })
                .merge(
                    EventManager.fromEvent(EventName.MOUSEMOVE)
                        .filter((e:MouseEvent) => {
                            return !Director.getInstance().isPause ;
                        })
                        .map((e:MouseEvent) => {
                            var triggerList = self._getMouseEventTriggerList(e);
                            var {mouseoverObjects, mouseoutObjects} = self._getMouseOverAndMouseOutObject(triggerList, self._lastTriggerList);

                            self._setMouseOverTag(mouseoverObjects);
                            self._setMouseOutTag(mouseoutObjects);

                            self._lastTriggerList = triggerList.copy();

                            triggerList = mouseoutObjects.addChildren(triggerList);

                            return self._getMouseEventTriggerListData(e, triggerList);
                        })
                )
                .filter(([triggerList, e]) => {
                    return triggerList.getCount() > 0;
                })
                .subscribe(([triggerList, e]) => {
                    triggerList.forEach((entityObject:EntityObject) => {
                        self._trigger(e.copy(), entityObject);
                    })
                });
        }

        private _buildMouseDragStream(){
            /*!
             here bind on document(not on document.body), so the event handler binded will not affected by other event handler binded on the same event
             */
            return EventManager.fromEvent(document, EventName.MOUSEDOWN)
                .flatMap((e:MouseEvent) => {
                    return EventManager.fromEvent(document, EventName.MOUSEMOVE).takeUntil(EventManager.fromEvent(document, EventName.MOUSEUP));
                })
                .map((e:MouseEvent) => {
                    e.name = EventName.MOUSEDRAG;

                    return e;
                })
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
        private _trigger(e:MouseEvent, entityObject:EntityObject, isBubble:boolean);

        private _trigger(...args) {
            var e:MouseEvent = args[0],
                entityObject:EntityObject = args[1],
                notSetTarget = false,
                event:MouseEvent = null,
                customEvent:CustomEvent = null,
                handlerName = null;

            if(args.length === 3 && args[2]){
                notSetTarget = true;
                event = e;
            }
            else{
                event = this._setEventNameByEventTag(entityObject, e);
                this._removeEventTag(entityObject);
            }

            handlerName = EventTriggerTable.getScriptHandlerName(event.name);

            customEvent = CustomEvent.create(<any>EEngineEvent[EventTriggerTable.getScriptEngineEvent(event.name)]);

            customEvent.getDataFromDomEvent(event);

            //todo refactor: support directly trigger mouse event on target
            EventManager.trigger(entityObject, customEvent, event, notSetTarget);

            event.getDataFromCustomEvent(customEvent);

            entityObject.execEventScript(handlerName, event);

            if (!event.isStopPropagation && entityObject.bubbleParent) {
                this._trigger(event.copy(), entityObject.bubbleParent, true);
            }
        }

        private _getMouseEventTriggerList(e:MouseEvent){
            var topGameObject:GameObject = null,
                topUIObject:UIObject = null,
                triggerList = wdCb.Collection.create<EntityObject>();


            topGameObject = this._findTopGameObject(e, this.scene.gameObjectScene);
            topUIObject = this._findTopUIObject(e, this.scene.uiObjectScene);

            if(topGameObject){
                triggerList.addChild(topGameObject);
            }

            if(topUIObject){
                triggerList.addChild(topUIObject);
            }

            if(this._isSceneAsTopOne(e, triggerList)){
                triggerList.addChild(this.scene);
            }

            return triggerList;
        }

        private _isSceneAsTopOne(e:MouseEvent, triggerList:wdCb.Collection<EntityObject>){
            return this._isTriggerScene(e) && triggerList.getCount() === 0;
        }

        private _findTopGameObject(e:MouseEvent, gameObjectScene:GameObjectScene){
            var self = this;

            return this._findTriggerGameObjectList(e, gameObjectScene).sort((a:GameObject, b:GameObject) => {
                    return self._getDistanceToCamera(a) - self._getDistanceToCamera(b);
                })
                .getChild(0);
        }

        private _getDistanceToCamera(obj:GameObject){
            return obj.transform.position.copy().sub(Director.getInstance().scene.currentCamera.transform.position).length();
        }

        private _findTopUIObject(e:MouseEvent, uiObjectScene:UIObjectScene){
            return this._findTriggerUIObjectList(e, uiObjectScene).sort((a:UIObject, b:UIObject) => {
                    return b.transform.zIndex - a.transform.zIndex;
                })
                .getChild(0);
        }

        private _findTriggerGameObjectList(e:MouseEvent, objectScene:GameObjectScene):wdCb.Collection<GameObject>{
            var triggerObjectList = wdCb.Collection.create<any>(),
                self = this;
            var find = (entityObject:GameObject) => {
                if(entityObject.hasComponent(SpacePartition)){
                    entityObject.getSpacePartition().getIntersectListWithRay(e)
                        .forEach((entityObject:GameObject) => {
                            self._addTriggerObjectByQueryDetector(entityObject, e, triggerObjectList);
                        });
                }
                else{
                    self._addTriggerObjectByQueryDetector(entityObject, e, triggerObjectList);

                    entityObject.forEach((child:GameObject) => {
                        find(child);
                    });
                }
            }

            objectScene.forEach((child:GameObject) => {
                find(child);
            });

            return triggerObjectList;
        }

        private _findTriggerUIObjectList(e:MouseEvent, objectScene:UIObjectScene):wdCb.Collection<UIObject>{
            var triggerObjectList = wdCb.Collection.create<any>(),
                self = this;
            var find = (entityObject:UIObject) => {
                self._addTriggerObjectByQueryDetector(entityObject, e, triggerObjectList);

                entityObject.forEach((child:UIObject) => {
                    find(child);
                });
            }

            objectScene.forEach((child:UIObject) => {
                find(child);
            });

            return triggerObjectList;
        }

        private _addTriggerObjectByQueryDetector(entityObject:EntityObject, e:MouseEvent, triggerObjectList:wdCb.Collection<EntityObject>){
            if (entityObject.hasComponent(EventTriggerDetector)) {
                let detector = entityObject.getComponent<EventTriggerDetector>(EventTriggerDetector);

                if (detector.isTrigger(e)) {
                    triggerObjectList.addChild(entityObject);
                }
            }
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
