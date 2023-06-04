import create from "zustand";
import {devtools,persist} from "zustand/middleware";
// import {create} from "zustand/index"

const AuthStore = (set)=>({
        AuthToken:null,
        Signup:(token)=>{
            set(()=>({
                AuthToken:token,
            }))
        },
        removeToken:()=>{
            set(()=>({
                AuthToken:null
            }))
        }
})

const useAuthStore = create(
    devtools(
        persist(
            AuthStore,{
                name:"Auth"
            }
        )
    )
)


export default useAuthStore;