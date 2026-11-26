import type { LearningRepository } from "@/lib/storage/repository";

/**
 * Điểm nối giai đoạn 2.
 * Cài `@supabase/supabase-js`, tạo bảng lesson_progress, quiz_attempts,
 * waitlist_signups, enrollments, rồi điền phần thân hàm này.
 * Các trang chỉ gọi `getLearningRepository()`, không gọi localStorage trực tiếp.
 */
export function createSupabaseRepository(): LearningRepository {
  throw new Error(
    "Kho Supabase chưa được nối. Đặt NEXT_PUBLIC_SUPABASE_URL và viết createSupabaseRepository.",
  );
}
