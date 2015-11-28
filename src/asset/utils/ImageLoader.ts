/// <reference path="../../filePath.d.ts"/>
module dy{
    export class ImageLoader{
        public static load(url:string) {
            return dyRt.fromPromise(new RSVP.Promise((resolve, reject) => {
                var img = null;

                img = new Image();
                /*!
                 经过对多个浏览器版本的测试，发现ie、opera下，当图片加载过一次以后，如果再有对该图片的请求时，由于浏览器已经缓存住这张图

                 片了，不会再发起一次新的请求，而是直接从缓存中加载过来。对于 firefox和safari，它们试图使这两种加载方式对用户透明，同样

                 会引起图片的onload事件，而ie和opera则忽略了这种同一性，不会引起图片的onload事件，因此上边的代码在它们里边不能得以实现效果。

                 确实，在ie，opera下，对于缓存图片的初始状态，与firefox和safari，chrome下是不一样的（有兴趣的话，可以在不同浏览器下，测试一下在给img的src赋值缓存图片的url之前，img的状态），
                 但是对onload事件的触发，却是一致的，不管是什么浏览器。

                 产生这个问题的根本原因在于，img的src赋值与 onload事件的绑定，顺序不对（在ie和opera下，先赋值src，再赋值onload，因为是缓存图片，就错过了onload事件的触发）。
                 应该先绑定onload事件，然后再给src赋值。
                 */
                img.onload = function () {
                    this.onload = null;     //解决ie内存泄露
                    resolve(img);
                };
                img.onerror = function () {
                    reject("error");
                };

                img.src = url;
            }));
        }
    }
}
