import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function Header(props){
  return <header>
  <h1>
    <a href="/" onClick={(event)=>{ //화살표함수 매개변수 event
      event.preventDefault(); //기본 이벤트를 발생시키지 않음.
      props.onChangeMode(); //APP() >> Header >> onChangeMode() 실행
    }}>{props.title}</a> 
  </h1>
  </header>
}
function Content(props){
  const lis=[]; //리스트를 넣을 배열 생성
  for(let i=0; i<props.topics.length; i++){ //APP() >> topics[] 요소만큼 반복
    let t=props.topics[i]; //변수 t에 저장
    lis.push(<li key={t.id}>
      <a id={t.id} href={t.body} target={t.target} onClick={(event)=>{ //↑생성한 배열에 topics[] 요소를 push
        event.preventDefault();
        props.onChangeMode(Number(event.target.id)); 
        //↑ APP() >> Content >> onChangeMode의 매개변수에게 전달
        //↑ 이 값은 암묵적 변환으로 인해 문자열이 되므로 Number로 명시적 타입 변경
    }}>{t.title}</a></li>);
  }
  return <nav>
  <h2>
    <ol>
      {lis}
    </ol>
  </h2>
  </nav>
}
function Footer(props){ //함수로 직접 생성한 태그
  return <footer>
    <h2><p>{props.title}</p></h2>
    <h3><p>{props.body}</p></h3>
  </footer>
}
function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={(event)=>{
      event.preventDefault();
      const title=event.target.title.value; //이 폼의 title 값을 title에 저장
      const body=event.target.body.value; //이 폼의 body 값을 body에 저장
      props.onCreate(title, body); //Create >> onCreate 매개변수에 전달
    }}>
      <p><input type="text" name="title" placeholder="title"/></p>
      <p><textarea name="body" placeholder="body"></textarea></p>
      <p><input type="submit" value="create"></input></p>
    </form>
  </article>
}
function Update(props){
  const [title, setTitle]=useState(props.title); //고정된 값을 변경할 수 있도록  useState 형식 변환
  const [body, setBody]=useState(props.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={(event)=>{
      event.preventDefault();
      const title=event.target.title.value;
      const body=event.target.body.value;
      props.onUpdate(title, body); 
    }}>
      <p><input type="text" name="title" placeholder="title" value={title} onChange={(event)=>{
        setTitle(event.target.value); //입력시마다 상태 변경함으로 갱신
      }}/></p>
      <p><textarea name="body" placeholder="body" value={body} onChange={(event)=>{
        setBody(event.target.value); //이벤트가 발생한 자신의 값
      }}></textarea></p>
      <p><input type="submit" value="update"/></p>
    </form>
  </article>
}

function App() { 
  // const _mode=useState("WELCOME"); useSate는 배열을 반환한다.
  // const mode=_mode[0]; _mode배열의 인덱스0은 상태를 나타낸다.
  // const setMode=_mode[1]; _mode배열의 인덱스1은 상태를 변경하는 함수를 나타낸다.
  const [mode, setMode]=useState("WELCOME"); //↑ 같은 문법
  const [id, setId]=useState(null);
  const [nextId, setNextId]=useState(4);
  const [topics, setTopics]=useState([
    {id:1, title:"네이버 바로가기", body:"https://www.naver.com", target:"_blank"},
    {id:2, title:"구글 바로가기", body:"https://www.google.com", target:"_blank"},
    {id:3, title:"다음 바로가기", body:"https://www.daum.net", target:"_blank"}
  ]);
  let content=null;
  let contextControl=null;

  if(mode==="WELCOME"){ //만약 mode 값이 WELCOME이라면 WELCOME 타이틀을 가진 Footer 생성
    content=<Footer title="WELCOME" body="링크를 클릭하면 사이트가 새 창으로 열립니다."></Footer>
  } else if(mode==="READ"){
    let title, body; 
    for(let i=0; i<topics.length; i++){ //리스트 개수만큼 반복
      if(topics[i].id===id){ //클릭한 리스트의 id와 동일한 id 찾기
        title=topics[i].title; //title 변수에 분별된 요소의 title값 저장
        body=topics[i].body; //rink 변수에 분별된 요소의 rink값 저장
      }
    }
    content=<Footer title={title} body={body}></Footer> 
    //↑ Footer >> title과 body에 title과 rink값 저장 및 표출
    //↓ 리액트에서의 <>은 그룹핑으로 생각하면 편하다. html에선 아무 태그로 입력되지 않는다.
    contextControl=<>
      <li><a href={"/update/"+id} onClick={(event)=>{
        event.preventDefault();
        setMode("UPDATE");
      }}>Update</a></li>
      <li><input type="button" value="Delete" onClick={()=>{
        const newTopics=[]; //빈배열 생성
        for(let i=0; i<topics.length; i++){ //topics배열 요소 수만큼 반복
          if(topics[i].id !== id){ //선택한 요소의 id가 일치하지 않는 것을 찾는다.
            newTopics.push(topics[i]); //일치하지 않는 요소들을 빈 배열에 밀어 넣는다.
          }
        }
        setTopics(newTopics); //topics배열의 상태를 갱신한다.
        setMode("WELCOME"); //모드를 welcome으로 바꿔 메인으로 이동한다.
      }}/></li>
    </>
  } else if(mode==="CREATE"){
    content=<Create onCreate={(title, body)=>{
      const newTopic={id:nextId, title:title, body:body}; 
      //↑ newTopic에 전달받은 title, body, nextId상태 값을 요소로 저장
      const newTopics=[...topics]; //newTopics에 스프레드문법을 이용해 새로운 topics배열 저장
      newTopics.push(newTopic); //newTopics에 newTopic 요소를 push
      setTopics(newTopics); //topics의 상태를 변경(갱신)
      setMode("READ"); //mode를 READ로 변경(갱신)함으로 새로운 리스트 생성과 동시에 본문 표출
      setId(nextId); //id의 상태를 변경(nextId의 값)
      setNextId(nextId+1); //nextId 값에 1을 더함으로 상태 변경
    }}></Create>
  } else if(mode==="UPDATE"){
    let title, body; 
    for(let i=0; i<topics.length; i++){ //리스트 개수만큼 반복
      if(topics[i].id===id){ //클릭한 리스트의 id와 동일한 id 찾기
        title=topics[i].title; //title 변수에 분별된 요소의 title값 저장
        body=topics[i].body; //rink 변수에 분별된 요소의 rink값 저장
      }
    }
    content=<Update title={title} body={body} onUpdate={(title, body)=>{
      const newTopics=[...topics]; //newTopics에 스프레드문법을 이용해 새로운 topics배열 저장
      const updatedTopic={id:id, title:title, body:body};
      for(let i=0; i<newTopics.length; i++){ //새로운 배열의 요소 수만큼 반복
        if(topics[i].id===id){ //동일한 id를 찾는다.
          newTopics[i]=updatedTopic; //동일한 id의 요소를 저장한다.
          break; //변경했으면 더이상 반복문을 실행할 필요가 없다.
        }
      }
      setTopics(newTopics); //topics의 상태를 변경(갱신)
      setMode("READ"); //mode를 READ로 변경(갱신)함으로 새로운 리스트 생성과 동시에 본문 표출
    }}></Update>
  }

  return (
    <div>
      <Header title="WEBSITE REDIRECT" onChangeMode={()=>{
        setMode("WELCOME");
      }}></Header>
      <Content topics={topics} onChangeMode={(_id)=>{ //매개변수를 받아 alert에 저장
        setMode("READ");
        setId(_id);
      }}></Content>
      {content}
      <ul>
        <li>
          <a href="/create/" onClick={(event)=>{
            event.preventDefault();
            setMode("CREATE");
          }}>Create</a>
        </li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App; //index.js에게 전달
