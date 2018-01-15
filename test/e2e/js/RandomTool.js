var RandomTool = (function () {
    return {
        getFixedRandomNum: function (index) {
            var seedArr = [
                0.1, 0.8, 0.7, 0.3, 0.2,
                0.9, 0.95, 0.4, 0.6, 0.35,
                0.23, 0.55, 0.12, 0.88, 0.72,

                0.13, 0.05, 0.08, 0.33, 0.35,
                0.54, 0.71, 0.69, 0.36, 0.98
            ];

            var max = seedArr.length;

            // if(index > max)

            // expect(index).not.toBeGreaterThan(seedArr.length);

            return seedArr[index % max];
        },
        stubMathRandom: function (count) {
            // sandbox.stub(Math, "random");
            var currentIndex = 0;

            Math.random = function () {
                var result = RandomTool.getFixedRandomNum(currentIndex);

                currentIndex += 1;

                return result;
            }

            // for(var i = 0; i < count; i++){
            //     Math.random.onCall(i).returns(this.getFixedRandomNum(i));
            // }
        }
    }
})();
