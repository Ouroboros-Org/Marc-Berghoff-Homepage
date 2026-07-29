import { describe, expect, it } from "vitest";

import {
  getActiveHeaderGroupId,
  isCurrentHeaderItem,
  isCurrentNavigationPage,
} from "./site-header";

describe("header navigation state", () => {
  it("chooses the canonical group when a route appears in multiple menus", () => {
    expect(getActiveHeaderGroupId("/bottleneck-assessment")).toBe("assessment");
  });

  it.each([
    ["/advisory", "services"],
    ["/results", "assessment"],
    ["/blog/founder-bottleneck-or-operating-model", "insights"],
    ["/contact/message", "about"],
  ])("maps %s to the %s group", (pathname, groupId) => {
    expect(getActiveHeaderGroupId(pathname)).toBe(groupId);
  });

  it("marks only the exact destination as the current page", () => {
    const pathname = "/blog/founder-bottleneck-or-operating-model";

    expect(isCurrentNavigationPage(pathname, "/blog")).toBe(false);
    expect(isCurrentNavigationPage(pathname, pathname)).toBe(true);
  });

  it("marks a duplicated destination current only in its canonical group", () => {
    const pathname = "/bottleneck-assessment";

    expect(isCurrentHeaderItem(pathname, "assessment", pathname)).toBe(true);
    expect(isCurrentHeaderItem(pathname, "services", pathname)).toBe(false);
  });
});
