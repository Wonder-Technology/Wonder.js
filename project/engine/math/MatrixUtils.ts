/// <reference path="Matrix.ts"/>
/// <reference path="Vector4.ts"/>
module Engine3D{
    export class MatrixUtils {
        public static multiply(matrix1:Matrix, matrix2:Matrix):Matrix {
            var mat1 = matrix1.values,
                mat2 = matrix2.values;
            var a = mat1[0], b = mat1[1], c = mat1[2], d = mat1[3],
                e = mat1[4], f = mat1[5], g = mat1[6], h = mat1[7],
                i = mat1[8], j = mat1[9], k = mat1[10], l = mat1[11],
                m = mat1[12], n = mat1[13], o = mat1[14], p = mat1[15],
                A = mat2[0], B = mat2[1], C = mat2[2], D = mat2[3],
                E = mat2[4], F = mat2[5], G = mat2[6], H = mat2[7],
                I = mat2[8], J = mat2[9], K = mat2[10], L = mat2[11],
                M = mat2[12], N = mat2[13], O = mat2[14], P = mat2[15];
            var dest = new Float32Array(16);

            dest[0] = A * a + B * e + C * i + D * m;
            dest[1] = A * b + B * f + C * j + D * n;
            dest[2] = A * c + B * g + C * k + D * o;
            dest[3] = A * d + B * h + C * l + D * p;
            dest[4] = E * a + F * e + G * i + H * m;
            dest[5] = E * b + F * f + G * j + H * n;
            dest[6] = E * c + F * g + G * k + H * o;
            dest[7] = E * d + F * h + G * l + H * p;
            dest[8] = I * a + J * e + K * i + L * m;
            dest[9] = I * b + J * f + K * j + L * n;
            dest[10] = I * c + J * g + K * k + L * o;
            dest[11] = I * d + J * h + K * l + L * p;
            dest[12] = M * a + N * e + O * i + P * m;
            dest[13] = M * b + N * f + O * j + P * n;
            dest[14] = M * c + N * g + O * k + P * o;
            dest[15] = M * d + N * h + O * l + P * p;

            return Matrix.create(dest);
        }

        public static multiplyVector4(matrix:Matrix, vector:Vector4):Vector4 {
            var mat1 = matrix.values,
                vec4 = vector.values;
            var result = [];

            result[0] = vec4[0] * mat1[0] + vec4[1] * mat1[4] + vec4[2] * mat1[8] + vec4[3] * mat1[12];
            result[1] = vec4[0] * mat1[1] + vec4[1] * mat1[5] + vec4[2] * mat1[9] + vec4[3] * mat1[13];
            result[2] = vec4[0] * mat1[2] + vec4[1] * mat1[6] + vec4[2] * mat1[10] + vec4[3] * mat1[14];
            result[3] = vec4[0] * mat1[3] + vec4[1] * mat1[7] + vec4[2] * mat1[11] + vec4[3] * mat1[15];

            return Vector4.create(result[0], result[1], result[2], result[3]);
        }
    }
}
