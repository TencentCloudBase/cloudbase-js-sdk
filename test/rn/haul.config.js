import path from 'path';
import { withPolyfills, makeConfig } from "@haul-bundler/preset-0.60";

export default makeConfig({
  bundles: {
    index: {
      entry: withPolyfills('./index'),
      transform({ bundleName, env, runtime, config }) {
        runtime.logger.info(`Altering Webpack config for bundle ${bundleName}`);
        config.resolve.alias = {
          ...config.resolve.alias,
          '@cloudbase/react-native': '/Users/junpengzhou/Work/tencent/react-native/dist/index.js',
          '@cloudbase/utilities': path.join(__dirname, 'node_modules/@cloudbase/utilities'),
          'react-native': path.join(__dirname, 'node_modules/react-native')
        }
      }
    }
  },
});