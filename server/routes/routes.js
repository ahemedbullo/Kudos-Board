const express = require("express");

const app = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

