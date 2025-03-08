import { useState } from "react";
import { CurrentPage } from "../enums/enums";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import ProtectedLoginRoute from "../ui/ProtectedLoginRoute";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState<string>(CurrentPage.LOGIN);

  return (
    <div className="flex items-center h-screen w-screen ">
      <div className="bg-[url(/blackBG.jpg)] bg-cover bg-center bg-no-repeat w-1/2 h-full flex items-center justify-center ">
        <h2 className="text-white text-3xl font-medium">
          Create your own Post
        </h2>
      </div>
      <div className="flex p-8 items-center grow overflow-hidden">
        {currentPage === CurrentPage.LOGIN ? (
          <ProtectedLoginRoute>
            <LoginPage setCurrentPage={setCurrentPage} />
          </ProtectedLoginRoute>
        ) : (
          <SignUpPage setCurrentPage={setCurrentPage} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
