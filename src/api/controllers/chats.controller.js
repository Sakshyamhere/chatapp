const { Op } = require("sequelize")
const { Chat } = require("../models/Chats")
const { User } = require("../models/User")

const sendMessage = async(req,res) => {
    const {sender , receiver , message} = req.body
    try {
        const chat = await Chat.create({
            sender : sender,
            receiver : receiver,
            message : message
        })
        res.status(200).json({done : "true"})
    } catch (error) {
        res.status(200).json({message : "Some error occurred"})
    }
}

const getMessage = async(req,res) => {
    const {sender , receiver} = req.query
    try {
      const sent = await Chat.findAll({where : {
        sender : sender,
        receiver : receiver
      }})
      const received = await Chat.findAll({
        where : {
            sender : receiver,
            receiver : sender
        }
      })
        res.status(200).json({sent,received})
    } catch (error) {
        res.status(200).json({message : "Some error occurred"})
    }
}

const getFriends = async(req,res) => {
    const {id} = req.query
    try {
        const friends = await Chat.findAll({
            where: {
                [Op.or]: [
                    { sender: id },
                    { receiver: id }
                ]
            },
            attributes : ['sender','receiver'],
            raw : true
        });
        const allFriends = friends.reduce((acc, friend) => {
            if (friend.sender != id) acc.push(friend.sender);
            if (friend.receiver != id) acc.push(friend.receiver);
            return acc;
        }, []);

        // Remove duplicates using Set
        const uniqueFriends = [...new Set(allFriends)];
        const friendsDetails = await Promise.all(
            uniqueFriends.map(friendId => User.findByPk(friendId, {
                attributes: {exclude : ["password","token"]}
            }))
        );
        res.status(200).json({friend : friendsDetails});
    } catch (error) {
        res.status(401).send({message : "Some error occurred"})
    }
}

module.exports = {sendMessage,getMessage,getFriends}