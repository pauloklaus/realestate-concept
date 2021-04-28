import Vue from "vue"
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/storage"
import "firebase/database"

export const firebaseApp = firebase.initializeApp({
    apiKey: process.env.VUE_APP_FB_APIKEY,
    authDomain: process.env.VUE_APP_FB_AUTHDOMAIN,
    databaseURL: process.env.VUE_APP_FB_DATABASEURL,
    projectId: process.env.VUE_APP_FB_PROJECTID,
    storageBucket: process.env.VUE_APP_FB_STORAGEBUCKET,
    messagingSenderId: process.env.VUE_APP_FB_MESSAGINGSENDERID,
    appId: process.env.VUE_APP_FB_APPID,
    // measurementId: process.env.VUE_APP_FB_MEASUREMENTID,
})

Plugin.install = Vue => {
    Object.defineProperties(Vue.prototype, {
        $firebase: {
            get() {
                return firebaseApp;
            }
        }
    })
}

Vue.use(Plugin);
export default Plugin;
