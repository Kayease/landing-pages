import { render, screen } from '@testing-library/react'
import { StatsCard } from '@/components/StatsCard'
import { DollarSign } from 'lucide-react'

describe('StatsCard', () => {
  it('renders title and value', () => {
    render(
      <StatsCard
        title="Revenue"
        value="$12,300"
        change="+12%"
        changeType="increase"
        icon={DollarSign}
      />
    )
    expect(screen.getByText('Revenue')).toBeInTheDocument()
    expect(screen.getByText('$12,300')).toBeInTheDocument()
  })
})


