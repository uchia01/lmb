import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee-01-utils/marquee";
import Image from "next/image";

const reviews = [
  {
    name: "Priya Sharma",
    username: "@priyasharma",
    body: "LMB transformed our wedding reception into something truly magical. The molecular cocktails were a conversation starter, and every guest wanted to know how they did it!",
    profile: "https://cdn.21st.dev/assets/mirror/b5/b539abc60701ab9cbcd73f9241d13a14a09582a4fd06c65784cb5567d77a2e0e.webp",
  },
  {
    name: "Arjun Malhotra",
    username: "@arjunmalhotra",
    body: "Hired LMB for our corporate event in Delhi. The bar became the centerpiece of the evening. Professional, creative, and the presentation was absolutely stunning.",
    profile: "https://cdn.21st.dev/assets/mirror/2b/2bc5f22fa3400c61a2161d14e3dce5a0804badebfc1b3d9cbe844feaa3b72180.webp",
  },
  {
    name: "Nisha Kapoor",
    username: "@nishakapoor",
    body: "The attention to detail is incredible. From the smoke effects to the perfectly balanced flavors, LMB Molecular elevated our celebration beyond anything we imagined.",
    profile: "https://cdn.21st.dev/assets/mirror/e1/e1e172821860559f890ef5ef7c14cc66a6c1ec001f3bbeb6dddd349c0081dd6b.webp",
  },
  {
    name: "Vikram Singh",
    username: "@vikramsingh",
    body: "We hosted a private celebration in Agra and LMB brought the luxury bar experience right to our venue. Seamless setup, incredible service, unforgettable drinks.",
    profile: "https://cdn.21st.dev/assets/mirror/61/61fda783ca2662349458bad61a434038016f05d6a14bd7c5a314f48c8ee8be03.webp",
  },
  {
    name: "Ananya Desai",
    username: "@ananyadesai",
    body: "The molecular bartending was pure theatre! Our guests couldn't stop talking about the drinks. LMB made our anniversary party truly special and memorable.",
    profile: "https://cdn.21st.dev/assets/mirror/c5/c5ee2e124ea7334450d30a46607f793534f567e97d4b708cda110a06aeed4953.webp",
  },
  {
    name: "Rahul Khanna",
    username: "@rahulkhanna",
    body: "Professional team, creative cocktails, and flawless execution. LMB understands luxury hospitality. They turned our brand launch into an experience guests won't forget.",
    profile: "https://cdn.21st.dev/assets/mirror/2b/2bc5f22fa3400c61a2161d14e3dce5a0804badebfc1b3d9cbe844feaa3b72180.webp",
  },
  {
    name: "Meera Patel",
    username: "@meerapatel",
    body: "From the initial consultation to the final pour, everything was perfect. The molecular cocktails were art in a glass. Highly recommend LMB for any celebration!",
    profile: "https://cdn.21st.dev/assets/mirror/b5/b539abc60701ab9cbcd73f9241d13a14a09582a4fd06c65784cb5567d77a2e0e.webp",
  },
];

const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

const ReviewCard = ({
  profile,
  name,
  username,
  body,
}: {
  profile: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <Card
      className="relative h-full w-64 cursor-pointer overflow-hidden p-4 shadow-none"
      style={{
        background: "var(--lmb-soft)",
        borderColor: "rgba(245,242,234,.12)",
        color: "var(--lmb-text)",
      }}
    >
      <CardContent className="flex flex-col gap-2 p-0">
        <div className="flex flex-row items-center gap-2">
          <Image
            className="rounded-full"
            width={32}
            height={32}
            alt={`${name} profile`}
            src={profile}
          />
          <div className="flex flex-col">
            <p className="text-sm font-medium" style={{ color: "var(--lmb-text)" }}>
              {name}
            </p>
            <p
              className="text-xs font-medium"
              style={{ color: "var(--lmb-muted)" }}
            >
              {username}
            </p>
          </div>
        </div>
        <p className="line-clamp-4 text-sm" style={{ color: "rgba(245,242,234,.68)", lineHeight: 1.6 }}>
          {body}
        </p>
      </CardContent>
    </Card>
  );
};

export default function TestimonialMarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"
        style={{
          background: "linear-gradient(90deg, var(--lmb-bg), transparent)",
        }}
      ></div>
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"
        style={{
          background: "linear-gradient(270deg, var(--lmb-bg), transparent)",
        }}
      ></div>
    </div>
  );
}
