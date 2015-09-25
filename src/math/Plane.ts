/// <reference path="../definitions.d.ts"/>
module dy {
    export class Plane{
        public static create(a: number, b: number, c: number, d: number) {
        	var obj = new this(a, b, c, d);

        	return obj;
        }

        constructor(a: number, b: number, c: number, d: number){
            this.normal = Vector3.create(a, b, c);
            this.d = d;
        }

        public normal:Vector3 = Vector3.create(0, 1, 0);
        public d:number = 0;

        public getReflectionMatrix():Matrix {
            this.normalize();
            var x = this.normal.x;
            var y = this.normal.y;
            var z = this.normal.z;
            var temp = -2 * x;
            var temp2 = -2 * y;
            var temp3 = -2 * z;
            var result = Matrix.create();

            result.values[0] = (temp * x) + 1;
            result.values[1] = temp2 * x;
            result.values[2] = temp3 * x;
            result.values[3] = 0.0;
            result.values[4] = temp * y;
            result.values[5] = (temp2 * y) + 1;
            result.values[6] = temp3 * y;
            result.values[7] = 0.0;
            result.values[8] = temp * z;
            result.values[9] = temp2 * z;
            result.values[10] = (temp3 * z) + 1;
            result.values[11] = 0.0;
            result.values[12] = temp * this.d;
            result.values[13] = temp2 * this.d;
            result.values[14] = temp3 * this.d;
            result.values[15] = 1.0;

            return result;
        }

        public normalize():Plane {
            var norm = (Math.sqrt((this.normal.x * this.normal.x) + (this.normal.y * this.normal.y) + (this.normal.z * this.normal.z)));
            var magnitude = 0;

            if (norm !== 0) {
                magnitude = 1.0 / norm;
            }

            this.normal.x *= magnitude;
            this.normal.y *= magnitude;
            this.normal.z *= magnitude;

            this.d *= magnitude;

            return this;
        }
 //
 //
 //       /*
 //        ///applyMatrix4方法通过传递matrix(旋转,缩放,移动等变换矩阵)对当前Plane二维平面对象的法线向量normal和,应用变换.
 //        */
 //       ///<summary>applyMatrix4</summary>
 //       ///<param name ="matrix" type="Matrix4">(旋转,缩放,移动等变换矩阵</param>
 //       ///<param name ="optionalNormalMatrix" type="Matrix3">可选参数,如果设置了就会对法线应用(旋转,缩放,移动等变换矩阵</param>
 //       ///<returns type="Boolean">返回变换后的二维平面.</returns>
 //       public applyMatrix(matrix) {
 //       //var v1 = Vector3.create();
 //       //var v2 = Vector3.create();
 //       var m1 = Matrix3.create();
 //
 //
 //           // compute new normal based on theory here:
 //           // http://www.songho.ca/opengl/gl_normaltransform.html
 //           //todo rename getNormalMatrix
 //           var normalMatrix = m1.getNormalMatrix( matrix );
 //           var newNormal =normalMatrix.copy() .multiplyVector3(this.normal.copy());
 //
 //           var newCoplanarPoint = this.coplanarPoint();	//获得共面的点
 //newCoplanarPoint = matrix.multiplyVector3(newCoplanarPoint);
 //
 //           this.setFromNormalAndCoplanarPoint( newNormal, newCoplanarPoint );	//setFromNormalAndCoplanarPoint方法用来通过参数normal(平面法线向量)和参数point(共面的点)重新设置二维平面的法线向量normal,原点到平面的距离constant,并返回新的二维平面.
 //
 //           return this;		//返回变换后的二维平面
 //
 //       }
 //
 //       /*
 //        ///setFromNormalAndCoplanarPoint方法用来通过参数normal(平面法线向量)和参数point(共面的点)重新设置二维平面的法线向量normal,原点到平面的距离constant,并返回新的二维平面.
 //        */
 //       ///<summary>setFromNormalAndCoplanarPoint</summary>
 //       ///<param name ="normal" type="Vector3">平面法线向量</param>
 //       ///<param name ="point" type="Vector3">共面的点</param>
 //       ///<returns type="Plane">返回新的二维平面</returns>
 //       public setFromNormalAndCoplanarPoint( normal:Vector3, point:Vector3) {
 //
 //       this.normal = normal.copy();
 //       //下面point.dot()方法只接收this.normal,不接收normal,this.normal是被规范化的,是单位向量
 //       this.d = - point.dot( this.normal );	// must be this.normal, not normal, as this.normal is normalized
 //
 //       return this;	//并返回新的二维平面
 //   }
 //
 //       /*
 //        ///coplanarPoint方法获取当前二维平面的法线向量到当前二维平面投影(垂足,与当前平面的共面的点).
 //        ///TODO:这里没有弄明白,有时间在弄清楚,高中几何都快忘光了,钻牛角尖了.不过知道在下面应用变换时调用了.
 //        */
 //       ///<summary>coplanarPoint</summary>
 //       ///<param name ="optionalTarget" type="Vector3">可选参数,接收返回结果</param>
 //       ///<returns type="Boolean">返回共面的点.</returns>
 //       public coplanarPoint() {
 //           //todo scale?multiplyScaler?
 //       return this.normal.copy().scale(- this.d );	//返回共面的点
 //
 //   }
 //
 //       //public applyMatrix(transformation: Matrix): Plane {
 //       //    var transposedValues = transformation.transpose().values;
 //       //    var x = this.normal.x;
 //       //    var y = this.normal.y;
 //       //    var z = this.normal.z;
 //       //    var d = this.d;
 //       //
 //       //    this.normal.x = (((x * transposedValues[0]) + (y * transposedValues[1])) + (z * transposedValues[2])) + (d * transposedValues[3]);
 //       //    this.normal.y = (((x * transposedValues[4]) + (y * transposedValues[5])) + (z * transposedValues[6])) + (d * transposedValues[7]);
 //       //    this.normal.z = (((x * transposedValues[8]) + (y * transposedValues[9])) + (z * transposedValues[10])) + (d * transposedValues[11]);
 //       //    this.d = (((x * transposedValues[12]) + (y * transposedValues[13])) + (z * transposedValues[14])) + (d * transposedValues[15]);
 //       //
 //       //    return this;
 //       //}

        public copy(): Plane {
            return Plane.create(this.normal.x, this.normal.y, this.normal.z, this.d);
        }
    }
}
