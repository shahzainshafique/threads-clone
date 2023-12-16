"use server";

import { readv } from "fs";
import User from "../models/user.model";
import { connectToDb } from "../mongoose";
import { revalidatePath } from "next/cache";
export async function updateUser(
  userId: String,
  username: String,
  name: String,
  bio: String,
  image: String,
  path: string
): Promise<void> {
  try {
    connectToDb();

    await User.findOneAndUpdate(
      { id: userId },
      { username: username.toLowerCase(), name, bio, image, onboarded: true },
      { upsert: true }
    );
    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}
