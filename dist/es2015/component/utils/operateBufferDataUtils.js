import { Color } from "../../structure/Color";
import { setTypeArrayValue } from "../../utils/typeArrayUtils";
export var getColor3Data = function (index, colors) {
    var color = Color.create(), size = 3, i = index * size;
    color.r = colors[i];
    color.g = colors[i + 1];
    color.b = colors[i + 2];
    return color;
};
export var setColor3Data = function (index, color, colors) {
    var r = color.r, g = color.g, b = color.b, size = 3, index = index * size;
    setTypeArrayValue(colors, index, r);
    setTypeArrayValue(colors, index + 1, g);
    setTypeArrayValue(colors, index + 2, b);
};
//# sourceMappingURL=operateBufferDataUtils.js.map