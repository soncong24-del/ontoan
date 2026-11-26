import { createLocalRepository } from "@/lib/storage/local-repository";
import type { LearningRepository } from "@/lib/storage/repository";

const localRepository = createLocalRepository();

export function getLearningRepository(): LearningRepository {
  // Giai đoạn 2: nếu có NEXT_PUBLIC_SUPABASE_URL thì trả createSupabaseRepository().
  return localRepository;
}

export type { LearningRepository, WaitlistInput } from "@/lib/storage/repository";
