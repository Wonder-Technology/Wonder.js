module wd {
    export class GlUtils {
        public static drawElements(mode:any, count:number, type:any, offset:number){
            DebugStatistics.count.drawCalls++;

            this._getGl().drawElements(mode, count, type, offset);
        }

        public static drawArrays(mode:any, first:number, count:number) {
            DebugStatistics.count.drawCalls++;

            this._getGl().drawArrays(mode, first, count);
        }

        private static _getGl() {
            return DeviceManager.getInstance().gl;
        }
    }
}
