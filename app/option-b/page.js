import { readFileSync } from "node:fs";
import path from "node:path";
import HeroCanvas from "./HeroCanvas";
import OptionBInteractions from "./OptionBInteractions";
import OptionBHeader from "./OptionBHeader";
import OptionBFooter from "./OptionBFooter";
import OptionBCoreStrengths from "./OptionBCoreStrengths";

export const dynamic = "force-dynamic";

export default function OptionBPage() {
  const referenceMarkup = readFileSync(
    path.join(process.cwd(), "app", "option-b", "reference-markup.html"),
    "utf8",
  );

  return (
    <>
      <OptionBHeader />
      <HeroCanvas />
      <OptionBInteractions />
      <OptionBCoreStrengths />
      <main
        id="pwb-body-wrap"
        dangerouslySetInnerHTML={{ __html: referenceMarkup }}
      />
      <OptionBFooter />
    </>
  );
}
