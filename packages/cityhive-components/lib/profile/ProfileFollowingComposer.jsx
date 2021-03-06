import { composeWithTracker } from 'react-komposer';
import Blocks from 'meteor/cityhive:user-blocking';

function composer(props, onData) {

    const usersSubscription = Meteor.subscribe('cityhive.users.directory', {hideBlocked: false});
    const followersSubscription = Meteor.subscribe('followers');
    const followingSubscription = Meteor.subscribe('following');
    const blocksSubscription = Meteor.subscribe('blockedUsers');

    if (usersSubscription.ready() && followersSubscription.ready() && followingSubscription.ready() && blocksSubscription.ready) {

        let blockedUsersIds = [];
        let blockedUsers = Blocks.find({userId: Meteor.userId()}).fetch();
        if(blockedUsers && blockedUsers.length) {
            blockedUsers.forEach((user) => {
                blockedUsersIds.push(user.blockedUserId);
            });
        }

        blockedUsersIds.push(Meteor.userId());

        const data = {
            user: Meteor.users.findOne({_id: props.params._id}),
            followers: Meteor.follows.find({userId: {$nin: blockedUsersIds}, followId: Meteor.userId()}).fetch(),
            following: Meteor.follows.find({userId: Meteor.userId(), followId: {$nin: blockedUsersIds}}).fetch(),
            blocked: Blocks.find({userId: Meteor.userId()}).fetch()
        };

        data.ready = true;
        onData(null, data);
    } else {
        onData(null, {ready: false});
    }
}

module.exports = composeWithTracker(composer);
export default composeWithTracker(composer);