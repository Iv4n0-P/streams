import React from 'react'
import { fetchStreams } from '../../actions'
import { connect } from 'react-redux'
import { divide } from 'lodash'

class StreamList extends React.Component {

    componentDidMount () {
        this.props.fetchStreams()
    }

    renderAdmin (stream) {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <button className="ui button primary">Edit</button>
                    <button className="ui button negative">Delete</button>
                </div>
            )
        }
    }

    renderList () {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    <i className="large middle aligned icon camera" />
                    <div className="content" >
                        {stream.title}
                        <div className="description">{stream.description}</div>
                    </div>
                    {this.renderAdmin(stream)}
                </div>
            )
        })
    }

    render () {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams), //od objekta ćemo napravit array da ga gore možemo mapirat 
        //Object.values je javascript metoda kojoj se prosljeđuje objekt, uzima sve vrijednosti iz tog objekta i ubaci ih u array. Taj array onda prosljeđujemo komponenti
        currentUserId: state.auth.userId
    }   
}

export default connect(mapStateToProps, {fetchStreams})(StreamList)