
import { _decorator, Component, Node, Scene,Collider2D,IPhysics2DContact,Contact2DType, BoxCollider2D, Sprite, Color, director, Label } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;


 
@ccclass('Bullet')
export class Bullet extends Component {
    private _speed=5;
    private _collider;
    private _collidedObject:Node=null;
    start () {
        const playerNode=this.node.parent.getChildByName("kirby");
        this.node.position=playerNode.position;
        //Colliders
        this._collider=this.getComponent(BoxCollider2D);
        this._collider.on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
    }

    update(deltaTime:number){
        this.moveBullet();
        if(this._collidedObject!==null){
            var pointsUI=director.getScene().getChildByName("UICanvas");
            director.getScene().getChildByName("Canvas").getChildByName("GameManager").getComponent(GameManager).score+=1;
            pointsUI.getChildByName("Points").getComponent(Label).string=director.getScene().getChildByName("Canvas").getChildByName("GameManager").getComponent(GameManager).score.toString();
            this._collidedObject.destroy();
            this.node.destroy();
        }
    }

    moveBullet(){
        this.node.setPosition(this.node.position.x,this.node.position.y+this._speed,0);
        if(this.node.position.y>=400){
            this.node.destroy();
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        this._collidedObject=otherCollider.node;
    }
}


