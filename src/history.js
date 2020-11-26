//koja je priča sa ovim historijem
//znači po defaultu ako koristimo browserHistory, možda i ove ostale historije, oni interno kreiraju history objekt
//taj objekt prosljeđuju komponentama kroz propse, i ako komponenta treba redirektirat usera (dakle ima 2 tipa redirekcije, userova i programska, točni u router SS) ima problem kako pristupit history objektu
//zbog toga ćemo history objekt kreirat sami, izbacit ga u file /scr/history.js a umjeto browserroutera ćemo koristit generički plane router (više u router SS)
//iako browserhistory će ako mu se zada prop history koristit taj history umisto da interno napravi svoj ali ćemo dobit grešku da mu ne dajemo history jer on kreira svoj history...
import { createBrowserHistory } from 'history'
//history je dependenci o kojoj ovisi react-router-dom
//i instalira se zajedno sa njime

export default createBrowserHistory //ne treba ništa više!