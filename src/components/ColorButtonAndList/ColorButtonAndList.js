import React,{Component} from 'react';
import ListElement from '../ListElement/ListElement';
import './ColorButtonAndList.css';

class ColorButton extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            textColor : "",
            colorList: [],
            activeColorHex: "",
            buttonText: "Enter color",
            inputText: "aaa"
        } 
    } 

    //Called when the button is clicked
    ButtonClicked()
    {
        var previousColor;
        var newColor;
        
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
                newColor = result.new_color;
                //checkes if the json file has any color value in it (if not function starts a recursive funcion and finds a new color and returns)
                if (newColor===""){
                    console.log("empty string, skip");
                    this.ButtonClicked();
                    return;
                }
                //sets state.textColor to a new value and stores the previous one
                console.log(newColor);
                previousColor = this.state.textColor;
                //checkes if a color is already in the list, adds it if not, bolds it if it is
                if(previousColor !=="" && this.state.colorList.find(element=>element===previousColor)===undefined){
                    this.state.colorList.push(previousColor);
                }else{
                        console.log("postoji ista boja");
                }
                this.setState({
                    textColor: "#" + newColor
                });
            }
        )
        return;
    }

    ArrowUpClick(color,index)
    {
        if(index === 0) {return;}

        var temp = this.state.colorList[index];
        this.state.colorList[index] = this.state.colorList[index - 1];
        this.state.colorList[index - 1] = temp;
        this.forceUpdate();
    }

    ArrowDownClick(color,index)
    {
        if(this.state.colorList.length <= (index + 1)) {console.log("nemoze dalje");return;}

        var temp = this.state.colorList[index];
        this.state.colorList[index] = this.state.colorList[index + 1];
        this.state.colorList[index + 1] = temp;
        this.forceUpdate(); 
    }

    InputTextChanged(event)
    {  
        this.setState({
            buttonText: event.target.value
        })
    }

    OnKeyPress(event){
        var reg = /^#[0-9A-F]{6}$/i;

        if(event.key === "Enter" && reg.test(this.state.buttonText))
        {
            if (this.state.colorList.find(element=>element===this.state.buttonText) === undefined)
            {
                this.state.colorList.push(this.state.buttonText)
            }
            this.setState({
                textColor: this.state.buttonText
            })
        }else{
            console.log("nevalja")
        }
    }

    render() { 
        return (
        <div>
            <button disabled={this.state.isLoaded} style={{color: this.state.textColor}} className='Button' onClick={() => this.ButtonClicked()}>
                {this.state.buttonText}
            </button>
            <ul className='ColorList'>
                {this.state.colorList.map((color,index)=><div className='ListElementWithControls' key={color}><ListElement  color={color} activeColorHex={color} buttonTextColor={this.state.textColor}/>
                &nbsp; &nbsp;
                <div className='ArrowButton' onClick={()=>this.ArrowDownClick(color,index)}>&darr;</div>
                &nbsp; 
                <div className='ArrowButton' onClick={()=>this.ArrowUpClick(color,index)}>&uarr;</div>
                </div>)}
            </ul>
            <input type="text" name='ColorInput' defaultValue={this.state.buttonText} onChange={(event)=>this.InputTextChanged(event)} onKeyPress={(event)=>this.OnKeyPress(event)}/>
        </div>   
        );
    }
}
 
export default ColorButton;