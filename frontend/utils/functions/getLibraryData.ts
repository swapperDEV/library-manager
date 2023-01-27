import React, { useContext } from "react";
import { UserContext } from "../../store/user-context";
import { apiIP } from "../data/config";

export const getLibraryData = async (library: string | undefined) => {
  const token = localStorage.getItem("token");
  const expiryDate = localStorage.getItem("expiryDate");
  if (!token || !expiryDate) {
    return false;
  }
  if (new Date(expiryDate) <= new Date()) {
    return false;
  }
  if (library !== undefined) {
    const res = await fetch(`http://127.0.0.1:8080/library`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: library,
      }),
    });
    return res.json();
  } else {
    return {};
  }
};
