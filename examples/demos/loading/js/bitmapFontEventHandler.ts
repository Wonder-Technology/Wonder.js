/// <reference path="../../../../../dist/wd.d.ts"/>
module sample {
    declare var scene:any;

    import EntityObject = wd.EntityObject;
    import PointEvent = wd.PointEvent;

    @wd.script("bitmapFontEventHandler")
    export class BitmapFontEventHandler implements wd.IEventScriptBehavior {
        constructor(entityObject:EntityObject) {
            this._entityObject = entityObject;
        }

        private _entityObject:EntityObject = null;


        public onPointDown(e:PointEvent) {
            console.log("mousedown");
        }

        public onPointTap(e:PointEvent) {
            console.log("click");
            this._entityObject.parent.dispose();

            scene.initSample();
        }
    }
}

