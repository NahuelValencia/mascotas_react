import React from "react"
import "./RightMenu.css"
import { useSessionUser } from "../store/userStore"
import Banner from "../publicity/Banner"

export default function RightMenu() {
    const user = useSessionUser()

    const menu = user ? <Banner /> : ''

    if (menu !== '') {
        return (
            <div className="right_menu_div navbar-nav bg-light shadow">
                {menu}
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }

}
