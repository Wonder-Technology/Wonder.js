import { registerClass } from "../definition/typescript/decorator/registerClass";
import { Vector3 } from "./Vector3";
import { DEG_TO_RAD, RAD_TO_DEG } from "./Global";
import { Matrix4 } from "./Matrix4";

declare var Math: any;

@registerClass("Quaternion")
export class Quaternion {
    public static create(x?: number, y?: number, z?: number, w?: number) {
        var obj = new this(x, y, z, w);

        return obj;
    }

    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    public x: number = null;
    public y: number = null;
    public z: number = null;
    public w: number = null;

    /**
     * @function
     * @name setFromEulerAngles
     * @description Sets a quaternion from Euler angles specified in XYZ order.
     * @param {Number} ex Angle to rotate around X axis in degrees.
     * @param {Number} ey Angle to rotate around Y axis in degrees.
     * @param {Number} ez Angle to rotate around Z axis in degrees.
     * @returns {Quat} Self for chaining.
     * @example
     * var q = new Quat();
     * q.setFromEulerAngles(45, 90, 180);
     */
    public setFromEulerAngles(eulerAngles: Vector3) {
        var sx, cx, sy, cy, sz, cz, halfToRad,
            ex = eulerAngles.x,
            ey = eulerAngles.y,
            ez = eulerAngles.z;

        halfToRad = 0.5 * DEG_TO_RAD;
        ex *= halfToRad;
        ey *= halfToRad;
        ez *= halfToRad;

        sx = Math.sin(ex);
        cx = Math.cos(ex);
        sy = Math.sin(ey);
        cy = Math.cos(ey);
        sz = Math.sin(ez);
        cz = Math.cos(ez);

        this.x = sx * cy * cz - cx * sy * sz;
        this.y = cx * sy * cz + sx * cy * sz;
        this.z = cx * cy * sz - sx * sy * cz;
        this.w = cx * cy * cz + sx * sy * sz;

        return this;
    }

    public multiply(rhs: Quaternion);
    public multiply(rhs1: Quaternion, rhs2: Quaternion);

    public multiply(...args) {
        var q1x, q1y, q1z, q1w, q2x, q2y, q2z, q2w,
            rhs1, rhs2,
            result = this;

        if (args.length === 1) {
            rhs1 = this;
            rhs2 = args[0];
        }
        else if (args.length === 2) {
            rhs1 = args[0];
            rhs2 = args[1];
        }

        q1x = rhs1.x;
        q1y = rhs1.y;
        q1z = rhs1.z;
        q1w = rhs1.w;

        q2x = rhs2.x;
        q2y = rhs2.y;
        q2z = rhs2.z;
        q2w = rhs2.w;

        result.x = q1w * q2x + q1x * q2w + q1y * q2z - q1z * q2y;
        result.y = q1w * q2y + q1y * q2w + q1z * q2x - q1x * q2z;
        result.z = q1w * q2z + q1z * q2w + q1x * q2y - q1y * q2x;
        result.w = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;

        return result;
    }

