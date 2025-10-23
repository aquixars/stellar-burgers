import AppHeader from "../app-header/app-header";
import React from "react";

const Layout = (props: { children: React.ReactNode; className?: string }) => {
    if (props.className) {
        return (
            <div className={props.className}>
                <AppHeader />
                {props.children}
            </div>
        );
    }

    return (
        <>
            <AppHeader />
            {props.children}
        </>
    );
};

export default Layout;
