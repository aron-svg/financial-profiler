import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

export type RiskProfile = 'Prudente' | 'Equilibree' | 'Dynamique'
export type Horizon = 3 | 5 | 10 | 20

export type SimulationData = {
  income: number
  fixedExpenses: number
  variableExpenses: number
  horizon: Horizon
  risk: RiskProfile
}

type SimulationContextValue = {
  data: SimulationData
  update: (changes: Partial<SimulationData>) => void
  monthlySavings: number
  savingsRate: number
  reset: () => void
}

const initialData: SimulationData = {
  income: 3200,
  fixedExpenses: 1400,
  variableExpenses: 500,
  horizon: 10,
  risk: 'Equilibree',
}

const SimulationContext = createContext<SimulationContextValue | null>(null)

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SimulationData>(() => {
    const saved = window.localStorage.getItem('capital-clair-simulation')
    return saved ? { ...initialData, ...JSON.parse(saved) } : initialData
  })

  const update = (changes: Partial<SimulationData>) => {
    setData((current) => {
      const next = { ...current, ...changes }
      window.localStorage.setItem('capital-clair-simulation', JSON.stringify(next))
      return next
    })
  }

  const value = useMemo(() => ({
    data,
    update,
    monthlySavings: Math.max(0, data.income - data.fixedExpenses - data.variableExpenses),
    savingsRate: data.income > 0 ? Math.max(0, data.income - data.fixedExpenses - data.variableExpenses) / data.income : 0,
    reset: () => {
      window.localStorage.removeItem('capital-clair-simulation')
      setData(initialData)
    },
  }), [data])

  return <SimulationContext.Provider value={value}>{children}</SimulationContext.Provider>
}

export function useSimulation() {
  const context = useContext(SimulationContext)
  if (!context) throw new Error('useSimulation must be used inside SimulationProvider')
  return context
}
