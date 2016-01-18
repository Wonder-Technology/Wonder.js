/// <reference path="../../../../dist/wd.d.ts"/>
module sample {
    import EntityObject = wd.EntityObject;
    import MouseEvent = wd.MouseEvent;

    @wd.script("eventHandler")
    export class Image1EventHandler implements wd.IEventScriptBehavior {
        constructor(entityObject:EntityObject) {
            this._entityObject = entityObject;
        }

        private _entityObject:EntityObject = null;

        public onMouseClick(e:MouseEvent) {
            console.log(`image1 ${e.name}`);
        }

        public onMouseDown(e:MouseEvent){
            console.log(`image1 ${e.name}`);
        }

        public onMouseUp(e:MouseEvent){
            console.log(`image1 ${e.name}`);
        }

        public onMouseWheel(e:MouseEvent){
            console.log(`image1 ${e.name}`);
        }

        public onMouseMove(e:MouseEvent) {
            console.log(`image1 ${e.name}`);
        }

        public onMouseOver(e:MouseEvent) {
            console.log(`image1 ${e.name}`);
        }

        public onMouseOut(e:MouseEvent) {
            console.log(`image1 ${e.name}`);
        }

        public onMouseDrag(e:MouseEvent){
            console.log(`image1 ${e.name}`);
        }
    }
}

