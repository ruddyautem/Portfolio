import { PageWrapper } from "../components/PageWrapper/PageWrapper";
import Homepage from "@/components/HomepageContent/HomepageContent";

export default function Home() {
  return (
    <PageWrapper
      className="h-full lg:overflow-y-hidden"
      skipChildWrapping={true}
    >
      <Homepage />
    </PageWrapper>
  );
}