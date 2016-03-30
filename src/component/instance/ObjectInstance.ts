module wd{
    export class ObjectInstance extends Instance{
        public static create() {
            var obj = new this();

            return obj;
        }

        public sourceObject:GameObject = null;

        private _enterSubscription:wdFrp.IDisposable = null;
        private _exitSubscription:wdFrp.IDisposable = null;

        public init(){
            var self = this;

            this._enterSubscription = EventManager.fromEvent(this.entityObject, <any>EEngineEvent.ENTER)
                .subscribe(() => {
                    self._addToSourceAndItsChildren();
                });

            this._exitSubscription = EventManager.fromEvent(this.entityObject, <any>EEngineEvent.EXIT)
                .subscribe(() => {
                    self._removeFromSourceAndItsChildren();
                });
        }

        public dispose(){
            this._enterSubscription.dispose();
            this._exitSubscription.dispose();
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

