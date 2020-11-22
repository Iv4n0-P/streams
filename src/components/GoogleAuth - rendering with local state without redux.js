import React from 'react'

/* nemamo NPM paket da koristimo googleov oauth nego oćemo direktno importirat js file u index.html
<script src="https://apis.google.com/js/api.js"></script>
        Možemo provjerit jeli sve ok tako da pokrenemo aplikaciju i konzoli browsera utipkam "gapi" bez navodnika i trebali bi dobit neki objekt, što znači da radi
    
        Ovo je toliko korišten library, toliko ga stranica koristi i google ga se zbog toga trudi držati što manjim,
        a to je multipurpose objekt koji služi sa sve živo pa ga drže malim na način da sve što u sebi sadrži su metoda za učitavanje dijela libraryja koji nam treba
        Dakle, mi ručno moramo zatražit ono što nam treba, napravit folowup request googleovim serverima i dodati ga ovom librariju gapi
        gapi.load('client:auth2') - dakle, prosljedimo string resursa koji tražimo
        Sad gapi objekt sadrži neke druge stvari.
        Možemo ga incijalizirati sa init objektom koji sadrži id koji smo dobili na console.developers.google.com
        gapi.client.init({clientId})
        i to ćemo napravit samo jednom kad se komponenta učita

        gapi documentation
        developers.google.com/api-client-library/javascript/reference/referencedocs
        
 */


//stavit ćemo sve u jednu komponentu da imamo oauth flow na jednom mjestu
class GoogleAuth extends React.Component {

    state = { isSignedIn: null } //čisto neutralno, ne znamo jeli logiran ili ne, ništa

    componentDidMount() {
        //gapi objekt je dostpunan na window scope-u jer smo library ubacili u index.html umjesto ga intalirali sa npm-om
        //drugi argument je callback koji će se pozvati tek kad se library client:auth2 učita u gapi
        //a koji inicijalizirira klijenta pružajući id i scope, a scope je ono što želimo od korisnikovih podataka i što sve možemo napravit, bilo slanje maila isl. Mi sad samo želimo korisnikov email

        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '609370722732-u80ll7jbq7ujjdokrngol2vld08aon8e.apps.googleusercontent.com',
                scope: 'email'
                //ovo će pokrenit asinkroni zahtjev, chainat ćemo .then, a gore u prvom gapi zahtjevu smo poslali callback    
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance()
                //jedna od metoda, više ih je u dokumentaciji, a getAuthInstance() će nam vratit google auth objekt. Super stvar, odličan library sa metodama koje maksimalno olakšavanu oauth flow
                //auth objekt se sastoji od puno metoda, neke nikad nećemo pozvati, one služe za interne potrebe objekta
                //koristimo naravno one koje nemaju generička nego ljudima čitljiva imena, tipa signIn
                //auth.signIn() poziva prozor za autentikaciju a
                //auth.isSignedIn.get() će nam dat true ako smo se u prozoru logirali
                //ove dvi možemo okinit u browserovoj konzoli za probu bez da ih spoojimo na onclick event npr.

                //i sad ćemo rerenderirat komponentu tako da promjenimo state, prema kojem će komponenta renderirat što već treba 
                this.setState({ isSignedIn: this.auth.isSignedIn.get() })
                //usput, dobra stvar je kod ovog librarija što će zadržati sign in status i nakon refresha stranice
                //a sad bi trebalo nekako slušat promjenu login statusa i shodno tome promjenit state koji će rerenderirat komponentu
                //koristit ćemo auth.isSignedIn.listen() a kao i get(), listen() je metoda(funkcija) u prototipu isSignedIn() instance objketa
                this.auth.isSignedIn.listen(this.onAuthChange) //prosljedimo joj callback koji će pozvati nakon što se promjeni login status
            })
        })
    }
    
    onAuthChange = () => {
                this.setState({ isSignedIn: this.auth.isSignedIn.get() })
            }
    
    onSignInClick = () => {
        this.auth.signIn()
    }

    onSignOutClick = () => {
        this.auth.signOut()
    }
    //mogli smo i bez ove 2 helper metode i pozvat signIn/Out direktno dole ali ovako je čitljivije i jasnije što komponenta radi, svakako olakšava drugim inžinjerima
    
    renderAuthButton() {
            if(this.state.isSignedIn === null) {
            return null
        } else if (this.state.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                <i className="google icon" />
                SignOut
                </button>
            )
        } else {
            return (
                <button onClick={() => {this.onSignInClick()}} className="ui red google button">
                <i className="google icon" />
                SignIn with Google
                </button>
            )
        }
        //i to se dole renderira, i sad se može u konzolu browsera poigrat sa logiranjem i odlogiranjem da provjerimo jeli sve radi
        //gapi.auth2.getAuthInstance().signIn()
        //gapi.auth2.getAuthInstance().signOut()
        //gapi.auth2.getAuthInstance().isSignedIn().get() //daje true/false

    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}

export default GoogleAuth