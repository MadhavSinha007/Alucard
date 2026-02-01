import { useState } from "react";

const fakeUser = {
  id: "1",
  name: "Madhav",
  email: "madhav@example.com",
  role: "alumni", // change to "admin" to test
};

export const useFakeAuth = () => {
  const [user, setUser] = useState(fakeUser);

  const login = () => setUser(fakeUser);
  const logout = () => setUser(null);

  return { user, login, logout };
};