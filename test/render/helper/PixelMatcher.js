var PixelMatcher = YYC.Class({
    Static:{
        comparePixel: function(gl, position, targetPixelDataArr, strategy){
            var matcher = new Matcher(gl);

            var pixels = new Uint8Array(4);
            gl.readPixels(position.x, position.y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

            matcher.record(pixels, targetPixelDataArr);

            //matcher.region(getMaxRegion(aImage), getMaxRegion(bImage));

            return matcher.run(strategy);
        },
        equal:function(a, b){
            expect(testTool.getValues(a, 0)).toEqual(testTool.getValues(b, 0));
        }
    }
});

var Matcher = YYC.Class({
    Init: function (gl) {
        this._gl = gl;
    },
    Public:{
        record: function(source, target){
            this._source = source;
            this._target = target;
        },
        run:function(strategy){
            strategy(this._source, this._target);
        }
    },
    Private:{
        _gl:null,
        _source:null,
        _target:null
    }
});
