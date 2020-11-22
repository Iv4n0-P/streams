import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import StreamCreate from './streams/StreamCreate'
import StreamDelete from './streams/StreamDelete'
import StreamEdit from './streams/StreamEdit'
import StreamList from './streams/StreamList'
import StreamShow from './streams/StreamShow'
import Header from './Header'

const App = () => {
    return (
        <div className="ui container">
        <BrowserRouter>
        <div>
            <Header />
            <Route path="/" component={StreamList} exact/>
            <Route path="/streams/new" component={StreamCreate} />
            <Route path="/streams/edit" component={StreamEdit} />
            <Route path="/streams/delete" component={StreamDelete} />
            <Route path="/streams/show" component={StreamShow} />
        </div>
        </BrowserRouter>
        
        </div>
    )
}

export default App

//npm install --save react-router-dom
//react-router library ima 4 kompoente, react-router je matični koji nikad ne instaliramo ručno, react-router-dom koji je za dom, dakle, web, tj. to nam treba, react-router-native je za mobitele a react-router-redux je isto kao react-redux sloj između routera i reduxa ali u praksi ne treba niti je on preporučuje (pogledat SS)
//import { BrowserRouter, Route, Link } from 'react-router-dom'

/* const PageOne = () => { return (
    <div>
    PageOne
    <Link to="/pagetwo">Go to page two</Link>
    </div>
    ) }

const PageTwo = () => { return (
    <div>
    PageTwo
    <Link to="/">Go to page one</Link>
    </div>
    ) }

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Route path="/" exact component={PageOne} />
                    <Route path="/pagetwo" component={PageTwo} />
                </div>
            </BrowserRouter>
        </div>
    )
} */

//exact radi otprilike ovako: extractedPath.contains(path) znači ako je path /pagetwo on će provjerit po redu rute, prva po redu, extractedPath sadrži "/" u sebi, to je jedan od znakova, i prikazat će i taj path. Zato stavljamo exact da osiguramo da extractedPath sadrži točno i samo to
//exact je isto što exact={true} i otprilike kažemo ovo: extractedPath === path
//inače bi prikaza obe 2 komponente

//Link omogućuje client side rutanje, da smo stavili a tag <a href.. onda bi refreshalo browser, zatražilo novi html dokument, pa budnle.js di je react aplikacija itd. Uništilo bi bilo koji redux i state
//ako se inspecta link komponenta u browseru vidi se da prikazuje ustvari a tag, ali umjesto da refresha stranicu samo showa/hide-a komponente

//u totalu react route ima 3 ruter dostupna, imamo BrowserRouter i još 2 a jedina razlika je u tome koji dio url-a će gledat da bi prikazali sadržaj na ekranu
//u ss je skica, 
//BrowserRouter ima najviše problema kod deploymenta. Tome doskaču servisi za deployment sa ugrađenim prepoznavanjem i predkonfiguriranjem servera za onepage apps i rješavanjem problema sa browser routerom ali u drugim slučajevima deployment sa browser routerom će bit zahtjevno
//zato jer normalan server, bilo koji server vraća 404 kad pitamo rutu /pagetwo jer ne prepoznaje tu rutu, jer je to ruta na klijentu i server nema pojma šta je to, gleda svoje resurse, ima li šta, nema, server ne zna šta da radi sa tom rutom /pagetwo, vraća 404, a development server koji pokrećemo na localhostu pogledat tu rutu, pogleda dev resurse(css, js, json, ico i dr. fileove kojima možemo direktno pristupit preko browsera), zatim pogleda public folder - i onda kad ne pronađe ništa, umjesto 404 error-a da index.html, učita bundle.js, react aplikacija se boota, history objekt od reacta pogleda url i prikaže za tu rutu definiranu komponentu. Tako i mi moramo konfigurirat server na koji deployamo aplikaciju, bilo da servis sam pripremi server ili mi ručno, da da index.html umjest 404
//a HashRouter (samo se BrowserRouter zamjeni za HashRouter) doda samo #, da malo više fleksibilnosti kod deploymenta, jer ako koritimo njega, backend server neće gledati ništa nakon hasha, i tako neće dat 404 error, jer localhost:3000/#/pagetwo, server gleda samo do hasha, daje index koji pokreće bundle.js i react pa history objekt pogleda sve nakon hasha i prikaže komponentu za tu rutu. Njega se koristi recimo za Github Pages jer on ne dopušta neku logiku koja bi konfigurirala server da ne prikaže 404, ako se da zahtjev za nekim resursom kojeg nema Github Pages će uvijek bacit error
//MemoryRouter (BrowserRouter se zamjeni sa MemoryRouter) uopće ne mjenja url
