import { forumFont } from "@/app/utils/font";
import { TeamData } from "@/app/sanity/lib/types";

interface TeamProps {
  teamData: TeamData | null;
}

export default function Team({ teamData }: TeamProps) {
  return (
    <section
      className={`w-full md:pt-36 py-28 md:pb-5 px-6 ${forumFont.className}`}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-light text-[#3E2E1C] mb-6 md:mb-10">
          {teamData?.sectionTitle || "THE TEAM"}
        </h2>

        {/* Description */}
        <p
          className={`
            text-[#3E2E1C] 
            text-xl
            md:text-3xl 
            text-balance
            whitespace-pre-line
          `}
        >
          {teamData?.description ||
            "Wasabi Is Powered By A Team That Has Cooked Together For Years..."}
        </p>
      </div>
    </section>
  );
}
