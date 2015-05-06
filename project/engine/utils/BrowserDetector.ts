/// <reference path="ExtendUtils.ts"/>
module Engine3D {
    declare var navigator:any;

    /*!
    use bowser library(https://github.com/ded/bowser.git)

    because it has no .d.ts file, so I just import it.
     */

    export class BrowserDetector {
        /*!
         can't change prototype directly
         (as:
         CanvasBlender.prototype._blendMethod = _canUseNewCanvasBlendModes() ?
         CanvasBlender.prototype._blendWithMultiply : CanvasBlender.prototype._blendWithPerPixel;
         )
         because it pass compile that says it can't invoke private method(_blendxxx is private method)
         so use hack here.
         see more info: https://typescript.codeplex.com/discussions/444777
         */

        public static STATIC_CONSTRUCTOR(_class) {
            var t = true;

            function detect(ua) {
                function getFirstMatch(regex) {
                    var match = ua.match(regex);
                    return (match && match.length > 1 && match[1]) || '';
                }

                var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
                    , likeAndroid = /like android/i.test(ua)
                    , android = !likeAndroid && /android/i.test(ua)
                    , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
                    , tablet = /tablet/i.test(ua)
                    , mobile = !tablet && /[^-]mobi/i.test(ua)
                    , result;

                if (/opera|opr/i.test(ua)) {
                    result = {
                        name: 'Opera'
                        , opera: t
                        , version: versionIdentifier || getFirstMatch(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)
                    }
                }
                else if (/windows phone/i.test(ua)) {
                    result = {
                        name: 'Windows Phone'
                        , windowsphone: t
                        , msie: t
                        , version: getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
                    }
                }
                else if (/msie|trident/i.test(ua)) {
                    result = {
                        name: 'Internet Explorer'
                        , msie: t
                        , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
                    }
                }
                else if (/chrome|crios|crmo/i.test(ua)) {
                    result = {
                        name: 'Chrome'
                        , chrome: t
                        , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
                    }
                }
                else if (iosdevice) {
                    result = {
                        name: iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
                    }
                    // WTF: version is not part of user agent in web apps
                    if (versionIdentifier) {
                        result.version = versionIdentifier
                    }
                }
                else if (/sailfish/i.test(ua)) {
                    result = {
                        name: 'Sailfish'
                        , sailfish: t
                        , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
                    }
                }
                else if (/seamonkey\//i.test(ua)) {
                    result = {
                        name: 'SeaMonkey'
                        , seamonkey: t
                        , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
                    }
                }
                else if (/firefox|iceweasel/i.test(ua)) {
                    result = {
                        name: 'Firefox'
                        , firefox: t
                        , version: getFirstMatch(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)
                    }
                    if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
                        result.firefoxos = t
                    }
                }
                else if (/silk/i.test(ua)) {
                    result = {
                        name: 'Amazon Silk'
                        , silk: t
                        , version: getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
                    }
                }
                else if (android) {
                    result = {
                        name: 'Android'
                        , version: versionIdentifier
                    }
                }
                else if (/phantom/i.test(ua)) {
                    result = {
                        name: 'PhantomJS'
                        , phantom: t
                        , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
                    }
                }
                else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
                    result = {
                        name: 'BlackBerry'
                        , blackberry: t
                        , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
                    }
                }
                else if (/(web|hpw)os/i.test(ua)) {
                    result = {
                        name: 'WebOS'
                        , webos: t
                        , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
                    };
                    /touchpad\//i.test(ua) && (result.touchpad = t)
                }
                else if (/bada/i.test(ua)) {
                    result = {
                        name: 'Bada'
                        , bada: t
                        , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
                    };
                }
                else if (/tizen/i.test(ua)) {
                    result = {
                        name: 'Tizen'
                        , tizen: t
                        , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
                    };
                }
                else if (/safari/i.test(ua)) {
                    result = {
                        name: 'Safari'
                        , safari: t
                        , version: versionIdentifier
                    }
                }
                else result = {}

                // set webkit or gecko flag for browsers based on these engines
                if (/(apple)?webkit/i.test(ua)) {
                    result.name = result.name || "Webkit"
                    result.webkit = t
                    if (!result.version && versionIdentifier) {
                        result.version = versionIdentifier
                    }
                } else if (!result.opera && /gecko\//i.test(ua)) {
                    result.name = result.name || "Gecko"
                    result.gecko = t
                    result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
                }

                // set OS flags for platforms that have multiple browsers
                if (android || result.silk) {
                    result.android = t
                } else if (iosdevice) {
                    result[iosdevice] = t
                    result.ios = t
                }

                // OS version extraction
                var osVersion = '';
                if (iosdevice) {
                    osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
                    osVersion = osVersion.replace(/[_\s]/g, '.');
                } else if (android) {
                    osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
                } else if (result.windowsphone) {
                    osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
                } else if (result.webos) {
                    osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
                } else if (result.blackberry) {
                    osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
                } else if (result.bada) {
                    osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
                } else if (result.tizen) {
                    osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
                }
                if (osVersion) {
                    result.osversion = osVersion;
                }

                // device type extraction
                var osMajorVersion:any = osVersion.split('.')[0];
                if (tablet || iosdevice == 'ipad' || (android && (osMajorVersion == 3 || (osMajorVersion == 4 && !mobile))) || result.silk) {
                    result.tablet = t
                } else if (mobile || iosdevice == 'iphone' || iosdevice == 'ipod' || android || result.blackberry || result.webos || result.bada) {
                    result.mobile = t
                }

                // Graded Browser Support
                // http://developer.yahoo.com/yui/articles/gbs
                if ((result.msie && result.version >= 10) ||
                    (result.chrome && result.version >= 20) ||
                    (result.firefox && result.version >= 20.0) ||
                    (result.safari && result.version >= 6) ||
                    (result.opera && result.version >= 10.0) ||
                    (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
                    (result.blackberry && result.version >= 10.1)
                ) {
                    result.a = t;
                }
                else if ((result.msie && result.version < 10) ||
                    (result.chrome && result.version < 20) ||
                    (result.firefox && result.version < 20.0) ||
                    (result.safari && result.version < 6) ||
                    (result.opera && result.version < 10.0) ||
                    (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
                ) {
                    result.c = t
                } else result.x = t

                return result
            }

            ExtendUtils.extend(
                _class,
                detect(typeof navigator !== 'undefined' ? navigator.userAgent : '')
            );
            /*
             * for test
             */
            _class._detect = detect;
        }

        private static _STATIC_CONSTRUCTOR_INIT = BrowserDetector.STATIC_CONSTRUCTOR(BrowserDetector);
    }
}
