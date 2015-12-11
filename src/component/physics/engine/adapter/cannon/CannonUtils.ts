/// <reference path="../../../../../filePath.d.ts"/>
module wd {
    export class CannonUtils{
        public static convertToCannonVector3(v:Vector3) {
            return new CANNON.Vec3(v.x, v.y, v.z);
        }

        public static convertToCannonQuaternion(rotation:Quaternion){
            return new CANNON.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);
        }

        public static convertToWonderVector3(v:CANNON.Vec3) {
            return Vector3.create(v.x, v.y, v.z);
        }

        public static convertToWonderQuaternion(r:CANNON.Quaternion){
            return Quaternion.create(r.x, r.y, r.z, r.w);
        }
    }
}

