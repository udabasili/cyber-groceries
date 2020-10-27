import React from 'react'
import Chart from 'react-apexcharts'
import { toast } from 'react-toastify';
import { getUserChatData } from '../redux/actions/admin.action';

export default class NewUsersGraphs extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                isMobile: window.innerWidth <= 800,
                loading: true,
                options: {
                    chart: {
                        id: 'total-registered-users-per-month'
                    },
                    xaxis: {
                        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
                    }
                },
                series: [{
                    name: 'registered-users',
                    data: []
                }]
            }
        }

        componentDidMount(){
            window.addEventListener('resize', this.setIsMobile)
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            getUserChatData()
                .then(data =>{
                    let values ;
                    if(data !== undefined){
                        values = monthNames.map((month, index) => (
                             data.map((d) => (
                                 d.month === month ? d.numberOfUser : 0
                             ))[0]
                         ))
                         
                    }else{
                        values = monthNames.map((month, index) => (
                            0
                        ))
                    }
                    this.setState(() => ({
                        options: {
                            ...this.state.options,
                            xaxis: {
                                categories: [...monthNames]
                            },
                        },
                        series: [{
                            name: 'series-1',
                            data: [...values]
                        }],
                        loading: false
                    }))
                   
                })
                .catch((error) =>{
                    toast.error(error)
                    this.setState((prevState) =>({
                    ...prevState,
                    loading: false
                }))
                })
                
        }

        componentWillUnmount(){
            window.removeEventListener('resize', this.setIsMobile)
        }

        setIsMobile = () => {
            this.setState((prevState) =>({
                ...prevState,
                isMobile: window.innerWidth <= 800
            }))

        }
        render() {
            const {isMobile} = this.state
            return ( 
                <div className='chart'>
                    {this.state.loading ?
                            <div className='loading__icon'/>
                         :
                        <React.Fragment>
                             <h3 className='heading-tertiary'>
                                Registered Users
                            </h3>
                            <Chart 
                                options = {this.state.options}
                                series = {this.state.series}
                                type = "bar"
                                width = {isMobile? '90%': "90%"}
                                height = {isMobile? '90%': "60%"}
                            />
                        </React.Fragment>
                    }
                   
                </div>
                
            )
        }
        }