import React from 'react';

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

// HTML entity based formatter for maximum compatibility
export const formatINREntity = (value: number): string => {
	return `&#8377;${value.toFixed(2)}`;
};

// JSX component for currency display with proper font fallback and HTML entity
export const CurrencyDisplay = ({ amount, className = "" }: { amount: number; className?: string }) => {
	return (
		<span 
			className={`font-currency ${className}`}
			dangerouslySetInnerHTML={{ 
				__html: `&#8377;${amount.toFixed(2)}` 
			}}
		/>
	);
};

// React component with Unicode fallback
export const CurrencySpan = ({ amount, className = "" }: { amount: number; className?: string }) => {
	return (
		<span className={`font-currency ${className}`}>
			₹{amount.toFixed(2)}
		</span>
	);
};

// Shorthand alias
export const inr = formatINR;

