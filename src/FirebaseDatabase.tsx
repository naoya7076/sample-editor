import {
    useState,
    useContext,
    useEffect,
    useMemo,
    useCallback,
    useRef
} from "react";
import { database } from "firebase";

import { firebase, FirebaseContext} from "./Firebase";

export interface Document {
    textId: string;
    title: string;
    text: string;
}

const useDocRef = (pathname: string): database.Reference => {
    const { userId } = useContext(FirebaseContext);
    const ref = useMemo(() => {
        return firebase.database().ref(`users/${userId}/${pathname}`);
    },[userId, pathname]);
    
    return ref;
};

function useFetchDocument<T>(ref: database.Reference) {
    const [document, setDocument] = useState<T>();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        let mounted = true;
        ref.on("value", snapshot => {
            if (!mounted) {
                return;
            }
            if (snapshot && snapshot.val()) {
                setDocument(snapshot.val());
            }
            setLoaded(true);
        });
        return () => {
            ref.off();
            mounted = false;
        };
    }, [ref]);

    return { document, loaded };
}

