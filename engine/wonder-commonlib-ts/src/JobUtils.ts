import type { Stream } from "most"

export function convertStreamToPromise<T>(stream: Stream<T>): Promise<T> {
    let states:any = null

    return stream.tap(s => {
        states = s
    }).drain().then(() => states)
}