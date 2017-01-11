module wd{
    export class DomEventManager{
        public static create() {
            var obj = new this();

            return obj;
        }

        get scene():SceneDispatcher{
            return Director.getInstance().scene;
        }

        public designatedTriggerList = null;

        private _lastTriggerList:any = null;
        private _isDragEventTriggering:boolean = false;
        private _triggerListOfDragEvent = null;
        private _pointEventBinder:PointEventBinder = PointEventBinder.create();

        public initDomEvent(){
            var self = this;

            this._pointEventBinder.initPointEvent();

            return wdFrp.fromArray(
                [
                    EventManager.fromEvent(EEngineEvent.POINT_TAP),
                    EventManager.fromEvent(EEngineEvent.POINT_DOWN),
                    EventManager.fromEvent(EEngineEvent.POINT_UP),
                    EventManager.fromEvent(EEngineEvent.POINT_SCALE),
                    this._buildPointDragStream()
                ]
                )
                .mergeAll()
                .map((e:CustomEvent) => {
                    return e.userData;
                })
                .filter((e:PointEvent) => {
                    return !Director.getInstance().isPause;
                })
                .map((e:PointEvent) => {
                    var triggerList = self._getPointEventTriggerList(e);

                    if(self._isDragEventTriggering){
                        self._triggerListOfDragEvent = triggerList;
                    }

                    return self._getPointEventTriggerListData(e, triggerList);
                })
                .merge(
                    this._buildPointMoveStream()
                )
                .subscribe(([triggerList, e]) => {
                    triggerList.forEach((entityObject:EntityObject) => {
                        self._trigger(e.clone(), entityObject);
                    })
                });
        }

        public dispose(){
            this._pointEventBinder.dispose();
        }

        private _buildPointDragStream(){
            var self = this;

            return EventManager.fromEvent(EEngineEvent.POINT_DOWN)
                .flatMap((e:PointEvent) => {
                    return EventManager.fromEvent(EEngineEvent.POINT_MOVE)
                        .takeUntil(EventManager.fromEvent(EEngineEvent.POINT_UP)
                        .do((e:CustomEvent) => {
                            self._isDragEventTriggering = false;
                        })
                    );
                })
                .map((e:CustomEvent) => {
                    e.name = EEngineEvent.POINT_DRAG;
                    e.userData.name = EEngineEvent.POINT_DRAG;

                    if(self._isDragEventFirstTriggered()){
                        self._resetLastPosition(e.userData);
                    }

                    self._isDragEventTriggering = true;

                    return e;
                });
        }

        private _resetLastPosition(e:PointEvent){
            e.lastX = null;
            e.lastY = null;
        }

        private _isDragEventFirstTriggered(){
                return this._isDragEventTriggering === false;
        }

        private _buildPointMoveStream(){
            var self = this;

            return EventManager.fromEvent(EEngineEvent.POINT_MOVE)
                .map((e:CustomEvent) => {
                    return e.userData;
                })
                .filter((e:PointEvent) => {
                    return !Director.getInstance().isPause;
                })
                .map((e:PointEvent) => {
                    var triggerList = null;

                    if(self.designatedTriggerList){
                        triggerList = self.designatedTriggerList;
                    }
                    else if(self._isDragEventTriggering){
                        triggerList = self._triggerListOfDragEvent;
                    }
                    else{
                        triggerList = self._getPointEventTriggerList(e);
                    }

                    var {pointoverObjects, pointoutObjects} = self._getPointOverAndPointOutObject(triggerList, self._lastTriggerList);

                    self._setPointOverTag(pointoverObjects);
                    self._setPointOutTag(pointoutObjects);

                    self._lastTriggerList = triggerList.clone();

                    triggerList = pointoutObjects.addChildren(triggerList);

                    return self._getPointEventTriggerListData(e, triggerList);
                })
        }

        private _getPointOverAndPointOutObject(currentTriggerList:wdCb.Collection<EntityObject>, lastTriggerList:wdCb.Collection<EntityObject>){
            var pointoverObjects = wdCb.Collection.create<EntityObject>(),
                pointoutObjects = wdCb.Collection.create<EntityObject>();

            if(!lastTriggerList){
                pointoverObjects = currentTriggerList;
            }
            else{
                //todo optimize
                lastTriggerList.forEach((lastObject:EntityObject) => {
                    if(!currentTriggerList.hasChildWithFunc((currentObject:EntityObject) => {
                            return JudgeUtils.isEqual(currentObject, lastObject);
                        })){
                        pointoutObjects.addChild(lastObject);
                    }
                });

                currentTriggerList.forEach((currentObject:EntityObject) => {
                    if(!lastTriggerList.hasChildWithFunc((lastObject:EntityObject) => {
                            return JudgeUtils.isEqual(currentObject, lastObject);
                        })){
                        pointoverObjects.addChild(currentObject);
                    }
                });
            }

            return {
                pointoverObjects: pointoverObjects,
                pointoutObjects: pointoutObjects
            }
        }

        private _setPointOverTag(objects:wdCb.Collection<EntityObject>){
            objects.forEach((object:EntityObject) => {
                object.addTag(<any>EEventTag.POINT_OVER);
            })
        }

        private _setPointOutTag(objects:wdCb.Collection<EntityObject>){
            objects.forEach((object:EntityObject) => {
                object.addTag(<any>EEventTag.POINT_OUT);
            })
        }

        private _setEventNameByEventTag(object:EntityObject, e:PointEvent){
            if(object.hasTag(<any>EEventTag.POINT_OVER)){
                e.name = EEngineEvent.POINT_OVER;
            }
            else if(object.hasTag(<any>EEventTag.POINT_OUT)){
                e.name = EEngineEvent.POINT_OUT;
            }

            return e;
        }

        private _removeEventTag(object:EntityObject){
            object.removeTag(<any>EEventTag.POINT_OVER);
            object.removeTag(<any>EEventTag.POINT_OUT);
        }

        private _trigger(e:PointEvent, entityObject:EntityObject);
        private _trigger(e:PointEvent, entityObject:EntityObject, isBubble:boolean);

        private _trigger(...args) {
            var e:PointEvent = args[0],
                entityObject:EntityObject = args[1],
                notSetTarget = false,
                event:PointEvent = null,
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



            handlerName = EventTriggerTable.getScriptHandlerName(<EEventName>event.name);

            customEvent = CustomEvent.create(<string>event.name, event);

            customEvent.getDataFromDomEvent(event);

            EventManager.trigger(entityObject, customEvent, notSetTarget);

            event.getDataFromCustomEvent(customEvent);

            ScriptComponentContainer.getInstance().execEntityObjectEventScriptWithData(entityObject, handlerName, event);

            if (!event.isStopPropagation && entityObject.bubbleParent) {
                this._trigger(event.clone(), entityObject.bubbleParent, true);
            }
        }

        private _getPointEventTriggerList(e:PointEvent){
            var topGameObject:GameObject = null,
                topUIObject:any = null,
                triggerList:wdCb.Collection<EntityObject> = null;

            if(this.designatedTriggerList){
                return this.designatedTriggerList;
            }

            triggerList = wdCb.Collection.create<EntityObject>();

            topGameObject = this._findTopGameObject(e, this.scene.gameObjectScene);
            topUIObject = this._findTopUIObject(e, this.scene.uiObjectScene);

            if(!!topGameObject){
                triggerList.addChild(topGameObject);
            }

            if(!!topUIObject){
                triggerList.addChild(topUIObject);
            }

            if(this._isSceneAsTopOne(e, triggerList)){
                triggerList.addChild(this.scene);
            }

            return triggerList;
        }

        private _isSceneAsTopOne(e:PointEvent, triggerList:wdCb.Collection<EntityObject>){
            return this._isTriggerScene(e) && triggerList.getCount() === 0;
        }

        private _findTopGameObject(e:PointEvent, gameObjectScene:GameObjectScene){
            var self = this;

            return this._findTriggerGameObjectList(e, gameObjectScene).sort((a:GameObject, b:GameObject) => {
                    return self._getDistanceToCamera(a) - self._getDistanceToCamera(b);
                })
                .getChild(0);
        }

        private _getDistanceToCamera(obj:GameObject){
            return obj.transform.position.clone().sub(Director.getInstance().scene.currentCamera.transform.position).length();
        }

        private _findTopUIObject(e:PointEvent, uiObjectScene:any|null){
            if(uiObjectScene === null){
                return null;
            }

            return this._findTriggerUIObjectList(e, uiObjectScene).sort((a:any, b:any) => {
                    return b.transform.zIndex - a.transform.zIndex;
                })
                .getChild(0);
        }

        private _findTriggerGameObjectList(e:PointEvent, objectScene:GameObjectScene):wdCb.Collection<GameObject>{
            var triggerObjectList = wdCb.Collection.create<any>(),
                self = this;
            var find = (entityObject:GameObject) => {
                if(ClassUtils.hasComponent(entityObject, "SpacePartition")){
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
            };

            objectScene.forEach((child:GameObject) => {
                find(child);
            });

            return triggerObjectList;
        }

        private _findTriggerUIObjectList(e:PointEvent, objectScene:any):wdCb.Collection<any>{
            var triggerObjectList = wdCb.Collection.create<any>(),
                self = this;
            var find = (entityObject:any) => {
                self._addTriggerObjectByQueryDetector(entityObject, e, triggerObjectList);

                entityObject.forEach((child:any) => {
                    find(child);
                });
            };

            objectScene.forEach((child:any) => {
                find(child);
            });

            return triggerObjectList;
        }

        private _addTriggerObjectByQueryDetector(entityObject:EntityObject, e:PointEvent, triggerObjectList:wdCb.Collection<EntityObject>){
            if (entityObject.hasComponent(EventTriggerDetector)) {
                let detector = entityObject.getComponent<EventTriggerDetector>(EventTriggerDetector);

                if (detector.isTrigger(e)) {
                    triggerObjectList.addChild(entityObject);
                }
            }
        }

        private _isTriggerScene(e:PointEvent){
            var detector = this.scene.getComponent<EventTriggerDetector>(EventTriggerDetector);

            return detector.isTrigger(e);
        }

        private _getPointEventTriggerListData(e:PointEvent, triggerList:wdCb.Collection<EntityObject>){
            return [triggerList, e];
        }
    }

    enum EEventTag{
        POINT_OVER = <any>"POINT_OVER",
        POINT_OUT = <any>"POINT_OUT"
    }
}
