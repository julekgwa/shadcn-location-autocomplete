import {cva} from 'class-variance-authority'
import React from 'react'
import {useDebouncedCallback} from 'use-debounce'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'

const commandVariants = cva('**:data-[slot=command-input-wrapper]:px-0', {
	variants: {
		variant: {
			default:
				'border-input/30 border-2 px-0 **:data-[slot=input-group]:border-0 **:data-[slot=input-group]:bg-popover! **:data-[slot=command-input-wrapper]:border-b',
			detached:
				'**:data-[slot=command-list]:border **:data-[slot=command-list]:rounded-lg space-y-2',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

const commandItemVariants = cva('cursor-pointer [&_p]:m-0! bg-popover! hover:bg-muted!', {
	variants: {
		variant: {
			default: '',
			detached: '',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

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
	apiKey?: string
	baseUrl?: string
}

export interface LocationSuggestion<Raw = unknown> {
	/**
	 * Unique identifier for the location.
	 * Usually comes from the provider (e.g., OpenStreetMap `place_id`, Google `place_id`).
	 * Should be unique across all suggestions.
	 */
	place_id: string;

	/**
	 * Primary label shown in the UI (e.g., street name, point of interest, or place name).
	 * This is the main text rendered in the autocomplete suggestion list.
	 */
	label: string;

	/**
	 * Secondary address context (optional).
	 * Typically contains city, state, country, or other contextual info.
	 * Displayed below the `label` in a smaller or muted font.
	 */
	addressInfo?: string;

	/**
	 * Full provider-formatted address.
	 * The canonical string returned by the geocoding provider.
	 * Can be used as a fallback if `label` or `addressInfo` are not available,
	 * or for copy/paste, analytics, and logging.
	 */
	formattedAddress: string;

	/** Latitude coordinate of the location. */
	lat: string;

	/** Longitude coordinate of the location. */
	lon: string;

	/**
	 * Type of the location.
	 * Example values: "address", "poi", "city", "suburb".
	 * Useful for filtering or custom rendering in your autocomplete component.
	 */
	type: string;

	/**
	 * Importance score of the location.
	 * Provided by the geocoding service to indicate relevance.
	 * Can be used to sort or prioritize suggestions.
	 */
	importance: number;

	/**
	 * Optional raw provider response.
	 * Allows consumers to access any provider-specific fields not mapped to standard props.
	 * Useful if additional metadata or details are needed.
	 */
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
	value: string
	/**
	 * Callback fired when the input value changes.
	 * @param value - The updated input string
	 */
	onQueryChange: (value: string) => void
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
	fetchSuggestions: (query: string) => Promise<Array<LocationSuggestion<Raw>>>
	/**
	 * Callback fired when the user selects a suggestion.
	 *
	 * The `location` object includes a `raw` property containing
	 * the original backend response item.
	 *
	 * @param location - The selected suggestion
	 */
	onSelect: (location: LocationSuggestion<Raw>) => void
	/**
	 * Controls the UX styling of the component.
	 *
	 * - "default": The input and results are visually connected; main container has border.
	 * - "detached": Results are separated from the input; input container may have border; main container background may differ.
	 */
	variant?: 'default' | 'detached'
	/**
	 * Debounce delay in milliseconds before calling `fetchSuggestions`.
	 * Defaults to 300ms if not provided.
	 */
	debounceMs?: number
	/**
	 * Optional error handler for fetch failures.
	 * @param error
	 */
	onError?: (error: Error) => void
	/**
	 * Placeholder text for the input field
	 * @default "Search for a location..."
	 */
	placeholder?: string
}

function LocationAutocomplete<Raw = unknown>({
																							 variant = 'default',
																							 value = '',
																							 onQueryChange,
																							 onSelect,
																							 fetchSuggestions,
																							 debounceMs = 300,
																							 onError,
																							 placeholder = 'Search for a location...',
																						 }: LocationAutocompleteProps<Raw>) {
	const [items, setItems] = React.useState<Array<LocationSuggestion<Raw>>>([])
	const [open, setOpen] = React.useState(false)
	const [isLoading, setIsLoading] = React.useState(false)

	const debounced = useDebouncedCallback(async (value) => {
		try {
			setIsLoading(true)
			const results = await fetchSuggestions(value)
			setItems(results)
		} catch (error) {
			onError?.(error as Error)
		} finally {
			setIsLoading(false)
		}
	}, debounceMs)

	return (
		<Command shouldFilter={false} className={commandVariants({variant})}>
			<CommandInput
				onValueChange={(value) => {
					onQueryChange?.(value)
					setOpen(true)
					debounced(value)
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
									value={item.formattedAddress}
									data-selected={false}
									className={commandItemVariants({variant})}
									onSelect={() => {
										onQueryChange?.(item.formattedAddress)
										onSelect(item)
										setOpen(false)
									}}
								>
									<div className={'space-y-2'}>
										<p>{item.label}</p>
										{item.addressInfo && <p className={'text-muted-foreground text-xs'}>{item.addressInfo}</p>}
									</div>
								</CommandItem>
							))}
						</CommandGroup>
					)}
				</CommandList>
			)}
		</Command>
	)
}

export {LocationAutocomplete}
export type {LocationAutocompleteProps}
