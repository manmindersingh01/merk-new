import { CareersHero } from "@/components/sections/careers/CareersHero";
import { OpenPositions } from "@/components/sections/careers/OpenPositions";
import { WhyWorkWithUs } from "@/components/sections/careers/WhyWorkWithUs";


export default function Solutions() {
  return (
    <div className="min-h-screen bg-background">
      <CareersHero/>
      <OpenPositions/>
      <WhyWorkWithUs/>
    </div>
  );
}
