import { IMaterialShaderLibGroup, IShaderLibItem, MaterialShaderLibConfig } from "../../../data/material_config_interface";
import { InitShaderDataMap, InitShaderFuncDataMap } from "../../../type/utilsType";
import { it, requireCheckFunc } from "../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { forEach } from "../../../../utils/arrayUtils";
import { isString } from "../../../../utils/JudgeUtils";

export var getMaterialShaderLibNameArr = (materialShaderLibConfig: MaterialShaderLibConfig, materialShaderLibGroup: IMaterialShaderLibGroup, materialIndex: number, initShaderFuncDataMap: InitShaderFuncDataMap, initShaderDataMap: InitShaderDataMap) => {
    var nameArr: Array<string> = [];

    forEach(materialShaderLibConfig, (item: string | IShaderLibItem) => {
        if (isString(item)) {
            nameArr.push(item as string);
        }
        else {
            let i = item as IShaderLibItem;

            switch (i.type) {
                case "group":
                    nameArr = nameArr.concat(materialShaderLibGroup[i.value]);
                    break;
                case "branch":
                    let shaderLibName = _execBranch(i, materialIndex, initShaderFuncDataMap, initShaderDataMap);

                    if (_isShaderLibNameExist(shaderLibName)) {
                        nameArr.push(shaderLibName);
                    }
            }
        }
    });

    return nameArr;
}

var _execBranch = requireCheckFunc((i: IShaderLibItem, materialIndex: number, initShaderFuncDataMap: InitShaderFuncDataMap, initShaderDataMap: InitShaderDataMap) => {
    it("branch should exist", () => {
        expect(i.branch).exist;
    });
}, (i: IShaderLibItem, materialIndex: number, initShaderFuncDataMap: InitShaderFuncDataMap, initShaderDataMap: InitShaderDataMap) => {
    return i.branch(materialIndex, initShaderFuncDataMap, initShaderDataMap);
})

var _isShaderLibNameExist = (name: string) => !!name;
