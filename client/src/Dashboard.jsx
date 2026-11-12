import { useEffect, useState } from "react";
import { api } from "./api.js";
import { statusLabel } from "./statuses.js";
import Review from "./Review.jsx";
import Slider from "./Slider.jsx";

const slides = [
  { src: '/images/slide-1.webp', alt: 'Изображение 1' },
  { src: '/images/slide-2.webp', alt: 'Изображение 2' },
  { src: '/images/slide-3.webp', alt: 'Изображение 3' },
  { src: '/images/slide-4.webp', alt: 'Изображение 4' },
]


export default function Dashboard({ user }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    api('/bankets').then(data => { if (active) setItems(data) })
      .catch(err => { if (active) setError(err.message) })
      .finally(() => { if (active) setLoading(false) })
    
    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <h1>Личный кабинет</h1>
      <p>Пользователь: {user.login}</p>
      <Slider slides={slides}/>
      <div className="row">
        <h2>Мои записи</h2>
        <a href="/">Обновить список</a>
      </div>

      {loading && <p>Загрузка...</p>}
      {error && <p className="form-error" role="alert">{error}</p>}
      {!loading && !error && items.length === 0 && (
        <p>Записей пока нет. <a href="/new">Добавить запись</a></p>
      )}
      <div className="grid cols-2">
        {items.map(item => (
          <article key={item.id} className="card stack">
            <h3>{item.venue}</h3>
            <p>{item.event_date}</p>
            <p>{item.payment_method}</p>
            <p>Статус: {statusLabel(item.status)}</p>
            <Review item={item} />
          </article>
        ))}
      </div>
    </>
  )
}