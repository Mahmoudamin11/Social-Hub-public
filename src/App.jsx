import Cookies from "js-cookie";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import LandingPageLayout from "./Pages/LandingPage/LandingPageLayout";
import ProtectedRoute from "./Pages/ProtectedRoute";
import PublicRoute from "./Pages/PublicRoute";
import SocialHubLayout from "./Pages/socialHub/SocialHubLayout";
import Loader from "./Utils/Loader";
import OTPField from "./Pages/Auth/OTPField";

// lazy loading for components
const LandingPage = lazy(() => import("./Pages/LandingPage/LandingPage"));
const Login = lazy(() => import("./Pages/Auth/Login"));
const SignUp = lazy(() => import("./Pages/Auth/SignUp"));
const MainPage = lazy(() => import("./Pages/socialHub/MainPage"));
const MyCommunities = lazy(() => import("./Pages/socialHub/MyCommunities"));
const MyMessages = lazy(() => import("./Pages/socialHub/MyMessages"));
const PeopleList = lazy(() => import("./Pages/socialHub/People/PeopleList"));
const Plans = lazy(() => import("./Pages/socialHub/Plans"));
const Reports = lazy(() => import("./Pages/socialHub/Reports"));
const Trending = lazy(() => import("./Pages/socialHub/Trending"));
const VideoPlayer = lazy(() => import("./Pages/socialHub/VideoPlayer"));



const BetaBotAi = lazy(() => import("./Pages/socialHub/BetaBotAi"));
const NotFound = lazy(() => import("./Pages/NotFound"));
import ProfileVideos from './Components/socialHub/Profile/ProfileVideos/ProfileVideos';
import Profile from './Pages/socialHub/Profile/Profile';
import Posts from './Components/socialHub/Profile/Posts/Posts';
import Saved from './Components/socialHub/Profile/Saved/Saved';
import Friends from './Components/socialHub/Profile/Friends/Friends';

const App = () => {
  const userID = Cookies.get("userID");
  const isAuthenticated = Boolean(userID); // if user has value (isAuth = true) else (isAuth = false)
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Routes>
          {/* Start of landing page routes (landingPage, login, signUp) */}
          <Route
            path="/"
            element={
              <PublicRoute isAuthenticated={isAuthenticated}>
                <LandingPageLayout />
              </PublicRoute>
            }
          >
            <Route
              index
              element={
                <Suspense
                  fallback={
                    <div className="w-full h-[calc(100vh-70px)] flex items-center justify-center">
                      <Loader />
                    </div>
                  }
                >
                  <LandingPage />
                </Suspense>
              }
            />
            <Route
              path="login"
              element={
                <Suspense
                  fallback={
                    <div className="w-full h-[calc(100vh-70px)] flex items-center justify-center">
                      <Loader />
                    </div>
                  }
                >
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="otpVerification"
              element={
                <Suspense
                  fallback={
                    <div className="w-full h-[calc(100vh-70px)] flex items-center justify-center">
                      <Loader />
                    </div>
                  }
                >
                  <OTPField />
                </Suspense>
              }
            />
            <Route
              path="signup"
              element={
                <Suspense
                  fallback={
                    <div className="w-full h-[calc(100vh-70px)] flex items-center justify-center">
                      <Loader />
                    </div>
                  }
                >
                  <SignUp />
                </Suspense>
              }
            />
          </Route>
          {/* End of landing page routes */}

          {/* Protected layout (main website) */}
          <Route
            path="/socialHub"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <SocialHubLayout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <Suspense
                  fallback={
                    <div className="w-full h-screen flex items-center justify-center">
                      <Loader />
                    </div>
                  }
                >
                  <MainPage />
                </Suspense>
              }
            />
            <Route
              path="trending"
              element={
                <Suspense
                  fallback={
                    <div className="w-full h-screen flex items-center justify-center">
                      <Loader />
                    </div>
                  }
                >
                  <Trending />
                </Suspense>
              }
            />
            <Route
              path="people"
              element={
                <Suspense
                  fallback={
                    <div className="w-full h-screen flex items-center justify-center">
                      <Loader />
                    </div>
                  }
                >
                  <PeopleList />
                </Suspense>
              }
            />
            <Route
              path="plans"
              element={
                <Suspense
                  fallback={
                    <div className="w-full h-screen flex items-center justify-center">
                      <Loader />
                    </div>
                  }
                >
                  <Plans />
                </Suspense>
              }
            />
            <Route
              path="myCommunities"
              element={
                <Suspense
                  fallback={
                    <div className="w-full h-screen flex items-center justify-center">
                      <Loader />
                    </div>
                  }
                >
                  <MyCommunities />
                </Suspense>
              }
            />
            <Route
              path="myMessages"
              element={
                <Suspense
                  fallback={
                    <div className="w-full h-screen flex items-center justify-center">
                      <Loader />
                    </div>
                  }
                >
                  <MyMessages />
                </Suspense>
              }
            />
            <Route
              path="betaBotAi"
              element={
                <Suspense
                  fallback={
                    <div className="w-full h-screen flex items-center justify-center">
                      <Loader />
                    </div>
                  }
                >
                  <BetaBotAi />
                </Suspense>
              }
            />
            <Route
              path="reports"
              element={
                <Suspense
                  fallback={
                    <div className="w-full h-screen flex items-center justify-center">
                      <Loader />
                    </div>
                  }
                >
                  <Reports />
                </Suspense>
              }
            />
            <Route
              path="video/:id"
              element={
                <Suspense
                  fallback={
                    <div className="w-full h-screen flex items-center justify-center">
                      <Loader />
                    </div>
                  }
                >
                  <VideoPlayer />
                </Suspense>
              }
            />

            <Route path="profile/:id" element={<Profile />}>
                  <Route
                    index
                    element={
                        <Posts />
                    }
                  />
                  <Route
                    path="videos"
                    element={
                        <ProfileVideos />
                    }
                  />
                  <Route
                    path="friends"
                    element={
                        <Friends />
                    }
                  />
                  <Route
                    path="saved"
                    element={
                        <Saved />
                    }
                  />
                </Route>
            </Route>

          <Route
            path="*"
            element={
              <Suspense
                fallback={
                  <div className="w-full h-screen flex items-center justify-center">
                    <Loader />
                  </div>
                }
              >
                <NotFound isAuth={isAuthenticated} />
              </Suspense>
            }
          />
        </Routes>
      </main>
      <Toaster />
    </div>
  );
};

export default App;
