'use client'
import { useState, useEffect } from 'react'
import { format, parse } from 'date-fns'

interface TimePickerProps {
  value?: string
  onChange: (time: string) => void
  className?: string
  error?: string
}

export function TimePicker({ value, onChange, className = '', error }: TimePickerProps) {
  const [hours, setHours] = useState('00')
  const [minutes, setMinutes] = useState('00')
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM')

  useEffect(() => {
    if (value) {
      try {
        let date: Date | null = null
        
        // Try multiple time formats from legacy database
        const timeFormats = [
          'HH:mm',        // 24-hour: "14:30"
          'H:mm',         // 24-hour without leading zero: "2:30"
          'h:mm a',       // 12-hour with AM/PM: "2:30 PM"
          'hh:mm a',      // 12-hour with leading zero: "02:30 PM"
          'h:mm A',       // 12-hour with AM/PM uppercase: "2:30 PM"
          'hh:mm A',      // 12-hour with leading zero uppercase: "02:30 PM"
          'HH:mm:ss',     // 24-hour with seconds: "14:30:00"
          'H:mm:ss',      // 24-hour with seconds, no leading zero: "2:30:00"
        ]
        
        // Clean the value - remove extra spaces and normalize
        const cleanValue = value.trim().replace(/\s+/g, ' ')
        
        // Try parsing with each format
        for (const format of timeFormats) {
          try {
            date = parse(cleanValue, format, new Date())
            if (!isNaN(date.getTime())) {
              break // Successfully parsed
            }
          } catch (e) {
            continue // Try next format
          }
        }
        
        // If all parsing failed, try manual parsing for common legacy formats
        if (!date || isNaN(date.getTime())) {
          // Try to manually parse formats like "2:00 PM", "14:30", etc.
          const manuallyParsed = parseTimeManually(cleanValue)
          if (manuallyParsed) {
            date = manuallyParsed
          }
        }
        
        if (date && !isNaN(date.getTime())) {
          const formatted = format(date, 'hh:mm a')
          const [time, ampm] = formatted.split(' ')
          const [hr, min] = time.split(':')
          setHours(hr)
          setMinutes(min)
          setPeriod(ampm as 'AM' | 'PM')
        } else {
          // Fallback to default values if parsing fails
          console.warn(`Failed to parse time value: "${value}". Using default 12:00 PM`)
          setHours('12')
          setMinutes('00')
          setPeriod('PM')
        }
      } catch (error) {
        console.error('TimePicker parsing error:', error, 'Value:', value)
        // Fallback to default values
        setHours('12')
        setMinutes('00')
        setPeriod('PM')
      }
    }
  }, [value])

  // Manual parsing function for edge cases
  const parseTimeManually = (timeStr: string): Date | null => {
    try {
      // Remove common variations and normalize
      let normalized = timeStr.toLowerCase().trim()
      
      // Handle formats like "2pm", "2 pm", "2:30pm", etc.
      const ampmMatch = normalized.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/i)
      if (ampmMatch) {
        let hours = parseInt(ampmMatch[1])
        const minutes = parseInt(ampmMatch[2] || '0')
        const period = ampmMatch[3].toUpperCase()
        
        if (period === 'PM' && hours !== 12) hours += 12
        if (period === 'AM' && hours === 12) hours = 0
        
        const date = new Date()
        date.setHours(hours, minutes, 0, 0)
        return date
      }
      
      // Handle 24-hour formats like "14:30", "2:30"
      const twentyFourMatch = normalized.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/)
      if (twentyFourMatch) {
        const hours = parseInt(twentyFourMatch[1])
        const minutes = parseInt(twentyFourMatch[2])
        
        if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
          const date = new Date()
          date.setHours(hours, minutes, 0, 0)
          return date
        }
      }
      
      return null
    } catch (error) {
      return null
    }
  }

  const handleChange = (newHours: string, newMinutes: string, newPeriod: 'AM' | 'PM') => {
    let hrs = parseInt(newHours)
    if (newPeriod === 'PM' && hrs !== 12) hrs += 12
    if (newPeriod === 'AM' && hrs === 12) hrs = 0
    
    const timeString = `${hrs.toString().padStart(2, '0')}:${newMinutes}`
    onChange(timeString)
  }

  return (
    <div className="flex items-center space-x-2">
      <select
        value={hours}
        onChange={(e) => {
          setHours(e.target.value)
          handleChange(e.target.value, minutes, period)
        }}
        className={`rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${className}`}
      >
        {Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')).map((hour) => (
          <option key={hour} value={hour}>
            {hour}
          </option>
        ))}
      </select>
      <span>:</span>
      <select
        value={minutes}
        onChange={(e) => {
          setMinutes(e.target.value)
          handleChange(hours, e.target.value, period)
        }}
        className={`rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${className}`}
      >
        {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')).map((minute) => (
          <option key={minute} value={minute}>
            {minute}
          </option>
        ))}
      </select>
      <select
        value={period}
        onChange={(e) => {
          setPeriod(e.target.value as 'AM' | 'PM')
          handleChange(hours, minutes, e.target.value as 'AM' | 'PM')
        }}
        className={`rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${className}`}
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  )
}