import React, { Component } from 'react'
import { getTotalCost } from '../redux/actions/admin.action'
import Chart from 'react-apexcharts'
export default class RevenueGraph extends Component {
    state={
        total: 0,
        loading: true,
        options: {
            plotOptions: {
                pie: {
                    donut: {
                            labels: {
                                show: true,
                                total:{
                                     show: true,
                                         showAlways: true,
                                         label: 'Total Revenue',
                                         formatter: function (w) {
                                            const total = w.globals.seriesTotals.reduce((totalValue, currentValue) => {
                                                totalValue += currentValue
                                                return totalValue
                                            }, 0)
                                        return `$${total}`
                                }
                            }
                            }
                    }
                }
            },

            labels: []
        },
        series: []

        
        
    }
    
    componentDidMount(){
        getTotalCost()
            .then(data => {
                if (data || data !== undefined){
                    data.forEach((item) => {
                        this.setState((prevState) => ({
                            options: {
                                ...prevState.options,
                                labels: [...this.state.options.labels, item.username]
                            },
                            series: [...this.state.series, item.itemTotal],
                        }))

                    })
                }

                this.setState((prevState) =>({
                    ...prevState,
                    loading: false
                }))
                
               
            })
            .catch((err) => {
                this.setState((prevState) =>({
                    ...prevState,
                    loading: false
                }))
            })

        }
 
    
    render() {
        return (
            <div className='chart'>
                {this.state.loading ?
                    <div className='loading__icon'/> :
                        <React.Fragment>
                            <h3 className='heading-tertiary'>
                                    Revenue
                                </h3>
                                <Chart 
                                    options={this.state.options} 
                                    series={this.state.series} 
                                    type='donut' 
                                    width = { 400}
                                    height = {400}
                                    />
                        </React.Fragment>
                }
        </div>
                 
        )
    }
}

