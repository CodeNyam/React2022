import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const desc = event.target.desc.value;
          props.onCreate(title, desc);
        }}
      >
        <p>
          <input name="title" type="text" placeholder="title"></input>
        </p>
        <p>
          <textarea name="desc" placeholder="desc"></textarea>
        </p>
        <p>
          <input type="submit" value="Create"></input>
        </p>
      </form>
    </article>
  );
}

function Header(props) {
  // props: 부모 컴포넌트에서 자식 컴포넌트로 전달되는 데이터
  // props : Object {title: "daiseek"}
  // props.title :
  console.log("props : ", props, "props.title : ", props.title);
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={function (event) {
            // 이벤트 새로고침을 막는 핸들러
            event.preventDefault();

            // App 함수에게 받은 props.onChangeMode 함수가 호출
            props.onChangeMode();
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
}

function Nav(props) {
  // App.js:30
  // Each child in a list should have a unique "key" prop.
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a
          id={t.id}
          href={"/read/" + t.id}
          onClick={(event) => {
            // 이벤트 새로고침을 막는 핸들러
            event.preventDefault();

            // App 함수에게 받은 props.onChangeMode 함수가 호출
            props.onChangeMode(Number(event.target.id));
          }}
        >
          {t.title}
          {/* 여기서 t.id는 태그의 속성에 따라 문자열로 전달된다. 
          따라서 형변환을 해주어야 한다. */}
        </a>
      </li>
    );
  }
  return (
    <nav>
      <ul>{lis}</ul>
    </nav>
  );
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      <p>{props.desc}</p>
    </article>
  );
}

function App() {
  // URL로 매핑해주기 위한 데이터
  // array에 json 형식으로 저장?
  const [topics, setTopics] = useState([
    { id: 1, title: "HTML", desc: "HTML is ..." },
    { id: 2, title: "CSS", desc: "CSS is ..." },
    { id: 3, title: "JavaScript", desc: "JavaScript is ..." },
  ]);

  // const _mode = useState("hello");
  // const mode = _mode[0];
  // const setMode = _mode[1];

  const [mode, setMode] = useState("Welcome");

  let content = null;

  const [id, setId] = useState(null);

  const [nextId, setNextId] = useState(4);

  if (mode === "Welcome") {
    content = <Article title="Hello" desc="React"></Article>;
  } else if (mode === "Create") {
    content = (
      <Create
        onCreate={(_title, _desc) => {
          const newTopic = { id: nextId, title: _title, desc: _desc };
          const newTopics = [...topics, newTopic]; // topics를 복사
          setTopics(newTopics);
          setMode("Read");
          setId(nextId);
          setNextId(nextId + 1);
        }}
      ></Create>
    );
  } else if (mode === "Read") {
    let title,
      desc = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        console.log("topics[i].id : ", topics[i].id);
        title = topics[i].title;
        desc = topics[i].desc;
      }
    }

    content = <Article title="Read" desc={desc}></Article>;
  }

  return (
    <div>
      {/* 사용자 정의 태그 */}
      {/* 함수형 컴포넌트 사용 */}
      <Header
        title="daiseek"
        onChangeMode={() => {
          setMode("Welcome");
        }}
      ></Header>
      <Nav
        topics={topics}
        onChangeMode={(id) => {
          setMode("Read");
          setId(id);
        }}
      ></Nav>
      {content}
      <a
        href="/create"
        onClick={(event) => {
          event.preventDefault();
          setMode("Create");
        }}
      >
        Create
      </a>
    </div>
  );
}

export default App;

// const [value, setValue] = useState(PRIMITIVE);
// 기존처럼 사용

// const [value, setValue] = useState(Object);
// object, array인 경우 다른 방식으로 사용, 기존 객체를 복사해서 사용
// -> 더 찾아보기
