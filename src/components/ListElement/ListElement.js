import React,{Component} from "react";
import "./ListElement.css";

class ListElement extends Component {
    constructor(props) {
        super(props);
        this.state = 
        {
            fontColor: this.props.color
        }
    }
    render() { 
        //sets text to bold if it button text color matches the color in the element
        var fontWeight = "normal"; 
        if (this.state.fontColor===this.props.buttonTextColor) {
            fontWeight= "bold"
        } 
        return (<li className="MainElement" style={{color:this.props.color,fontWeight:fontWeight}} key={this.props.color}> <code>{this.props.color}</code> </li>);
    }
}
 
export default ListElement;

