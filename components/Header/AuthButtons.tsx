"use client";
import useAuthModal from "@/hooks/useAuthModal";
import Button from "../Button";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { useRouter } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";

const AuthButtons = () => {
  const authModal = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();
    if (error) toast.error(error.message);
    else toast.success("Logget out");
  };
  return (
    <div
      className="
              flex
              justify-between
              items-center
              gap-x-4"
    >
      {user ? (
        <div
          className="
        flex
        gap-x-4
        items-center
        "
        >
          <Button
            onClick={handleLogout}
            className="
          bg-white px-6 py-2"
          >
            Logout
          </Button>
          <Button onClick={() => router.push("/account")} className="bg-white">
            <FaUserAlt />
          </Button>
        </div>
      ) : (
        <>
          <div>
            <Button
              onClick={authModal.onOpen}
              className="bg-transparent text-neutral-300 font-medium"
            >
              Sign Up
            </Button>
          </div>
          <div>
            <Button onClick={authModal.onOpen} className="bg-white px-6 py-2">
              Log in
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
export default AuthButtons;
