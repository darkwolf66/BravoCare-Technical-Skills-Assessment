import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons";

class Loading extends React.Component {
    render() {
        return (<div className="container mt-5">
            <div className="row justify-content-center  mt-5">
                <div className="col-12 text-center mt-5">
                    <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" size="6x"  />
                    <h4 className="mt-4">
                        BravoCare Technical Skills Assessment
                    </h4>
                    <div>
                        <small>We are loading everything for you!</small>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default Loading