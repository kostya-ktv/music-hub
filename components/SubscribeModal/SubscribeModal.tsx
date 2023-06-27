import React from "react";
import Modal from "../Modal";
import { ProductWithPrice } from "@/types";
import Button from "../Button";
import { useUser } from "@/hooks/useUser";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { SubscribeModalService } from "./subscribeModa.service";
import useHandleCheckoutPrice from "./hooks/useHandleCheckoutPrice";

interface Props {
  products: ProductWithPrice[];
}
const SubscribeModal: React.FC<Props> = ({ products }) => {
  const subscribeModal = useSubscribeModal();
  const { user, isLoading, subscription } = useUser();

  let content = <div className="text-center">No products available</div>;

  const onChange = (open: boolean) => !open && subscribeModal.onClose();
  const { handleCheckoutPrice, priceIdLoading } = useHandleCheckoutPrice();

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
            >{`Subscribe for ${SubscribeModalService.formatPrice(price)} a ${
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
