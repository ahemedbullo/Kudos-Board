const express = require("express");

const app = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

app.post("/", async (req, res) => {
  const { title, image, category, author } = req.body;
  try {
    const newBoard = await prisma.board.create({
      data: { title, image, category, author },
    });
    res.status(201).json(newBoard);
  } catch (error) {
    res.status(500).json({ error: "Error creating new board" });
  }
});

app.get("/", async (req, res) => {
  try {
    const boards = await prisma.board.findMany({
      include: { cards: true },
    });
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ error: "Error getting boards" });
  }
});
app.get("/search", async (req, res) => {
  // ${import.meta.env.VITE_BACKEND_URL}/boards/search?query=basketball
  console.log("Searching boards...");
  const { query } = req.query;
  console.log(`Query: ${query}`);
  try {
    const boards = await prisma.board.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { author: { contains: query } },
        ],
      },
      include: { cards: true },
    });
    console.log(`Found boards: ${boards}`);
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ error: "Error searching boards" });
  }
});

app.get("/category/:category", async (req, res) => {
  const { category } = req.params;
  try {
    if (category === "All") {
      const boards = await prisma.board.findMany({
        include: { cards: true },
      });
      res.status(200).json(boards);
    } else if (category === "Recent") {
      const boards = await prisma.board.findMany({
        include: { cards: true },
      });
      const sortedBoards = boards.sort((a, b) => b.boardId - a.boardId);
      res.status(200).json(sortedBoards);
    } else {
      const boards = await prisma.board.findMany({
        where: { category },
        include: { cards: true },
      });
      res.status(200).json(boards);
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting boards by category" });
  }
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const board = await prisma.board.findUnique({
      where: { boardId: parseInt(id) },
      include: { cards: true },
    });
    if (board) {
      res.status(200).json(board);
    } else {
      res.status(404).json({ error: "Board not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting board" });
  }
});

app.put("/:id", async (req, res) => {
  const { cardId } = req.params;
  const { title, image, category, author } = req.body;
  try {
    const updatedBoard = await prisma.board.update({
      where: { boardId: parseInt(id) },
      data: { title, image, category, author },
    });
    res.status(200).json(updatedBoard);
  } catch (error) {
    res.status(500).json({ error: "Error updating Board" });
  }
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.card.deleteMany({
      where: { boardId: parseInt(id) },
    });
    await prisma.board.delete({
      where: { boardId: parseInt(id) },
    });
    res.status(200).json("Board Deleted").end();
  } catch (error) {
    res.status(500).json({ error: "Error deleting board" });
  }
});

app.post("/:boardId/cards", async (req, res) => {
  const { boardId } = req.params;
  const { cardTitle, message, gif, author } = req.body;
  try {
    const newCard = await prisma.card.create({
      data: {
        cardTitle,
        message,
        gif,
        author,
        boardId: parseInt(boardId),
      },
    });
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ error: "Error creating Card" });
  }
});

app.get("/:boardId/cards", async (req, res) => {
  const { boardId } = req.params;
  try {
    const cards = await prisma.card.findMany({
      where: { boardId: parseInt(boardId) },
    });
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: "Error getting cards" });
  }
});

app.get("/:boardId/cards/:cardId", async (req, res) => {
  const { cardId } = req.params;

  try {
    const card = await prisma.card.findUnique({
      where: { cardId: parseInt(cardId) },
    });
    if (card) {
      res.status(200).json(card);
    } else {
      res.status(404).json({ error: "Card not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting card by id" });
  }
});

app.put("/:boardId/cards/:cardId", async (req, res) => {
  const { cardId } = req.params;
  const { cardTitle, message, gif, author } = req.body;
  try {
    const updatedCard = await prisma.card.update({
      where: { cardId: parseInt(cardId) },
      data: { cardTitle, message, gif, author },
    });
    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(500).json({ error: "Error Updating Card" });
  }
});

app.delete("/:boardId/cards/:cardId", async (req, res) => {
  const { cardId } = req.params;
  try {
    await prisma.card.delete({
      where: { cardId: parseInt(cardId) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error deleting card" });
  }
});

app.put("/:boardId/cards/:cardId/upvote", async (req, res) => {
  const { cardId } = req.params;
  try {
    const updatedCard = await prisma.card.update({
      where: { cardId: parseInt(cardId) },
      data: { voteCount: { increment: 1 } },
    });
    res.json(updatedCard);
  } catch (error) {
    res.status(500).json({ error: "Error updating upvote" });
  }
});

app.put("/:boardId/cards/:cardId/comment", async (req, res) => {
  const { cardId } = req.params;
  const { comment } = req.body; // Get the comment from the request body
  try {
    const updatedCard = await prisma.card.update({
      where: { cardId: parseInt(cardId) },
      data: { comment }, // Update the comment field
    });
    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(500).json({ error: "Error updating comment" });
  }
});
module.exports = app;
