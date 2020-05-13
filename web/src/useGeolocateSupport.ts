import { useState, useEffect } from "react";

export function useGeolocateSupport() {
  const [isGeolocationSupported, setGeolocationSupported] = useState(false);

  useEffect(() => {
    if (window.navigator.permissions !== undefined) {
      window.navigator.permissions
        .query({ name: "geolocation" })
        .then(permissionStatus => {
          let supported = permissionStatus.state !== "denied";
          setGeolocationSupported(supported);

          permissionStatus.addEventListener("change", function () {
            setGeolocationSupported(this.state !== "denied");
          });
        });
    } else if (window.navigator.geolocation) {
      setGeolocationSupported(true);
    }
  }, []);

  return isGeolocationSupported;
}
