import React from "react";

const Layout = (props: { children: React.ReactNode; className?: string }) => {
    if (props.className) {
        return <div className={props.className}>{props.children}</div>;
    }

    return <>{props.children}</>;
};

export default Layout;
