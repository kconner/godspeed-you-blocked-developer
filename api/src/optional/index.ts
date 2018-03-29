export const map = <T, U>(optional: T | null, transform: (item: T) => U) => {
    if (optional) {
        return transform(optional)
    } else {
        return null
    }
}
