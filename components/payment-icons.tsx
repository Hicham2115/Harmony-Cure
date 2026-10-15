import amex from "@/app/assets/payments/amex.png";
import applePay from "@/app/assets/payments/apple-pay.png";
import bancontact from "@/app/assets/payments/bancontact.png";
import cartesBancaires from "@/app/assets/payments/cartes-bancaires.png";
import eps from "@/app/assets/payments/eps.png";
import klarna from "@/app/assets/payments/klarna.png";
import mastercard from "@/app/assets/payments/mastercard.png";
import mobilePayment from "@/app/assets/payments/mobile-payment.png";
import paypal from "@/app/assets/payments/paypal.png";
import shopPay from "@/app/assets/payments/shop-pay.png";
import visa from "@/app/assets/payments/visa.png";

export const PAYMENT_METHODS = [
  { label: "American Express", src: amex },
  { label: "Apple Pay", src: applePay },
  { label: "Bancontact", src: bancontact },
  { label: "Cartes Bancaires", src: cartesBancaires },
  { label: "EPS", src: eps },
  { label: "Klarna", src: klarna },
  { label: "Mastercard", src: mastercard },
  { label: "Paiement mobile", src: mobilePayment },
  { label: "PayPal", src: paypal },
  { label: "Shop Pay", src: shopPay },
  { label: "Visa", src: visa },
];
