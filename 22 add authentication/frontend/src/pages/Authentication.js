import AuthForm from "../components/AuthForm";
import { json, redirect } from "react-router-dom";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode" }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(authData),
  });
  if(response.status ===422 || response.status ===401){
    return response; 
  }
  if(!response.ok){
    throw json({message:'could not authenticate user'},{status:500});
  }

  const resData = await response.json();
  const token = resData.token;
  localStorage.setItem('token', token);

  // 토큰을 받아옴과 동시에 현재 시간으로부터 1시간을 더한 시간을 저장한다 + 로컬스토리지에도
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  
  return redirect('/');
}
