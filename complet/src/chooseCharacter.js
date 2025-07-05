const readline = require('readline')
const personagens = require('./character')


// Mostra todos os personagens disponíveis com seus atributos.
function mostrarPersonagens() {
    console.log("\n=== Personagens Disponíveis ===")
    personagens.forEach((p, index) => {
        console.log(`
            ${index + 1}. ${p.nome} ➤ 
            Velocidade: ${p.velocidade},
            Manobrabilidade: ${p.manobrabilidade},
            Poder: ${p.poder}
        `)
    })
    console.log("")
}



/**
 * Pergunta ao jogador qual personagem deseja escolher.
 * Retorna o personagem escolhido como um novo objeto (cópia).
 * 
 * @param {number} numeroJogador - O número do jogador (1 ou 2)
 * @returns {Promise<object>} - Personagem escolhido
 */

function perguntarEscolha(numeroJogador) {
    return new Promise((resolve) => {
        // Criamos uma interface de leitura
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        mostrarPersonagens()

        rl.question(`🎮 Jogador ${numeroJogador}, escolha o número do personagem: `, (resposta) => {
            const escolha = parseInt(resposta)

            if (escolha >= 1 && escolha <= personagens.length) {
                rl.close()

                // Faz uma cópia independente do personagem (para evitar bugs de estado compartilhado)
                const personagemEscolhido = { ...personagens[escolha - 1] }
                personagemEscolhido.pontos = 0 // Garante pontos zerados

                resolve(personagemEscolhido)
            } else {
                console.log("❌ Escolha inválida. Tente novamente.")
                rl.close()

                // Chama novamente para repetir a pergunta
                resolve(perguntarEscolha(numeroJogador))
            }
        })
    })
}

module.exports = {
    perguntarEscolha
}