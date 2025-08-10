import * as React from 'react';

// Reusable INR currency formatter
export const formatINR = (
	value: number,
	options?: Intl.NumberFormatOptions
): string => {
	// Try using Intl.NumberFormat first
	try {
		return new Intl.NumberFormat('en-IN', {
			style: 'currency',
			currency: 'INR',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
			...options,
		}).format(value);
	} catch (error) {
		// Fallback to manual formatting if Intl fails
		return `₹${value.toFixed(2)}`;
	}
};

// Alternative simple formatter that always uses ₹ symbol
export const formatINRSimple = (value: number): string => {
	return `₹${value.toFixed(2)}`;
};

// JSX component for currency display with proper font fallback
export const CurrencyDisplay = ({ amount }: { amount: number }) => {
	return React.createElement('span', { className: 'currency' }, `₹${amount.toFixed(2)}`);
};

// Shorthand alias
export const inr = formatINR;

