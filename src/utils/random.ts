import { v4 as uuidv4 } from "uuid";

export function generateRandomId() {
  const randomId = uuidv4();
  return randomId;
}
