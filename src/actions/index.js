import { 
    SIGN_IN, 
    SIGN_OUT, 
    CREATE_STREAM, 
    FETCH_STREAMS, 
    FETCH_STREAM, 
    DELETE_STREAM, 
    EDIT_STREAM 
} from './types'
//čisto smo stringove stavili u varijablu i izvadili u poseban file da imamo tipove na jednom mjestu a to sve zbog toga što se često falije upisat tip pa ćemo ovako dobivat error, opcionalno, mogli smo dole samo stavit string 'SIGN_IN'/'SIGN_OUT'
import streams from '../apis/streams'

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

export const createStream = formValues => async (dispatch, getState) => { //treba nam i user id sa auth state-a pa ćemo uz dispatch upotrijebit i getState
    const { userId } = getState().auth //a dole umjesto da šaljemo samo formVaues ćemo napravit objekt koji se sastoji od formValues i dodatnog userId keya
    //ovaj post request će vratit u responsu podatke koji nam trebaju, ako smo postali na /streams će dat sve streamove nakon što ubaci novi, više u ss redux form json server rest nešto
    const response = await streams.post('/streams', { ...formValues, userId})
    dispatch({ type: CREATE_STREAM, payload: response.data})
}
//dakle kad napravit http request, ajax request, on dobije i odgovor
export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams')
    dispatch({ type: FETCH_STREAMS, payload: response.data})
}

export const fetchStream = id => async dispatch => {
    const response = await streams.get(`/streams/${id}`)
    dispatch({ type: FETCH_STREAM, payload: response.data})
}

export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.put(`/streams/${id}`, formValues)
    dispatch({ type: EDIT_STREAM, payload: response.data})
}

export const deleteStream = id => async dispatch => {
    await streams.delete(`/streams/${id}`) //ne vraća ništa, dole u dispatch ćemo u payload poslat id
    dispatch({ type: DELETE_STREAM, payload: id})    
} 