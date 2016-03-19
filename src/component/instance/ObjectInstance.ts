module wd{
    export class ObjectInstance extends Instance{
        public static create() {
            var obj = new this();

            return obj;
        }

        public sourceObject:GameObject = null;
    }
}

