export class BufferUtils{
    public static isDrawRenderCommandDataTypeArrayNotExist(DrawRenderCommandDataFromSystem:any){
        return DrawRenderCommandDataFromSystem.mMatrices === null;
    }
}
