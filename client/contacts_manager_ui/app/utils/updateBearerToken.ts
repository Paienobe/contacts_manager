import { authInstance, contactsInstance } from "../axios/instances";

export const updateBearerToken = (token: string) => {
  const instances = [contactsInstance, authInstance];
  instances.forEach((instance) => {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  });
};
