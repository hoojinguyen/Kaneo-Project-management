import { and, eq, or } from "drizzle-orm";
import db from "../../database";
import { workspaceTable } from "../../database/schema";
import type { UpdateWorkspacePayload } from "../db/queries";

async function updateWorkspace({
  userId,
  workspaceId,
  body,
}: { userId: string; workspaceId: string; body: UpdateWorkspacePayload }) {
  const workspace = await db
    .select({
      id: workspaceTable.id,
      ownerId: workspaceTable.ownerId,
    })
    .from(workspaceTable)
    .where(
      and(
        eq(workspaceTable.id, workspaceId),
        eq(workspaceTable.ownerId, userId),
      ),
    )
    .limit(1);

  const isWorkspaceExisting = Boolean(workspace.at(0));

  if (!isWorkspaceExisting) {
    throw new Error("TODO");
  }

  const updatedWorkspace = await db
    .update(workspaceTable)
    .set({
      ...body,
    })
    .where(eq(workspaceTable.id, workspaceId))
    .returning({
      id: workspaceTable.id,
      name: workspaceTable.name,
      ownerId: workspaceTable.ownerId,
      createdAt: workspaceTable.createdAt,
    });

  return updatedWorkspace.at(0);
}

export default updateWorkspace;
