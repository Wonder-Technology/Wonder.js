var randomTool = (function(){
    return {
        getFixedRandomNum: function(index){
            var seedArr = [
                0.1, 0.8, 0.7, 0.3, 0.2,
                0.9, 0.95, 0.4, 0.6,0.35,
                0.23, 0.55, 0.12, 0.88, 0.72
            ];

            expect(index).toBeLessThan(seedArr.length);

            return seedArr[index];
        }
    }
})();
