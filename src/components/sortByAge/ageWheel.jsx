import React,{ Component} from 'react';
import Age from "./age";

class AgeWheel extends Component {
    
    constructor(props){
        super(props);
        this.age=React.createRef();
    }
    componentDidMount() {
        let scrollHeight=window.innerHeight/100*30;
        if(this.props.id==="1")
        {
           scrollHeight=-100;      
        }
        else if(this.props.id==="4"){
            scrollHeight*=(8-this.props.id);
            scrollHeight+=50;
        }
        else{
            scrollHeight*=(8-this.props.id);
        }
        this.age.current.scrollTop=scrollHeight+100;
    }
    
    render() { 
        const {id}=this.props;
        return (
        <div className="age-wheel" ref={this.age}>
            <Age label="00" id="1" match={id}/>
            <Age label="90" id="7" match={id}/>
            <Age label="80" id="6" match={id}/>
            <Age label="70" id="5" match={id}/>
            <Age label="60" id="4" match={id}/>
            <Age label="50" id="3" match={id}/>
            <Age label="40" id="2" match={id}/>
        </div>   );
    }
}
 
export default AgeWheel;
