import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  const role = (session as any)?.role;

  if (!session || role !== "ADMIN") {
    throw new Error("UNAUTHORIZED");
  }

  return session;
}
