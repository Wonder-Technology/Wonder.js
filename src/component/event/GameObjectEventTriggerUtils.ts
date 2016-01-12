module wd{
    export class GameObjectEventTriggerUtils extends EventTriggerUtils{
        public static create() {
            var obj = new this();

            return obj;
        }

        protected getTopObject(triggerList:wdCb.Collection<GameObject>){
            var self = this;

            return triggerList.sort((a:GameObject, b:GameObject) => {
                    return self._getDistanceToCamera(a) - self._getDistanceToCamera(b);
                })
                .getChild(0);
        }

        private _getDistanceToCamera(obj:GameObject){
            return obj.transform.position.copy().sub(Director.getInstance().scene.camera.transform.position).length();
        }
    }
}

