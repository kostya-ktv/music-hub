import { postData } from "@/helpers/getURL";
import { useUser } from "@/hooks/useUser";
import { getStripe } from "@/libs/stripe.client";
import { Price } from "@/types";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

const useHandleCheckoutPrice = () => {
    const { user, isLoading, subscription } = useUser();
    const [priceIdLoading, setPriceIdLoading] = useState<string>();
     const handleCheckoutPrice = useCallback(async (price: Price) => {
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
     },[])
    return {
        handleCheckoutPrice, priceIdLoading
    }
}
export default useHandleCheckoutPrice