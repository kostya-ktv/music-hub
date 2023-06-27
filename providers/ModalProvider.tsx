"use client";

import { AuthModal } from "@/components/AuthModal";
import SubscribeModal from "@/components/SubscribeModal/SubscribeModal";
import UploadModal from "@/components/UploadModal/UploadModal";
import { ProductWithPrice } from "@/types";
import { useEffect, useState } from "react";

interface Props {
  products: ProductWithPrice[];
}
const ModalProvider: React.FC<Props> = ({ products }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return isMounted ? (
    <>
      <AuthModal />
      <UploadModal />
      <SubscribeModal products={products} />
    </>
  ) : null;
};

export default ModalProvider;
