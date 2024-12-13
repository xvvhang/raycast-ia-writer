import { open } from "@raycast/api";
import { iAWriter } from "./lib/ia-writer";
import { defaultName } from "./preference";
import { checkInstallation } from "./utils";

export default async function Command() {
  checkInstallation();
  const url = iAWriter({ command: "open", path: defaultName() });
  open(url);
}