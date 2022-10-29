import React from "react";
import Link from "next/link";
import styles from "./NavBar.module.css"
import { useUser } from '@auth0/nextjs-auth0';
import { useEffect } from "react";

const NavBar = () => {

    const { user, error, isLoading } = useUser();
    useEffect(() => {
        if(user){
            console.log(JSON.stringify(user))
            
        } else{
            console.log("no user")
            
        }
    }, [])
    return (
        <div>
            <Link href="/landing-page">
                <button>
                Home
                </button>
            </Link>
             { user ?  
                (<div>                            
                    Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
                </div>) :  ( <Link href="/api/auth/login?returnTo=/landing-page">
        <button>
          Login
        </button>
      </Link>)
            }
        </div>
    )
}

export default NavBar