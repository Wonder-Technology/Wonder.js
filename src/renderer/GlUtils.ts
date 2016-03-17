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

        public static drawElementsInstancedANGLE(mode:any, count:number, type:any, offset:number, instancesCount:number){
            var extension = GPUDetector.getInstance().extensionInstancedArrays;

            DebugStatistics.count.drawCalls++;

            extension.drawElementsInstancedANGLE(mode, count, type, offset, instancesCount);
        }

        public static drawArraysInstancedANGLE(mode:any, first:number, count:number, instancesCount:number){
            var extension = GPUDetector.getInstance().extensionInstancedArrays;

            DebugStatistics.count.drawCalls++;

            extension.drawArraysInstancedANGLE(mode, first, count, instancesCount);
        }

        private static _getGl() {
            return DeviceManager.getInstance().gl;
        }
    }
}
