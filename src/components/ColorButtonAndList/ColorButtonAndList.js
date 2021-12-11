import React,{Component} from 'react';
import ListElement from '../ListElement/ListElement';
import styles from './ColorButtonAndList.css';

class ColorButton extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            textColor: "#000000",
            colorList: [],
            textWeight: "normal"
        } 
    } 

    //Called when the button is clicked
    ButtonClicked()
    {
        var previousColor;
        
        //sets init so that fetch is set to get methode and that it is not being cached
        var init = {
            method:'GET',
            cache:'no-cache'
            };
        //sets ip the new request
        var urlRequestNoCache = new Request("https://www.colr.org/json/color/random",init);
        
        //gets the new color from json file and stores it inside of the state textColor
        fetch(urlRequestNoCache).then(res => res.json()).then(
            (result) => {
                //checkes if the json file has any color value in it (if not function returns without doing anything)
                if (result.new_color===""){
                    console.log("empty string, skip");
                    return;
                }
                //sets state.textColor to a new value and stores the previous one
                console.log(result.new_color);
                previousColor = this.state.textColor;
                this.setState({
                    textColor: "#" + result.new_color
                });

                //checkes if a color is already in the list, adds it if not, bolds it if it is
                if(this.state.colorList.find(element=>element===previousColor)===undefined){
                    this.state.colorList.push(previousColor);
                }else{
                    console.log("postoji ista boja");
                }
            }
        )
        return;
    }
    
    render() { 
        return (
        <div>
            <button disabled={this.state.isLoaded} style={{color: this.state.textColor}} className='Button' onClick={() => this.ButtonClicked()}>
                Press to change text color
            </button>
            <ul className='ColorList'>
                {this.state.colorList.map((color)=><ListElement key={color} color={color}/>)}
            </ul>
        </div>   
        );
    }
}
 
export default ColorButton;