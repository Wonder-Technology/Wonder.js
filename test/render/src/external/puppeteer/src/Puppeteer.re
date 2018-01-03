type connectOptions = {
  .
  "browserWSEndpoint": Js.Nullable.t(string), "ignoreHTTPSErrors": Js.Nullable.t(bool)
};

/* Attaches Puppeteer to an existing Chromium instance */
[@bs.val] external connect : (~options: connectOptions=?, unit) => Js.Promise.t(Browser.t) = "";

/* Path where Puppeteer expects to find bundled Chromium */
[@bs.val] [@bs.module "puppeteer"] external executablePath : unit => string = "";

[@bs.val] [@bs.module "puppeteer"]
external launch : (~options: Launcher.launchOptions=?, unit) => Js.Promise.t(Browser.t) =
  "";
/*
 * TODO: Write bindings to these interfaces.
 *
    export interface Cookie {
      name: string;
      value: string;
      domain: string;
      path: string;
      expires: number;
      httpOnly: boolean;
      secure: boolean;
      sameSite: "Strict" | "Lax";
    }

    export interface Dialog {
      accept(promptText?: string): Promise<void>;
      defaultValue(): string;
      dismiss(): Promise<void>;
      message(): string;
      type: "alert" | "beforeunload" | "confirm" | "prompt";
    }

    export interface Viewport {
      width: number;
      height: number;
      deviceScaleFactor?: number;
      isMobile?: boolean;
      hasTouch?: boolean;
      isLandscape?: boolean;
    }

    export interface EmulateOptions {
      viewport?: Viewport;
      userAgent?: string;
    }

    export type EvaluateFn<T> = (elem?: ElementHandle) => Promise<T>;

   export interface PageFnOptions {
     polling?: "raf" | "mutation" | number;
     timeout?: number;
   }

  export interface EventObj {
    console: string;
    dialog: Dialog;
    error: Error;
    frameattached: Frame;
    framedetached: Frame;
    framenavigated: Frame;
    load: undefined;
    pageerror: string;
    request: Request;
    requestfailed: Request;
    requestfinished: Request;
    response: Response;
  }
 */
