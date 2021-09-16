// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // serverSocket: 'http://192.168.1.2:3000/',
  serverSocket: 'https://api.dev.yohu.co/',
  vapidPublicKey: 'BLpWrYjfdkphUVTEOlTjKg3InCo99o2-5cvLqiPZ83I6H0Djac-gvXW6AkKrQzXTxp0MEnZUa4GijosGoiKQYJc',
  firebaseConfig: {
    apiKey: "AIzaSyCEwOLd6nEb6HKP8U00V9K8LxN5UEvtTho",
    authDomain: "yohu-co.firebaseapp.com",
    projectId: "yohu-co",
    storageBucket: "yohu-co.appspot.com",
    messagingSenderId: "315119656949",
    appId: "1:315119656949:web:87900a4427ffb4c4da4abc",
    measurementId: "G-DQ3HB0RGF0"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
