import type { Metadata } from "next";
import type { Course, Lesson, Quiz } from "@/types";
import { examTypeLabel, topicLabel } from "@/lib/labels";

export const SITE_URL = "https://ontoan.vn";
export const SITE_NAME = "Ôn Toán";
export const SHARE_IMAGE = "/og.png";

function clean(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

/** Tiêu đề hiển thị trên Google, khoảng 50–60 ký tự, đã gồm tên site. */
export function fitTitle(core: string): string {
  const suffix = ` | ${SITE_NAME}`;
  let base = clean(core);
  if (`${base}${suffix}`.length > 60) {
    let trimmed = base.slice(0, 60 - suffix.length);
    const cut = trimmed.lastIndexOf(" ");
    if (cut > 18) trimmed = trimmed.slice(0, cut);
    return `${trimmed.trim()}${suffix}`;
  }
  const pads = [" có lời giải", " trực tuyến", " cho học sinh"];
  for (const pad of pads) {
    const current = `${base}${suffix}`;
    if (current.length >= 50) return current;
    if (base.includes(pad.trim())) continue;
    if (`${base}${pad}${suffix}`.length <= 60) base += pad;
  }
  return `${base}${suffix}`;
}

/** Mô tả meta khoảng 120–160 ký tự. */
export function fitDescription(text: string): string {
  let value = clean(text);
  const extras = [
    " Luyện miễn phí trên ontoan.vn.",
    " Có lời giải từng câu.",
    " Dành cho lớp 10, 11, 12.",
  ];
  for (const extra of extras) {
    if (value.length >= 120) break;
    value = clean(`${value.replace(/[. ]*$/, ".")}${extra}`);
  }
  if (value.length >= 120 && value.length <= 160) return value;
  if (value.length < 120) {
    value = clean(`${value} Đề thi học kì và đề thi thử THPT.`);
  }
  if (value.length <= 160) return value;
  const slice = value.slice(0, 157);
  const space = slice.lastIndexOf(" ");
  const cut = (space >= 110 ? slice.slice(0, space) : slice).trim().replace(/[.,;:–-]+$/, "");
  return cut.endsWith(".") ? cut : `${cut}.`;
}

export function pageMeta(input: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const title = input.title;
  const description = input.description;
  const url = input.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${input.path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: input.noindex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "vi_VN",
      type: "website",
      images: [
        {
          url: SHARE_IMAGE,
          width: 1200,
          height: 630,
          alt: "Ôn Toán – ôn thi toán miễn phí lớp 10, 11, 12",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SHARE_IMAGE],
    },
  };
}

export const HOME_TITLE = fitTitle("Ôn thi toán miễn phí cho lớp 10, 11, 12");
export const HOME_DESCRIPTION = fitDescription(
  "Ôn thi toán miễn phí cho lớp 10, 11 và 12: bài giảng có lời giải, đề thi học kì và đề thi thử THPT, chấm điểm ngay.",
);

export function lessonMeta(lesson: Pick<Lesson, "slug" | "title" | "summary" | "grade" | "topic">): Metadata {
  return pageMeta({
    title: fitTitle(`Bài giảng ${lesson.title} lớp ${lesson.grade}`),
    description: fitDescription(
      `Bài giảng ôn thi toán lớp ${lesson.grade} miễn phí: ${lesson.title}. ${topicLabel(lesson.topic)}. ${lesson.summary}`,
    ),
    path: `/bai-giang/${lesson.slug}`,
  });
}

export function examMeta(
  quiz: Pick<Quiz, "slug" | "title" | "summary" | "grade" | "examType" | "questions">,
): Metadata {
  const kind =
    quiz.examType === "thi-thu-thpt"
      ? "đề thi thử THPT"
      : `đề thi ${examTypeLabel(quiz.examType).toLowerCase()}`;
  return pageMeta({
    title: fitTitle(quiz.title),
    description: fitDescription(
      `${quiz.title}: ${kind} toán lớp ${quiz.grade}, ${quiz.questions.length} câu, miễn phí. ${quiz.summary} Làm online và chấm điểm ngay.`,
    ),
    path: `/kiem-tra/${quiz.slug}`,
  });
}

export function courseMeta(course: Pick<Course, "slug" | "title" | "summary" | "grade">): Metadata {
  return pageMeta({
    title: fitTitle(`${course.title} lớp ${course.grade}`),
    description: fitDescription(
      `Khóa ${course.title} cho lớp ${course.grade}. ${course.summary} Đăng ký giữ chỗ, bài giảng và đề thi học kì trên site vẫn miễn phí.`,
    ),
    path: `/khoa-hoc/${course.slug}`,
  });
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "Organization"],
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}${SHARE_IMAGE}`,
    description: HOME_DESCRIPTION,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Số 5 Ngõ 60 Vũ Phạm Hàm",
      addressLocality: "Hà Nội",
      addressCountry: "VN",
    },
    telephone: ["+84982779554", "+84856737595"],
  };
}

export function examJsonLd(quiz: Pick<Quiz, "slug" | "title" | "summary" | "grade" | "examType" | "questions">) {
  const description = examMeta(quiz).description;
  return {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: quiz.title,
    description,
    url: `${SITE_URL}/kiem-tra/${quiz.slug}`,
    inLanguage: "vi",
    isAccessibleForFree: true,
    educationalLevel: `Lớp ${quiz.grade}`,
    learningResourceType: quiz.examType === "thi-thu-thpt" ? "Đề thi thử THPT" : "Đề thi học kì",
    assesses: `Toán lớp ${quiz.grade}`,
    numberOfQuestions: quiz.questions.length,
    provider: {
      "@type": "EducationalOrganization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function lessonJsonLd(lesson: Pick<Lesson, "slug" | "title" | "summary" | "grade">) {
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: lesson.title,
    description: lesson.summary,
    url: `${SITE_URL}/bai-giang/${lesson.slug}`,
    inLanguage: "vi",
    isAccessibleForFree: true,
    educationalLevel: `Lớp ${lesson.grade}`,
    learningResourceType: "Bài giảng",
    provider: {
      "@type": "EducationalOrganization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
