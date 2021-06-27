import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { useClient } from 'urql';
import { createContext } from '~/utils/createContext';
import { getOwnUserDocument } from '~/constants/graphql';

export enum AuthenticationStatus {
  UNKNOWN,
  AUTHENTICATED,
  UNAUTHENTICATED,
}

export interface UserInfo {
  status: AuthenticationStatus;
  name: string;
  id: string;
  githubId: number;
}

export interface UserContextValue extends UserInfo {
  recheck: () => void;
}

const [useHook, Provider] = createContext<UserContextValue>('ApiContext');

export const useUser = useHook;

export const UserProvider: FC = ({ children }) => {
  const client = useClient();

  const [userInfo, setUserInfo] = useState<UserInfo>({
    status: AuthenticationStatus.UNKNOWN,
    name: '',
    id: '',
    githubId: 0,
  });

  const recheck = useCallback(async () => {
    const result = await client.query(getOwnUserDocument).toPromise();

    const user = result.data?.getOwnUser;
    if (user) {
      setUserInfo({
        status: AuthenticationStatus.AUTHENTICATED,
        name: user.name,
        id: user.id,
        githubId: user.githubId,
      });
    } else {
      setUserInfo({
        status: AuthenticationStatus.UNAUTHENTICATED,
        name: '',
        id: '',
        githubId: 0,
      });
    }
  }, [client, setUserInfo]);

  useEffect(() => {
    recheck();
  }, [recheck]);

  const value = useMemo(
    () => ({
      ...userInfo,
      recheck,
    }),
    [userInfo, recheck],
  );

  return <Provider value={value}>{children}</Provider>;
};
