module wd {
    export class InstanceUtils {
        public static isHardwareSupport() {
            return GPUDetector.getInstance().extensionInstancedArrays !== null;
        }

        public static isInstance(gameObject:GameObject) {
            return gameObject.hasComponent(Instance);
        }

        public static isSourceInstance(gameObject:GameObject) {
            return gameObject.hasComponent(SourceInstance);
        }

        public static isObjectInstance(gameObject:GameObject) {
            return gameObject.hasComponent(ObjectInstance);
        }
    }
}
