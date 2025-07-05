const player1 = {
    nome: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0
}

const player2 = {
    nome: "Luigi",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
    pontos: 0
}


async function rollDice() {
    return Math.floor(Math.random() * 6) + 1
}


async function getRandomBlock() {
    let random = Math.random()
    let result

    switch(true){
        case random < 0.33:
            result = "RETA"
            break
        case random < 0.66:
            result = "CURVA"
            break
        default:
            result = "CONFRONTO"
    }
    
    return result
}

async function logRoll(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 Rolou um dado de ${block} e fez ${diceResult} + ${attribute} = ${diceResult + attribute}.`)

}

async function playRaceEnginer(character01, character02) {
    for(let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round} 🏁`)

        const block = await getRandomBlock()
        console.log(`🚨 BLOCO: ${block}`)

        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()
    
        let totalTestSckill01 = 0
        let totalTestSckill02 = 0

        if(block === "RETA"){
            totalTestSckill01 = diceResult1 + character01.velocidade
            totalTestSckill02 = diceResult2 + character02.velocidade

            await logRoll(character01.nome, "velocidade", diceResult1, character01.velocidade)
            await logRoll(character02.nome, "velocidade", diceResult2, character02.velocidade)
        }

        if(block === "CURVA"){
            totalTestSckill01 = diceResult1 + character01.manobrabilidade
            totalTestSckill02 = diceResult2 + character02.manobrabilidade

            await logRoll(character01.nome, "Manobra", diceResult1, character01.manobrabilidade)
            await logRoll(character02.nome, "Manobra", diceResult2, character02.manobrabilidade)
        }
        
        if(block === "CONFRONTO"){

            let powerResult1 = diceResult1 + character01.poder
            let powerResult2 = diceResult2 + character02.poder

            console.log(`${character01.nome} confrontou com ${character02.nome}!🥊`)

            await logRoll(character01.nome, "Poder", diceResult1, character01.poder)
            await logRoll(character02.nome, "Poder", diceResult2, character02.poder)

            // Operação Ternaria
            // character02.pontos -= powerResult1 > powerResult2 && character02.pontos > 0 ? 1 : 0

            if(powerResult1 > powerResult2 && character02.pontos > 0){
                console.log(`${character02.nome} Perdeu um ponto! 🐢`)
                character02.pontos -= 1
            }


            if(powerResult2 > powerResult1 && character01.pontos > 0){
                console.log(`${character01.nome} Perdeu um ponto! 🐢`)
                character01.pontos -= 1
            }


            if(powerResult1 === powerResult2){
                console.log(`${character01.nome} e ${character02.nome} tiveram um empate! Ninguem Pontuou nessa Rodade 😂`)
            }
        }



        if (totalTestSckill01 > totalTestSckill02){
            console.log(`${character01.nome} Marcou um ponto! 🔝`)
            character01.pontos += 1
        } else if (totalTestSckill02 > totalTestSckill01){
            console.log(`${character02.nome} Marcou um ponto! 🔝`)
            character02.pontos += 1
        } else if (totalTestSckill01 === totalTestSckill02){
            console.log(`${character01.nome} e ${character02.nome} tiveram um empate! Ninguem Pontuou nessa Rodade 😂`)
        }


        // if(character01.pontos <= 0){
        //     console.log(`${character01.nome} chegou a zero! 😐🤕`)
        // }
        // if(character02.pontos <= 0){
        //     console.log(`${character02.nome} chegou a zero! 😐🤕`)
        // }

        console.log(`🏁 🚥 --------------------------------------------------- 🚥 🏁\n`)

    }
    
}



async function declareWinner(player1, player2) {
    console.log(`🏁🚦🏁 Finalizou a Corrida entre ${player1.nome} & ${player2.nome} 🏁🚦🏁`)
    console.log('Resultado Final:')
    console.log(`${player1.nome}: ${player1.pontos} Pontos`)
    console.log(`${player2.nome}: ${player2.pontos} Pontos`)

    if (player1.pontos > player2.pontos){
        console.log(`${player1.nome} Venceu a corrida 🎊🎊 PARABÉNS! 🏆`)
    } else if (player2.pontos > player1.pontos){
        console.log(`${player2.nome} Venceu a corrida 🎊🎊 PARABÉNS! 🏆`)
    } else {
        console.log(`A coorida terminou em empate 🤡`)
    }
}




async function main() {
    console.log(`🏁🚦🏁 Iniciou a Corrida entre ${player1.nome} & ${player2.nome}`)
  
    await playRaceEnginer(player1, player2)
    await declareWinner(player1, player2)
    console.log("\n\n")

}

main()