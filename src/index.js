import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Note. Strict Mode
// App.js에서 작성한 콘솔을 봤다.
// props가 바뀔때마다 2번씩 출력되는 현상을 발견했다.
// 이유를 알아보니 Strict Mode가 개발 모드에서 동작하기 때문이었다.
// Strict Mode는 개발 모드에서만 작동하는데, 오류를 잡기 위해 동작한다.
// 실제 배포 서버에서는 Strict Mode가 비활성화되고, 재렌더링이 되지 않는다.
