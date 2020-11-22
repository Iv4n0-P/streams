import _ from 'lodash'

import {
    FETCH_STREAM,
    FETCH_STREAMS,
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case EDIT_STREAM: 
            return {...state, [action.payload.id]:action.payload} 
            //ne znam koji key objekta želimo updatejtat pa ga postavljamo dinamički, id je id koji dolazi sa action objektom
            //to se zove key interpolacija
            //znači kreiramo novi objekt koji je sastavljen od spredanog state objekta i action.payload objekta koji će bit tako dodan u state a kako ima isti id će overwrite-at postojeći key/property u state-u
        case FETCH_STREAMS:
            return {...state, ..._.mapKeys(action.payload, 'id')} //kada u action kreatoru napravimo ajax zahtjev dobijemo array objekata. Uz pomoć lodash-ovog mapKeys()-a iz araya objekata dobijemo objekt objekata čiji su ključevi recimo id key svakog objekta u arrayu
                                    //dakle mapKeys prosljeđujemo mu array objekata i neki key sa tih objekta koji želimo da bude top level key u novom objektu objekata
        case FETCH_STREAM:
            return {...state, [action.payload.id]:action.payload}
        case CREATE_STREAM:
            return {...state, [action.payload.id]:action.payload}
        case DELETE_STREAM: 
            return _.omit(state,[action.payload]) //payload je id i samo to a gore smo poslali kompletno sve uključujući id
            //ili možda ovo: {...state, [action.payload]:undefined}
        default:
            return state
    }
}