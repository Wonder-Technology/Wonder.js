import { Color } from "../../structure/Color";
import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";

export var getColor3Data = (index: number, colors: Float32Array) => {
    var color = Color.create(),
        size = 3,
        i = index * size;

    color.r = colors[i];
    color.g = colors[i + 1];
    color.b = colors[i + 2];

    return color;
}


export var setColor3Data = (index: number, color: Color, colors: Float32Array) => {
    var r = color.r,
        g = color.g,
        b = color.b,
        size = 3,
        index = index * size;

    setTypeArrayValue(colors, index, r);
    setTypeArrayValue(colors, index + 1, g);
    setTypeArrayValue(colors, index + 2, b);
}

export var setTypeArrayValue = requireCheckFunc((typeArr: Float32Array | Uint32Array, index: number, value: number) => {
    it("should not exceed type arr's length", () => {
        expect(index).lte(typeArr.length - 1);
    });
}, (typeArr: Float32Array, index: number, value: number) => {
    typeArr[index] = value;
})

