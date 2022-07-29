import jwtDecode from "jwt-decode";
import { StringMappingType } from "typescript";
import { server } from "../config/index";
export const createOrGetUser = async (response: any, addUser: any) => {
  //   console.log(response.credential);
  const decode: { name: string; picture: string; sub: string } = jwtDecode(
    response.credential
  );
  const { name, picture, sub } = decode;
  // console.log(decode);
  const user = {
    _id: sub,
    _type: "user",
    userName: name,
    image: picture,
  };
  addUser(user);
  const rawResponse = await fetch(`${server}/api/auth`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const content = await rawResponse.json();
  // console.log(content);
};
