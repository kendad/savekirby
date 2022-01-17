
import { _decorator, Component, Node, Vec2, v2, Vec3, input,Input, debug,EventKeyboard,KeyCode, BoxCollider2D,Contact2DType,Collider2D,IPhysics2DContact, director, Sprite} from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;
 
@ccclass('Player')
export class Player extends Component {

    private _speed:number=800;
    private _collider;
    private _leftDirection=false;
    private _rightDirection=false;
    private _gameManager;
    private _uiCanvas;
    private _enemy:Node=null;
    start () {
        input.on(Input.EventType.KEY_PRESSING,this.moveChar,this);
        this._collider=this.getComponent(BoxCollider2D);
        this._collider.on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
        this._gameManager=director.getScene().getChildByName("Canvas").getChildByName("GameManager").getComponent(GameManager);
        this._uiCanvas=director.getScene().getChildByName("UICanvas");
    }

    update(deltaTime:number){
        if(this._enemy!==null){
            this._enemy.destroy();
        }
        if(this._leftDirection){
            var xPos=this.node.position.x-(this._speed*deltaTime);
            if(xPos<=-445){ xPos=-445;}
            this.node.setPosition(xPos,this.node.position.y,0);
        }
        if(this._rightDirection){
            var xPos=this.node.position.x+(this._speed*deltaTime);
            if(xPos>=445){ xPos=445;}
            this.node.setPosition(xPos,this.node.position.y,0);
        }
        this._leftDirection=false;
        this._rightDirection=false;
    }

    moveChar(event:EventKeyboard){
       switch(event.keyCode){
           case KeyCode.KEY_A:
               this._leftDirection=true;
               break;
            case KeyCode.KEY_D:
               this._rightDirection=true;
               break;
       }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        this._gameManager.life-=1;
        this.updateLifeUI();
        this._enemy=otherCollider.node;
    }

    public updateLifeUI(){
        if(this._gameManager.life===2){
            this._uiCanvas.getChildByName("kirbyLife1").getComponent(Sprite).grayscale=true;
        }
        if(this._gameManager.life===1){
            this._uiCanvas.getChildByName("kirbyLife2").getComponent(Sprite).grayscale=true;
        }
        if(this._gameManager.life===0){
            this._uiCanvas.getChildByName("kirbyLife3").getComponent(Sprite).grayscale=true;
        }
    }
}