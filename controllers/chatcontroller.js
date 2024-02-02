const Chat = require('../models/Chat')
const Message = require('../models/Message')

async function createChat(req, res) {
    try {
        const { participants } = req.body
        const chat = new Chat({ participants })
        await chat.save()
        res.status(200).json(chat)
    } catch (error) {
    res.status(500).json({message: 'Server error', error: error.message })
    }
}

async function getChatsbyUser(req, res) {
    try {
        const userId = req.params.userId
        const chats = await Chat.fnd({ participants: userId })
        res.json(chats)
    } catch (error) {
     res.status(500).json({message: 'Server error', error: error.message })    
    }
}

async function getMessages(req, res) {
  try {
    const chatId = req.params.chatId
    const messages = await Message.find({ chat: chatId })
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

module.exports = {
    createChat,
    getChatsbyUser,
    getMessages,
    sendMessage,
    messageRead,
    deleteChat
}