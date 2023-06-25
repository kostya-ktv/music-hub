"use client";

import { AuthModal } from "@/components/AuthModal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return isMounted ? <AuthModal /> : null;
};

export default ModalProvider;
