import React, { useState, useRef } from 'react';

export interface AutocompleteProps<T> {
    value: string;
    items: T[];
    placeholder?: string;
    inputClassName?: string;
    containerClassName?: string;
    onChangeText: (text: string) => void;
    onSelect: (item: T) => void;
    keyExtractor: (item: T) => React.Key;
    renderItem: (item: T, isHighlighted: boolean) => React.ReactNode;
}

export function Autocomplete<T>({ 
    value, items, placeholder, inputClassName, containerClassName = "relative", 
    onChangeText, onSelect, keyExtractor, renderItem 
}: AutocompleteProps<T>) {
    const [open, setOpen] = useState(false);
    const [highlight, setHighlight] = useState(0);
    const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const choose = (item: T) => {
        onSelect(item);
        setOpen(false);
    };

    return (
        <div className={containerClassName}>
            <input
                type="text"
                value={value}
                onChange={(e) => { onChangeText(e.target.value); setOpen(true); setHighlight(0); }}
                onFocus={() => setOpen(true)}
                onBlur={() => { blurTimer.current = setTimeout(() => setOpen(false), 150); }}
                onKeyDown={(e) => {
                    if (!open || items.length === 0) return;
                    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlight(h => Math.min(h + 1, items.length - 1)); }
                    else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlight(h => Math.max(h - 1, 0)); }
                    else if (e.key === 'Enter') { e.preventDefault(); choose(items[highlight]); }
                    else if (e.key === 'Escape') { setOpen(false); }
                }}
                placeholder={placeholder}
                autoComplete="off"
                className={inputClassName}
            />
            {open && items.length > 0 && (
                <div className="absolute z-40 mt-1 w-full max-h-56 overflow-y-auto bg-gray-900 border border-gray-700 rounded-lg shadow-2xl">
                    {items.map((item, i) => (
                        <div
                            key={keyExtractor(item)}
                            onMouseDown={(e) => { e.preventDefault(); if (blurTimer.current) clearTimeout(blurTimer.current); choose(item); }}
                            onMouseEnter={() => setHighlight(i)}
                            className="cursor-pointer"
                        >
                            {renderItem(item, i === highlight)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
