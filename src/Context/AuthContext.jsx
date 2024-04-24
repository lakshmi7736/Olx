import React, { createContext, useLayoutEffect, useState } from 'react';
import {onAuthStateChanged} from 'firebase/auth'
import {db, auth} from '../firebase/config'
import {doc, getDoc} from 'firebase/firestore'


// Create a context to hold authentication information
export const AuthContext = createContext(null);

// Auth-provider function to set current user
export default function AuthProvider({children}){
    
    // useState to manage user state
    const [user, setUser] = useState(null)

    // useLayoutEffect  similar to useEffect, but it fires synchronously after all DOM mutations.
    useLayoutEffect(() => { 

                // onAuthStateChanged listen for changes in the user's authentication state.
                onAuthStateChanged(auth, (currentUser) => {
                        if(currentUser){
                            // Fetch additional user data from Firestore "getDoc"
                            getDoc(doc(db,"users", currentUser.uid)) 
                                .then(()=> {
                                // Once data is fetched, update the user state
                                    setUser({
                                        userName: currentUser.displayName,
                                        userId: currentUser.uid
                                    })
                                })
                        }
                        else {
                            setUser(null)
                        }
                })
    },[user?.userName]) ;
    //  dependency array re-run whenever the user's name changes, potentially reflecting updates to the user's authentication state

      // Function to set the user state
    const setAsUser = (val) =>{
        setUser(val)
    }
    return (
        <AuthContext.Provider value={{ name: user?.userName, userId: user?.userId, setAsUser}}>
            {children}
        </AuthContext.Provider>
    )
}

