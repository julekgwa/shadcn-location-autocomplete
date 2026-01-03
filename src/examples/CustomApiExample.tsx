import React from 'react'
import type {LocationSuggestion} from '@/components/ui/location-autocomplete'
import {LocationAutocomplete} from '@/components/ui/location-autocomplete'

/**
 * STEP 1: Define the response type
 *
 * If your backend already provides a TypeScript type, use it directly.
 * Example backend response type:
 */
export interface MyAddressResponse {
	id: string
	label: string
	coordinates: { latitude: number; longitude: number }
	category: 'street' | 'suburb' | 'city' | 'poi'
	relevance: number
	components: {
		street?: string
		suburb?: string
		city: string
		province?: string
		postalCode?: string
		country: string
	}
	metadata: {
		provider: string
		confidence: number
	}
}

/**
 * STEP 2: Create a fetch function
 *
 * - TanStack Start (server-side):
 *   use `createServerFn` to fetch data from your backend.
 *
 * - Next.js / React:
 *   just use a normal async function or API route.
 *
 * Example TanStack Start usage:
 * import { createServerFn } from '@tanstack/react-start/server'
 * export const fetchAddresses = createServerFn({ method: 'GET' })
 *   .inputValidator((data: { query: string }) => data)
 *   .handler(async ({ data }) => {
 *     const res = await fetch(`https://my-api.com/addresses?q=${encodeURIComponent(data.query)}`)
 *     const addresses: MyAddressResponse[] = await res.json()
 *     return addresses
 *   })
 *
 * Example Next.js:
 * export async function fetchAddresses(query: string): Promise<MyAddressResponse[]> {
 *   const res = await fetch(`https://my-api.com/addresses?q=${encodeURIComponent(query)}`)
 *   return res.json()
 * }
 */

async function fetchAddresses(
	query: string,
): Promise<Array<MyAddressResponse>> {
	await new Promise((r) => setTimeout(r, 300))

	if (!query.trim()) return []

	return [
		{
			id: 'addr_001',
			label: '123 Apple Street, Sandton, Johannesburg',
			coordinates: {latitude: -26.1076, longitude: 28.0567},
			category: 'street' as const,
			relevance: 0.92,
			components: {
				street: 'Apple Street',
				suburb: 'Sandton',
				city: 'Johannesburg',
				province: 'Gauteng',
				postalCode: '2196',
				country: 'South Africa',
			},
			metadata: {provider: 'internal', confidence: 0.88},
		},
		{
			id: 'addr_002',
			label: 'Cape Town City Centre, Western Cape',
			coordinates: {latitude: -33.9249, longitude: 18.4241},
			category: 'city' as const,
			relevance: 0.86,
			components: {
				city: 'Cape Town',
				province: 'Western Cape',
				country: 'South Africa',
			},
			metadata: {provider: 'internal', confidence: 0.9},
		},
		{
			id: 'addr_003',
			label: 'Durban North, KwaZulu-Natal',
			coordinates: {latitude: -29.8006, longitude: 31.0218},
			category: 'suburb' as const,
			relevance: 0.81,
			components: {
				suburb: 'Durban North',
				city: 'Durban',
				province: 'KwaZulu-Natal',
				country: 'South Africa',
			},
			metadata: {provider: 'internal', confidence: 0.85},
		},
	].filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
}

/**
 * STEP 3: Create a mapper function
 *
 * Maps your backend response to LocationSuggestion<Raw> so the autocomplete component can consume it.
 *
 * Example:
 */
export function mapToLocationSuggestion(
	item: MyAddressResponse,
): LocationSuggestion<MyAddressResponse> {
	return {
		addressInfo: [
			item.components.suburb,
			item.components.city,
			item.components.postalCode,
			item.components.province,
			item.components.country,
		]
			.filter(Boolean)
			.join(', '),
		label: item.label,
		place_id: item.id,
		formattedAddress: item.label,
		lat: String(item.coordinates.latitude),
		lon: String(item.coordinates.longitude),
		type: item.category,
		importance: item.relevance,
		raw: item
	}
}

async function getSuggestions(
	query: string,
): Promise<Array<LocationSuggestion<MyAddressResponse>>> {
	const results = await fetchAddresses(query)
	return results.map(mapToLocationSuggestion)
}

export function CustomApiExample() {
	const [value, setValue] = React.useState<string>()

	return (
		<LocationAutocomplete
			value={value || ''}
			onQueryChange={setValue}
			variant={'detached'}
			placeholder={'type Johannesburg, Cape Town or Durban'}
			fetchSuggestions={getSuggestions}
			onSelect={(location) => {
				console.log(location)
			}}
		/>
	)
}
