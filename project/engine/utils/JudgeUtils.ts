module Engine3D {
    export class JudgeUtils {
        public static isArray(val) {
            return Object.prototype.toString.call(val) === "[object Array]";
        }
    }
}
