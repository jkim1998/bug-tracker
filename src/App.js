import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import {
  Main,
  Projects,
  Calendar,
  Members,
  Pie,
  Login,
  Signup,
  Tickets,
} from "./pages";
import "./App.css";
import { AuthContextProvider, useAuth } from "./contexts/AuthContext";
import { useStateContext } from "./contexts/ContextProvider";
import PrivateRoute from "./contexts/PrivateRoute";

const App = () => {
  // const [activeMenu, setActivemenu] = useState(false);

  // const toggleSidebar = () => {
  //   setActivemenu(!activeMenu);
  // };

  const [hidebars, setHidebars] = useState(false);

  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const toggleHideBars = () => {
    setHidebars(!hidebars);
  };

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  return (
    // <div className={currentMode === 'Dark' ? 'dark' : ''}>
    <BrowserRouter>
      <AuthContextProvider>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                // onClick={() => setThemeSettings(true)}
                // style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {/* {themeSettings && (<ThemeSettings />)} */}

              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* dashboard  */}
                <Route
                  path="/"
                  element={
                    // <PrivateRoute>
                    <Main />
                    // </PrivateRoute>
                  }
                />
                <Route path="/main" element={<Main />} />
                {/* pages  */}
                <Route
                  path="/projects"
                  element={
                    // <PrivateRoute>
                    <Projects />
                    // </PrivateRoute>
                  }
                />
                <Route
                  path="/members"
                  element={
                    // <PrivateRoute>
                    <Members />
                    // </PrivateRoute>
                  }
                />
                <Route
                  path="/tickets"
                  element={
                    // <PrivateRoute>
                    <Tickets />
                    // </PrivateRoute>
                  }
                />

                {/* apps  */}

                <Route
                  path="/calendar"
                  element={
                    // <PrivateRoute>
                    <Calendar />
                    // </PrivateRoute>
                  }
                />
                <Route
                  path="/pie"
                  element={
                    // <PrivateRoute>
                    <Pie />
                    // </PrivateRoute>
                  }
                />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </AuthContextProvider>
    </BrowserRouter>
    // </div>
  );
};

const LoginContainer = () => <div></div>;

export default App;
