var judgeTool = (function(){
    return {
        isObjectEqual: function(a, b){
            expect(a.uid).toEqual(b.uid);
        },
        isObjectNotEqual: function(a, b){
            expect(a.uid).not.toEqual(b.uid);
        },
        isObjectListEqual: function(l1, l2){
            expect(
                l1.map(function(obj){
                    return obj.uid
                })
            ).toEqual(
                l2.map(function(obj){
                    return obj.uid
                })
            );
        }
    }
})();
