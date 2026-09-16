import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailPage } from "@/components/ProjectDetailPage";
import { PROJECTS, getProject } from "@/content/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.name} | ido-bata`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return <ProjectDetailPage project={project} />;
}
