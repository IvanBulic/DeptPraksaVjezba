import React,{Component} from 'react';
import ListElement from '../ListElement/ListElement';
import './ColorButtonAndList.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
class ColorButton extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            textColor : "",
            colorList: [],
            activeColorHex: "",
            buttonText: "Enter color"
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
        //sets up the new request
        var urlRequestNoCache = new Request("https://www.colr.org/json/color/random",init);
        
        //gets the new color from json file and stores it inside of the state textColor
        fetch(urlRequestNoCache).then(res => res.json()).then(
            (result) => {
                newColor = result.new_color;
                //checkes if the json file has any color value in it (if not function starts a recursive function and finds a new color and returns)
                if (newColor===""){
                    this.ButtonClicked();
                    return;
                }
                //sets state.textColor to a new value and stores the previous one
                previousColor = this.state.textColor;
                //checkes if a color is already in the list, adds it if not 
                if(previousColor !=="" && this.state.colorList.find(element=>element===previousColor)===undefined){
                    //temp var used to change state with setState
                    var temp = this.state.colorList;
                    temp.push(previousColor);
                    this.setState({
                        colorList: temp
                    })
                }
                //sets the button text color
                this.setState({
                    textColor: "#" + newColor
                });
            }
        )
        return;
    }

    //On click event that handles up arrow control
    ArrowUpClick(index)
    {
        //return if the first element is clicked
        if(index === 0) {return;}
        var temp;
        var tempArray =this.state.colorList;

        //switch array element
        temp = tempArray[index];
        tempArray[index] = tempArray[index - 1];
        tempArray[index - 1] = temp;
        
        //set new colorList
        this.setState({
            colorList: tempArray
        })

        return;
    }

    //On click event that handles down arrow control
    ArrowDownClick(index)
    {
        //returns if the last element is clicked
        if(this.state.colorList.length <= (index + 1)) {return;}
        var temp;
        var tempArray = this.state.colorList;

        //switch array element
        temp = this.state.colorList[index];
        tempArray[index] = tempArray[index + 1];
        tempArray[index + 1] = temp;

         //set new colorList
         this.setState({
            colorList: tempArray
        })

        return;
    }

    //Triggers every time user types something in the textfield
    InputTextChanged(event)
    {  
        this.setState({
            buttonText: event.target.value
        })
    }

    //Triggers when user presses button in the textfield
    OnKeyPress(event){
        //setup for the error notification
        const ErrorNotification = () =>{
            toast.error('Text input value not valid format (Example of a valid text: "#d0f66d")', {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            hideProgressBar: true,
            });}

        //sets up a regex for hexidecimal color
        var reg = /^#[0-9A-F]{6}$/i;

        //checks if key pressed is Enter, if not returns
        if(event.key === "Enter")
        {
            //checks if text in the input field is in valid format, if not pops up a notification
            if (!reg.test(this.state.buttonText))
            {
                toast.dismiss(); 
                ErrorNotification.apply();
                return;
            }

            //adds new element to the list if there is no element with that value
            if (this.state.colorList.find(element=>element===this.state.buttonText) === undefined)
            {
                var temp = this.state.colorList;
                temp.push(this.state.buttonText)
                this.setState({colorList:temp});       
            }
            //sets button text color to user typed color hex
            this.setState({
                textColor: this.state.buttonText
            })
        }
        return;
    }

    render() { 
        return (
        <div>
            <button disabled={this.state.isLoaded} style={{color: this.state.textColor}} className='Button' onClick={() => this.ButtonClicked()}>
                {this.state.buttonText}
            </button>
            <div className='ColorList'>
                {this.state.colorList.map((color,index)=><div className='ListElementWithControls' key={color}><ListElement  color={color} activeColorHex={color} buttonTextColor={this.state.textColor}/>
                &nbsp; &nbsp;
                <div className='ArrowButton' onClick={()=>this.ArrowDownClick(index)}>&darr;</div>
                &nbsp; 
                <div className='ArrowButton' onClick={()=>this.ArrowUpClick(index)}>&uarr;</div>
                </div>)}
            </div>
            <input className='TextInput' type="text" name='ColorInput' defaultValue={this.state.buttonText} onChange={(event)=>this.InputTextChanged(event)} onKeyPress={(event)=>this.OnKeyPress(event)}/>
        </div>   
        );
    }
}
 
export default ColorButton;