import logo from './logo.svg';
import './App.css';

function Header(props){
  return <header>
  <h1>
    {props.title}
  </h1>
  </header>
}
function Content(props){
  const lis=[];
  for(let i=0; i<props.topics.length; i++){
    let t=props.topics[i];
    lis.push(<li key={t.id}><a href={t.rink} target={t.target}>{t.title}</a></li>);
  }
  return <nav>
  <h2>
    <ol>
      {lis}
    </ol>
  </h2>
  </nav>
}
function Footer(){
  return <footer>
  링크를 클릭하면 사이트가 새 창으로 열립니다.
  </footer>
}

function App() {
  const topics=[
    {id:1, title:"네이버 바로가기", rink:"https://www.naver.com", target:"_blank"},
    {id:2, title:"구글 바로가기", rink:"https://www.google.com", target:"_blank"},
    {id:3, title:"다음 바로가기", rink:"https://www.daum.net", target:"_blank"}
  ];
  return (
    <div>
      <Header title="WEBSITE REDIRECT"></Header>
      <Content topics={topics}></Content>
      <Footer></Footer>
    </div>
  );
}

export default App;
