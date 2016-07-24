var randomTool = (function(){
    return {
        getFixedRandomNum: function(index){
            var seedArr = [
                0.1, 0.8, 0.7, 0.3, 0.2,
                0.9, 0.95, 0.4, 0.6,0.35
            ];

            expect(index).toBeLessThan(seedArr.length);

            return seedArr[index];
        }
    }
})();
