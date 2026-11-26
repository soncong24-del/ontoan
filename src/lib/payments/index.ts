import type { CheckoutRequest, CheckoutSession, PaymentProviderId } from "@/types";

export const PAYMENT_PROVIDERS: { id: PaymentProviderId; label: string; note: string }[] = [
  { id: "vnpay", label: "VNPay", note: "Thẻ nội địa và QR" },
  { id: "momo", label: "MoMo", note: "Ví điện tử" },
  { id: "sepay", label: "SePay", note: "Chuyển khoản có mã thanh toán" },
  { id: "stripe", label: "Stripe", note: "Thẻ quốc tế, nếu bán ra ngoài Việt Nam" },
];

/**
 * Tạo phiên thanh toán. Giai đoạn 1 chưa gọi hàm này.
 * Khi mở bán: ký tham số VNPay, tạo giao dịch MoMo, hoặc tạo Checkout Session Stripe,
 * lưu Enrollment trạng thái `pending`, rồi chuyển hướng tới `redirectUrl`.
 * Webhook đối soát sẽ chuyển enrollment sang `active`.
 */
export async function createCheckout(input: CheckoutRequest): Promise<CheckoutSession> {
  throw new Error(
    `Cổng thanh toán chưa mở cho khóa ${input.courseSlug}. Hiện chỉ nhận đăng ký nguyện vọng.`,
  );
}
