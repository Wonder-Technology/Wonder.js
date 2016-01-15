/// <reference path="../../../../../dist/wd.d.ts"/>
module sample {
    import EntityObject = wd.EntityObject;
    import MouseEvent = wd.MouseEvent;

    @wd.script("eventHandler")
    export class ImageEventHandler implements wd.IEventScriptBehavior {
        constructor(entityObject:EntityObject) {
            this._entityObject = entityObject;
        }

        private _entityObject:EntityObject = null;

        public onMouseClick(e:MouseEvent) {
            console.log("image click");
        }

        public onMouseDown(e:MouseEvent){
            console.log("image mousedown");
        }

        public onMouseUp(e:MouseEvent){
            console.log("image mouseup");
        }

        public onMouseWheel(e:MouseEvent){
            console.log("image mousewheel");
        }

        public onMouseMove(e:MouseEvent) {
            console.log("image mousemove");
        }

        public onMouseOver(e:MouseEvent) {
            console.log("image mouseover");
        }

        public onMouseOut(e:MouseEvent) {
            console.log("image mouseout");
        }

        public onMouseDrag(e:MouseEvent){
            console.log("image drag");
        }
    }
}

