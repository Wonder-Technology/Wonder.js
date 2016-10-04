module wd{
    export class LightUtils{
        public static getPointLightPosition(lightComponent:PointLight){
            return lightComponent.position;
        }

        public static getDirectionLightPosition(lightComponent:DirectionLight){
            if(this._isZero(lightComponent.position)){
                return DirectionLight.defaultPosition;
            }

            return lightComponent.position;
        }

        private static _isZero(position:Vector3){
            var val = position.values;

            return val[0] === 0 && val[1] === 0 && val[2] === 0;
        }
    }
}
