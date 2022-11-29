import React from "react";
import axios from "axios";
class QuestionOneShift extends React.Component {
    constructor() {
        super();
        this.state = {
            overlapInMinutes: null,
            maximumOverlapThreshold: null,
            exceedsOverlapThreshold: null,
        };
        this.fetchQuestionsOverlap = this.fetchQuestionsOverlap.bind(this);
    }
    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-12 col-xl-6">
                            <h4>
                                Overlap Minutes: {this.state.overlapInMinutes ?? 'None'}
                            </h4>
                            <h4>
                                Max Overlap Threshold: {this.state.maximumOverlapThreshold ?? 'None'}
                            </h4>
                            <h4>
                                Exceeds Overlap Threshold: {this.state.exceedsOverlapThreshold == null ? 'None' : !this.state.exceedsOverlapThreshold ? "False" : "True"}
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="card-footer text-end">
                    <button className="btn btn-dark" onClick={this.fetchQuestionsOverlap} disabled={this.props.selectedShifts.length < 2}>Submit</button>
                </div>
            </div>
        );
    }
    async fetchQuestionsOverlap(){
        if(this.props.selectedShifts.left < 2)
            return;
        let res = await axios.get(global.api_url+`/question-one-shifts/${this.props.selectedShifts[0]}/${this.props.selectedShifts[1]}/check-overlap`)
        this.setState(res.data)
    }

}
export default QuestionOneShift
