export interface BasicRequestState {
  status: "idle" | "loading" | "completed" | "failed";
  error?: string;
  action: actions;
}
export interface ActionRequestState {
  status: "idle" | "loading" | "completed" | "failed";
  error?: string;
  success?: string;
  statusAction: "idle" | "loading" | "completed" | "failed";
  action: actions;
}
