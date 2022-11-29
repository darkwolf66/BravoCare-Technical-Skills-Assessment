import React from "react";
import moment from "moment";
class QuestionOneShift extends React.Component {
    render() {
        return <div className="col-12 col-xl-4 mt-4 cursor-pointer" onClick={()=>this.props.clickEvent()}>
            <div className="card">
                <div className="card-body text-center" style={this.getSelectionStyle()}>
                    <h5>{this.props.facilityName}</h5>
                    <h5>{moment(this.props.date).format('Y-MM-DD')}</h5>
                    <h5>{this.formatTimeTo12HView(this.props.startTime)} - {this.formatTimeTo12HView(this.props.endTime)}</h5>
                </div>
            </div>
        </div>;
    }
    getSelectionStyle(){
        if(this.props.selectedShifts.includes(this.props.shiftId)){
            return {
                'backgroundColor': '#e5e5e5'
            }
        }
    }
    formatTimeTo12HView(time){
        return moment(time, 'hh:mm:ss').format('LT')
    }
}
export default QuestionOneShift