    /**
     * @function
     * @name setFromMat4
     * @description Converts the specified 4x4 matrix to a quaternion. Note that since
     * a quaternion is purely a representation for orientation, only the translational part
     * of the matrix is lost.
     * @param {Mat4} m The 4x4 matrix to convert.
     * @returns {Quat} Self for chaining.
     * @example
     * // Create a 4x4 rotation matrix of 180 degrees around the y-axis
     * var rot = new Mat4().setFromAxisAngle(Vec3.UP, 180);
     *
     * // Convert to a quaternion
     * var q = new Quat().setFromMat4(rot);
     */
    public setFromMatrix(matrix: Matrix4) {
        var m00, m01, m02, m10, m11, m12, m20, m21, m22,
            tr, s, rs, lx, ly, lz, m;

        m = matrix.values;

        // Cache matrix values for super-speed
        m00 = m[0];
        m01 = m[1];
        m02 = m[2];
        m10 = m[4];
        m11 = m[5];
        m12 = m[6];
        m20 = m[8];
        m21 = m[9];
        m22 = m[10];

        // Remove the scale from the matrix
        lx = 1 / Math.sqrt(m00 * m00 + m01 * m01 + m02 * m02);
        ly = 1 / Math.sqrt(m10 * m10 + m11 * m11 + m12 * m12);
        lz = 1 / Math.sqrt(m20 * m20 + m21 * m21 + m22 * m22);

        m00 *= lx;
        m01 *= lx;
        m02 *= lx;
        m10 *= ly;
        m11 *= ly;
        m12 *= ly;
        m20 *= lz;
        m21 *= lz;
        m22 *= lz;

        // http://www.cs.ucr.edu/~vbz/resources/quatut.pdf

        tr = m00 + m11 + m22;
        if (tr >= 0) {
            s = Math.sqrt(tr + 1);
            this.w = s * 0.5;
            s = 0.5 / s;
            this.x = (m12 - m21) * s;
            this.y = (m20 - m02) * s;
            this.z = (m01 - m10) * s;
        } else {
            if (m00 > m11) {
                if (m00 > m22) {
                    // XDiagDomMatrix
                    rs = (m00 - (m11 + m22)) + 1;
                    rs = Math.sqrt(rs);

                    this.x = rs * 0.5;
                    rs = 0.5 / rs;
                    this.w = (m12 - m21) * rs;
                    this.y = (m01 + m10) * rs;
                    this.z = (m02 + m20) * rs;
                } else {
                    // ZDiagDomMatrix
                    rs = (m22 - (m00 + m11)) + 1;
                    rs = Math.sqrt(rs);

                    this.z = rs * 0.5;
                    rs = 0.5 / rs;
                    this.w = (m01 - m10) * rs;
                    this.x = (m20 + m02) * rs;
                    this.y = (m21 + m12) * rs;
                }
            } else if (m11 > m22) {
                // YDiagDomMatrix
                rs = (m11 - (m22 + m00)) + 1;
                rs = Math.sqrt(rs);

                this.y = rs * 0.5;
                rs = 0.5 / rs;
                this.w = (m20 - m02) * rs;
                this.z = (m12 + m21) * rs;
                this.x = (m10 + m01) * rs;
            } else {
                // ZDiagDomMatrix
                rs = (m22 - (m00 + m11)) + 1;
                rs = Math.sqrt(rs);

                this.z = rs * 0.5;
                rs = 0.5 / rs;
                this.w = (m01 - m10) * rs;
                this.x = (m20 + m02) * rs;
                this.y = (m21 + m12) * rs;
            }
        }

        return this;
    }

    /**
     * @function
     * @name setFromAxisAngle
     * @description Sets a quaternion from an angular rotation around an axis.
     * @param {Vec3} axis World space axis around which to rotate.
     * @param {Number} angle Angle to rotate around the given axis in degrees.
     * @returns {Quat} Self for chaining.
     * @example
     * var q = new Quat();
     * q.setFromAxisAngle(Vec3.UP, 90);
     */
    public setFromAxisAngle(angle: number, axis: Vector3) {
        var sa, ca;

        axis = axis.normalize();

        angle *= 0.5 * DEG_TO_RAD;

        sa = Math.sin(angle);
        ca = Math.cos(angle);

        this.x = sa * axis.x;
        this.y = sa * axis.y;
        this.z = sa * axis.z;
        this.w = ca;

        return this;
    }

    /**
     * @function
     * @name invert
     * @description Generates the inverse of the specified quaternion.
     * @returns {Quat} Self for chaining.
     * @example
     * // Create a quaternion rotated 180 degrees around the y-axis
     * var rot = new Quat().setFromEulerAngles(0, 180, 0);
     *
     * // Invert in place
     * rot.invert();
     */
    public invert() {
        return this.conjugate().normalize();
    }

    public conjugate() {
        this.x *= -1;
        this.y *= -1;
        this.z *= -1;

        return this;
    }

    /**
     * @function
     * @name clone
     * @description Returns an identical clone of the specified quaternion.
     * @returns {Quat} A quaternion containing the result of the cloning.
     * @example
     * var q = new Quat(-0.11, -0.15, -0.46, 0.87);
     * var qclone = q.clone();
     *
     * console.log("The result of the cloning is: " + q.toString());
     */
    public clone() {
        return Quaternion.create(this.x, this.y, this.z, this.w);
    }

