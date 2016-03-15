module wd{
    export class BoundingRegionUtils{
        public static isAABBInFrustum(minPoint:Vector3, maxPoint:Vector3, frustumPlanes: Array<Plane>): boolean;
        public static isAABBInFrustum(boundingVectors: Vector3[], frustumPlanes: Plane[]): boolean;

        public static isAABBInFrustum(...args): boolean {
            var boundingVectors = null,
                frustumPlanes = null;

            if(args.length === 2){
                boundingVectors = args[0];
                frustumPlanes = args[1];
            }
            else if(args.length === 3){
                let minPoint = args[0],
                    maxPoint = args[1];

                boundingVectors = this.buildBoundingVectors(minPoint, maxPoint);

                frustumPlanes = args[2];
            }

            for (let p = 0; p < 6; p++) {
                for (let i = 0; i < 8; i++) {
                    if (frustumPlanes[p].dotCoordinate(boundingVectors[i]) < 0) {
                        return false;
                    }
                }
            }

            return true;
        }

        public static isAABBIntersectFrustum(minPoint:Vector3, maxPoint:Vector3, frustumPlanes: Array<Plane>): boolean;
        public static isAABBIntersectFrustum(boundingVectors:Array<Vector3>, frustumPlanes: Array<Plane>): boolean;

        public static isAABBIntersectFrustum(...args): boolean {
        var boundingVectors = null,
            frustumPlanes = null;

            if(args.length === 2){
                boundingVectors = args[0];
                frustumPlanes = args[1];
            }
            else if(args.length === 3){
                let minPoint = args[0],
                    maxPoint = args[1];

                boundingVectors = this.buildBoundingVectors(minPoint, maxPoint);

                frustumPlanes = args[2];
            }

            for (let p = 0; p < 6; p++) {
                let inCount = 8;

                for (let i = 0; i < 8; i++) {
                    if (frustumPlanes[p].dotCoordinate(boundingVectors[i]) < 0) {
                        inCount--;
                    }
                    else {
                        break;
                    }
                }
                if (inCount === 0){
                    return false;
                }
            }

            return true;
        }

        public static buildBoundingVectors(minPoint:Vector3, maxPoint:Vector3){
            var boundingVectors = [];

            boundingVectors.push(minPoint.clone());
            boundingVectors.push(maxPoint.clone());

            boundingVectors.push(minPoint.clone());
            boundingVectors[2].x = maxPoint.x;

            boundingVectors.push(minPoint.clone());
            boundingVectors[3].y = maxPoint.y;

            boundingVectors.push(minPoint.clone());
            boundingVectors[4].z = maxPoint.z;

            boundingVectors.push(maxPoint.clone());
            boundingVectors[5].z = minPoint.z;

            boundingVectors.push(maxPoint.clone());
            boundingVectors[6].x = minPoint.x;

            boundingVectors.push(maxPoint.clone());
            boundingVectors[7].y = minPoint.y;

            return boundingVectors;
        }
    }
}
