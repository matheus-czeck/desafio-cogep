const bcrypt = require('bcryptjs');

const password = '123456'; 
bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Erro ao gerar hash:', err);
  } else {
    console.log('Senha hashada:', hash);
  }
});
