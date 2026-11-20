function TarjetaModulo({ title, level, desc, img, onSeleccionar }) {
  return (
    <div style={{ 
      backgroundColor: 'white', 
      borderRadius: '12px', 
      width: '100%',
      maxWidth: '320px', 
      padding: '25px', 
      boxShadow: '0 5px 20px rgba(0,0,0,0.05)', 
      textAlign: 'left',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div>
        <div style={{ height: '160px', backgroundColor: '#e9ecef', borderRadius: '8px', marginBottom: '20px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img 
            src={img} 
            alt={title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            onError={(e) => { e.target.style.display = 'none'; }} 
          />
        </div>
        <h3 style={{ color: '#0056b3', fontSize: '1.3rem', marginBottom: '10px' }}>{title}</h3>
        <span style={{ display: 'inline-block', backgroundColor: '#eef2f5', padding: '5px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', color: '#333', marginBottom: '15px' }}>
          Nivel: {level}
        </span>
        <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '20px' }}>{desc}</p>
      </div>

      {onSeleccionar && (
        <button 
          onClick={onSeleccionar}
          style={{ width: '100%', backgroundColor: '#0056b3', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Ver contenido del módulo
        </button>
      )}
    </div>
  );
}

export default TarjetaModulo;
