module wd {
    /**
     * @name pc.math.DEG_TO_RAD
     * @description Conversion factor between degrees and radians
     * @type Number
     * @example
     * // Convert 180 degrees to pi radians
     * var rad = 180 * pc.math.DEG_TO_RAD;
     */
    export const DEG_TO_RAD = Math.PI / 180;

    /**
     * @name pc.math.RAD_TO_DEG
     * @description Conversion factor between degrees and radians
     * @type Number
     * @example
     * // Convert pi radians to 180 degrees
     * var deg = Math.PI * pc.math.RAD_TO_DEG;
     */
    export const RAD_TO_DEG = 180 / Math.PI;
}
