/**
 * Helper para lidar com JWT.
 *
 */
const jwt = require('jsonwebtoken');

class JWTHelper {
    constructor() {
        this.jwt = jwt;
        // adicionado secret aqui a pedido do enunciado.
        this.TOKEN_SECRET = '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611';
    }

    /**
     * Gera um token de acesso a partir de um id
     *
     * @param Int id
     * @returns String
     */
    generateAccessToken(id) {
        const key = { id };
        return this.jwt.sign(key, this.TOKEN_SECRET, { expiresIn: '11800s' });
    }

    /**
     * Valida um token de acesso.
     *
     * @param String token Token a ser validado
     * @param Function func Callback para tratamento de erros.
     */
    verifyAccessToken(token, func) {
        this.jwt.verify(token, this.TOKEN_SECRET, func);
    }
}

module.exports = JWTHelper;