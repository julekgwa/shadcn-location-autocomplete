import { cva } from "class-variance-authority";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const commandVariants = cva("**:data-[slot=command-input-wrapper]:px-0", {
  variants: {
    variant: {
      default:
        "border-input/30 border-2 px-0 **:data-[slot=input-group]:border-0 bg-popover **:data-[slot=input-group]:bg-popover! **:data-[slot=command-input-wrapper]:border-b",
      detached:
        "**:data-[slot=command-group]:bg-muted **:data-[slot=command-group]:rounded-lg space-y-2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const commandItemVariants = cva("cursor-pointer", {
  variants: {
    variant: {
      default: "bg-popover! hover:bg-muted!",
      detached: "hover:bg-input!",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/**
 * Configuration options for a location provider or API service.
 *
 * This interface defines optional settings that can be passed when
 * initializing a provider for `LocationAutocomplete`
 *
 * @property apiKey - Optional API key for the provider.
 *   Required for providers that need authentication (e.g., Google Maps, Mapbox).
 *
 * @property baseUrl - Optional base URL for the API.
 *   Useful if using a custom endpoint or proxy server.
 *
 * Example usage:
 * const config: ProviderConfig = {
 *   apiKey: 'YOUR_API_KEY_HERE',
 *   baseUrl: 'https://api.example.com'
 * }
 */
export interface ProviderConfig {
  apiKey?: string;
  baseUrl?: string;
}

export interface LocationSuggestion<Raw = unknown> {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
  type: string;
  importance: number;
  raw?: Raw;
}

/**
 * Props for the LocationAutocomplete component.
 *
 * This component is generic and provider-agnostic.
 * Use the `Raw` generic type to type the original backend response if needed.
 *
 * @template Raw - The type of the raw backend response item. Defaults to `unknown`.
 */
interface LocationAutocompleteProps<Raw = unknown> {
  /**
   * The current value of the input field.
   * Typically, a string representing what the user has typed.
   */
  value: string;
  /**
   * Callback fired when the input value changes.
   * @param value - The updated input string
   */
  onQueryChange: (value: string) => void;
  /**
   * Function to fetch location suggestions from a backend.
   * Should return a Promise resolving to an array of `LocationSuggestion<Raw>`.
   *
   * @param query - The current input value
   * @returns A Promise of location suggestions
   *
   * Example:
   *   const results = await fetchSuggestions(query)
   *   results.map(location => location.display_name)
   */
  fetchSuggestions: (query: string) => Promise<LocationSuggestion<Raw>[]>;
  /**
   * Callback fired when the user selects a suggestion.
   *
   * The `location` object includes a `raw` property containing
   * the original backend response item.
   *
   * @param location - The selected suggestion
   */
  onSelect: (location: LocationSuggestion<Raw>) => void;
  /**
   * Controls the UX styling of the component.
   *
   * - "default": The input and results are visually connected; main container has border.
   * - "detached": Results are separated from the input; input container may have border; main container background may differ.
   */
  variant?: "default" | "detached";
  /**
   * Debounce delay in milliseconds before calling `fetchSuggestions`.
   * Defaults to 300ms if not provided.
   */
  debounceMs?: number;
  /**
   * Optional error handler for fetch failures.
   * @param error
   */
  onError?: (error: Error) => void;
  /**
   * Placeholder text for the input field
   * @default "Search for a location..."
   */
  placeholder?: string;
}

function LocationAutocomplete<Raw = unknown>({
  variant = "default",
  value = "",
  onQueryChange,
  onSelect,
  fetchSuggestions,
  debounceMs = 300,
  onError,
  placeholder = "Search for a location...",
}: LocationAutocompleteProps<Raw>) {
  const [items, setItems] = React.useState<LocationSuggestion<Raw>[]>([]);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const debounced = useDebouncedCallback(async (value) => {
    try {
      setIsLoading(true);
      const results = await fetchSuggestions(value);
      setItems(results);
    } catch (error) {
      onError?.(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, debounceMs);

  return (
    <Command shouldFilter={false} className={commandVariants({ variant })}>
      <CommandInput
        onValueChange={(value) => {
          onQueryChange?.(value);
          setOpen(true);
          debounced(value);
        }}
        value={value}
        placeholder={placeholder}
      />
      {open && (
        <CommandList>
          {!isLoading && <CommandEmpty>No results found.</CommandEmpty>}
          {items.length > 0 && (
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.place_id}
                  className={commandItemVariants({ variant })}
                  onSelect={() => {
                    onQueryChange?.(item.display_name);
                    onSelect(item);
                    setOpen(false);
                  }}
                >
                  {item.display_name || "Unnamed location"}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      )}
    </Command>
  );
}

export { LocationAutocomplete };
export type { LocationAutocompleteProps };
