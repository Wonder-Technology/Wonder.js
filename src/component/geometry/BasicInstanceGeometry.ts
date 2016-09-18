module wd{
    export class BasicInstanceGeometry extends InstanceGeometry{
        public static create() {
        	var obj = new this();

        	return obj;
        }
    }
}
