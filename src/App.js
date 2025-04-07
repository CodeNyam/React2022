import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function Update(props) {
  const [title, setTitle] = useState(props.title || "");
  const [desc, setDesc] = useState(props.desc || "");
  return (
    <article>
      <h2>Update</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const desc = event.target.desc.value;
          props.onUpdate(title, desc);
        }}
      >
        <p>
          <input
            name="title"
            type="text"
            placeholder="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </p>
        <p>
          <textarea
            name="desc"
            placeholder="desc"
            value={desc}
            onChange={(event) => setDesc(event.target.value)}
          />
        </p>
        <p>
          <input type="submit" value="Update" />
        </p>
      </form>
    </article>
  );
}

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
          <input name="title" type="text" placeholder="title" />
        </p>
        <p>
          <textarea name="desc" placeholder="desc" />
        </p>
        <p>
          <input type="submit" value="Create" />
        </p>
      </form>
    </article>
  );
}

function Header(props) {
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
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
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a
          id={t.id}
          href={"/read/" + t.id}
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode(Number(event.target.id));
          }}
        >
          {t.title}
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
  const [topics, setTopics] = useState([
    { id: 1, title: "HTML", desc: "HTML is ..." },
    { id: 2, title: "CSS", desc: "CSS is ..." },
    { id: 3, title: "JavaScript", desc: "JavaScript is ..." },
  ]);
  const [mode, setMode] = useState("Welcome");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);

  let content = null;
  let contextControl = null;

  if (mode === "Welcome") {
    content = <Article title="Welcome" desc="React"></Article>;
  } else if (mode === "Update") {
    let title,
      desc = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        desc = topics[i].desc;
      }
    }
    content = (
      <Update
        title={title}
        desc={desc}
        onUpdate={(newTitle, newDesc) => {
          const updatedTopics = topics.map((topic) =>
            topic.id === id
              ? { ...topic, title: newTitle, desc: newDesc }
              : topic
          );
          setTopics(updatedTopics);
          setMode("Read");
        }}
      />
    );
  } else if (mode === "Create") {
    content = (
      <Create
        onCreate={(newTitle, newDesc) => {
          const newTopic = { id: nextId, title: newTitle, desc: newDesc };
          const newTopics = [...topics, newTopic];
          setTopics(newTopics);
          setMode("Read");
          setId(nextId);
          setNextId(nextId + 1);
        }}
      />
    );
  } else if (mode === "Read") {
    let title,
      desc = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        desc = topics[i].desc;
      }
    }

    content = <Article title={title} desc={desc} />;

    contextControl = (
      <>
        <li>
          <a
            href={`/update/${id}`}
            onClick={(event) => {
              event.preventDefault();
              setMode("Update");
            }}
          >
            Update
          </a>
        </li>
        <li>
          <input
            type="button"
            value="Delete"
            onClick={(event) => {
              const newTopics = topics.filter((topic) => topic.id !== id);
              setTopics(newTopics);
              setMode("Welcome");
              setId(null);
            }}
          />
        </li>
      </>
    );
  }

  return (
    <div>
      <Header
        title="daiseek"
        onChangeMode={() => {
          setMode("Welcome");
        }}
      />
      <Nav
        topics={topics}
        onChangeMode={(id) => {
          setMode("Read");
          setId(id);
        }}
      />
      {content}
      <ul>
        <li>
          <a
            href="/create"
            onClick={(event) => {
              event.preventDefault();
              setMode("Create");
            }}
          >
            Create
          </a>
        </li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
