module wd{
    export abstract class SourceLight extends Light{
        @cloneAttributeAsBasicType()
        public intensity:number = 1;
    }
}

