const express = require("express");

const app = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

app.post('/', async(req, res) => {
    const { title, image, category, author } = req.body;
    try{
        const newBoard = await prisma.board.create({
            data : {title, image, category, author},
        });
        res.status(201).json(newBoard);
    } catch (error){
        res.status(500).json({error: "Error creating new board"})
    }
})

app.get('/', async(req, res) => {
    try{
    const boards = await prisma.board.findMany({
        include:  {cards: true} 
    });
    res.status(200).json(boards)
}catch (error){
    res.status(500).json({error: "Error getting boards"})
}
});

app.get('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const board = await prisma.board.findUnique({
            where: {boardId: parseInt(id)},
            include: {cards: true}
        });
        if (board){
            res.status(200).json(board);
        }else{
            res.status(404).json({error: "Board not found"})
        }
    }catch (error){
        res.status(500).json({error: "Error getting board"})
    }
})

app.put('/:id', async(req, res) => {
    const {cardId} = req.params;
    const { title, image, category, author } = req.body;
    try{
        const updatedBoard = await prisma.board.update({
            where :  {boardId: parseInt(id)},
            data : { title, image, category, author },
        });
        res.status(200).json(updatedBoard);
    }catch (error){
        res.status(500).json({error: "Error updating Board"})
    }
})


app.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        await prisma.board.delete({
            where : {boardId: parseInt(id)},
        })
        res.status(200)
    } catch(error){
        res.status(500).json({error: "Error deleting board"})
    }
})




module.exports = app;
