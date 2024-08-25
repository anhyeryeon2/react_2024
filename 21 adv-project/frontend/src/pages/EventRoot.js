import { Outlet } from "react-router-dom";

import EventsNaviagation from "../components/EventsNavigation";
function EventRootLayout() {
  return (
    <>
      <EventsNaviagation/>
      <Outlet />
    </>
  );
}
export default EventRootLayout;