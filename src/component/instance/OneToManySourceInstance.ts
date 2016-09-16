module wd{
    export class OneToManySourceInstance extends SourceInstance{
        public static create() {
            var obj = new this();

            return obj;
        }
    }
}
