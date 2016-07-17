module wd {
    export class BasicBufferContainer extends CommonBufferContainer{
        public static create(entityObject:GameObject) {
        	var obj = new this(entityObject);

        	return obj;
        }
    }
}
