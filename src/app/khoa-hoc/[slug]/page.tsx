import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnrollForm } from "@/components/course/enroll-form";
import { Breadcrumbs, Shell } from "@/components/site/shell";
import { getCourse, getCourses } from "@/data";
import { formatVnd, pluralMinutes } from "@/lib/format";
import { gradeLabel } from "@/lib/labels";
import { PAYMENT_PROVIDERS } from "@/lib/payments";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCourses().map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return { title: "Không thấy khóa học" };
  return { title: course.title, description: course.summary };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  return (
    <Shell>
      <Breadcrumbs
        items={[
          { href: "/", label: "Trang chủ" },
          { href: "/khoa-hoc", label: "Khóa học" },
          { label: course.title },
        ]}
      />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <span className="rounded-full bg-[#fff3ef] px-2 py-0.5 text-xs font-bold text-[#ff792f]">Sắp mở bán</span>
          <h1 className="mt-3 text-3xl font-bold text-[#153565]">{course.title}</h1>
          <p className="mt-3 text-base leading-7 text-[#5a6173]">{course.summary}</p>
          <p className="mt-3 text-sm font-semibold text-[#1482c0]">
            {course.audience} · {gradeLabel(course.grade)} · {course.durationLabel}
          </p>
          <p className="mt-4 text-3xl font-bold text-[#153565]">{formatVnd(course.priceVnd)}</p>
          {course.compareAtVnd ? (
            <p className="text-sm text-[#5a6173] line-through">{formatVnd(course.compareAtVnd)}</p>
          ) : null}
          <h2 className="mt-8 text-xl font-bold text-[#153565]">Bạn làm được gì sau khóa</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
            {course.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
          <h2 className="mt-8 text-xl font-bold text-[#153565]">Giáo trình</h2>
          <div className="mt-3 space-y-3">
            {course.modules.map((module) => (
              <details key={module.id} className="rounded-2xl border border-[#d0dcf0] bg-white p-4" open>
                <summary className="cursor-pointer font-bold text-[#153565]">{module.title}</summary>
                <p className="mt-2 text-sm text-[#5a6173]">{module.summary}</p>
                <ul className="mt-2 space-y-1 text-sm">
                  {module.lessons.map((lesson) => (
                    <li key={lesson.title} className="flex justify-between gap-3">
                      <span>{lesson.title}</span>
                      <span className="text-[#5a6173]">{pluralMinutes(lesson.durationMinutes)}</span>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
          <p className="mt-6 text-sm leading-6 text-[#5a6173]">
            Khi mở bán, học viên thanh toán qua {PAYMENT_PROVIDERS.map((item) => item.label).join(", ")}. Đơn sẽ thành ghi danh sau khi cổng báo thành công. Nút thanh toán chưa bật.
          </p>
        </div>
        <EnrollForm courseTitle={course.title} />
      </div>
    </Shell>
  );
}