    /**
     * @function
     * @name normalize
     * @description Returns the specified quaternion converted in place to a unit quaternion.
     * @returns {Quat} The result of the normalization.
     * @example
     * var v = new Quat(0, 0, 0, 5);
     *
     * v.normalize();
     *
     * // Should output 0, 0, 0, 1
     * console.log("The result of the vector normalization is: " + v.toString());
     */
    public normalize() {
        var len = this.length();
        if (len === 0) {
            this.x = this.y = this.z = 0;
            this.w = 1;
        } else {
            len = 1 / len;
            this.x *= len;
            this.y *= len;
            this.z *= len;
            this.w *= len;
        }

        return this;
    }

    /**
     * @function
     * @name length
     * @description Returns the magnitude of the specified quaternion.
     * @returns {Number} The magnitude of the specified quaternion.
     * @example
     * var q = new Quat(0, 0, 0, 5);
     * var len = q.length();
     * // Should output 5
     * console.log("The length of the quaternion is: " + len);
     */
    public length() {
        var x, y, z, w;

        x = this.x;
        y = this.y;
        z = this.z;
        w = this.w;

        return Math.sqrt(x * x + y * y + z * z + w * w);
    }


    public multiplyVector3(vector: Vector3) {
        var q = this;
        var x = vector.x;
        var y = vector.y;
        var z = vector.z;

        var qx = q.x;
        var qy = q.y;
        var qz = q.z;
        var qw = q.w;

        // calculate quat * vector

        var ix = qw * x + qy * z - qz * y;
        var iy = qw * y + qz * x - qx * z;
        var iz = qw * z + qx * y - qy * x;
        var iw = - qx * x - qy * y - qz * z;

        // calculate result * inverse quat

        return Vector3.create(
            ix * qw + iw * - qx + iy * - qz - iz * - qy,
            iy * qw + iw * - qy + iz * - qx - ix * - qz,
            iz * qw + iw * - qz + ix * - qy - iy * - qx
        );
    }

    public set(x: number, y: number, z: number, w: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    public sub(quat: Quaternion) {
        var result = quat.clone().invert().multiply(this);

        this.set(result.x, result.y, result.z, result.w);

        return this;
    }

    /**
     * @function
     * @name getEulerAngles
     * @description Converts the supplied quaternion to Euler angles.
     * @param {Vec3} [eulers] The 3-dimensional vector to receive the Euler angles.
     * @returns {Vec3} The 3-dimensional vector holding the Euler angles that
     * correspond to the supplied quaternion.
     */
    public getEulerAngles() {
        var x, y, z, qx, qy, qz, qw, a2;

        qx = this.x;
        qy = this.y;
        qz = this.z;
        qw = this.w;

        a2 = 2 * (qw * qy - qx * qz);
        if (a2 <= -0.99999) {
            x = 2 * Math.atan2(qx, qw);
            y = -Math.PI / 2;
            z = 0;
        } else if (a2 >= 0.99999) {
            x = 2 * Math.atan2(qx, qw);
            y = Math.PI / 2;
            z = 0;
        } else {
            x = Math.atan2(2 * (qw * qx + qy * qz), 1 - 2 * (qx * qx + qy * qy));
            y = Math.asin(a2);
            z = Math.atan2(2 * (qw * qz + qx * qy), 1 - 2 * (qy * qy + qz * qz));
        }

        return Vector3.create(x, y, z).scale(RAD_TO_DEG);
    }

    public slerp(left: Quaternion, right: Quaternion, amount: number): Quaternion {
        if (amount === 0) {
            this.set(left.x, left.y, left.z, left.w);

            return this;
        }
        else if (amount === 1) {
            this.set(right.x, right.y, right.z, right.w);

            return this;
        }

        var num2;
        var num3;
        var num = amount;
        var num4 = (((left.x * right.x) + (left.y * right.y)) + (left.z * right.z)) + (left.w * right.w);
        var flag = false;

        if (num4 < 0) {
            flag = true;
            num4 = -num4;
        }

        if (num4 > 0.999999) {
            num3 = 1 - num;
            num2 = flag ? -num : num;
        }
        else {
            var num5 = Math.acos(num4);
            var num6 = (1.0 / Math.sin(num5));
            num3 = (Math.sin((1.0 - num) * num5)) * num6;
            num2 = flag ? ((-Math.sin(num * num5)) * num6) : ((Math.sin(num * num5)) * num6);
        }

        this.set((num3 * left.x) + (num2 * right.x), (num3 * left.y) + (num2 * right.y), (num3 * left.z) + (num2 * right.z), (num3 * left.w) + (num2 * right.w));

        return this;
    }
}