import { Link } from "react-router-dom";
import { useContext } from "react";

import illustrationImg from "../assets/illustration.svg";
import logoImg from "../assets/logo.svg";

import { Button } from "../components/Button";

import "../styles/auth.scss";
import { AuthContext } from "../contexts/AuthContext";

export function NewRoom() {
  const { user } = useContext(AuthContext);

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
          <h2>Criar uma nova Sala</h2>

          <form action="">
            <input type="text" placeholder="Nome da sala" />
            <Button type="submit">Criar sala</Button>
            <p>
              Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>{" "}
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
