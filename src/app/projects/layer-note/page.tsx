import { ProjectDetailPage } from "@/components/ProjectDetailPage";
import { getProject } from "@/content/projects";

const project = getProject("layer-note");

export const metadata = {
  title: "LayerNote | ido-bata",
  description: "After Effectsのレイヤーにメモを残す拡張機能。",
};

export default function LayerNotePage() {
  if (!project) return null;
  return <ProjectDetailPage project={project} />;
}
