import { expect } from "wonder-expect.js";
import { it } from "../../definition/typescript/decorator/contract";

export var checkIndexShouldEqualCount = (ComponentData: any) => {
    it("ComponentData.index should === ComponentData.count", () => {
        expect(ComponentData.index).equal(ComponentData.count);
    });
    it("ComponentData.index should >= 0", () => {
        expect(ComponentData.index).gte(0);
    });
    it("ComponentData.count should >= 0", () => {
        expect(ComponentData.count).gte(0);
    });
}

export var checkLastComponentIndexShouldNotEqualSourceComponentIndex = (lastComponentIndex:number, sourceIndex:number) => {
    it("lastComponentIndex !== sourceComponentIndex", () => {
        expect(lastComponentIndex).not.equal(sourceIndex);
    });
}
