/** An interface of the Simple  Web Storage API  */
export interface Storage {
  /**
   * value = storage[key]
   */
  getItem: (key: string) => Promise<string | null>;

  /**
   * delete storage[key]
   */
  removeItem: (key: string) => Promise<void>;

  /**
   * storage[key] = value
   */
  setItem: (key: string, value: string) => Promise<void>;
}


export interface StorageOptions {
  env: string;
}

/**
 * Default Storage.
 */
export class DefaultStorage implements Storage {
  private readonly _env: string;

  constructor(opts: StorageOptions) {
    this._env = opts.env
  }

  /**
   * Get item.
   * @param {string} key
   */
  async getItem(key: string): Promise<string | null> {
    return localStorage.getItem(key + this._env);
  }

  /**
   * Remove item.
   * @param {string} key
   */
  async removeItem(key: string): Promise<void> {
    return localStorage.removeItem(key + this._env);
  }

  /**
   * Set item.
   * @param {string} key
   * @param {string} value
   */
  async setItem(key: string, value: string): Promise<void> {
    return localStorage.setItem(key + this._env, value);
  }
}
