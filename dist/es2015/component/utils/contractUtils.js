import { expect } from "wonder-expect.js";
import { it } from "../../definition/typescript/decorator/contract";
export var checkIndexShouldEqualCount = function (ComponentData) {
    it("ComponentData.index should === ComponentData.count", function () {
        expect(ComponentData.index).equal(ComponentData.count);
    });
    it("ComponentData.index should >= 0", function () {
        expect(ComponentData.index).gte(0);
    });
    it("ComponentData.count should >= 0", function () {
        expect(ComponentData.count).gte(0);
    });
};
//# sourceMappingURL=contractUtils.js.map