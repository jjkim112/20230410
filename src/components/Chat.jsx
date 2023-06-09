import axios from "axios";
import { useState } from "react";

const Chat = () => {
  const [question, setQuestion] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitChat = async (e) => {
    try {
      e.preventDefault();
      //로딩중 트루 기본값은 펄스

      if (isLoading) {
        alert("검색중입니다...");

        return;
      }
      if (!question) {
        alert("질문을 입력해주세요.");

        return;
      }
      setIsLoading(true);
      setContent("");

      const response = await axios.post(
        "https://holy-fire-2749.fly.dev/chat",
        {
          question: question,
          // question,->변수랑 값이 같은경우 생략가능
          //question: `${question}`
          //다같은 소리임//
        },
        {
          headers: {
            Authorization: "Bearer BLOCKCHAINSCHOOL3",
          },
        }
      );
      //await이 있어서 저거 완료되기전까지는 아래 실행안된다.
      if (response.status !== 200) {
        alert("오류가 발생했습니다");
        setIsLoading(false);

        return;
      }

      console.log(response);
      setContent(response.data.choices[0].message.content);

      //다시 로딩중 펄스
      setIsLoading(false);
    } catch (error) {
      console.error(error);

      //여기에도 로딩중 펄스 넣기
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center text-white">
      <form onSubmit={onSubmitChat}>
        <input
          className="text-black"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <input type="submit" value="검 색" />
      </form>
      {content && <div className="mt-4 px-16">{content}</div>}
    </div>
  );
};

export default Chat;
