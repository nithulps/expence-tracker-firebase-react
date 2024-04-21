import React from 'react'
import { auth, provider } from '../../config/firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate,Navigate } from 'react-router-dom';
import useGetUserInfo from '../../hooks/useGetUserInfo';
import { useEffect } from 'react';



function Auth() {
    const navigate = useNavigate();
    const {isAuth}=useGetUserInfo()

    const signInWithGoogle = async () => {
        const results = await signInWithPopup(auth, provider);
        const authinfo = {
            userID: results.user.uid,
            name: results.user.displayName,
            profilephoto: results.user.photoURL,
            isAuth: true
        }
        localStorage.setItem("auth", JSON.stringify(authinfo));
        navigate("/expence_tracker")
    };

if (isAuth){
    return <Navigate to="expence_tracker"/>
}
    return (
        <><div className='authentication'> 
            <p className='login-page'>Continue to Expence Tracker  </p>
            <button className='login-with-google-btn' onClick={signInWithGoogle}>
                {""}
                Sign In With Google 
            </button>
            </div>
        </>
    )
}

export default Auth;
