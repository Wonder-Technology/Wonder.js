module wd{
    export class GlobalGeometryUtils{
        public static hasMorphData(geometry:Geometry){
            if(geometry instanceof ModelGeometry){
                return (<ModelGeometry>geometry).hasMorphData();
            }

            return false;
        }

        public static hasSkinSkeletonData(geometry:Geometry){
            if(geometry instanceof ModelGeometry){
                return (<ModelGeometry>geometry).hasSkinSkeletonData();
            }

            return false;
        }
    }
}
