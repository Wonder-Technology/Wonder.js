module wd{
    export class ObjectInstance extends Instance{
        public static create() {
            var obj = new this();

            return obj;
        }

        @cloneAttributeAsBasicType()
        public sourceObject:GameObject = null;

        private _enterSubscription:wdFrp.IDisposable = null;
        private _exitSubscription:wdFrp.IDisposable = null;

        public init(){
            var self = this,
                entityObject = this.entityObject;

            this._enterSubscription = EventManager.fromEvent(entityObject, <any>EEngineEvent.ENTER)
                .subscribe(() => {
                    if(entityObject.hasTag(<any>EInstanceTag.isAddSourceInstance)){
                        return;
                    }

                    self._addToSourceAndItsChildren();
                });

            this._exitSubscription = EventManager.fromEvent(entityObject, <any>EEngineEvent.EXIT)
                .subscribe(() => {
                    if(entityObject.hasTag(<any>EInstanceTag.isRemoveSourceInstance)){
                        return;
                    }

                    self._removeFromSourceAndItsChildren();
                });
        }

        public dispose(){
            this._enterSubscription.dispose();
            this._exitSubscription.dispose();

            this._removeFromSourceAndItsChildren();
        }

        private _addToSourceAndItsChildren(){
            var add = (sourceInstanceObject:GameObject, objectInstanceObject:GameObject) => {
                sourceInstanceObject.getComponent<SourceInstance>(SourceInstance).instanceList.addChild(objectInstanceObject);

                objectInstanceObject.forEach((child:GameObject, index:number) => {
                    add(sourceInstanceObject.getChild(index), child);
                })
            };

            add(this.sourceObject, this.entityObject);
        }

        private _removeFromSourceAndItsChildren(){
            var remove = (sourceInstanceObject:GameObject, objectInstanceObject:GameObject) => {
                sourceInstanceObject.getComponent<SourceInstance>(SourceInstance).instanceList.removeChild(objectInstanceObject);

                objectInstanceObject.forEach((child:GameObject, index:number) => {
                    remove(sourceInstanceObject.getChild(index), child);
                })
            };

            remove(this.sourceObject, this.entityObject);
        }
    }
}

