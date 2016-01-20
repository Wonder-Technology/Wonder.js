/// <reference path="../../../../../dist/wd.d.ts"/>
module sample {
    declare var scene:any;

    import EntityObject = wd.EntityObject;
    import MouseEvent = wd.MouseEvent;

    @wd.script("bitmapFontEventHandler")
    export class BitmapFontEventHandler implements wd.IEventScriptBehavior {
        constructor(entityObject:EntityObject) {
            this._entityObject = entityObject;
        }

        private _entityObject:EntityObject = null;


        public onMouseDown(e:MouseEvent) {
            console.log("mousedown");
        }

        public onMouseClick(e:MouseEvent) {
            console.log("click");
            this._entityObject.parent.dispose();

            scene.initSample();
        }
    }
}

