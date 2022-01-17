
import { _decorator, Component, Node, input,Input, EventKeyboard, KeyCode, director} from 'cc';
const { ccclass, property } = _decorator;

 
@ccclass('StartSceneManager')
export class StartSceneManager extends Component {

    start () {
        input.on(Input.EventType.KEY_DOWN,this.startGame,this);
    }

    startGame(event:EventKeyboard){
        if(event.keyCode===KeyCode.ENTER){
            director.loadScene("GameScene");
        }
    }

}

