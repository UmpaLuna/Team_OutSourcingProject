import { useState } from "react";
import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button>회원가입</button>
      <button>로그인</button>
      <button>로그아웃</button>
    </>
  );
}

export default App;
