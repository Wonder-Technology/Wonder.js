module wd{
    export class AngleUtils{
        public static convertDegreeToRadians(angle:number){
            return angle * Math.PI / 180;
        }

        public static convertRadiansToDegree(angle:number){
            return angle * 180 / Math.PI;
        }
    }
}

