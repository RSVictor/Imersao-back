
import express from "express";// Importa o framework Express para criar o servidor web
import multer from "multer";// Importa o middleware Multer para o upload de arquivos
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";// Importa as funções controladoras do arquivo postsController.js
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000", 
  optionsSuccessStatus: 200
}

// Configura o armazenamento de arquivos para o Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para os arquivos carregados: 'uploads/'
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo
    cb(null, file.originalname);
  }
});

// Cria uma instância do middleware Multer
const upload = multer({ dest: "./uploads", storage }); // Define o destino e o armazenamento

// Define uma função para montar as rotas da API
const routes = (app) => {
  // Habilita o parsing de dados JSON nas requisições
  app.use(express.json());
  app.use(cors(corsOptions))

  // Rota GET para listar todos os posts (manipulada pela função listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (manipulada pela função postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem (usa o middleware upload.single("imagem") e depois a função uploadImagem)
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", upload.single("imagem"), atualizarNovoPost )
};

// Exporta a função routes para uso em outros arquivos do projeto
export default routes;