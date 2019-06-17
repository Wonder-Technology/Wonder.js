open AllBrowserDetectType;

let create = () => {browser: Unknown};

let fatalUnknownBrowser = (title, browser) => {
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title,
        ~description={j|unknown browser|j},
        ~reason="",
        ~solution={j||j},
        ~params={j|browser: $browser|j},
      ),
    )
}