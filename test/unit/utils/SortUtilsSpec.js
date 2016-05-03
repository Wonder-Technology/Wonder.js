describe("SortUtils", function () {
    var sandbox = null;
    var Utils = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Utils = wd.SortUtils;

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("insertSort", function () {
        it("return the sorted elements", function () {
            var arr = [];
            arr.push(2,1,3,1);

            var result = Utils.insertSort(arr, function (a, b) {
                return a < b;
            });

            expect(testTool.getValues(result)).toEqual([1, 1, 2, 3]);
            expect(testTool.getValues(arr)).toEqual([2, 1, 3, 1]);
        });
    });
});
