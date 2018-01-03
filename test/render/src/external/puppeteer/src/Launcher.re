/* type launchOptions = {
     .
     /* Whether to ignore HTTPS errors during navigation. Defaults to false. */
     "ignoreHTTPSErrors": Js.Nullable.t(bool),
     /* Whether to run Chromium in headless mode. Defaults to true. */
     "headless": Js.Nullable.t(bool),
     /*
      * Path to a Chromium executable to run instead of bundled Chromium. If
      * executablePath is a relative path, then it is resolved relative to current
      * working directory.
      */
     "executablePath": Js.Nullable.t(string),
     /*
      * Slows down Puppeteer operations by the specified amount of milliseconds.
      * Useful so that you can see what is going on.
      */
     "slowMo": Js.Nullable.t(float),
     /*
      * Additional arguments to pass to the Chromium instance. List of Chromium
      * flags can be found here.
      */
     "args": Js.Nullable.t(array(string)),
     /* Close chrome process on Ctrl-C. Defaults to true. */
     "handleSIGINT": Js.Nullable.t(bool),
     /*
      * Maximum time in milliseconds to wait for the Chrome instance to start.
      * Defaults to 30000 (30 seconds). Pass 0 to disable timeout.
      */
     "timeout": Js.Nullable.t(int),
     /*
      * Whether to pipe browser process stdout and stderr into process.stdout and
      * process.stderr. Defaults to false.
      */
     "dumpio": Js.Nullable.t(bool),
     /* Path to a User Data Directory. */
     "userDataDir": Js.Nullable.t(string)
   }; */
/* change by wonder */
type launchOptions = {
  .
  /* Whether to ignore HTTPS errors during navigation. Defaults to false. */
  "ignoreHTTPSErrors": Js.Nullable.t(Js.boolean),
  /* Whether to run Chromium in headless mode. Defaults to true. */
  "headless": Js.Nullable.t(Js.boolean),
  /*
   * Path to a Chromium executable to run instead of bundled Chromium. If
   * executablePath is a relative path, then it is resolved relative to current
   * working directory.
   */
  "executablePath": Js.Nullable.t(string),
  /*
   * Slows down Puppeteer operations by the specified amount of milliseconds.
   * Useful so that you can see what is going on.
   */
  "slowMo": Js.Nullable.t(float),
  /*
   * Additional arguments to pass to the Chromium instance. List of Chromium
   * flags can be found here.
   */
  "args": Js.Nullable.t(array(string)),
  /* Close chrome process on Ctrl-C. Defaults to true. */
  "handleSIGINT": Js.Nullable.t(Js.boolean),
  /*
   * Maximum time in milliseconds to wait for the Chrome instance to start.
   * Defaults to 30000 (30 seconds). Pass 0 to disable timeout.
   */
  "timeout": Js.Nullable.t(int),
  /*
   * Whether to pipe browser process stdout and stderr into process.stdout and
   * process.stderr. Defaults to false.
   */
  "dumpio": Js.Nullable.t(Js.boolean),
  /* Path to a User Data Directory. */
  "userDataDir": Js.Nullable.t(string)
};