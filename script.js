const p1NameDiv = document.querySelector('#p1NameDiv');
const p2NameDiv = document.querySelector('#p2NameDiv');
const p1health= document.querySelector('#p1health');
const p2health= document.querySelector('#p2health');
const victoryMsgDiv = document.querySelector('#victoryMsg');

class Player{
    constructor(name,health,attackDamage){
        this.name = name;
        this.health = health;
        this.attackDamage = attackDamage;
    }

    
    strike(Player, enemy, attackDmg){
        let damageAmount = Math.ceil(Math.random()*attackDmg);
        enemy.health -= damageAmount;
        updateGame(p1,p2,game.isOver);

        console.log( `${Player.name} attacks ${enemy.name} for ${damageAmount} damage`);

    }

    
        
        
    heal(Player){
        let hpAmount = Math.ceil(Math.random() * 5);
        Player.health += hpAmount;
        updateGame(p1,p2, game.isover);

        console.log(`${Player.name} heals for ${hpAmount} HP`);
    }
        
        
}

class Game{
    constructor(){
        this.isOver = false;
    }

    declareWinner(isOver,p1,p2){
        let message = "TIE";
        if(isOver == true && p1.health <= 0){
            message =`${p2.name} WINS!!`;
        }else if(isOver == true && p2.health<=0){
            message = `${p1.name} WINS!!`;
        }

        document.getElementById('victorySound').play();
        return message;
    }

    reset(p1,p2){

        p1.health = 100;
        p2.health = 100;
        this.isOver = false;
        victoryMsgDiv.innerText = "";
        updateGame(p1,p2,this.isOver)
        
    }

    play(p1,p2){

        this.reset(p1,p2);

        while(!this.isOver){
            
            p2.strike(p2,p1,p2.attackDamage);
            p1.heal(p1);
            p1.strike(p1,p2,p1.attackDamage);
            p2.heal(p2);
            

        }

        return this.declareWinner(this.isOver,p1,p2);
    }

    
}

let player1 = new Player('PLAYER 1',100,20);
let player2 = new Player('PLAYER 2',100,20);
let p1 = player1;
let p2 = player2;
let gameState;

document.getElementById('simulate').onclick=()=>
    victoryMsgDiv.innerText = game.play(p1,p2);


let game = new Game();

const updateGame = (p1,p2,gameState) =>{
    p1NameDiv.innerText = p1.name;
    p2NameDiv.innerText = p2.name;
    p1health.innerText = p1.health;
    p2health.innerText = p2.health;

    if(p1.health <= 0 || p2.health <= 0){
        game.isOver = true;
        gameState = game.isOver;
        victoryMsgDiv.innerText = game.declareWinner(game.isOver,p1,p2);

        return gameState;
    }

}
document.addEventListener('keydown', function(e){
    if(e.key == 'q' && p2.health>0 && game.isOver == false){
        p1.strike(p1,p2,p1.attackDamage);
        document.getElementById('player1Punch').play();
    }


});


document.addEventListener('keydown', function(e){
    if(e.key == 'a' && p2.health>0){
        p1.heal(p1);
        document.getElementById('heal').play();
    }


});

document.addEventListener('keydown', function(e){
    if(e.key == 'p' && p1.health>0 && game.isOver == false){
        p2.strike(p2,p1,p2.attackDamage);
        document.getElementById('player2Punch').play();
    }


});
document.addEventListener('keydown', function(e){
    if(e.key == 'l' && p1.health>0){
        p2.heal(p2);
        document.getElementById('heal').play();
    }


});

document.getElementById('reset').onclick=()=>{
    game.reset(p1,p2);
}
