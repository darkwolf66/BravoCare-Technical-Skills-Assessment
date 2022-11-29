import './App.css';
import React from 'react';
import RestApiCaller from "./RestApiCaller";
import Loading from "./components/Loading";
import QuestionOneShift from "./components/QuestionOneShift";
import ShiftCalculator from "./components/ShiftCalculator";
import axios from "axios";

class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            shiftData: null,
            shiftCompare: {
                shiftOne: null,
                shiftTwo: null
            },
            selectedShifts: []
        };
        this.selectShift = this.selectShift.bind(this);
        this.showQuery = this.showQuery.bind(this)
    }

    componentDidMount() {
        this.fetchQuestionOneShiftsAndUpdateState()
    }
    async fetchQuestionOneShiftsAndUpdateState(){
        let shiftData = await RestApiCaller.getQuestionOneFits()
        this.setState({
            loading: false,
            shiftData: shiftData,
        })
    }

    render() {
        return (
            this.state.loading === true ? this.loading() : this.ready()
        );
    }
    loading(){
        return (<Loading />)
    }
    questionOneShiftsView(){
        let shiftsComponents = []
        for (let i in this.state.shiftData){
            shiftsComponents.push(<QuestionOneShift key={this.state.shiftData[i].shift_id}
                shiftId={this.state.shiftData[i].shift_id}
                facility={this.state.shiftData[i].facility_id}
                facilityName={this.state.shiftData[i].facility_name}
                date={this.state.shiftData[i].shift_date}
                startTime={this.state.shiftData[i].start_time}
                endTime={this.state.shiftData[i].end_time}
                selectedShifts={this.state.selectedShifts}
                clickEvent={()=>{this.selectShift(this.state.shiftData[i].shift_id)}}
            />)
        }
        return shiftsComponents;
    }
    selectShift(shiftId){
        let selectedShifts = this.state.selectedShifts
        if(selectedShifts.length > 1){
            selectedShifts.shift()
        }
        selectedShifts.push(shiftId)
        this.setState({
            selectedShifts: selectedShifts
        })
    }
    async showQuery(queryName) {
        let print,res;
        switch (queryName) {
            case 'q4':
                res = await axios.get(global.api_url+'/query/four')
                print = res.data;
                break;
            case 'q5':
                res = await axios.get(global.api_url+'/query/five')
                print = res.data;
                break;
            case 'q6':
                res = await axios.get(global.api_url+'/query/six')
                print = res.data;
                break;
        }
        console.log(print)
    }
    ready(){
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-6 col-xl-4 ps-1 pe-1">
                                        <button className="btn btn-dark w-100" onClick={()=>this.showQuery('q4')}>
                                            Execute Q4 Query
                                        </button>
                                    </div>
                                    <div className="col-sm-6 col-xl-4 ps-1 pe-1">
                                        <button className="btn btn-dark w-100" onClick={()=>this.showQuery('q5')}>
                                            Execute Q5 Query
                                        </button>
                                    </div>
                                    <div className="col-sm-6 col-xl-4 ps-1 pe-1">
                                        <button className="btn btn-dark w-100" onClick={()=>this.showQuery('q6')}>
                                            Execute Q6 Query
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12">
                        <ShiftCalculator selectedShifts={this.state.selectedShifts} />
                    </div>
                </div>
                <div className="row justify-content-center">
                    {this.questionOneShiftsView()}
                </div>
            </div>
        )
    }

};

export default App;
