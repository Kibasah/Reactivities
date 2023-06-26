import { observer } from 'mobx-react-lite';
import { Tab } from 'semantic-ui-react';
import ProfilePhotos from './ProfilePhotos';
import { Profile } from '../App/models/profile';
import { useStore } from '../App/stores/store';

interface Props {
    profile: Profile
}

export default observer(function ProfileContent({ profile }: Props) {
    const {profileStore} = useStore();

    const panes = [

        { menuItem: 'Photos', render: () => <ProfilePhotos profile={profile} /> },


    ];

    return (
        <Tab
            menu={{ fluid: true, vertical: true }}
            menuPosition='right'
            panes={panes}
            onTabChange={(e, data) => profileStore.setActiveTab(data.activeIndex)}
        />
    )
})