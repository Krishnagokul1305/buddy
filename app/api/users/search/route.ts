import { NextResponse } from "next/server";
import { userService } from "@/services/user.service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  const users = await userService.searchUsers(query);
  return NextResponse.json(users);
}
