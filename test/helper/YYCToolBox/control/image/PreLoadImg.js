/*
    图片预加载控件


调用方式：

new YYC.PreLoadImg([{id: "a1", url: "a1.png"}], function (currentLoad, imgCount) {
            $("#progressBar_img_show").progressBar(parseInt(currentLoad * 100 / imgCount, 10));     //调用进度条插件
        }, function () {
            window.setTimeout(function () {
                LoadSound();
            }, 300);    //延迟300ms，用于chrome中，进度条显示出来（100%）后，再显示加载音效的进度
        });

修改日志：

2013-04-01
采用oop框架。
删除了无用的注释。
可以根据id值，获得加载的图片。

*/
YYC.namespace("Control").PreLoadImg = YYC.Class({
    Init: function (images, onstep, onload) {
        this._checkImages(images);

        this.config = {
            images: images || [],
            onstep: onstep || function () { },
            onload: onload || function () { }
        };
        //this._imgs = [];
        this._imgs = {};

        this.imgCount = this.config.images.length;
        this.currentLoad = 0;
        this.timerID = 0;

        this.loadImg();
    },
    Private: {
        _imgs: {},

        _checkImages: function (images) {
            var i = null;

            for (var i in images) {
                if (images.hasOwnProperty(i)) {
                    if (images[i].id === undefined || images[i].url === undefined) {
                        throw new Error("应该包含id和url属性");
                    }
                }
            }
        }
    },
    Public: {
        imgCount: 0,
        currentLoad: 0,
        timerID: 0,

        get: function (id) {
            return this._imgs[id];
        },
        loadImg: function () {
            var c = this.config,
                img = null,
                i,
                //_imgs = this._imgs,
            self = this,
            image = null;

            for (i = 0; i < c.images.length; i++) {
                img = c.images[i];
                image = this._imgs[img.id] = new Image();
                //_imgs.push(new Image());
                /* 
                经过对多个浏览器版本的测试，发现ie、opera下，当图片加载过一次以后，如果再有对该图片的请求时，由于浏览器已经缓存住这张图
     
                片了，不会再发起一次新的请求，而是直接从缓存中加载过来。对于 firefox和safari，它们试图使这两种加载方式对用户透明，同样
     
                会引起图片的onload事件，而ie和opera则忽略了这种同一性，不会引起图片的onload事件，因此上边的代码在它们里边不能得以实现效果。
     
                确实，在ie，opera下，对于缓存图片的初始状态，与firefox和safari，chrome下是不一样的（有兴趣的话，可以在不同浏览器下，测试一下在给img的src赋值缓存图片的url之前，img的状态），
                但是对onload事件的触发，却是一致的，不管是什么浏览器。
    
                产生这个问题的根本原因在于，img的src赋值与 onload事件的绑定，顺序不对（在ie和opera下，先赋值src，再赋值onload，因为是缓存图片，就错过了onload事件的触发）。
                应该先绑定onload事件，然后再给src赋值。
                */
                image.onload = function () {
                    this.onload = null;     //解决ie内存泄露  此处this指代_imgs[i]
                    YYC.Tool.func.bind(self, self.onload)();
                };
                //_imgs[i].src = c.images[i];
                image.src = img.url;

                    this.timerID = (function (i) {
                    return setTimeout(function () {
                        if (i == self.currentLoad) {
                            //_imgs[i].src = c.images[i];
                            image.src = img.url;
                        }
                    }, 500);
                })(i);
            }
        },
        onload: function (i) {
            //        console.log("加载图片完成");
            clearTimeout(this.timerID);
            this.currentLoad++;
            this.config.onstep(this.currentLoad, this.imgCount);
            if (this.currentLoad === this.imgCount) {
                this.config.onload(this.currentLoad);
                //this.dispose();   //如果加载完毕后调用dispose，则加载完毕后_imgs就为空了！（用get获取不到了！）
            }
        },
        dispose: function () {
            var i, _imgs = this._imgs;
            //for (i = 0; i < _imgs.length; i++) {
            for (i in _imgs){
                _imgs[i].onload = null;
                _imgs[i] = null;
            }
            //_imgs.length = 0;
            this.config = null;
        }
    }
});
