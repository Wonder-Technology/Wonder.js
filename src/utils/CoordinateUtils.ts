/// <reference path="../filePath.d.ts"/>
module wd {
    export class CoordinateUtils{
        @require(function(){
            assert(!!DeviceManager.getInstance().view, Log.info.FUNC_SHOULD("set view"));
        })
        public static convertWebGLPositionToCanvasPosition(position:Vector3){
            var view = DeviceManager.getInstance().view;

            return Vector2.create(view.width / 2 + position.x, view.height / 2 - position.y)
        }

        @require(function(){
            assert(!!DeviceManager.getInstance().view, Log.info.FUNC_SHOULD("set view"));
        })
        public static convertCanvasPositionToWebGLPosition(position:Vector2){
            var view = DeviceManager.getInstance().view;

            return Vector3.create(position.x - view.width / 2 , view.height / 2 - position.y, 0);
        }
    }
}
