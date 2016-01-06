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

        public static convertLeftCornerPositionToCenterPosition(position:Vector2, width:number, height:number){
            return Vector2.create(this.convertLeftCornerPositionXToCenterPositionX(position.x, width), this.convertLeftCornerPositionYToCenterPositionY(position.y, height));
        }

        public static convertLeftCornerPositionXToCenterPositionX(positionX:number, width:number){
            return positionX + width / 2;
        }

        public static convertLeftCornerPositionYToCenterPositionY(positionY:number, height:number){
            return positionY + height / 2;
        }

        public static convertCenterPositionToLeftCornerPosition(position:Vector2, width:number, height:number){
            return Vector2.create(this.convertCenterPositionXToLeftCornerPositionX(position.x, width), this.convertCenterPositionYToLeftCornerPositionY(position.y, height));
        }

        public static convertCenterPositionXToLeftCornerPositionX(positionX:number, width:number){
            return positionX - width / 2;
        }

        public static convertCenterPositionYToLeftCornerPositionY(positionY:number, height:number){
            return positionY - height / 2;
        }
    }
}
