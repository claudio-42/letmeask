import { useParams } from "react-router";

import logoImg from "../assets/images/logo.svg";
import logoImgDark from "../assets/images/logo-dark.svg";
import deleteImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";
import noQuestionImg from "../assets/images/noquestion.png";

import { Button } from "../components/Button/Button";
import { Question } from "../components/Question/Question";
import { RoomCode } from "../components/RoomCode/Roomcode";

import { useRoom } from "../hooks/useRoom";

import "../styles/room.scss";
import { database } from "../services/firebase";
import { useHistory } from "react-router-dom";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  //const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();

  const roomId = params.id;

  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que você deseja excluir essa pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img
            className="logo"
            src={
              window.matchMedia("(prefers-color-scheme: dark)").matches
                ? logoImgDark
                : logoImg
            }
            alt="Letmeask"
            onClick={() => history.push("/")}
          />
          <div>
            <RoomCode code={params.id} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar Sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} Pergunta(s)</span>}
        </div>
        {questions.length < 1 ? (
          <img src={noQuestionImg} alt="Não há perguntas por aqui" />
        ) : (
          <div className="question-list">
            {questions.map((question) => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  {!question.isAnswered && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          handleCheckQuestionAsAnswered(question.id)
                        }
                      >
                        <img
                          src={checkImg}
                          alt="Marcar pergunta como respondida"
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleHighlightQuestion(question.id)}
                      >
                        <img src={answerImg} alt="Dar destaque à pergunta" />
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <img src={deleteImg} alt="Remover pergunta" />
                  </button>
                </Question>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
