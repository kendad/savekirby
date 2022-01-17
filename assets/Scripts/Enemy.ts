
import { _decorator, Component, Node, randomRange, director } from 'cc';
import { GameManager } from './GameManager';
import { Player } from './Player';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {

    private _speed;
    private _gameManager;
    private _player;

    start () {
        this._speed=randomRange(0.6,0.1);
        this._gameManager=director.getScene().getChildByName("Canvas").getChildByName("GameManager").getComponent(GameManager);
        this._player=this.node.parent.getChildByName("kirby").getComponent(Player);
    }

    update (deltaTime: number) {
        this.node.setPosition(this.node.position.x,this.node.position.y-this._speed,0);
        if(this.node.position.y<=-250){
            this._gameManager.life-=1;
            this._player.updateLifeUI();
            this.node.destroy();
        }
    }
}

