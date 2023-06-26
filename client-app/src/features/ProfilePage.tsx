import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";


import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";
import LoadingComponent from "../App/layout/LoadingComponent";
import { useStore } from "../App/stores/store";

export default observer(function ProfilePage() {
    const {username} = useParams();
    const {profileStore} = useStore();
    const {loadingProfile, loadProfile, profile, setActiveTab} = profileStore;

    useEffect(() => {
        if (username) loadProfile(username);
        return () => {
            setActiveTab(0);
        }
    }, [loadProfile, username, setActiveTab])

    if (loadingProfile) return <LoadingComponent inverted content='Loading profile...' />

    if (!profile) return <h2>Problem loading profile</h2>
    
    return (
        <Grid>
            <Grid.Column width='16'>
                <ProfileHeader profile={profile}/>
                <ProfileContent profile={profile} />
            </Grid.Column>
        </Grid>
    )
})