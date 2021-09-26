import {App, AppImpl} from "./index";

/**
 *
 * @param app - App instance
 * @param name - service name
 * @param creator - new T
 *
 * @returns the provider for the service with the matching name
 *
 * @internal
 */
export function _getComponent<T>(
    app: App,
    name: string,
    creator: () => T
): T {
    const container = (app as AppImpl).container
    let component = container.get(name)
    if (component) {
        return component as T
    }
    component = creator()
    container.set(name, component)
    return component
}