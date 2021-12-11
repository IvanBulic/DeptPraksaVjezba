import React,{Component} from "react";

class ListElement extends Component {
    constructor(props) {
        super(props);
        this.state = 
        { 
            fontWeight: "Normal",
            fontColor: this.props.color
        }
        
        if (this.props.color===this.props.fontColor)
        {
            this.props.fontWeight ="Bold"
        }
    }
    render() { 
        return (<li style={{color:this.props.color,}} key={this.props.color} font-weight={this.state.fontWeight}>{this.props.color} </li>);
    }
}
 
export default ListElement;