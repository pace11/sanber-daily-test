import { createContext } from "react";
import { useQueriesMutation } from "@/hooks/useQueriesMutation";

export const ProfileContext = createContext({});

export function ProfileContextProvider({ children, ...props }) {
  const { data } = useQueriesMutation({ prefixUrl: "/user/me" });

  return (
    <ProfileContext.Provider value={data?.data} {...props}>
      {children}
    </ProfileContext.Provider>
  );
}
