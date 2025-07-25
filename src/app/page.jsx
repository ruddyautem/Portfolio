import { PageWrapper } from "../components/PageWrapper/PageWrapper";
import DigitalSerenity from "@/components/DigitalSerenity/digital-serenity-animated-landing-page";

export default function Home() {
  return (
    <PageWrapper className="relative flex h-full flex-col select-none overflow-hidden">
      <div className="flex h-full flex-col items-center justify-center  text-center">
        <DigitalSerenity />
      </div>
    </PageWrapper>
  );
}