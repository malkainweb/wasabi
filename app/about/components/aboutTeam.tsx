import { forumFont } from "@/app/utils/font";

export default function Team() {
  return (
    <section
      className={`w-full md:pt-36 py-28 md:pb-5 px-6         ${forumFont.className}`}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-light text-[#3E2E1C] mb-6 md:mb-10">
          THE TEAM
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
          Wasabi Is Powered By A Team That Has Cooked Together For Years. Our
          Core Chefs From The West Coast Bring Collaboration And Flavor
          Sensibilities From Japanese Kitchens. We Took Over A Restaurant In Sun
          Peaks, Where Winter Seasons Strengthened Our Teamwork. We Then
          Expanded To Kamloops, Opening Kimchee, Building A Reputation For
          Quality. Wasabi Modern Kitchen Is Our Next Chapter, Committed To
          Offering West Coast–Level Quality In Kamloops.
        </p>
      </div>
    </section>
  );
}
