import React from 'react'
import Header from '../header'
import Menu from '../menu'

const Layout = (props) => {
    return (
        <>
            <Header/>
            <Menu/>
            {props.children}
        </>
    )
}

export default Layout;
