import path from "node:path";

const usersDb : User[] = require(path.join(__dirname, "..", "..", "jsonDb", "users.json"));

export const selectAllUsers = () => {
  return usersDb;
}

export const selectUserById = (id : number) : any => {
  return selecByKey(usersDb, "id", id)[0]
}

const selecByKey = (jsonDb : object[], key :string, value : any) => {
  const keys = getJsonKeys(jsonDb[0])
  const isInDb : string | undefined = keys.find(string => string === key)
  if (isInDb) {
    return jsonDb.filter((obj : any) => obj[key] === value)
  } else {
    return []
  }
}

const getJsonKeys = (obj : Object) : string[] => {
  return Object.keys(obj);
}