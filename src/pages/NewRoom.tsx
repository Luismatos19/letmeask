import { Link, useHistory } from "react-router-dom";
import { FormEvent, useState } from "react";

import illustrationImg from "../assets/illustration.svg";
import logoImg from "../assets/logo.svg";

import { Button } from "../components/Button";

import "../styles/auth.scss";

import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();

  //pega valor do input
  const [newRoom, setNewRoom] = useState("");

  //função cria nova sala
  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }

    //cria uma definição no banco de dados (uma categoria q essas salas vao ser guardadas)
    const roomdef = database.ref("rooms");

    //cria sala na "tabela" room
    const firebaseRoom = await roomdef.push({
      title: newRoom,
      authorId: user?.id,
    });

    //redirecionar usuario para sala criada
    history.push(`/salas/${firebaseRoom.key}`);
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
          <h1>{user?.name}</h1>
          <h2>Criar uma nova Sala</h2>

          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
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
