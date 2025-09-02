import type { AppDispatch } from "../store";
import { showToaster, hideToaster } from "./sliceToaster";

type ErrPayload = {
  status: number;
  messages: Record<number, string>;
};

export function handleError(payload: ErrPayload, dispatch: AppDispatch): void {
  const { status, messages } = payload;

  dispatch(showToaster({ type: "error", text: messages[status] }));
  setTimeout(() => dispatch(hideToaster()), 3000);
}
