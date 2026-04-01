import { useRouteError } from "react-router-dom";

import PageContent from "../components/PageContent";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ErrorPage() {
  const error: any = useRouteError();

  console.log("error", error);

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <div className=" flex flex-col justify-between min-h-[100vh]">
        <Header />
        <PageContent title={title}>
          <p>{message}</p>
        </PageContent>
        <Footer />
      </div>
    </>
  );
}

export default ErrorPage;
