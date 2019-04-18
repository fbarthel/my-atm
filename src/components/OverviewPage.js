import React, {Component} from 'react'
import {Context} from '../Store'
import '../index.css'

class OverviewPage extends Component{
    constructor(props){
        super(props)

        this.state={
            values: [],
            quantities: [],
            transactions: []
        }
    }
    componentDidMount(){
        var v = this.context.values
        var q = this.context.quantities
        var t = this.context.transactions
        this.setState({values: v, quantities: q, transactions: t})
    }
    render(){
        var total = 0
        for(var i = 0; i < 6; i++){
            total += (this.state.values[i]*this.state.quantities[i])
        }
        return(
            <div>
                <div className="contents">
                <h1>Overview</h1>
                <p>Total Funds: {total}</p>
                {this.state.values.map((value, index) => {
                    var space = ""
                    if(value < 100)
                        space += "  "
                    if(value < 10)
                        space += "  "    
                    return(
                        <p>Number of ${value} bills: {space}{this.state.quantities[index]}</p>
                    )
                })
            }
                <p>Transactions Log: </p>
                {this.state.transactions.map(txt => <p>{txt}</p>)}                
                </div>
            </div>
        )
    }
}
OverviewPage.contextType = Context
export default OverviewPage