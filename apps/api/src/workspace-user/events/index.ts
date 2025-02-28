import { subscribeToEvent } from "../../events";
import updateWorkspaceUser from "../controllers/update-workspace-user";

if(process.env.EVENT_QUEUE_ENABLED === "true"){
  subscribeToEvent("user.signed_up", async (data: { email: string }) => {
    updateWorkspaceUser({
      email: data.email,
      status: "active",
    });
  });
}
