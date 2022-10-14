import React from "react";
import Link from "next/link";
import styles from "./NavBar.module.css"

const NavBar = () => {
    return (
        <div>
            <Link href="/landing-page">
                <button>
                Home
                </button>
            </Link>
            
        </div>
    )
}

export default NavBar