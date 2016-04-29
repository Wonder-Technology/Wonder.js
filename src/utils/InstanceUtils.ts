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

        public static addModelMatrixShaderLib(shader:Shader, gameObject:GameObject){
            if(!gameObject){
                return;
            }

            if(InstanceUtils.isInstance(gameObject)){
                if(InstanceUtils.isHardwareSupport()){
                    shader.addLib(ModelMatrixHardwareInstanceShaderLib.create());

                    return;
                }

                shader.addLib(ModelMatrixBatchInstanceShaderLib.create());

                return;
            }

            shader.addLib(ModelMatrixNoInstanceShaderLib.create());
        }

        public static addNormalModelMatrixShaderLib(shader:Shader, gameObject:GameObject){
            if(!gameObject){
                return;
            }

            if(InstanceUtils.isInstance(gameObject)){
                if(InstanceUtils.isHardwareSupport()){
                    shader.addLib(NormalMatrixHardwareInstanceShaderLib.create());

                    return;
                }

                shader.addLib(NormalMatrixBatchInstanceShaderLib.create());

                return;
            }

            shader.addLib(NormalMatrixNoInstanceShaderLib.create());
        }
    }
}
