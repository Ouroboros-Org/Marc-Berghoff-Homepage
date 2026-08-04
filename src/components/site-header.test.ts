import { describe, expect, it } from "vitest";

import {
  getActiveHeaderGroupId,
  isCurrentHeaderItem,
  isCurrentNavigationPage,
} from "./site-header";

describe("header navigation state", () => {
  it("places the assessment inside the work group", () => {
    expect(getActiveHeaderGroupId("/bottleneck-assessment")).toBe("work");
  });

  it.each([
    ["/advisory", "work"],
    ["/results", "about"],
    ["/blog/founder-bottleneck-or-operating-model", "insights"],
    ["/contact", "about"],
  ])("maps %s to the %s group", (pathname, groupId) => {
    expect(getActiveHeaderGroupId(pathname)).toBe(groupId);
  });

  it("marks only the exact destination as the current page", () => {
    const pathname = "/blog/founder-bottleneck-or-operating-model";

    expect(isCurrentNavigationPage(pathname, "/blog")).toBe(false);
    expect(isCurrentNavigationPage(pathname, pathname)).toBe(true);
  });

  it("marks the assessment destination in the work group", () => {
    const pathname = "/bottleneck-assessment";

    expect(isCurrentHeaderItem(pathname, "work", pathname)).toBe(true);
    expect(isCurrentHeaderItem(pathname, "about", pathname)).toBe(false);
  });
});
