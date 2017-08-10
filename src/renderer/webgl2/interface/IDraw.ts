import { IDrawFuncDataMap } from "../../interface/IDraw";

export interface IWebGL2DrawFuncDataMap extends IDrawFuncDataMap{
    bindGBuffer: Function;
    unbindGBuffer: Function;
    getNewTextureUnitIndex: Function;
}

