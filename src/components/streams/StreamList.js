import React from 'react'
import { Link } from 'react-router-dom'
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
                    <Link to={`/streams/edit/${stream.id}`}className="ui button primary">Edit</Link>
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

    renderCreate () {
        if (this.props.isSignedIn) {
            return (
                <div style={{textAlign: 'right'}}>
                    <Link to="/streams/new" className="ui button primary">Create Stream</Link>
                </div>
            )
        }
    }

    render () {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams), //od objekta ćemo napravit array da ga gore možemo mapirat 
        //Object.values je javascript metoda kojoj se prosljeđuje objekt, uzima sve vrijednosti iz tog objekta i ubaci ih u array. Taj array onda prosljeđujemo komponenti
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn  //da bi renderirali create button gore ćemo provjerit jeli use logiran da ga prikažemo. To možemo i provjeravajući jeli postoji currentUserId ali ipak nećemo tako nego ćemo baš ovu varijablu sa autha koja za to i služi na kraju krajeva, ako negdje u aplikaciji zatreba jeli korisnik logiran ili ne
    }   
}

export default connect(mapStateToProps, {fetchStreams})(StreamList)