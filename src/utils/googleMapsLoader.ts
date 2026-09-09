import { _dark, _lang } from "@/theme";

export const GOOGLE_MAPS_API_KEY = "AIzaSyBSf-rM8flnZXMLaXaHpVSVMQBs7Rq8M84";

let googleMapsPromise: Promise<typeof google.maps> | null = null;

export function loadGoogleMapsApi(): Promise<typeof google.maps> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Window is undefined"));
  }

  if (window.google?.maps) {
    return Promise.resolve(window.google.maps);
  }

  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  googleMapsPromise = new Promise((resolve, reject) => {
    // Check if script element already exists
    const existingScript = document.getElementById("google-maps-script");
    if (existingScript) {
      existingScript.addEventListener("load", () => {
        if (window.google?.maps) resolve(window.google.maps);
        else reject(new Error("Google Maps loaded without window.google.maps"));
      });
      existingScript.addEventListener("error", (e) => reject(e));
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.type = "text/javascript";
    const langParam = _lang === "ar" ? "ar" : "en";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,geometry&language=${langParam}&loading=async`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.google?.maps) {
        resolve(window.google.maps);
      } else {
        reject(new Error("Google Maps script loaded but window.google.maps is undefined"));
      }
    };

    script.onerror = (err) => {
      googleMapsPromise = null;
      reject(err);
    };

    document.head.appendChild(script);
  });

  return googleMapsPromise;
}

// Dark Mode Map Styles (Sleek Obsidian & Midnight Palette)
export const GOOGLE_MAPS_DARK_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#161b22" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#161b22" }, { weight: 2 }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8b949e" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#c9d1d9" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#7ee787" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#0d2d1f" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#21262d" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#30363d" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#8b949e" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#38434f" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f242c" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f0883e" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#1b212a" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#58a6ff" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#072b4c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#58a6ff" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#072b4c" }],
  },
];

// Clean Light Mode Map Styles
export const GOOGLE_MAPS_LIGHT_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#f8fafc" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#475569" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#0f172a" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#e2f2e9" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#e2e8f0" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#fed7aa" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#fdba74" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#dbeafe" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#2563eb" }],
  },
];

/**
 * Custom HTML Overlay for Google Maps to render rich custom elements
 */
export function createCustomOverlay(
  map: google.maps.Map,
  position: google.maps.LatLngLiteral,
  content: HTMLElement,
  onClick?: () => void
): google.maps.OverlayView {
  class CustomHTMLOverlay extends google.maps.OverlayView {
    private pos: google.maps.LatLng;
    private div: HTMLElement;

    constructor(pos: google.maps.LatLngLiteral, element: HTMLElement) {
      super();
      this.pos = new google.maps.LatLng(pos.lat, pos.lng);
      this.div = element;
      this.div.style.position = "absolute";
      this.div.style.cursor = "pointer";
      this.div.style.zIndex = "100";
      if (onClick) {
        this.div.addEventListener("click", (e) => {
          e.stopPropagation();
          onClick();
        });
      }
    }

    onAdd() {
      const panes = this.getPanes();
      panes?.overlayMouseTarget.appendChild(this.div);
    }

    draw() {
      const overlayProjection = this.getProjection();
      if (!overlayProjection) return;

      const point = overlayProjection.fromLatLngToDivPixel(this.pos);
      if (point) {
        this.div.style.left = point.x + "px";
        this.div.style.top = point.y + "px";
        this.div.style.transform = "translate(-50%, -100%)";
      }
    }

    onRemove() {
      if (this.div.parentNode) {
        this.div.parentNode.removeChild(this.div);
      }
    }

    setPosition(newPos: google.maps.LatLngLiteral) {
      this.pos = new google.maps.LatLng(newPos.lat, newPos.lng);
      this.draw();
    }
  }

  const overlay = new CustomHTMLOverlay(position, content);
  overlay.setMap(map);
  return overlay;
}
