export const lift = async <T>(task: (callback: (error: Error | undefined, data: T | undefined) => void) => void) =>
    new Promise<T>((resolve, reject) => {
        task((error, data) => {
            if (error) {
                reject(error)
            } else {
                resolve(data)
            }
        })
    })

export const drop = <T>(task: Promise<T>) => (callback: (error: Error | undefined, data: T | undefined) => void) => {
    task.then(result => callback(undefined, result)).catch(error => callback(error, undefined))
}
