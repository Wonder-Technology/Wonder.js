include FrameBase;

type pageEvents =
  | Console
  | Dialog
  | Error
  | FrameAttached
  | FrameDetached
  | FrameNavigated
  | Load
  | PageError
  | Request
  | RequestFailed
  | RequestFinished
  | Response;

type authOptions = {. "username": string, "password": string};

/* TODO: authentication and on events
   authenticate(credentials: AuthOptions | null): Promise<void>;
    on(event: "console", handler: (...args: any[]) => void): void;
    on<K extends keyof EventObj>(
      event: K,
      handler: (e: EventObj[K], ...args: any[]) => void
    ): void;
   */
[@bs.send.pipe : t]
external click : (string, ~options: Click.clickOptions=?, unit) => Js.Promise.t(unit) =
  "";

[@bs.send.pipe : t] external close : Js.Promise.t(unit) = "";

[@bs.get] external content : t => Js.Promise.t(string) = ""; /* send? */

/*goto(url: string, options?: Partial<NavigationOptions>): Promise<Response>;*/
[@bs.send.pipe : t]
external goto :
  (string, ~options: Navigation.navigationOptions=?, unit) => Js.Promise.t(Response.t) =
  "";

type screenshotOptions = {
  .
  "clip": Js.Nullable.t({. "x": float, "y": float, "width": float, "height": float}),
  "fullPage": Js.Nullable.t(bool),
  "omitBackground": Js.Nullable.t(bool),
  "path": Js.Nullable.t(string),
  "quality": Js.Nullable.t(float),
  /* TODO: Should handle the two options. */
  "_type":
    Js.Nullable.t(string) /* "jpeg" | "png" */
};

/* screenshot(options?: ScreenshotOptions): Promise<Buffer>; */
[@bs.send.pipe : t]
external screenshot :
  (~options: screenshotOptions=?, unit) => Js.Promise.t(Js.Typed_array.ArrayBuffer.t) =
  "";

[@bs.send.pipe : t]
external setExtraHTTPHeaders : (~headers: Js.Dict.t(string), unit) => Js.Promise.t(unit) =
  "";

type typeOptions = {. "delay": float};

[@bs.send.pipe : t]
external type_ : (string, ~options: typeOptions=?, unit) => Js.Promise.t(unit) =
  "type";

/* TODO: the rest of Page */
/* cookies(...urls: string[]): Promise<Cookie[]>; */
/*  type 'cookie;
      external cookies : urls::array string => promise (array 'cookie) = "" [@@bs.send];
       deleteCookie(
         ...cookies: Array<{
           name: string;
           url?: string;
           domain?: string;
           path?: string;
           secure?: boolean;
         }>
       ): Promise<void>;
      external focus : selector::string => promise unit = "" [@@bs.send];
      external frames : unit => array Frame.t = "" [@@bs.get]; /* send? */
      /*
         goBack(options?: Partial<NavigationOptions>): Promise<Response>;
         goForward(options?: Partial<NavigationOptions>): Promise<Response>;
       */
      external hover : selector::string => promise unit = "" [@@bs.send];
      external keyboard : Keyboard.t = "" [@@bs.val];
      external mainFrame : unit => Frame.t = "" [@@bs.get];
      external mouse : Mouse.t = "" [@@bs.val];
    /* emulate(options: Partial<EmulateOptions>): Promise<void>;
       emulateMedia(mediaType: string | null): Promise<void>;
       evaluateOnNewDocument(
         fn: EvaluateFn<string>,
         ...args: object[]
       ): Promise<void>;

       // Argument `fn` can be an arbitrary function
       exposeFunction(name: string, fn: any): Promise<void>;

       pdf(options?: Partial<PDFOptions>): Promise<Buffer>;
       plainText(): Promise<string>; */
       type pressOptions = {. "text": string, "delay": float};
       external press : key::string => options::option pressOptions => promise unit = "" [@@bs.send];
       external reload : options::option NavigationOptions.t => promise Response.t = "" [@@bs.send]; /*
       setContent(html: string): Promise<void>;
       setCookie(...cookies: Cookie[]): Promise<void>;
       setJavaScriptEnabled(enabled: boolean): Promise<void>;
       setRequestInterceptionEnabled(value: boolean): Promise<void>;
       setUserAgent(userAgent: string): Promise<void>;
       setViewport(viewport: Viewport): Promise<void>;
       tap(selector: string): Promise<void>;
       touchscreen: Touchscreen;
       tracing: Tracing;
       viewport(): Viewport;
     } */ */
/*!
  add by wonder
  */
type scriptTagOptions = {
  .
  "path": Js.Nullable.t(string), "url": Js.Nullable.t(string), "content": Js.Nullable.t(string)
};

type evaluteResult;

type serializableT;

/* Timestamp <number> The timestamp when the metrics sample was taken.
   Documents <number> Number of documents in the page.
   Frames <number> Number of frames in the page.
   JSEventListeners <number> Number of events in the page.
   Nodes <number> Number of DOM nodes in the page.
   LayoutCount <number> Total number of full or partial page layout.
   RecalcStyleCount <number> Total number of page style recalculations.
   LayoutDuration <number> Combined durations of all page layouts.
   RecalcStyleDuration <number> Combined duration of all page style recalculations.
   ScriptDuration <number> Combined duration of JavaScript execution.
   TaskDuration <number> Combined duration of all tasks performed by the browser.
   JSHeapUsedSize <number> Used JavaScript heap size.
   JSHeapTotalSize <number> Total JavaScript heap size. */
type metricsData = {
  .
  "Timestamp": float,
  "Documents": int,
  "Frames": int,
  "JSEventListeners": int,
  "Nodes": int,
  "LayoutCount": int,
  "RecalcStyleCount": int,
  "LayoutDuration": int,
  "RecalcStyleDuration": float,
  "ScriptDuration": float,
  "TaskDuration": float,
  "JSHeapUsedSize": int,
  "JSHeapTotalSize": int
};

/* type evaluateFuncReturnValue; */
[@bs.send.pipe : t] external addScriptTag : scriptTagOptions => Js.Promise.t(ElementHandle.t) = "";

/* [@bs.send.pipe : t]
   external evaluate : (unit => Js.Promise.t(evaluteResult)) => Js.Promise.t(serializableT) =
     ""; */
[@bs.send.pipe : t]
external evaluate : (unit => 'evaluateFuncReturnValue) => Js.Promise.t('evaluateFuncReturnValue) =
  "";

[@bs.send.pipe : t]
external evaluateWithTwoArgs :
  ((string, array(int)) => 'evaluateFuncReturnValue, string, array(int)) =>
  Js.Promise.t('evaluateFuncReturnValue) =
  "evaluate";

[@bs.send.pipe : t] external metrics : unit => Js.Promise.t(metricsData) = "";