import React from 'react'
import { Link } from 'react-router-dom'
import GoogleAuth from './GoogleAuth'

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item">Streams</Link>
            <div className="right menu">
                <Link to="/" className="item">All Streams</Link>
                <GoogleAuth />
            </div>
        </div>
    )
}
//GoogleAuth je box di će nešto pisat ili stajat o statusu usera, jeli logiran ili ne i valjda botun za login/logout
//i di će se odmah po renderiranju kompoenente, u componenteDidMount obavit sva komunikacija sa google-om, inicijalizacija, vađenje podataka, switchanje state-a, i prikazivanje potrebnog u renderiranju komponente
export default Header