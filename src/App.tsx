import { BrowserRouter, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { AuthContextProvider } from "./contexts/AuthContext";

import "./styles/global.scss";

function App() {
  //criando state para o context
  const [user, setUser] = useState<User>();

  //guarda o usuario msm apos ele atualizar
  useEffect(() => {
    //metodo do firebase que checka se o usurio ja estava logado
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

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
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
      <AuthContextProvider>
        <Route path="/" exact component={Home} />
        <Route path="/salas/nova" component={NewRoom} />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
