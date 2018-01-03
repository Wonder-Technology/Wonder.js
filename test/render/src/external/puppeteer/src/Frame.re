include FrameBase;

[@bs.get] external childFrames : t => array(t) = "";

[@bs.get] external isDetached : t => bool = "";

[@bs.get] external name : t => string = "";

[@bs.get] external parentFrame : t => t = ""; /* TODO: can be undefined as well */

[@bs.send.pipe : t] external addScriptTag : (~url: string) => Js.Promise.t(unit) = "";

[@bs.send.pipe : t] external injectFile : (~filePath: string) => Js.Promise.t(unit) = "";
/*
    evaluate<T = string>(
      fn: T | EvaluateFn<T>,
      ...args: Array<object | ElementHandle>
    ): Promise<T>;
    title(): Promise<string>;
    url(): string;
    waitFor(
      // fn can be an abritary function
      // tslint:disable-next-line ban-types
      selectorOrFunctionOrTimeout: string | number | Function,
      options?: object
    ): Promise<void>;
    waitForFunction(
      // fn can be an abritary function
      // tslint:disable-next-line ban-types
      fn: string | Function,
      options?: PageFnOptions,
      ...args: any[]
    ): Promise<void>;
    waitForNavigation(options?: NavigationOptions): Promise<Response>;
 */
