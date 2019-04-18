import React from 'react'

const Context = React.createContext("")

class DataProvider extends React.Component {
    constructor(props) {
        super(props)

        this.setQuantity = this.setQuantity.bind(this)
        this.setQuantities = this.setQuantities.bind(this)
        this.addTransaction = this.addTransaction.bind(this)
      
        this.state={
            values: [100, 50, 20, 10, 5, 1],
            quantities: [10, 10, 10, 10, 10, 10],
            transactions: [],
            setQuantity: this.setQuantity,
            setQuantities: this.setQuantities,
            addTransaction: this.addTransaction
        }
        
    }
    setQuantity(denomination, quantity){
        var q = this.state.quantities.slice()
        q[denomination] = quantity
        this.setState({quantities: q})
    }
    setQuantities(q){
        this.setState({quantities: q})
    }
    addTransaction(x){
        var t = this.state.transactions.slice()
        t.push(x)
        this.setState({transactions: t})
    }
    render() {
        return <Context.Provider value={this.state}>
          {this.props.children}
        </Context.Provider>
      }

}
class DataConsumer extends React.Component {
    render() {
      return <Context.Consumer>{this.props.children}</Context.Consumer>
    }
}


export {DataProvider, DataConsumer, Context};