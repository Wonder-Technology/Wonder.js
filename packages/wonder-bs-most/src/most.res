type stream<'a>

/* observes a stream */
@bs.module("most")
external observe: ('a => unit, stream<'a>) => Js.Promise.t<unit> = ""

@bs.module("most")
external forEach: ('a => unit, stream<'a>) => Js.Promise.t<unit> = ""

/* Reduce a stream, returning a promise for the ultimate result. */
@bs.module("most")
external reduce: (('accum, 'a) => 'b, 'b, stream<'a>) => Js.Promise.t<'b> = ""

/* Start consuming events from stream.
   This can be useful in some cases where you don't want or need to process the terminal events
   --e.g. when all processing has been done via upstream side-effects.
   Most times, however, you'll use observe to consume and process terminal events. */
@bs.module("most") external drain: stream<'a> => Js.Promise.t<unit> = ""

/* Draft ES Observable compatible subscribe.
 Start consuming events from stream by providing an observer object. */
type observer<'a> = {"next": 'a => unit, "error": Js.Exn.t => unit, "complete": unit => unit}

type subscription = {"unsubscribe": unit => unit}

@bs.send.pipe(: stream<'a>)
external subscribe: observer<'a> => subscription = ""

/* **
 * Stream creation
 * */
/* Creates an already ended stream with no events */
@bs.module("most") external empty: unit => stream<unit> = ""

/* Creates a stream containing only x */
@bs.module("most") external just: 'a => stream<'a> = ""

/* Creates a stream from an array */
@bs.module("most") external from: array<'a> => stream<'a> = ""

/* The JavaScript version of `unfold` is hard to type safely.
 * It takes an object of the shape { seed, value, done }
 * where done is a boolean whether to complete the stream.
 * When `done` is true, `seed` and `value` are ignored.
 * There are often times when we may complete a stream after
 * exhausting our data source (e.g. the `fromList` function),
 * so we need a way of saying we're done without providing
 * a `value` or a `seed`.
 * We expose an unsafe `_unfold` here, and then below a more
 * typesafe version along with some types to go along with it.
 */
@bs.module("most")
external _unfold: ('a => Js.t<'b>, 'a) => stream<'c> = "unfold"

external unsafeCast: Js.t<'a> => Js.t<'b> = "%identity"

/* Creates a stream from a generating function and a seed */
let unfold = (f: 'a => option<('b, 'a)>): ('a => stream<'b>) =>
  _unfold(x =>
    switch f(x) {
    | None => unsafeCast({"_done": true})
    | Some((value, seed)) => unsafeCast({"value": value, "seed": seed})
    }
  )

/* Creates a stream from a Reason list */
let fromList = list => unfold(curList =>
    switch curList {
    | list{} => None
    | list{x, ...rest} => Some((x, rest))
    }
  , list)

/* Creates a stream from a promise that completes once the promise resolves */
@bs.module("most") external fromPromise: Js.Promise.t<'a> => stream<'a> = ""

/* Create an infinite stream containing events that arrive every period milliseconds,
 and whose value is undefined. */
@bs.module("most") external periodic: int => stream<unit> = ""

/* Create a stream that contains no events and never ends */
@bs.module("most") external never: unit => stream<'a> = ""

/* Build an infinite stream by computing successive items iteratively.
 Conceptually, the stream will contain: [initial, f(initial), f(f(initial)), ...] */
@bs.module("most") external iterate: ('a => 'a, 'a) => stream<'a> = ""

/* Same as `iterate`, but the function may return a promise.
 This allows one to build asynchronous streams of future values */
@bs.module("most")
external iteratePromise: ('a => Js.Promise.t<'a>, 'a) => stream<'a> = "iterate"

/* Create a stream of events from a DOM EventTarget */
@bs.module("most")
external fromEvent: (string, Dom.eventTarget, bool) => stream<Dom.event> = ""

/* Concatenates two streams together */
@bs.send.pipe(: stream<'a>) external concat: stream<'a> => stream<'a> = ""

/* Appends an element to the start of a stream */
@bs.module("most") external startWith: ('a, stream<'a>) => stream<'a> = ""

/* **
 * Error handling
 * */
/* Recover from a stream failure by calling a function to create a new stream. */
@bs.module("most")
external recoverWith: (Js.Exn.t => stream<'a>, stream<'a>) => stream<'a> = ""

/* Create a stream in the error state. */
@bs.module("most") external throwError: Js.Exn.t => stream<unit> = ""

/* **
 * Transforming
 * */
/* Create a new stream by applying f to each event of the input stream. */
@bs.module("most") external map: ('a => 'b, stream<'a>) => stream<'b> = ""

/* Create a new stream by replacing each event of the input stream with x */
@bs.module("most") external constant: ('a, stream<'b>) => stream<'a> = ""

/* Create a new stream containing incrementally accumulated results, starting with the provided initial value. */
@bs.module("most")
external scan: (('accum, 'a) => 'b, 'accum, stream<'a>) => stream<'b> = ""

/* Transform each event in stream into a stream, and then merge it into the resulting stream. */
@bs.module("most")
external flatMap: ('a => stream<'b>, stream<'a>) => stream<'b> = ""

/* Replace the end signal with a new stream returned by f. */
@bs.module("most")
external continueWith: ('a => stream<'b>, stream<'a>) => stream<'b> = ""

/* Transform each event in stream into a stream, and then concatenate it onto the end of the resulting stream. */
@bs.module("most")
external concatMap: ('a => stream<'b>, stream<'a>) => stream<'b> = ""

/* Apply the latest function in a stream of functions to the latest value in stream */
@bs.module("most")
external ap: (stream<'a => 'b>, stream<'a>) => stream<'b> = ""

/* Materialize event timestamps, transforming Stream<X> into Stream<{ time:number, value:X }> */
@bs.module("most")
external timestamp: stream<'a> => stream<{"time": int, "value": 'a}> = ""

/* Perform a side-effect for each event in stream. */
@bs.module("most") external tap: ('a => unit, stream<'a>) => stream<'a> = ""

/* **
 * Filtering
 * */
/* Create a stream containing only events for which the predicate returns true. */
@bs.module("most")
external filter: ('a => bool, stream<'a>) => stream<'a> = ""

/* Create a new stream with adjacent repeated events removed. */
@bs.module("most") external skipRepeats: stream<'a> => stream<'a> = ""

/* Create a new stream with adjacent repeated events removed, using the provided comparison function */
@bs.module("most")
external skipRepeatsWith: (('a, 'a) => bool, stream<'a>) => stream<'a> = ""

/* **
 * Slicing
 * */
/* Create a new stream containing only events where start <= index < end,
    where index is the ordinal index of an event in stream.
   If stream contains fewer than start events, the returned stream will be empty. */
@bs.module("most") external slice: (int, int, stream<'a>) => stream<'a> = ""

/* Create a new stream containing at most n events from stream.
 If stream contains fewer than n events, the returned stream will be effectively equivalent to stream. */
@bs.module("most") external take: (int, stream<'a>) => stream<'a> = ""

/* Create a new stream that omits the first n events from stream.
 If stream contains fewer than n events, the returned stream will be empty. */
@bs.module("most") external skip: (int, stream<'a>) => stream<'a> = ""

/* Create a new stream containing all events until predicate returns false. */
@bs.module("most")
external takeWhile: ('a => bool, stream<'a>) => stream<'a> = ""

/* Create a new stream containing all events after predicate returns false. */
@bs.module("most")
external skipWhile: ('a => bool, stream<'a>) => stream<'a> = ""

/* Create a new stream containing all events before and including when the predicate returns true. */
@bs.module("most")
external skipAfter: ('a => bool, stream<'a>) => stream<'a> = ""

/* Create a new stream containing all events until endSignal emits an event. */
@bs.module("most")
external until: (stream<'b>, stream<'a>) => stream<'a> = ""

/* Create a new stream containing all events after startSignal emits its first event. */
@bs.module("most")
external since: (stream<'b>, stream<'a>) => stream<'a> = ""

/* Create a new stream containing only events that occur during a dynamic time window. */
@bs.module("most")
external during: (stream<stream<'ending>>, stream<'a>) => stream<'a> = ""

/* **
 * Combining
 * */
/* Create a new stream containing events from stream1 and stream2. */
@bs.module("most")
external merge: (stream<'a>, stream<'a>) => stream<'a> = ""

/* Array form of merge. Create a new stream containing all events from all streams in the array. */
@bs.module("most") external mergeArray: array<stream<'a>> => stream<'a> = ""

/* Create a new stream that emits the set of latest event values from all input streams
 whenever a new event arrives on any input stream. */
@bs.module("most")
external combine: (('a, 'b) => 'c, stream<'a>, stream<'b>) => stream<'c> = ""

/* Array form of combine. Create a new stream that emits the set of latest event values
 from all input streams whenever a new event arrives on any input stream. */
/* NOTE: This is not included yet due to the variadic callback requirement... */
/* external combineArray : (array 'a => 'b) => array (stream 'a) => stream 'a = "" [@@bs.module "most"]; */
/* Create a new stream by combining sampled values from many input streams. */
@bs.module("most")
external sample1: ('a => 'b, stream<'sample>, stream<'a>) => stream<'b> = "sample"

@bs.module("most")
external sample2: (('a, 'a) => 'b, stream<'sample>, stream<'a>, stream<'a>) => stream<'b> = "sample"

@bs.module("most")
external sample3: (
  ('a, 'a, 'a) => 'b,
  stream<'sample>,
  stream<'a>,
  stream<'a>,
  stream<'a>,
) => stream<'b> = "sample"

@bs.module("most")
external sample4: (
  ('a, 'a, 'a, 'a) => 'b,
  stream<'sample>,
  stream<'a>,
  stream<'a>,
  stream<'a>,
  stream<'a>,
) => stream<'b> = "sample"

@bs.module("most")
external sample5: (
  ('a, 'a, 'a, 'a, 'a) => 'b,
  stream<'sample>,
  stream<'a>,
  stream<'a>,
  stream<'a>,
  stream<'a>,
  stream<'a>,
) => stream<'b> = "sample"

@bs.module("most")
external sample6: (
  ('a, 'a, 'a, 'a, 'a, 'a) => 'b,
  stream<'sample>,
  stream<'a>,
  stream<'a>,
  stream<'a>,
  stream<'a>,
  stream<'a>,
  stream<'a>,
) => stream<'b> = "sample"

/* When an event arrives on asampler, emit the latest event value from a stream of values. */
@bs.module("most")
external sampleWith: (stream<'sample>, stream<'a>) => stream<'a> = ""

@bs.module("most")
external zip: (('a, 'b) => 'c, stream<'a>, stream<'b>) => stream<'c> = ""

/* **
 * Combining higher-order streams
 * */
/* Given a higher-order stream, return a new stream that adopts the behavior of
 (ie emits the events of) the most recent inner stream. */
@bs.module("most")
external switchLatest: stream<stream<'a>> => stream<'a> = ""

/* Given a higher-order stream, return a new stream that merges all the inner streams as they arrive. */
@bs.module("most") external join: stream<stream<'a>> => stream<'a> = ""

/* Given a higher-order stream, return a new stream that merges inner streams as they arrive
   up to the specified concurrency. Once concurrency number of streams are being merged,
   newly arriving streams will be merged after an existing one ends. */
@bs.module("most")
external mergeConcurrently: (int, stream<stream<'a>>) => stream<'a> = ""

/* **
 * Awaiting promises
 * */
/* Given a stream of promises, ie Stream<Promise<X>>,
   return a new stream containing the fulfillment values, ie Stream<X>.
   Event times may be delayed. However, event order is always preserved,
   regardless of promise fulfillment order.
   To create a stream that merges promises in fulfillment order,
   use `flatMap(fromPromise, stream)`.
   If a promise rejects, the stream will be in an error state
   with the rejected promise's reason as its error.
   See recoverWith for error recovery. */
@bs.module("most")
external awaitPromises: stream<Js.Promise.t<'a>> => stream<'a> = ""

/* **
 * Rate limiting streams
 */
/* Wait for a burst of events to subside and emit only the last event in the burst.
   If the stream ends while there is a pending debounced event (e.g. via `until`),
   the pending event will be emitted just before the stream ends. */
@bs.module("most") external debounce: (int, stream<'a>) => stream<'a> = ""

/* Limit the rate of events to at most one per throttlePeriod. */
@bs.module("most") external throttle: (int, stream<'a>) => stream<'a> = ""

/* **
 * Delaying streams
 * */
/* Timeshift a stream by a delay time in milliseconds. */
@bs.module("most") external delay: (int, stream<'a>) => stream<'a> = ""

/* **
 * Sharing streams
 * */
/* Returns a stream equivalent to the original, but which can be shared more efficiently among multiple consumers. */
@bs.module("most") external multicast: stream<'a> => stream<'a> = ""

/* **
 *  Subjects!
 * */
module Subject = {
  type t<'a>
  @bs.module("most-subject") external make: unit => t<'a> = "async"
  external asStream: t<'a> => stream<'a> = "%identity"
  @bs.module("most-subject") external next: ('a, t<'a>) => t<'a> = ""
  @bs.module("most-subject")
  external error: (Js.Exn.t, t<'a>) => t<Js.Exn.t> = ""
  @bs.send external complete: t<'a> => t<'a> = ""
  @bs.module("most-subject")
  external completeWith: ('a, t<'a>) => t<'a> = "complete"
}
