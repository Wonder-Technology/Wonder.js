/// <reference path="../../../../../dist/wd.d.ts"/>
module sample {
    import EntityObject = wd.EntityObject;
    import MouseEvent = wd.MouseEvent;

    @wd.script("eventHandler")
    export class SceneEventHandler implements wd.IEventScriptBehavior {
        constructor(entityObject:EntityObject) {
            this._entityObject = entityObject;
        }

        private _entityObject:EntityObject = null;

        public onMouseClick(e:MouseEvent) {
            console.log("scene click");
        }

        public onMouseDown(e:MouseEvent){
            console.log("scene mousedown");
        }

        public onMouseUp(e:MouseEvent){
            console.log("scene mouseup");
        }

        public onMouseWheel(e:MouseEvent){
            console.log("scene mousewheel");
        }

        public onMouseMove(e:MouseEvent) {
            console.log("scene mousemove");
        }

        public onMouseOver(e:MouseEvent) {
            console.log("scene mouseover");
        }

        public onMouseOut(e:MouseEvent) {
            console.log("scene mouseout");
        }

        public onMouseDrag(e:MouseEvent){
            console.log("scene drag");
        }
    }
}

