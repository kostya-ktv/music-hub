"use client";
import React from "react";
import Modal from "./Modal";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

interface Props {}

export const AuthModal = (props: Props) => {
  const supabasClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();

  return (
    <Modal
      title="Welcome back"
      description="Login to your acc"
      onChange={() => {}}
      isOpen
    >
      <Auth
        supabaseClient={supabasClient}
        theme="dark"
        magicLink
        providers={["github"]}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#8a4a82",
              },
            },
          },
        }}
      />
    </Modal>
  );
};
