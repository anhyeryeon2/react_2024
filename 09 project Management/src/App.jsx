import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    //선택된 프로젝트가 있는지?? , 생성된 프로젝트 담은 배열
  });

  //프로젝트 만들기 함수
  function handleStartAddProject(){
    setProjectsState(prevState=>{
      return{
        ...prevState,
        selectedProjectId:null,
         // 이전 상태selectedProjectId를 null로 설정하여 새 프로젝트 추가 모드로 전환
      };
    });
  }

  function handleAddProject(projectData){
    setProjectsState(prevState => {
      const projectId =Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return{
        ...prevState,
        selectedProjectId: undefined,
        projects:[...prevState.projects,newProject  ]
      }
    })
  }
  console.log(projectsState);
  let content;


  if(projectsState.selectedProjectId ===null){
    content = <NewProject onAdd={handleAddProject} />
  }
  // 프로젝트를 하나도 생성하지 않았을떄, 초기화면으로 보여주기
 else if (projectsState.selectedProjectId === undefined){
    content =<NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onStartAddProject={handleStartAddProject} projects={projectsState.projects}/>
      {content}
    </main>
  );
}

export default App;
