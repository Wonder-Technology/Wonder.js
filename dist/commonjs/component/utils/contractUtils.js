"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wonder_expect_js_1 = require("wonder-expect.js");
var contract_1 = require("../../definition/typescript/decorator/contract");
exports.checkIndexShouldEqualCount = function (ComponentData) {
    contract_1.it("ComponentData.index should === ComponentData.count", function () {
        wonder_expect_js_1.expect(ComponentData.index).equal(ComponentData.count);
    });
    contract_1.it("ComponentData.index should >= 0", function () {
        wonder_expect_js_1.expect(ComponentData.index).gte(0);
    });
    contract_1.it("ComponentData.count should >= 0", function () {
        wonder_expect_js_1.expect(ComponentData.count).gte(0);
    });
};
//# sourceMappingURL=contractUtils.js.map