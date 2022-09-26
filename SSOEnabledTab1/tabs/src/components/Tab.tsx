import { useContext, useEffect, useState } from "react";
import { Welcome } from "./sample/Welcome";
import { TeamsFxContext } from "./Context";

const showFunction = Boolean(process.env.REACT_APP_FUNC_NAME);

export default function Tab() {
  const { themeString, teamsfx } = useContext(TeamsFxContext);
  const [error, setError] = useState<string>();
  const [token, setToken] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    const getToken = async () => {
      if (!teamsfx) {
        return;
      }

      teamsfx.getCredential().getToken("").then((data) => {
        console.log("getToken successful", data)
        setLoading(false);
        setError(undefined);
        setToken(data?.token)
      })
        .catch((error) => {
          console.log("getToken failed", error)
          setError(error);
          setLoading(false);
        });
    }

    getToken()
      .catch((error) => setError(error));;
  }, [teamsfx]);

  const controlToRender = () => {
    if (loading) {
      return <>loading...</>;
    }
    else if (error) {
      return <div className="error">
        An unexpected error occurred. Please try again later. <br /> Details: {error.toString()}
      </div>;
    }

    return <>
      Token: {token}
    </>

  }

  return (
    <div className={themeString === "default" ? "" : "dark"}>
      {controlToRender()}
    </div>
  );
}
