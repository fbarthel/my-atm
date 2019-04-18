import React, {Component} from 'react';
import {Context} from '../Store'
import '../index.css'

class RestockPage extends Component{
    constructor(props){
        super(props)

        this.onChange = this.onChange.bind(this)
        this.restock = this.restock.bind(this)

        this.state={
            values: [],
            quantities: [],
            hasChanged: ""
        }
    }
    componentDidMount(){
        var v = this.context.values
        var q = this.context.quantities
        
        this.setState({values: v, quantities: q, hasChanged: false})
    }

    //modify the quantities for each denomination whose input was changed to a valid number
    //output which denominations had invalid input, and which were updated
    restock(){
        var q = this.context.quantities
        var success = false  //true if at least one denomination has valid input
        var fail = false     //true if at least one denomination has invalid input
        var successMessage = ""
        var failMessage = ""
        this.state.quantities.map((quantity, index) => {
            if(quantity > Number.MAX_SAFE_INTEGER){
                failMessage += "Too many $"+ this.state.values[index] +" bills. "    
                fail = true
                q[index] = this.context.quantities[index]
             }
             else if (quantity < 0){
                failMessage += "Too few $"+ this.state.values[index] +" bills. "
                fail = true
                q[index] = this.context.quantities[index]
             }
             else if(quantity !== this.context.quantities[index]){
                 successMessage += "Successfully updated $"+ this.state.values[index] + " bills. "
                 success = true
                 q[index] = parseInt(quantity, 10)
             }

        });
        if(fail){
            alert(failMessage)
            this.setState({quantities: q, hasChanged: false})
        }
        if(success){   
            alert(successMessage)     
            this.context.setQuantities(q)
            this.setState({quantities: q, hasChanged: false})
        }
    }
    onChange(e){
        if(e.target.value.match(/^[0-9]+$/)){
        var q = this.state.quantities.slice()
        q[e.target.id] = e.target.value
        this.setState({quantities: q, hasChanged: true})
        }
    }
    render(){
        return(
        <div className="contents">
        <h1>Restock Bills</h1>
        <p>Adjust the quantities of each denomination. The quantity will be updated to the input amount after pressing "Restock."</p>
        <form>
        <div className="button-restock">
        <button className={this.state.hasChange ? "enabled" : "disabled"} disabled={!this.state.hasChanged} 
                type="button" onClick={this.restock}>Restock</button>
        </div>
        <label htmlFor="hundreds">$100 bills:</label> <input type="number" name="hundreds" id="0" 
        min={0} max={Number.MAX_SAFE_INTEGER} value={this.state.quantities[0]} onChange={this.onChange} autoComplete="off" />
        <br/>
        <label htmlFor="fifties">$50 bills:  </label> <input type="number" name="fifties" id="1" 
         min={0} max={Number.MAX_SAFE_INTEGER} value={this.state.quantities[1]} onChange={this.onChange} autoComplete="off" />
         <br/>
        <label htmlFor="twenties">$20 bills:  </label> <input type="number" name="twenties" id="2" 
         min={0} max={Number.MAX_SAFE_INTEGER} value={this.state.quantities[2]} onChange={this.onChange} autoComplete="off" />
        <br/>
        <label htmlFor="tens">$10 bills:  </label> <input type="number" name="tens" id="3" 
         min={0} max={Number.MAX_SAFE_INTEGER} value={this.state.quantities[3]} onChange={this.onChange} autoComplete="off" />
         <br/>
        <label htmlFor="tens">$5 bills:    </label> <input type="number" name="fives" id="4" 
         min={0} max={Number.MAX_SAFE_INTEGER} value={this.state.quantities[4]} onChange={this.onChange} autoComplete="off" />
         <br/>
         <label htmlFor="tens">$1 bills:    </label> <input type="number" name="ones" id="5" 
         min={0} max={Number.MAX_SAFE_INTEGER} value={this.state.quantities[5]} onChange={this.onChange} autoComplete="off" />
         </form>
        </div>         
        )
    }
}
RestockPage.contextType = Context
export default RestockPage