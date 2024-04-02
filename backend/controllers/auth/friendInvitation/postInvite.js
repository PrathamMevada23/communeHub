const User = require('../../../models/user')
const FriendInvitation = require('../../../models/friendInvitation')
const friendsUpdates = require('../../../socketHandlers/updates/friends') 

const postInvite = async(req, res) => {
    const { targetMailAddress } = req.body


    const { userId, email } = req.user;


    // check if friend's email is not as same as ours

    if (email.toLowerCase() === targetMailAddress.toLowerCase()) {
        return res.status(409).send("You cannot be friends with yourself")
    }


    const targetUser = await User.findOne({
        email: targetMailAddress.toLowerCase()
    })

    if(!targetUser) {
        return res.status(404).send(`User with ${targetMailAddress} does not exists`)
    }

    // check if invitation has been already sent

    const invitationAlreadyReceived = await FriendInvitation.findOne({
        senderId: userId,
        receiverId: targetUser._id
    })

    if(invitationAlreadyReceived) {
        return res.status(409).send('Invitation already sent')
    }

    // check if the user is already a friend

    const usersAlreadyFriends = targetUser.friends.find(friendId =>
        friendId.toString() === userId.toString()
        )
    
    if (usersAlreadyFriends){
        return res.status(409).send('Friend already added. Please check friends list')
    }
    
    // create new invitation in database

    const newInvitation = await FriendInvitation.create({
        senderId: userId,
        receiverId: targetUser._id,
    })

    // if invitation is successfull, update friends list

    // send pending invitations update to specific user

    friendsUpdates.updateFriendsPendingInvitations(targetUser._id.toString())


    return res.status(201).send('Invitation has been sent')
}

module.exports = postInvite