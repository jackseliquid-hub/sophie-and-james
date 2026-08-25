import { type ReactNode, useCallback, useState } from "react";
import { Accommodation } from "../components/site/accommodation";
import { Countdown } from "../components/site/countdown";
import { DemoSwitcher } from "../components/site/demo-switcher";
import { Details } from "../components/site/details";
import { DressCode } from "../components/site/dress-code";
import { useEventState } from "../components/site/event-state";
import { Faq } from "../components/site/faq";
import { SiteFooter } from "../components/site/footer";
import { Gallery } from "../components/site/gallery";
import { Gifts } from "../components/site/gifts";
import { GuestGallery } from "../components/site/guest-gallery";
import { Intro } from "../components/site/intro";
import { InvitationGate } from "../components/site/invitation-gate";
import { SiteNav } from "../components/site/nav";
import { Notices } from "../components/site/notices";
import { PhotoShareIntro } from "../components/site/photo-share-intro";
import { PhotoUpload } from "../components/site/photo-upload";
import { Rsvp } from "../components/site/rsvp";
import { ShareInvitation } from "../components/site/share";
import { Story } from "../components/site/story";
import { TheDay } from "../components/site/the-day";
import { Travel } from "../components/site/travel";
import { Venue } from "../components/site/venue";

type Key =
  | "intro"
  | "countdown"
  | "details"
  | "venue"
  | "the-day"
  | "story"
  | "rsvp"
  | "dress"
  | "stay"
  | "travel"
  | "gifts"
  | "gallery"
  | "photo-intro"
  | "photo-upload"
  | "guest-gallery"
  | "notices"
  | "faq"
  | "share";

const sections: Record<Key, () => ReactNode> = {
  intro: Intro,
  countdown: Countdown,
  details: Details,
  venue: Venue,
  "the-day": TheDay,
  story: Story,
  rsvp: Rsvp,
  dress: DressCode,
  stay: Accommodation,
  travel: Travel,
  gifts: Gifts,
  gallery: Gallery,
  "photo-intro": PhotoShareIntro,
  "photo-upload": PhotoUpload,
  "guest-gallery": GuestGallery,
  notices: Notices,
  faq: Faq,
  share: ShareInvitation,
};

/**
 * The running order changes with the stage of the event — the same content, resequenced.
 * Before: invitation and planning. On the day: schedule, directions, updates.
 * After: memories and guest photography first.
 */
const order: Record<"before" | "day" | "after", Key[]> = {
  before: [
    "intro",
    "countdown",
    "details",
    "venue",
    "the-day",
    "story",
    "rsvp",
    "dress",
    "stay",
    "travel",
    "gifts",
    "gallery",
    "photo-intro",
    "photo-upload",
    "guest-gallery",
    "notices",
    "faq",
    "share",
  ],
  day: [
    "intro",
    "countdown",
    "the-day",
    "notices",
    "venue",
    "travel",
    "details",
    "photo-intro",
    "photo-upload",
    "guest-gallery",
    "dress",
    "gallery",
    "story",
    "faq",
    "rsvp",
    "share",
  ],
  after: [
    "intro",
    "countdown",
    "photo-intro",
    "photo-upload",
    "guest-gallery",
    "gallery",
    "story",
    "the-day",
    "venue",
    "rsvp",
    "gifts",
    "faq",
    "share",
  ],
};

function Index() {
  const { stage } = useEventState();
  const [ready, setReady] = useState(false);
  const onOpen = useCallback(() => setReady(true), []);

  return (
    <>
      <InvitationGate onOpen={onOpen} />
      <SiteNav ready={ready} />
      <main id="main">
        {order[stage].map((key) => {
          const Component = sections[key];
          return <Component key={key} />;
        })}
      </main>
      <SiteFooter />
      <DemoSwitcher />
    </>
  );
}

export default Index;
