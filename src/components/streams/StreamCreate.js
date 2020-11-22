import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { createStream } from '../../actions'

class StreamCreate extends React.Component {
    renderError({ error, touched }) {
        if ( error && touched ) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    } 

    renderInput = ({input, label, meta}) => {
        //destrukturiranje formProps objekta
        const className=`field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                <div>{this.renderError(meta)}</div>
            </div>
        )
        //spredali smo cijeli input objekat jer nas zanimaju i drugi propertiji a ne samo value i onChange, reduxu trebaju
        //<div>{meta.touched && meta.error}</div> - čisto provjera jeli neko polje van fokusa, tako da ne prikazuje error na početku upotrebe aplikacije, ni nakon svake validacije koja se događa prilikom svake interakcije sa formmom, već samo kad korisnik makne fokus sa inputa na kojem je trenutno
        //kako i te poruke moramo ukrasit i zapakirat u neke dodatne divove i možda još neku logiku, koristit ćemo helper funkciju renderError
    }


    onSubmit = (formValues) => { //ne primamo ni event objekt sad kad radimo sa redux form, sve on rješava za nas, nego primamo koje god vrijednosti se submitaju, koje ćemo nazvat npr. formValues
        //e.preventDefault()
        //ne treba preventatDefaultno jer to sad redux form radi za nas
        this.props.createStream(formValues) //okidamo action kreatora kojeg smo importirali i povezali u connect i prosljeđujemo vrijednosti forme
        
    }

    //klasa ereor služi za semantic ui da prikazuje error poruke kojima po defaltu zada rule display: none
    render() {
        return (
            <div>
                <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="title" label="Enter Title" component={this.renderInput} />
                    <Field name="description" label="Enter description" component={this.renderInput} />
                    <button className="ui button primary">Submit</button>
                </form>
            </div>
        )
    }
}

//umjesto
//<form className="ui form" onSubmit={this.onSubmit}>
//sa redux formom ide
//<form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>

//validacija će se pokrenit pri inicijalnom renderiranju i prilikom svake interakcije sa foromom
const validate = (formValues) => {
    const errors = {}
    if (!formValues.title) {
        errors.title = 'You must enter title'
    } 

    if (!formValues.description) {
        errors.description = 'You must enter description'
    }

    return errors
    //će bit prazna objekt ako je sve ok i redux form očekuje primit prazan objekt ako je sve ok
    //u protivnom, ako nešto nije prošlo validaciju vraća objekt sa key-value pairsima, naziv polja i error poruka
    //kad vrati error objekat će rerenderirati komponentu, pogledat svaku <Form /> komponentu i usporedit njen name property sa keyevima na error objketu
    //ako nađe key u error objektu će uzeti error poruku, string, i prosljedit je u callback koji šalje u component props, koji destrukturiramo kao "meta", a poruka je na meta.error
}

const formWrapped = reduxForm({ //redux form će kroz propse komponenti poslat tonu propsa, među njima je i handleSumbit, redux form metoda za submitanje
    //prosljeđujemo joj konfiguracijski objekat
    form: 'streamCreate', //neko ime, nebitno, samo da zna pod čim će nas zapisat u state, pod kojim imenom
    validate
})(StreamCreate) //dakle reduxForm će vratit funkciju i odmah zovemo tu funkciju i prosljeđujemo joj StreamCreate

//redux form ima sličnu sintaxu kao connect
//ako ako koristimo i connect, onda ćemo sve nakon export default zapakirat u zagrade i prije napisat connect()
//ili da bude urednije, kompletan reduxForm() sa svim unutra, možemo bindat u jedno ime, i onda to ime bindat dole, da bude connect()(ime)
export default connect(null, { createStream })(formWrapped)
//jednu "connect" sintaksu zapakiramo u binding koji upotrijebimo na kraju u connectu