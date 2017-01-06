module wd{
    export class GlobalGeometryUtils{
        public static hasMorphAnimation(geometry:Geometry){
            if(geometry instanceof ModelGeometry){
                return (<ModelGeometry>geometry).hasMorphAnimation();
            }

            return false;
        }

        public static hasSkinSkeletonAnimation(geometry:Geometry){
            if(geometry instanceof ModelGeometry){
                return (<ModelGeometry>geometry).hasSkinSkeletonAnimation();
            }

            return false;
        }
    }
}
