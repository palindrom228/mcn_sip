import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'mcn_sip' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const McnSip = NativeModules.McnSip
  ? NativeModules.McnSip
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return McnSip.multiply(a, b);
}
