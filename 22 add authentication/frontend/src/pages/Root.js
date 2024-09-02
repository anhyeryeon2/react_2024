import { useEffect } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";

import MainNavigation from '../components/MainNavigation';
import { getTokenDuration } from "../util/auth";
function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

     // 토큰이 만료가 되면 자동 로그아웃 되게
     if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration); // 시간체크

    // 토큰이 있다면(딜레이에 남은 유효기간을 첨부해줘야함)
    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" }); // 로그아웃 트리거
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
