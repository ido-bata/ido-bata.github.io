import Link from "next/link";
import { css } from "@/styled-system/css";
import { Button } from "@/components/ui/button";
import { ProjectDetailPage } from "@/components/ProjectDetailPage";
import { getProject } from "@/content/projects";

const project = getProject("server-bot");

export const metadata = {
  title: "ido-bata-server-bot | ido-bata",
  description: "いど端のDiscord運営と定時活動を支えるBot。",
};

export default function ServerBotPage() {
  if (!project) return null;
  return (
    <ProjectDetailPage project={project}>
      <Button asChild variant="outline" size="lg" className={css({ width: "fit-content" })}>
        <Link href="/activities/idobata-time">底力タイムの時間割を見る</Link>
      </Button>
    </ProjectDetailPage>
  );
}
