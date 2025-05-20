import { useEffect } from "react";
import { BASE_URL } from "../../constants";

interface YooKassaWidgetProps {
  confirmationToken: string;
}

declare global {
  interface Window {
    YooMoneyCheckoutWidget: any;
  }
}

export const YooKassaWidget: React.FC<YooKassaWidgetProps> = ({ confirmationToken }) => {
  useEffect(() => {
    if (window.YooMoneyCheckoutWidget) {
      const checkout = new window.YooMoneyCheckoutWidget({
        confirmation_token: confirmationToken,
        return_url: `${BASE_URL}/payment-complete`,
        error_callback: (error: any) => {
          console.error("YooKassa error:", error);
        },
      });

      checkout.render("yookassa-widget");
    }
  }, [confirmationToken]);

  return <div id="yookassa-widget" />;
};
