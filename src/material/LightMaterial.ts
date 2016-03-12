module wd{
    export class LightMaterial extends StandardLightMaterial{
        public static create() {
            var obj = new this();

            return obj;
        }
    }
}

