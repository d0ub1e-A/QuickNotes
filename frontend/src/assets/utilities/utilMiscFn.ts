import type { RefObject, Dispatch, SetStateAction } from "react";

type Greetings = "Morning" | "Evening" | "Afternoon" | "Night";

export function getMessage(): Greetings {
  const now = new Date();

  if (now.getHours() >= 5 && now.getHours() < 12) return "Morning";
  if (now.getHours() >= 12 && now.getHours() < 18) return "Afternoon";
  if (now.getHours() >= 18 && now.getHours() < 22) return "Evening";
  else return "Night";
}

export function clearName(name: string): string {
  return name
    .trim()
    .replace(/[^a-zA-Z0-9\']/g, " ")
    .replace(/\s+/g, " ");
}

export function checkIfWrong(
  isValid: boolean,
  inputRef: RefObject<HTMLInputElement | null>,
  setWrongInputs: Dispatch<
    SetStateAction<RefObject<HTMLInputElement | null>[]>
  >,
  wrongInputs: RefObject<HTMLInputElement | null>[]
) {
  isValid
    ? setWrongInputs((prevInputs) =>
        prevInputs.filter((input) => input !== inputRef)
      )
    : setWrongInputs((prevInputs) =>
        wrongInputs.includes(inputRef)
          ? [...prevInputs]
          : [...prevInputs, inputRef]
      );
}
