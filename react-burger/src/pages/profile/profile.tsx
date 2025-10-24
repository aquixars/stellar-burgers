import React from "react";
import EditProfile from "../../components/edit-profile/edit-profile";
import ProfileSidebar from "../../components/profile-sidebar/profile-sidebar";
import Layout from "../../components/layout/layout";

const CONTAINER_STYLE = {
    maxWidth: 1280,
    padding: "0 40px",
    display: "flex",
    margin: "120px auto 0"
};

const Profile: React.FC = () => {
    return (
        <Layout>
            <div style={CONTAINER_STYLE}>
                <ProfileSidebar />
                <EditProfile />
            </div>
        </Layout>
    );
};

export default Profile;
