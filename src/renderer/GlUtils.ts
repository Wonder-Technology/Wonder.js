module wd {
    export class GlUtils {
        public static drawElements(mode:any, count:number, type:any, offset:number){
            var DebugStatistics = ClassUtils.getClassOrEmpty("DebugStatistics", "EmptyDebugStatistics");

            DebugStatistics.count.drawCalls++;
            DebugStatistics.count.renderGameObjects++;

            this._getGl().drawElements(mode, count, type, offset);
        }

        public static drawArrays(mode:any, first:number, count:number) {
            var DebugStatistics = ClassUtils.getClassOrEmpty("DebugStatistics", "EmptyDebugStatistics");

            DebugStatistics.count.drawCalls++;
            DebugStatistics.count.renderGameObjects++;

            this._getGl().drawArrays(mode, first, count);
        }

        public static drawElementsInstancedANGLE(mode:any, count:number, type:any, offset:number, instancesCount:number){
            var extension = GPUDetector.getInstance().extensionInstancedArrays,
                DebugStatistics = ClassUtils.getClassOrEmpty("DebugStatistics", "EmptyDebugStatistics");

            DebugStatistics.count.drawCalls++;
            DebugStatistics.count.renderGameObjects += instancesCount;

            extension.drawElementsInstancedANGLE(mode, count, type, offset, instancesCount);
        }

        public static drawArraysInstancedANGLE(mode:any, startOffset:number, count:number, instancesCount:number){
            var extension = GPUDetector.getInstance().extensionInstancedArrays,
                DebugStatistics = ClassUtils.getClassOrEmpty("DebugStatistics", "EmptyDebugStatistics");

            DebugStatistics.count.drawCalls++;
            DebugStatistics.count.renderGameObjects += instancesCount;

            extension.drawArraysInstancedANGLE(mode, startOffset, count, instancesCount);
        }

        private static _getGl() {
            return DeviceManager.getInstance().gl;
        }
    }
}
