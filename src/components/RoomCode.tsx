import copyImg from "../assets/copy.svg";
import "../styles/room-code.scss";

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div className="logo-room">
        <img src={copyImg} alt="copy room code" />
      </div>
      <span> Sala #{props.code}</span>
    </button>
  );
}
