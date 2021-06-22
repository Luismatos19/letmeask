import { useContext } from "react";
import { useHistory } from "react-router-dom";

import illustrationImg from "../assets/illustration.svg";
import logoImg from "../assets/logo.svg";
import googleIconImg from "../assets/google-icon.svg";

import "../styles/auth.scss";
import { Button } from "../components/Button";
import { AuthContext } from "../App";

export function Home() {
  const history = useHistory();
  //usando o context
  const { user, singInWithGoogle } = useContext(AuthContext);

  async function handleCreateRoom() {
    //se o usuario nao estiver logado chama o metodo
    if (!user) {
      await singInWithGoogle();
    }
    //navegando entre rotas
    history.push("salas/nova");
  }

  return (
    <div className="page-auth">
      <aside>
        <img src={illustrationImg} alt="ilustração perguntas e respostas" />
        <strong>Crie suas salas de Q&amp;A ao-vivo </strong>
        <p>Tire as dúvidas da sua audiência em tempo-real </p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="logo" />

          <button className="create-room-button" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="logo google" />
            Cire sua sala com Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form action="">
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
