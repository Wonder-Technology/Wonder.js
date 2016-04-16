module wd{
    export class GlobalGeometryUtils{
        public static hasAnimation(geometry:Geometry){
            if(geometry instanceof ModelGeometry){
                return (<ModelGeometry>geometry).hasAnimation();
            }

            return false;
        }
    }
}
