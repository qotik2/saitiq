import girlGif from '../assets/girl.gif';

export const InfoBlock = () => {
  return (
    <div className="section-block steam-favorite-block">
      <div className="steam-favorite-title">
        Заголовок блока
        <img src={girlGif} alt="girl gif" style={{ height: 46, marginLeft: 6, verticalAlign: 'middle', borderRadius: 8 }} />
        <button 
          onClick={() => console.log('Обновить данные')}
          style={{
            background: 'rgba(167, 170, 255, 0.2)',
            border: '1px solid rgba(167, 170, 255, 0.3)',
            borderRadius: '8px',
            padding: '4px 8px',
            color: '#a7aaff',
            fontSize: '0.8rem',
            cursor: 'pointer',
            marginLeft: '12px',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(167, 170, 255, 0.3)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(167, 170, 255, 0.2)'}
        >
          🔄 Обновить
        </button>
      </div>
      <div className="steam-favorite-content channel-flex">
        <div style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <div 
            className="steam-favorite-img"
            style={{
              width: '180px',
              height: '180px',
              backgroundColor: 'rgba(167, 170, 255, 0.1)',
              border: '2px dashed rgba(167, 170, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#a7aaff',
              fontSize: '0.9rem'
            }}
          >
            Изображение
          </div>
        </div>
        <div className="steam-favorite-main">
          <div className="steam-favorite-name">
            Название
          </div>
          <div className="steam-favorite-stats">
            <div>
              <span className="steam-favorite-number">
                0
              </span>
              <span className="steam-favorite-label">Метрика</span>
            </div>
            <div className="channel-reach-block">
              <div className="channel-reach-row"><span className="channel-reach-err">0% ERR</span></div>
            </div>
          </div>
        </div>
        <div className="channel-divider" />
        <div className="featured-articles-block inline-articles">
          <div className="featured-articles-title">Список</div>
          <ul className="featured-articles-list">
            <li className="featured-article-item">
              <span className="featured-article-link">Элемент 1</span>
            </li>
            <li className="featured-article-item">
              <span className="featured-article-link">Элемент 2</span>
            </li>
            <li className="featured-article-item">
              <span className="featured-article-link">Элемент 3</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 