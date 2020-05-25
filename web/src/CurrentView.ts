import { NonEmptyString } from "io-ts-types/lib/NonEmptyString";
import { Location } from "history";
import { option, either } from "fp-ts";
import { Option } from "fp-ts/lib/Option";
import qs from "qs";
import * as t from "io-ts";
import { pipe } from "fp-ts/lib/pipeable";
import { UUID } from "io-ts-types/lib/UUID";
import { NumberFromString } from "io-ts-types/lib/NumberFromString";

export const MapState = t.strict({
  latitude: NumberFromString,
  longitude: NumberFromString,
  zoom: NumberFromString,
});
export type MapState = t.TypeOf<typeof MapState>;

export type CurrentView =
  | {
      view: "stats";
    }
  | {
      view: "map";
      supplier: Option<UUID>;
      mapState: Option<MapState>;
    }
  | {
      view: "update";
      token: NonEmptyString;
    }
  | {
      view: "settings";
      token: NonEmptyString;
    }
  | {
      view: "credits";
    };

export function fold<R>(
  whenMap: (supplier: Option<UUID>, mapState: Option<MapState>) => R,
  whenStats: () => R,
  whenUpdate: (token: NonEmptyString) => R,
  whenSettings: (token: NonEmptyString) => R,
  whenCredits: () => R
): (currentView: CurrentView) => R {
  return currentView => {
    switch (currentView.view) {
      case "map":
        return whenMap(currentView.supplier, currentView.mapState);
      case "stats":
        return whenStats();
      case "update":
        return whenUpdate(currentView.token);
      case "settings":
        return whenSettings(currentView.token);
      case "credits":
        return whenCredits();
    }
  };
}

const statsRegex = /^\/dashboard/;
const updateRegex = /^\/update\/(.+)/;
const settingsRegex = /^\/settings\/(.+)/;
const creditsRegex = /^\/credits/;

export function parse(location: Location): CurrentView {
  const statsMatch = statsRegex.exec(location.pathname);
  if (statsMatch) {
    return { view: "stats" };
  }

  const updateMatch = updateRegex.exec(location.pathname);
  if (updateMatch) {
    const token = NonEmptyString.decode(updateMatch[1]);
    if (either.isRight(token)) {
      return { view: "update", token: token.right };
    }
  }

  const settingsMatch = settingsRegex.exec(location.pathname);
  if (settingsMatch) {
    const token = NonEmptyString.decode(settingsMatch[1]);
    if (either.isRight(token)) {
      return { view: "settings", token: token.right };
    }
  }

  const creditsMatch = creditsRegex.exec(location.pathname);
  if (creditsMatch) {
    return { view: "credits" };
  }

  const search = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const supplier = pipe(UUID.decode(search.supplier), option.fromEither);
  const mapState = pipe(MapState.decode(search), option.fromEither);

  return { view: "map", supplier, mapState };
}

function location(pathname: string, search?: Record<string, string>): Location {
  return {
    pathname,
    search: search ? qs.stringify(search, { addQueryPrefix: true }) : "",
    hash: "",
    state: undefined,
    key: undefined,
  };
}

export function serialize(view: CurrentView): Location {
  switch (view.view) {
    case "map":
      const search = pipe(
        view.mapState,
        option.map(MapState.encode),
        option.getOrElseW(() => ({}))
      );
      return location(
        "/",
        pipe(
          view.supplier,
          option.fold(
            () => search,
            supplier => ({ ...search, supplier })
          )
        )
      );
    case "stats":
      return location("/dashboard");
    case "update":
      return location(`/update/${view.token}`);
    case "settings":
      return location(`/settings/${view.token}`);
    case "credits":
      return location("/credits");
  }
}
