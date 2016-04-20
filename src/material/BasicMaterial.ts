module wd{
    export class BasicMaterial extends StandardBasicMaterial{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }
    }
}

