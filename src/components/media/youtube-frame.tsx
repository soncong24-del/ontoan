import { youtubeEmbedUrl } from "@/lib/youtube";

export function YoutubeFrame({ url, title }: { url?: string | null; title: string }) {
  const embed = youtubeEmbedUrl(url);
  if (!embed) return null;
  return (
    <div className="mt-4">
      <p className="mb-2 text-sm font-semibold text-[#153565]">Video chữa</p>
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={embed}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}
