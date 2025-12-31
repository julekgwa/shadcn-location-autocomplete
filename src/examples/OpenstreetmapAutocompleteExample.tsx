import React from "react";
import { LocationAutocomplete } from "@/components/ui/location-autocomplete";
import { fetchOpenStreetMapSuggestions } from "@/lib/autocomplete/providers/openstreetmap";

export function OpenstreetmapAutocompleteExample() {
  const [value, setValue] = React.useState<string>("");

  return (
    <LocationAutocomplete
      value={value}
      onQueryChange={setValue}
      variant={"detached"}
      fetchSuggestions={fetchOpenStreetMapSuggestions}
      onSelect={(val) => {
        console.log(val.raw);
      }}
    />
  );
}
