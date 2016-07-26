var SceneBodyWrapper = YYC.Class({
    Static:{
        create:function(tester){
            return new this(tester);
        }
    },
    Init:function(tester){
        this._tester = tester;
    },
    Public:{
        execBody: function (args){
            var bodyFunc = null,
                done = null,
                initFunc = null;

            if(arguments.length === 1 && !wd.JudgeUtils.isFunction(arguments[0])){
                var data = arguments[0];

                bodyFunc = data.body;
                done = data.done;
                initFunc = data.init;
            }
            else if(arguments.length === 1){
                bodyFunc = arguments[0];
            }
            else if(arguments.length === 2){
                bodyFunc = arguments[0];
                done = arguments[1];
                initFunc = null;
            }
            else{
                bodyFunc = arguments[0];
                done = arguments[1];
                initFunc = arguments[2];
            }

            this._bodyFunc = bodyFunc;
            this._initFunc = initFunc;
            this._done = done;

            bodyFunc(this);
        },
        load: function(assetDataArr){
            if(assetDataArr === undefined || assetDataArr === null){
                this._assetDataArr = [];

                return;
            }

            assetDataArr.forEach(function(assetData){
                var url = assetData.url;

                if(url.match("../../asset/") !== null){
                    assetData.url = url.replace("../../asset/", pathTool.join(pathTool.getPathData().rootPath, "base/examples/asset/"));
                }
            });

            this._assetDataArr = assetDataArr;

            return this;
        },
        do: function(initSampleFunc){
            var self = this;

            wd.LoaderManager.getInstance().load(this._assetDataArr).subscribe(null, null, function () {
                if(self._initFunc){
                    self._initFunc();
                }

                self._tester.sandbox.stub(wd.Director.getInstance(), "start");

                initSampleFunc();

                self._tester.init();

                if(self._done){
                    self._done();
                }
            });
        }
    },
    Private:{
        _tester:null,
        _bodyFunc:null,
        _initFunc:null,
        _done:null,
        _assetDataArr: null,
    }
});

