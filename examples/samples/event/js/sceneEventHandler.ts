/// <reference path="../../../../dist/wd.d.ts"/>
module sample {
    import EntityObject = wd.EntityObject;
    import PointEvent = wd.PointEvent;

    @wd.script("eventHandler")
    export class SceneEventHandler implements wd.IEventScriptBehavior {
        constructor(entityObject:EntityObject) {
            this._entityObject = entityObject;
        }

        private _entityObject:EntityObject = null;

        public onPointTap(e:PointEvent) {
            console.log(`scene ${e.name}`);
        }

        public onPointDown(e:PointEvent){
            console.log(`scene ${e.name}`);
        }

        public onPointUp(e:PointEvent){
            console.log(`scene ${e.name}`);
        }

        public onPointWheel(e:PointEvent){
            console.log(`scene ${e.name}`);
        }

        public onPointMove(e:PointEvent) {
            console.log(`scene ${e.name}`);
        }

        public onPointOver(e:PointEvent) {
            console.log(`scene ${e.name}`);
        }

        public onPointOut(e:PointEvent) {
            console.log(`scene ${e.name}`);
        }

        public onPointDrag(e:PointEvent){
            console.log(`scene ${e.name}`);
        }
    }
}

