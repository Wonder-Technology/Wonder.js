module dy{
    export enum VariableCategory{
        //to avoid to equal 0
        //for example, when compare to texture index, it may equal texture 0
        ENGINE = <any>"ENGINE",
        CUSTOM = <any>"CUSTOM"
    }
}
