import { BrowserRouter, Route } from "react-router-dom";
import { createContext, useState } from "react";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { auth, firebase } from "./services/firebase";

import "./styles/global.scss";

type AuthContextType = {
  user: User | undefined;
  singInWithGoogle: () => Promise<void>;
};

type User = {
  id: string;
  name: string;
  avatar: string;
};

//cria um contexto (informação) que podera ser usado em diversos componentes o parametro passado e o tipo da informação a aser guardada
export const AuthContext = createContext({} as AuthContextType);

function App() {
  //criando state para o context
  const [user, setUser] = useState<User>();

  //autenticando com o google
  async function singInWithGoogle() {
    //para fazer autenticação com o google
    const provider = new firebase.auth.GoogleAuthProvider();

    //abre autenticação google em formato de popup

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      //checa se existe nome e foto
      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google");
      }

      //se esta tudo ok seta o state com as informaçoes do usuario
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, singInWithGoogle }}>
        <Route path="/" exact component={Home} />
        <Route path="/salas/nova" component={NewRoom} />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
