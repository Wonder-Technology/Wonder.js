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

        public static convertLeftCornerPositionToCenterPositionInWebGL(position:Vector2, width:number, height:number){
            return Vector2.create(this.convertLeftCornerPositionXToCenterPositionXInWebGL(position.x, width), this.convertLeftCornerPositionYToCenterPositionYInWebGL(position.y, height));
        }

        public static convertLeftCornerPositionXToCenterPositionXInWebGL(positionX:number, width:number){
            return positionX - width / 2;
        }

        public static convertLeftCornerPositionYToCenterPositionYInWebGL(positionY:number, height:number){
            return positionY - height / 2;
        }

        public static convertLeftCornerPositionToCenterPositionInCanvas(position:Vector2, width:number, height:number){
            return Vector2.create(this.convertLeftCornerPositionXToCenterPositionXInCanvas(position.x, width), this.convertLeftCornerPositionYToCenterPositionYInCanvas(position.y, height));
        }

        public static convertLeftCornerPositionXToCenterPositionXInCanvas(positionX:number, width:number){
            return positionX + width / 2;
        }

        public static convertLeftCornerPositionYToCenterPositionYInCanvas(positionY:number, height:number){
            return positionY + height / 2;
        }

        //public static convertCenterPositionToLeftCornerPosition(position:Vector2, width:number, height:number){
        //    return Vector2.create(this.convertCenterPositionXToLeftCornerPositionX(position.x, width), this.convertCenterPositionYToLeftCornerPositionY(position.y, height));
        //}
        //
        //public static convertCenterPositionXToLeftCornerPositionX(positionX:number, width:number){
        //    return positionX - width / 2;
        //}
        //
        //public static convertCenterPositionYToLeftCornerPositionY(positionY:number, height:number){
        //    return positionY - height / 2;
        //}
    }
}
