/**
 * Single Promise
 */
export class SinglePromise {
  /**
   * Run single promise.
   * @param {string} key
   * @param {Function} fn
   * @return {Promise<T>}
   */
  async run<T>(key: string, fn: () => Promise<T>): Promise<T> {
    let result: Promise<any> = this._fnPromiseMap.get(key);
    if (!result) {
      result = new Promise<any>(async (resolve, reject) => {
        try {
          // The idle promise must be run to prevent _fnPromiseMap from
          // storing the current promise function.
          await this._runIdlePromise();
          const fnResult: Promise<T> = fn();
          resolve(await fnResult);
        } catch (error) {
          reject(error);
        } finally {
          this._fnPromiseMap.delete(key);
        }
      });
      this._fnPromiseMap.set(key, result);
    }
    return result;
  }
  /**
   * Run idle promise.
   * @return {Promise<void>}
   */
  private _runIdlePromise(): Promise<void> {
    return Promise.resolve();
  }

  private _fnPromiseMap: Map<string, Promise<any>> = new Map();
}
