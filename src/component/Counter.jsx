import React, { Component } from "react";

class Counter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const {counter} = this.props
        return(
            <div>
                <h1>Counter is {counter}</h1>
            </div>
        )
    }
}

export default Counter