"use client";

import { AuthModal } from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal/UploadModal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return isMounted ? (
    <>
      <AuthModal />
      <UploadModal />
    </>
  ) : null;
};

export default ModalProvider;
