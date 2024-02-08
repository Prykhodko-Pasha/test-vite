import React, { PropsWithChildren, useEffect } from "react";
import { login } from "../scripts/ApiRoutes";
import { GameAccount, getEmail, getPassword } from "../scripts";
import { parseAccountData } from "../scripts/DataParser";

type Props = {
  setAccount: React.Dispatch<GameAccount | undefined>;
};

const AccountContext = ({ setAccount, children }: PropsWithChildren<Props>) => {
  useEffect(() => {
    login(getEmail()!, getPassword()!).then((response) => {
      setAccount(parseAccountData(response.data));
    });
  }, []);
  return <div>{children}</div>;
};

export default AccountContext;
