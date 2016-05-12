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
        it("can specify to change arr", function () {
            var arr = [];
            arr.push(2,1,3,1);

            var result = Utils.insertSort(arr, function (a, b) {
                return a < b;
            }, true);

            expect(testTool.getValues(result)).toEqual([1, 1, 2, 3]);
            expect(testTool.getValues(arr)).toEqual([1, 1, 2, 3]);
        });
    });

    describe("quickSort", function () {
        it("return the sorted elements", function () {
            var arr = [];
            arr.push(2,1,3,1);

            var result = Utils.quickSort(arr, function (a, b) {
                return a < b;
            });

            expect(testTool.getValues(result)).toEqual([1, 1, 2, 3]);
            expect(testTool.getValues(arr)).toEqual([2, 1, 3, 1]);
        });
        it("can specify to change arr", function () {
            var arr = [];
            arr.push(2,1,3,1);

            var result = Utils.quickSort(arr, function (a, b) {
                return a > b;
            }, true);

            expect(testTool.getValues(result)).toEqual([3,2,1,1]);
            expect(testTool.getValues(arr)).toEqual([3,2,1,1]);
        });
    });
});
