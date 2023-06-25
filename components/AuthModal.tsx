"use client";
import React, { useEffect } from "react";
import Modal from "./Modal";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";

export const AuthModal = () => {
  const supabasClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { isOpen, onClose } = useAuthModal();

  const onChange = (open: boolean) => {
    if (!open) onClose();
  };

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);
  return (
    <Modal
      title="Welcome back"
      description="Login to your acc"
      onChange={onChange}
      isOpen={isOpen}
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
