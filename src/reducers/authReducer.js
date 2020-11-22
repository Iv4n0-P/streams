import { SIGN_IN, SIGN_OUT } from '../actions/types'

const INTIAL_STATE = {
    isSignedIn: null,
    userId: null //pratit ćemo i usera, id ćemo iščupat iz googleovg auth objekta, iz GoogleAuth komponente ga poslat action kreatoru koji će ga stavit u payload i prosljedit reduceru koji će shodno tome update-at state na kojem smo dodali novi propety: userId
}

export default (state=INTIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN: 
            return { ...state, isSignedIn: true, userId: action.payload }
        case SIGN_OUT:
            return { ...state, isSignedIn: false, userid: null } //čisto očistimo taj id da se ne vuče
        default:
            return state
    }
}