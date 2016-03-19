module wd{
    export class BasicMaterial extends StandardBasicMaterial{
        public static create() {
            var obj = new this();

            return obj;
        }

        public clone(){
            var result = CloneHelper.clone(this, BasicMaterial.create());

            return result;
        }
    }
}

