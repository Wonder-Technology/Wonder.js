export function getExn<T>(nullableValue: T | null | undefined): T {
    if (nullableValue === null || nullableValue === undefined) {
        throw new Error("nullableValue should exist")
    }

    return nullableValue as T
}