const bcrypt = require('bcrypt');
const { connectToDatabase } = require('../database');


// Função para excluir um usuário por ID
async function deleteUserById(userId) {
    try {
      const connection = await connectToDatabase();
      await connection.execute('DELETE FROM utilizadores WHERE id = ?', [userId]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
async function registerUser(email, password, nome) {
  try {
    const connection = await connectToDatabase();
    const hashedPassword = await bcrypt.hash(password, 10);
    const [rows] = await connection.execute(
      'INSERT INTO utilizadores (email, senha, nome) VALUES (?, ?, ?)',
      [email, hashedPassword, nome]
    );
    return rows.insertId;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function loginUser(email, password) {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute('SELECT * FROM utilizadores WHERE email = ?', [email]);
    if (rows.length === 0) {
      return null; // Usuário não encontrado
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.senha);
    if (!passwordMatch) {
      return null; // Senha incorreta
    }

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }

}
  async function updateNumRespostasCorretas(userId) {
    try {
      const connection = await connectToDatabase();
      await connection.execute('UPDATE utilizadores SET num_respostas_corretas = num_respostas_corretas + 1 WHERE id = ?', [userId]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  // Função para atualizar o número de respostas erradas de um usuário
async function updateNumRespostasErradas(userId) {
    try {
      const connection = await connectToDatabase();
      await connection.execute('UPDATE utilizadores SET num_respostas_erradas = num_respostas_erradas + 1 WHERE id = ?', [userId]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }



  // Função para atualizar o pagamento de um usuário
async function updatePagamento(userId, novoPagamento) {
    try {
      const connection = await connectToDatabase();
      console.log('Atualizando pagamento para o usuário:', userId);

      await connection.execute('UPDATE utilizadores SET pagamento = ? WHERE id = ?', [novoPagamento, userId]);
      console.log('Pagamento atualizado com sucesso');

    } catch (error) {
        console.error('Erro ao atualizar pagamento:', error);

      console.error(error);
      throw error;
    }
  }




  async function fetchAllUsers(callback) {
    console.log('Aqui');

    try {
      const pool = await connectToDatabase();
      const [results] = await pool.query('SELECT * FROM utilizadores');
  
      callback(null, results);
    } catch (error) {
      console.error('Erro ao obter todos os utilizadores 2', error);
      callback(error);
    }
  }
  

module.exports = {
  registerUser,
  loginUser,
  updateNumRespostasCorretas,
  updateNumRespostasErradas,
  updatePagamento,
  deleteUserById,
  fetchAllUsers,
};
