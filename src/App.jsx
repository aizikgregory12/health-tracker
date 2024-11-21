import React from "react";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Dashboard from "./Dashboard";

Amplify.configure(awsExports);
const App = () => {
  return (
    <Authenticator className="flex w-screen h-screen items-center justify-center">
      {({ signOut, user }) => (
        <div className="App">
          <Dashboard user={user} signOut={signOut} />
        </div>
      )}
    </Authenticator>
  );
};

export default App;
