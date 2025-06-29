"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import ReusableDeleteModal from "./ReusableDeleteModal";
import { deleteAccountAction } from "@/lib/actions";

function AccountDeleteCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className=" text-red-600">Danger Zone</CardTitle>
        <CardDescription>
          Irreversible actions that will permanently affect your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="font-semibold text-red-800 mb-2">Delete Account</h3>
          <p className="text-red-700 text-sm mb-4">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <ReusableDeleteModal
            onDelete={async () => deleteAccountAction()}
            trigger={
              <Button
                variant="destructive"
                className="bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default AccountDeleteCard;
