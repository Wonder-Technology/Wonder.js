import { MeshRenderer } from "./MeshRenderer";
import { GameObject } from "../../../core/entityObject/gameObject/GameObject";
import curry from "wonder-lodash/curry";
import { it, requireCheckFunc } from "../../../definition/typescript/decorator/contract";
import { deleteBySwap } from "../../../utils/arrayUtils";
import { expect } from "wonder-expect.js";
import { Map } from "immutable";

export var create = requireCheckFunc((MeshRendererData: any) => {
    it("MeshRendererData.index should === MeshRendererData.count", () => {
        expect(MeshRendererData.index).equal(MeshRendererData.count);
    });
    it("MeshRendererData.index should >= 0", () => {
        expect(MeshRendererData.index).gte(0);
    });
    it("MeshRendererData.count should >= 0", () => {
        expect(MeshRendererData.count).gte(0);
    });
}, (MeshRendererData: any) => {
    var renderer = new MeshRenderer(),
        index = _generateIndex(MeshRendererData);

    renderer.index = index;

    MeshRendererData.count += 1;

    return renderer;
})

var _generateIndex = (MeshRendererData: any) => {
    return MeshRendererData.index++;
}

var _setRenderGameObjectArray = requireCheckFunc((index:number, gameObject:GameObject, renderGameObjectArray:Array<GameObject>) => {
    it("should not exist gameObject", function () {
        expect(renderGameObjectArray[index]).not.exist;
    })
},(index:number, gameObject:GameObject, renderGameObjectArray:Array<GameObject>) => {
    renderGameObjectArray[index] = gameObject;
})

export var addComponent = curry((MeshRendererData:any, component:MeshRenderer, gameObject:GameObject) => {
    _setRenderGameObjectArray(component.index, gameObject, MeshRendererData.renderGameObjectArray);
})

export var disposeComponent = curry((MeshRendererData:any, component:MeshRenderer) => {
    deleteBySwap(MeshRendererData.renderGameObjectArray, component.index);

    //todo swap component index
    //todo add componentMap

    MeshRendererData.count -= 1;
    MeshRendererData.index -= 1;
})

export var getRenderList = curry((state:Map<any, any>, MeshRendererData:any) => {
    return MeshRendererData.renderGameObjectArray;
})

export var initData = (MeshRendererData: any) => {
    MeshRendererData.renderGameObjectArray = [];
    MeshRendererData.index = 0;
    MeshRendererData.count = 0;
}
