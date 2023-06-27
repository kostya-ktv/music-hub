import React, { useState } from "react";
import Modal from "../Modal";
import { Price, ProductWithPrice } from "@/types";
import Button from "../Button";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-hot-toast";
import { postData } from "@/helpers/getURL";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { getStripe } from "@/libs/stripe.client";

interface Props {
  products: ProductWithPrice[];
}
const SubscribeModal: React.FC<Props> = ({ products }) => {
  const subscribeModal = useSubscribeModal();
  const { user, isLoading, subscription } = useUser();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  let content = <div className="text-center">No products available</div>;

  const onChange = (open: boolean) => !open && subscribeModal.onClose();

  const handleCheckoutPrice = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      setPriceIdLoading(undefined);
      return toast.error("Must be logged in");
    }
    if (subscription) {
      setPriceIdLoading(undefined);
      return toast("Already subscribed");
    }
    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      });
      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };
  const formatPrice = (price: Price) => {
    const priceString = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: price.currency,
      minimumFractionDigits: 0,
    }).format((price?.unit_amount || 0) / 100);
    return priceString;
  };

  if (products.length) {
    content = (
      <div>
        {products.map((product) => {
          if (!product.prices?.length) {
            return <div key={product.id}>No prices available</div>;
          }
          return product.prices.map((price) => (
            <Button
              key={price.id}
              onClick={() => handleCheckoutPrice(price)}
              disabled={isLoading || price.id === priceIdLoading}
            >{`Subscribe for ${formatPrice(price)} a ${
              price.interval
            }`}</Button>
          ));
        })}
      </div>
    );
  }

  if (subscription) {
    content = <div className="text-center">ALready subscribed</div>;
  }
  return (
    <Modal
      title="Only for premium users"
      isOpen={subscribeModal.isOpen}
      onChange={onChange}
      description="Listen to music with Music-Hub"
    >
      {content}
    </Modal>
  );
};

export default SubscribeModal;
