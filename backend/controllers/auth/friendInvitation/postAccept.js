const FriendInvitation = require('../../../models/friendInvitation')
const User = require('../../../models/user')
const friendsUpates = require('../../../socketHandlers/updates/friends')

const postAccept = async (req, res) => {
    try {

        const { id } = req.body

        const invitation = await FriendInvitation.findById(id)

        if(!invitation) {
            return res.status(401).send("Error Occured. Please try again")
        }

        const { senderId, receiverId } = invitation

        //add friends to both users
        const senderUser = await User.findById(senderId)
        senderUser.friends = [...senderUser.friends, receiverId]

        const receiverUser = await User.findById(receiverId)
        receiverUser.friends = [...receiverUser.friends, senderId]

        await senderUser.save()
        await receiverUser.save()

        // delete invitation
        await FriendInvitation.findByIdAndDelete(id)

        // update list of the friends if users are online
        friendsUpates.updateFriends(senderId.toString())
        friendsUpates.updateFriends(receiverId.toString())

        // update list of friends pending invitations 
        friendsUpates.updateFriendsPendingInvitations(receiverId.toString())

        return res.status(200).send('Friend successfully added')

    } catch(err) {
        console.log(err)
        return res.status(500).send('Something went wrong!')
    }

}

module.exports = postAccept