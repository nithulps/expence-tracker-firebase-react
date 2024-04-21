// import React from 'react'

// const useGetUserInfo = () => {
//     const {name,profilephoto,userID,isAuth}=JSON.parse(
//         localStorage.getItem("auth")
//     )
//   return 
// }

// export default useGetUserInfo
import React from 'react'

function useGetUserInfo() {
    if(localStorage.getItem('auth') !== null) {
        const { name, profilephoto, userID, isAuth } = JSON?.parse(
            localStorage?.getItem("auth")
        )
        return { name, profilephoto, userID, isAuth }
    }
}

export default useGetUserInfo