import { IDrawFuncDataMap } from "../../interface/IDraw";

export interface IWebGL2DeferDrawFuncDataMap extends IDrawFuncDataMap{
    bindGBuffer: Function;
    unbindGBuffer: Function;
    getNewTextureUnitIndex: Function;
}

export interface IWebGL2BasicDrawFuncDataMap extends IDrawFuncDataMap{
}

