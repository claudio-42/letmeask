import copyImg from "../../assets/images/copy.svg";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../RoomCode/room-code.scss";

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  function copyAndToast() {
    copyRoomCodeToClipboard();
    notify();
  }

  const notify = () => toast("Código da sala copiado!");

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button className="room-code" onClick={copyAndToast}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>
        {" "}
        <strong>Sala</strong> #{props.code}
      </span>
    </button>
  );
}
