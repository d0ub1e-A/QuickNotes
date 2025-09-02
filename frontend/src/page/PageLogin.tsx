import {
  type FormEvent,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  isValidMail,
  isValidPassword,
  isValidName,
} from "../assets/utilities/utilCheckInfo";
import { api } from "../assets/utilities/utilApi";
import { CircleUserRound, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useAppDispatch } from "../hooks";
import type { AxiosError } from "axios";
import { showToaster, hideToaster } from "../features/sliceToaster";
import { handleError } from "../features/sliceErrorHandle";
import { getMessage, clearName, checkIfWrong } from "../assets/utilities/utilMiscFn";

// type Greetings = "Morning" | "Evening" | "Afternoon" | "Night";

type UserInput = {
  name?: string;
  email: string;
  password: string;
};

export default function LoginPage() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const mailRef = useRef<HTMLInputElement | null>(null);
  const passRef = useRef<HTMLInputElement | null>(null);
  const navTo = useNavigate();
  const dispatch = useAppDispatch();

  const [inLogInPage, setInLoginPage] = useState<boolean>(true);
  const [wrongInputs, setWrongInputs] = useState<
    RefObject<HTMLInputElement | null>[]
  >([]);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  document.title = inLogInPage ? `Login` : `Sign Up`;

  // Get the greeting message
  // function getMessage(): Greetings {
  //   const now = new Date();

  //   if (now.getHours() >= 5 && now.getHours() < 12) return "Morning";
  //   if (now.getHours() >= 12 && now.getHours() < 18) return "Afternoon";
  //   if (now.getHours() >= 18 && now.getHours() < 22) return "Evening";
  //   else return "Night";
  // }

  // Clear the unwanted input from user name
  // const clearName = (name: string): string =>
  //   name
  //     .trim()
  //     .replace(/[^a-zA-Z0-9\']/g, " ")
  //     .replace(/\s+/g, " ");

  // Shows the incorrect input warning
  // const checkIfWrong = (
  //   isValid: boolean,
  //   inputRef: RefObject<HTMLInputElement | null>
  // ) =>
  //   isValid
  //     ? setWrongInputs((prevInputs) =>
  //         prevInputs.filter((input) => input !== inputRef)
  //       )
  //     : setWrongInputs((prevInputs) =>
  //         wrongInputs.includes(inputRef)
  //           ? [...prevInputs]
  //           : [...prevInputs, inputRef]
  //       );

  // function to send login data
  async function sendLoginInfo(
    email: string,
    password: string,
    e: FormEvent<HTMLFormElement>
  ) {
    const message = {
      200: "Successfully logged in.",
      400: "Bad request. Please try again!",
      401: "Check your login info and try again.",
      500: "Internal server error. Please try again!",
      0: "Unexpected error occurred.",
    } as const;

    try {
      const loginRes = await api.post(`/auth/login`, {
        email: email,
        password: password,
      });

      if (loginRes.status === 200) {
        navTo("/me/notes");
        dispatch(
          showToaster({
            type: "success",
            text: message[loginRes.status],
          })
        );
        setTimeout(() => {
          dispatch(hideToaster());
        }, 3000);
        e.currentTarget?.reset();
      }
    } catch (error) {
      console.error(error);

      const statusCode = (error as AxiosError)?.status || 0;

      handleError({ status: statusCode, messages: message }, dispatch);
    }
  }

  // function to send signup data
  async function sendSignupInfo(
    name: string,
    email: string,
    password: string,
    e: FormEvent<HTMLFormElement>
  ) {
    const message = {
      201: "Account has been created successfully",
      400: "Bad request. Please try again!",
      401: "Your email is unavailable. Use another email.",
      500: "Internal server error. Please try again!",
      0: "Unexpected error occurred.",
    };

    try {
      const signupRes = await api.post(`/auth/signup`, {
        name: name,
        email: email,
        password: password,
      });

      if (signupRes.status === 201) {
        navTo("/me/notes");

        dispatch(
          showToaster({
            type: "success",
            text: message[signupRes.status],
          })
        );
        setTimeout(() => dispatch(hideToaster()), 3000);

        e.currentTarget?.reset();
      }
    } catch (error) {
      console.error(error);

      console.error(error);

      const statusCode = (error as AxiosError)?.status || 0;

      handleError({ status: statusCode, messages: message }, dispatch);
    }
  }

  // Store user input
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userInput = Object.fromEntries(formData) as unknown as UserInput;

    const name = clearName(userInput.name || "");
    const email = userInput.email;
    const password = userInput.password;

    const mailValid = inLogInPage ? true : isValidMail(email);
    const passValid = inLogInPage ? true : isValidPassword(password);
    const nameValid = isValidName(name);

    checkIfWrong(mailValid, mailRef, setWrongInputs, wrongInputs);
    checkIfWrong(passValid, passRef, setWrongInputs, wrongInputs);
    if (!inLogInPage) checkIfWrong(nameValid, nameRef, setWrongInputs, wrongInputs);

    if (inLogInPage) sendLoginInfo(email, password, e);
    else {
      if (mailValid && passValid && nameValid) {
        sendSignupInfo(name, email, password, e);
      }
    }
  }

  // Refreshes the whole page every time page appears
  useEffect(() => {
    inLogInPage ? mailRef.current?.focus() : nameRef.current?.focus();
    setWrongInputs([]);
    formRef.current?.reset();
  }, [inLogInPage]);

  return (
    <div
      className={`flex flex-col items-center justify-center h-full w-full bg-indigo-50 dark:bg-slate-700`}
    >
      {/* The whole section of login content */}
      <div
        className={`flex flex-col-reverse gap-6 md:gap-0 shadow-2xl bg-indigo-600 rounded-xl transition-all ${
          inLogInPage ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        {/* Login + Signup form */}
        <div
          className={`w-full py-8 px-5 flex flex-col gap-5 text-[1rem] md:text-[1.1rem] bg-slate-50 rounded-lg ${
            inLogInPage
              ? "rounded-tr-[10rem] rounded-br-none animate-slide-from-left"
              : "rounded-tl-[10rem] rounded-bl-none animate-slide-from-right"
          } transition-all duration-700`}
        >
          <form
            onSubmit={handleSubmit}
            ref={formRef}
            className={`flex flex-col gap-5`}
          >
            <h2 tabIndex={-1} className={`text-center font-bold mb-3 text-3xl`}>
              {inLogInPage ? "Login" : "Sign Up"}
            </h2>

            {!inLogInPage && (
              <label>
                <span className="flex gap-2 items-center">
                  <CircleUserRound size={20} />
                  Name
                </span>
                <input
                  required
                  type="text"
                  name="name"
                  ref={nameRef}
                  placeholder="e.g. Abdur Rahman"
                  className={`border-b-2 ${
                    wrongInputs.includes(nameRef)
                      ? "border-red-600"
                      : "border-gray-400 focus:border-blue-700"
                  } transition-all duration-300 outline-none py-2 w-full`}
                />
                {wrongInputs.includes(nameRef) && (
                  <p className={`text-red-500 text-xs md:text-sm py-1`}>
                    Name can't be empty
                  </p>
                )}
              </label>
            )}

            <label>
              <span className="flex gap-2 items-center">
                <Mail size={20} />
                Mail
              </span>
              <input
                required
                type="email"
                name="email"
                defaultValue={`ahnaf_abid@gmail.com`}
                ref={mailRef}
                placeholder="e.g. yourname@example.com"
                className={`border-b-2 ${
                  wrongInputs.includes(mailRef)
                    ? "border-red-600"
                    : "border-gray-400 focus:border-blue-700"
                } transition-all duration-300 outline-none py-2 text-md w-full`}
              />
              {wrongInputs.includes(mailRef) && (
                <p className={`text-red-500 text-xs md:text-sm py-1`}>
                  Please enter a valid mail
                </p>
              )}
            </label>

            <label>
              <span className="flex gap-2 items-center">
                <LockKeyhole size={20} />
                Password
              </span>

              <div
                className={`flex items-center transition-all relative border}`}
              >
                <input
                  required
                  type={`${showPassword ? "text" : "password"}`}
                  name="password"
                  defaultValue={`newPassword`}
                  ref={passRef}
                  className={`border-b-2 outline-none py-2 w-full ${
                    wrongInputs.includes(passRef)
                      ? "border-red-600"
                      : "border-gray-400 focus:border-blue-700"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className={`text-grey-mid absolute right-[.5rem]`}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </label>
            {wrongInputs.includes(passRef) && (
              <p className={`text-red-mid text-xs md:text-sm py-1`}>
                Need at least 8 characters
              </p>
            )}

            <button className="text-white bg-slate-800 py-1 rounded-3xl">
              {inLogInPage ? "Login" : "Register"}
            </button>
          </form>

          {/* Button for jumping between login and signup section */}
          <div className="flex gap-3 justify-center text-[.9rem]">
            <span>
              {inLogInPage ? "Don't have " : "Already have "}an account?
            </span>
            <button
              onClick={() => setInLoginPage((prevCond) => !prevCond)}
              className="text-indigo-600 cursor-pointer hover:scale-125 transition"
            >
              {inLogInPage ? "Sign Up" : "Login"}
            </button>
          </div>
        </div>

        {/* Welcome Message Section. Doesn't change with any value in state */}
        <div
          className={`w-full p-4 md:p-0 flex items-center ${
            inLogInPage ? "animate-slide-from-right" : "animate-slide-from-left"
          } transition-all`}
        >
          <h2 className="text-center text-white font-bold text-5xl md:text-6xl">
            Good {getMessage()}
          </h2>
        </div>
      </div>
    </div>
  );
}
