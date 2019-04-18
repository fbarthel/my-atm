import React, {Component} from 'react'
import {Context} from '../Store'
import '../index.css'

class WithdrawPage extends Component{
    constructor(props){
        super(props)

        this.onChange = this.onChange.bind(this)
        this.tryWithdraw = this.tryWithdraw.bind(this)

        this.state={
            values: [],
            quantities: [],
            amount:"",
            hasChanged: ""
        }
    }
    componentDidMount(){
        var v = this.context.values
        var q = this.context.quantities
        var t = this.context.transactions
        this.setState({values: v, quantities: q, amount: 0, hasChange: false})
    }
    onChange(e){
        this.setState({[e.target.id]: e.target.value, hasChanged: true})
    }
    tryWithdraw(){
        if(this.state.hasChanged && this.state.amount > 0){
            var totalFunds = 0;
            this.state.values.map((value, index) => {
                totalFunds += value * this.state.quantities[index]
            })
            var count = this.state.amount
            var amtString = parseInt(this.state.amount.toString(), 10)
            var billsUsed = [0, 0, 0, 0, 0, 0]
            if(totalFunds > count){            
                for(var i = 0; i < 6; i++){
                    while(count >= this.state.values[i]){
                        if((this.state.quantities[i] - billsUsed[i]) > 0){
                            count -= this.state.values[i]
                            billsUsed[i]++
                        }
                        else
                            break
                    }
                }
                if(count === 0){                        //successfully dispensed desired amount  
                    alert("Dispensed $" + amtString)
                    var q = [this.state.quantities[0]-billsUsed[0],
                    this.state.quantities[1]-billsUsed[1],
                    this.state.quantities[2]-billsUsed[2],
                    this.state.quantities[3]-billsUsed[3],
                    this.state.quantities[4]-billsUsed[4],
                    this.state.quantities[5]-billsUsed[5]]
                    this.context.setQuantities(q)
                    this.context.addTransaction("Dispensed $" + amtString) 
                    this.setState({quantities: q,
                        hasChanged: false,
                        amount:0 })         
                }
                else{        //Cannot dispense desired amount with current denomination quantities
                    alert("Cannot dispense the desired amount.")
                    this.context.addTransaction("Failed to dispense $" + amtString) 
                }
            }
            else{           //Tried to withdraw too much
                alert("Insufficient Funds")
                this.context.addTransaction("Failed to dispense $" + amtString) 
            }            
        }        
    }

    render(){
        return(
            <div className="contents">
                <h1>Make a Withdrawal</h1>
                <label htmlFor="amount">Withdraw Amount: </label> <input type="number" name="amount" id="amount" placeholder="0" 
                min="0" max={this.state.totalFunds} value={this.state.amount} onChange={this.onChange} autoComplete="off" />
                <button className={this.state.hasChange ? "enabled" : "disabled"} disabled={!this.state.hasChanged} 
                    type="button" onClick={this.tryWithdraw}>Withdraw</button>
            </div>
        )
    }
      
}
WithdrawPage.contextType = Context
export default WithdrawPage