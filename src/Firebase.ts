import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

/**
 * dotenvから環境変数を取り込む
 */
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
};

firebase.initializeApp(firebaseConfig);

export {firebase};

//型インターフェースの宣言
interface FirebaseContext {
    userId: string | null;
    userName: string;
}

/**
 * 先程宣言したFireBaseContextインターフェースを
 * ジェネリクスとしてFirebaseContextを生成している
 */
export const FirebaseContext = React.createContext<FirebaseContext>({
    userId: null,
    userName: '',
});