export const statuses = [
  {value: 'new', label: 'Новая'},
  {value: 'active', label: 'Банкет назначен'},
  {value: 'completed', label: 'Банкет завершен'}
]

export function statusLabel(value) {
  return statuses.find(status => status.value === value)?.label || value
}