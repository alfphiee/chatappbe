import Chat from '../models/Chat.js'
import User from '../models/User.js'
import Message from'../models/Message.js'

async function createChat(req, res) {
    try {
        const { participants } = req.body
        const chat = new Chat({ participants, chatType: "private" })
        await chat.save()
        res.status(200).json(chat)
    } catch (error) {
    res.status(500).json({message: 'Server error', error: error.message })
    }
}

async function getChatsbyUser(req, res) {
    try {
        const user = req.user
        console.log(user)
        const chats = await Chat.find({ participants: { $in: [user._id] } })
        res.json(chats)
    } catch (error) {
     res.status(500).json({message: 'Server error', error: error.message })    
    }
}

async function searchUserbyUsername(req,res) {
    console.log(req, res)
    try {
        const {username} = req.query
        const user = await User.findOne({ username })
    
        if (!user) {
            return res.status(404).json({message: 'User not found'})
        }
        return res.status(200).json(user)
    } catch (error) {
    res.status(500).json({message: 'Server error', error: error.message })    
}
}
async function getPreviews(req, res) {
    try {
        const userId = req.user._id
        const chats = await Chat.find({ participants: { $in: [userId] } })
        const previews = await Promise.all(chats.map(async (chat) => {
            const latestMessage = await Message.findOne({chatId : chat._id}).sort({timestamp: -1}).exec()
            let otherParticipant = null
            if(chat.chatType !== 'group') {
                const otherParticipantId = chat.participants.find(id => id.toString() !== userId)
                otherParticipant = await User.findById(otherParticipantId)
            }
            return {
                chatId: chat._id,
                latestMessage,
                otherParticipant
            }
        }))
        res.json(previews)
    } catch (err) {

        console.log(err)
        res.status(500).send('Error fetching chat previews')
    }
}

async function getMessages(req, res) {
  try {
    const chatId = req.params.chatId
    const messages = await Message.find({ chatId: chatId })
    res.json(messages)
} catch (error) {
     res.status(500).json({message: 'Server error', error: error.message })  
    }
}

async function sendMessage(req, res) {

}

async function messageRead(req, res) {

}
async function deleteChat(req, res) {

}

export default {
    createChat,
    getChatsbyUser,
    searchUserbyUsername,
    getPreviews,
    getMessages,
    sendMessage,
    messageRead,
    deleteChat
}