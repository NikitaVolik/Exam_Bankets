import { useState } from "react";
import { api } from "./api.js";

export default function NewItemPage() {
  const [form, setForm] = useState({
    venue: '',
    event_date: '',
    payment_method: ''
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  function change(event) {
    const { name, value } = event.target
    setForm(current => ({ ...current, [name]: value }))
    setMessage('')
  }

  async function submit(event) {
    event.preventDefault()

    if (saving) return

    setSaving(true)
    setError('')
    setMessage('')
    
    try {
      const data = await api('/bankets', {
        method: 'POST',
        body: JSON.stringify(form)
      })

      setForm({
        venue: '',
        event_date: '',
        payment_method: ''
      })
      setMessage(`${data.message}. Номер: ${data.id}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <h1>Новый банкет</h1>
      <form className="card stack" onSubmit={submit}>
        <label className="field">
          <span>Помещение</span>
          <select
            name="venue"
            value={form.venue}
            onChange={change}
            required
            disabled={saving}
          >
            <option value="" disabled hidden>Выберите помещение</option>
            <option value="Зал">Зал</option>
            <option value="Ресторан">Ресторан</option>
            <option value="Летняя веранда">Летняя веранда</option>
            <option value="Закрытая веранда">Закрытая веранда</option>
          </select>
        </label>
        <label className="field">
          <span>Дата банкета</span>
          <input
            name="event_date"
            value={form.event_date}
            placeholder="ДД.ММ.ГГГГ"
            onChange={change}
            required
            maxLength={10}
            disabled={saving}
          />
        </label>
        <label className="field">
          <span>Способ оплаты</span>
          <select
            name="payment_method"
            value={form.payment_method}
            onChange={change}
            required
            disabled={saving}
          >
            <option value="" disabled hidden>Выберите способ оплаты</option>
            <option value="Наличные">Наличные</option>
            <option value="Банковская карта">Банковская карта</option>
          </select>
        </label>
        {error && <p className="form-error" role="alert">{error}</p>}
        {message && <p className="form-message" role="status">{message} <a href="/">Мои банкеты</a></p>}
        <button className="btn" disabled={saving}>
          {saving ? "Сохранение.." : "Добавить"}
        </button>
      </form>
    </>
  )
}