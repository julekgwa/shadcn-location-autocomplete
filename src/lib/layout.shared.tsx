import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div>
          <img
            src={'/logo-dark.svg'}
            alt="Fumadocs Logo"
            className="hidden h-8 w-auto dark:block"
          />
          <img
            src={'/logo-light.svg'}
            alt="Fumadocs Logo"
            className="h-8 w-auto dark:hidden"
          />
        </div>
      ),
    },
  }
}
