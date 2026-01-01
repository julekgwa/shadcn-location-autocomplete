import type React from 'react'

export function Preview({ children }: React.PropsWithChildren) {
  return (
    <div className={'bg-card border rounded-xl shadow-sm p-4 min-h-50'}>
      {children}
    </div>
  )
}
