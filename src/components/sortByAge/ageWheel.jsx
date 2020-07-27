import React,{ Component} from 'react';
import Age from "./age";

class AgeWheel extends Component {
    
    constructor(props){
        super(props);
        this.age=React.createRef();
    }
    componentDidMount() {
        let scrollHeight=window.innerWidth/100*15;
        if(this.props.id==="303")
        {
           scrollHeight=-100;      
        }
        else{
            scrollHeight*=(10-Number(this.props.id)+210);
            
        }
        this.age.current.scrollTop=scrollHeight+40;
    }
    
    render() { 
        const {id}=this.props;
        return (
        <div className="age-wheel" ref={this.age}>
            <Age label="00s" id="303" match={id}/>
            <Age label="90s" id="219" match={id}/>
            <Age label="80s" id="218" match={id}/>
            <Age label="70s" id="217" match={id}/>
            <Age label="60s" id="216" match={id}/>
            <Age label="50s" id="215" match={id}/>
            <Age label="40s" id="214" match={id}/>
            <Age label="30s" id="213" match={id}/>
        </div>   );
    }
}
 
export default AgeWheel;
