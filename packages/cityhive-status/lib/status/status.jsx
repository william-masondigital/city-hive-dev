import React, {PropTypes, Component} from 'react';
import {ListContainer} from "meteor/utilities:react-list-container";
import StatusField from './statusfield.jsx';
import StatusItemList from './statusItemList.jsx';
import {Status} from '../collection.js';
import Telescope from 'meteor/nova:lib';
import statusComposer from './statusComposer';

class Statuss extends Component {

    hiddenStatus() {
        let status = this.props.status;
        return status && status.visible == 3;
    }

    writeStatus() {
        let status = this.props.status;
        let elem = status ? <Telescope.components.StatusItem status={status}/> : <span className="no-status"><p>You haven’t written a status yet.</p><p>A status is a good way to express your current mood to the rest of your hive.</p></span>;
        return elem;
    }

    render(props, context) {
        let status = this.props.status

        return (
            <div>
                {this.props.ready && !this.hiddenStatus() ?
                    <div className="status">
                        {this.writeStatus()}
                    </div>
                    : <div className="status"><p>Loading</p></div>
                }
            </div>
        )

    }

}

module.exports = statusComposer(Statuss);
export default statusComposer(Statuss);