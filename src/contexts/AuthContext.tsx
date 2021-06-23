import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import { ReactNode } from "react";
import { auth, firebase } from "../services/firebase";

type AuthContextType = {
  user: User | undefined;
  singInWithGoogle: () => Promise<void>;
};

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

//cria um contexto (informação) que podera ser usado em diversos componentes o parametro passado e o tipo da informação a aser guardada
export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
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
    <AuthContext.Provider value={{ user, singInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}
