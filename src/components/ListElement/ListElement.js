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
        var fontWeight = "normal"; 
        if (this.state.fontColor===this.props.buttonTextColor) {
            fontWeight= "bold"
        } 
        return (<li className="MainElement" style={{color:this.props.color,fontWeight:fontWeight}} key={this.props.color}> {this.props.color} </li>);
    }
}
 
export default ListElement;

