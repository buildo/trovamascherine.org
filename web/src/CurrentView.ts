import { NonEmptyString } from "io-ts-types/lib/NonEmptyString";
import { Location } from "history";
import { isRight } from "fp-ts/lib/Either";

export type CurrentView =
  | {
      view: "map";
    }
  | {
      view: "stats";
    }
  | {
      view: "details";
      supplierId: NonEmptyString;
    }
  | {
      view: "update";
      token: NonEmptyString;
    }
  | {
      view: "credits";
    };

export function fold<R>(
  whenMap: () => R,
  whenStats: () => R,
  whenDetails: (supplierId: NonEmptyString) => R,
  whenUpdate: (token: NonEmptyString) => R,
  whenCredits: () => R
): (currentView: CurrentView) => R {
  return currentView => {
    switch (currentView.view) {
      case "map":
        return whenMap();
      case "stats":
        return whenStats();
      case "details":
        return whenDetails(currentView.supplierId);
      case "update":
        return whenUpdate(currentView.token);
      case "credits":
        return whenCredits();
    }
  };
}

const mapRegex = /^\/map/;
const statsRegex = /^\/dashboard/;
const detailsRegex = /^\/details\/(.+)/;
const updateRegex = /^\/update\/(.+)/;
const creditsRegex = /^\/credits/;

export function parse(location: Location): CurrentView {
  const mapMatch = mapRegex.exec(location.pathname);
  if (mapMatch) {
    return { view: "map" };
  }

  const statsMatch = statsRegex.exec(location.pathname);
  if (statsMatch) {
    return { view: "stats" };
  }

  const detailsMatch = detailsRegex.exec(location.pathname);
  if (detailsMatch) {
    const supplierId = NonEmptyString.decode(detailsMatch[1]);
    if (isRight(supplierId)) {
      return { view: "details", supplierId: supplierId.right };
    }
  }

  const updateMatch = updateRegex.exec(location.pathname);
  if (updateMatch) {
    const token = NonEmptyString.decode(updateMatch[1]);
    if (isRight(token)) {
      return { view: "update", token: token.right };
    }
  }

  const creditsMatch = creditsRegex.exec(location.pathname);
  if (creditsMatch) {
    return { view: "credits" };
  }

  return { view: "map" };
}

function locationFromPathname(pathname: string): Location {
  return { pathname, search: "", hash: "", state: undefined, key: undefined };
}

export function serialize(view: CurrentView): Location {
  switch (view.view) {
    case "map":
      return locationFromPathname("/map");
    case "stats":
      return locationFromPathname("/dashboard");
    case "details":
      return locationFromPathname(`/details/${view.supplierId}`);
    case "update":
      return locationFromPathname(`/update/${view.token}`);
    case "credits":
      return locationFromPathname("/credits");
  }
}
