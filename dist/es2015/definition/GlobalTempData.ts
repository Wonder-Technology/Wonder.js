import { Matrix4 } from "../math/Matrix4";
import { Vector3 } from "../math/Vector3";
import { Quaternion } from "../math/Quaternion";

export class GlobalTempData {
    public static matrix4_1 = Matrix4.create();
    public static matrix4_2 = Matrix4.create();
    public static matrix4_3 = Matrix4.create();
    public static vector3_1 = Vector3.create();
    public static vector3_2 = Vector3.create();
    public static vector3_3 = Vector3.create();
    public static vector3_4 = Vector3.create();
    public static quaternion_1 = Quaternion.create();
}

