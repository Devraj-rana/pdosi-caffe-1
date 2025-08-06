'use client';

import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import {useEffect, useState} from "react";

export default function ContactMap() {
  const [apiKey, setApiKey] = useState<string | undefined>(undefined);

  useEffect(() => {
    // This will run only on the client, where process.env is available
    setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
  }, []);

  const position = { lat: 28.6139, lng: 77.2090 }; // Example: Delhi, India

  if (apiKey === undefined) {
    // Still loading the key, or key is not set.
    return (
        <div className="w-full h-full bg-muted flex items-center justify-center rounded-lg">
            <p className="text-muted-foreground">Loading Map...</p>
        </div>
    )
  }

  if (!apiKey) {
    return (
      <div className="w-full h-full bg-muted flex flex-col items-center justify-center text-center p-4 rounded-lg">
        <p className="font-semibold">Could not load map</p>
        <p className="text-muted-foreground text-sm">Google Maps API Key is missing. Please add it to your environment variables.</p>
        <p className="text-muted-foreground text-xs mt-2">`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`</p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={position}
        defaultZoom={15}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId="podosi_cafe_map"
        className="w-full h-full"
      >
        <AdvancedMarker position={position} title="Podosi Cafe">
           <span className="text-3xl">☕</span>
        </AdvancedMarker>
      </Map>
    </APIProvider>
  );
}
