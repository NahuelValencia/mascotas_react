import React from "react"
import SecondaryMenu from "./SecondaryMenu"
import "./RightMenu.css"
import { useSessionUser } from "../store/userStore"

export default function RightMenu() {
    const user = useSessionUser()

    const menu = user ? <SecondaryMenu /> : ''

    return (
        <div className="right_menu_div navbar-nav bg-light shadow">
            {menu}
        </div>
    )
}
