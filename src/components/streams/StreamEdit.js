import React from 'react'
import { connect } from 'react-redux'
import { fetchStream, editStream } from '../../actions'

class StreamEdit extends React.Component {

    componentDidMount () {
        this.props.fetchStream(this.props.match.params.id)
    }
    
    render() {
        if (!this.props.stream) {
            return 'Loading...'
        }
        return (
            <div>
            {this.props.stream.title}
            
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id] //ali state će bit prazan ako ga ne učitamo prvo gore pozivajući fetchStreams action kreatora, jer se state napuni sada samo u StreamList komponenti
        //i to nećemo fetchat sve strimove pošto imamo id strema kroz propse ćemo fetchat samo taj jedan stream
    }
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit)