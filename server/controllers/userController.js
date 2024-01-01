const User = require('../models/userModel');
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

// Função para registrar um novo usuário
async function register(req, res) {
  try {
    const { email, password, nome } = req.body;

    // Verificar se o usuário já existe
    const existingUser = await User.loginUser(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Criar um novo usuário
    const userId = await User.registerUser(email, password, nome);

    res.status(201).json({ userId, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Função para fazer login
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Verificar o usuário e senha
    const user = await User.loginUser(email, password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ userId: user.id, message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });

  }
}

// Função para atualizar o número de respostas corretas de um usuário
async function incrementNumRespostasCorretas(req, res) {
  try {
    const userId = req.params.userId; // Certifique-se de obter o ID do usuário da requisição
    await User.updateNumRespostasCorretas(userId);
    res.status(200).json({ message: 'Número de respostas corretas atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar o número de respostas corretas' });
  }
}

// Função para atualizar o número de respostas erradas de um usuário
async function incrementNumRespostasErradas(req, res) {
  try {
    const userId = req.params.userId; // Certifique-se de obter o ID do usuário da requisição
    await User.updateNumRespostasErradas(userId);
    res.status(200).json({ message: 'Número de respostas erradas atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar o número de respostas erradas' });
  }
}


async function updatePagamento(userId, novoPagamento) {
  console.log('Valor real de userId:', userId);
  try {
    const connection = await connectToDatabase();
    await connection.execute('UPDATE utilizadores SET pagamento = ? WHERE id = ?', [novoPagamento, userId]);
    console.log('Pagamento atualizado com sucesso');
  } catch (error) {
    console.error('Erro ao atualizar pagamento:', error);
    throw error;
  }
}

async function fetchAllUsersController(req, res) {
  try {
    console.log('List of users na saida');

    const pool = await connectToDatabase();
    const [results] = await pool.query('SELECT * FROM utilizadores');

    res.json(results);
  } catch (error) {
    console.error('Erro ao obter todos os utilizadores', error);
    res.status(500).send(error.message);
  }
}


async function deleteByUserIdController(req, res) {
  try {
    const { userId } = req.params;

    // Validate userId (check if it's a valid format, exists, etc.)

    const pool = await connectToDatabase();
    const [result] = await pool.query('DELETE FROM utilizadores WHERE id = ?', [userId]);

    if (result.affectedRows > 0) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send(error.message);
  }
}

module.exports = {
  register,
  login,
  incrementNumRespostasCorretas,
  incrementNumRespostasErradas,
  updatePagamento,
  deleteUserById,
  fetchAllUsersController,
  deleteByUserIdController,
};
