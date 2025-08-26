'use client'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from '@heroicons/react/24/outline'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

interface DateRangePickerProps {
  startDate: Date | null
  endDate: Date | null
  onChange: (start: Date | null, end: Date | null) => void
}

export function DateRangePicker({ startDate, endDate, onChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRange, setSelectedRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: startDate || undefined,
    to: endDate || undefined
  })

  useEffect(() => {
    setSelectedRange({
      from: startDate || undefined,
      to: endDate || undefined
    })
  }, [startDate, endDate])

  const handleSelect = (range: { from: Date | undefined; to: Date | undefined }) => {
    setSelectedRange(range)
    onChange(range.from || null, range.to || null)
    if (range.from && range.to) {
      setIsOpen(false)
    }
  }

  const handleClear = () => {
    setSelectedRange({ from: undefined, to: undefined })
    onChange(null, null)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700">Date Range</label>
      <div className="mt-1">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <CalendarIcon className="h-5 w-5 mr-2 text-gray-400" />
          {selectedRange.from && selectedRange.to ? (
            <span>
              {format(selectedRange.from, 'dd MMM yyyy')} -{' '}
              {format(selectedRange.to, 'dd MMM yyyy')}
            </span>
          ) : (
            <span>Select date range</span>
          )}
        </button>
        {selectedRange.from && selectedRange.to && (
          <button
            type="button"
            onClick={handleClear}
            className="ml-2 text-sm text-gray-500 hover:text-gray-700"
          >
            Clear
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 bg-white shadow-lg rounded-md border border-gray-200">
          <DayPicker
            mode="range"
            defaultMonth={startDate || new Date()}
            selected={selectedRange}
            onSelect={handleSelect}
            numberOfMonths={2}
            className="p-4"
          />
        </div>
      )}
    </div>
  )
}
