
import { _decorator, Component, Node,Prefab,instantiate,director,CCInteger, QuatKeyframeValue,input,Input,EventMouse,game, randomRange} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    
    @property({type:Prefab})
    public bulletPrefab:Prefab=null;
    @property({type:Node})
    public playerNode:Node=null;
    @property({type:CCInteger})
    public bulletSpeed:Number=5;
    @property({type:Prefab})
    public enemyPrefab:Prefab=null;


    public score=0;
    public life=3;


    start () {
        //shoot bullets
        input.on(Input.EventType.MOUSE_DOWN,this.moveBullet,this);//generate bullet on mouse click
        //generate enemies at the start of the game
        this.generateEnemies();
        this.schedule(function(){
            this.generateEnemies();
        },10);
    }
    generateBullet(){
        const bullet=instantiate(this.bulletPrefab);
        bullet.setParent(this.playerNode.parent);
    }

    moveBullet(event:EventMouse){
        if(event.getButton()==0){
            this.generateBullet();
        }
    }

    generateEnemies(){
        for(let i=0;i<10;i++){
            var enemy=instantiate(this.enemyPrefab);
            enemy.setParent(this.playerNode.parent);
            let tmpYPos=randomRange(1,299);
            let tmpXPos=randomRange(-455,455);
            enemy.setPosition(tmpXPos,tmpYPos,0);
        }
    }

    update(deltaTime:number){
        //game over condition---restart on death
        if(this.life<=0){
           game.restart();
        }
    }
}


