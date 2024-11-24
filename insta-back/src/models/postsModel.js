import 'dotenv/config';
import { ObjectId } from 'mongodb';// Importa a função para conectar ao banco de dados MongoDB
import conectarAoBanco from '../config/dbconfig.js';

// Estabelece uma conexão com o banco de dados MongoDB (assumindo que a função retorna uma promessa)
const conexao = await conectarAoBanco("mongodb+srv://Victor:victor123@cluster0.ngnna.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

// Define uma função assíncrona para obter todos os posts do banco de dados
export  async function getTodosPosts() {
    // Acessa a conexão com o banco de dados
    const db = conexao.db("Imersão-Alura");
    // Obtém a coleção de posts
    const colecao = db.collection("posts");
    // Encontra todos os documentos na coleção e os converte em um array
    return colecao.find().toArray();
  }

  export async function criarPost(novoPost) {       
        const db = conexao.db("Imersão-Alura");        
        const colecao = db.collection("posts");      
        return colecao.insertOne(novoPost)
    
  }

  export async function atualizarPost(id, novoPost) {       
    const db = conexao.db("Imersão-Alura");        
    const colecao = db.collection("posts");      
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({ _id: new ObjectId(id) }, { $set: novoPost });

}