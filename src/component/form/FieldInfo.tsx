import type { FieldApi } from "@tanstack/react-form"

/**
 * Utility component to display TanStack Form field meta information, like error 
 * and pending.
 */
export default function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  const { touchedErrors, isValidating } = field.state.meta
  return (
    <div>
      {touchedErrors && <span className="text-red-500 text-sm">{touchedErrors}</span>}
      {isValidating && <span className="text-secondary-foreground/80 text-sm">Validating...</span>}
    </div>
  )
}