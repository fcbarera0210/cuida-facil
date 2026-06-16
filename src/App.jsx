import React, { useState, useEffect } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');

  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [emergencyCountdown, setEmergencyCountdown] = useState(5);
  const [activeCall, setActiveCall] = useState(null);
  const [isSharingLocation, setIsSharingLocation] = useState(false);
  const [notification, setNotification] = useState(null);

  const user = {
    nombre: 'Don Pedro',
    edad: 78,
    avatar: '👴',
  };

  const contactosFamiliares = [
    { id: 1, nombre: 'Ana (Hija)', relacion: 'Hija', telefono: '9 1234 5678', avatar: '👩', color: 'from-pink-100 to-pink-200' },
    { id: 2, nombre: 'Luis (Hijo)', relacion: 'Hijo', telefono: '9 8765 4321', avatar: '👨', color: 'from-blue-100 to-blue-200' },
    { id: 3, nombre: 'Marta (Cuidadora)', relacion: 'Cuidadora principal', telefono: '9 5555 4444', avatar: '🧑‍⚕️', color: 'from-teal-100 to-teal-200' },
  ];

  const contactoMedico = {
    id: 4,
    nombre: 'Dr. Gómez (Médico)',
    relacion: 'Geriatra',
    telefono: '9 9999 8888',
    avatar: '👨‍⚕️',
    color: 'from-purple-100 to-purple-200',
  };

  const todosLosContactos = [...contactosFamiliares, contactoMedico];

  useEffect(() => {
    let timer;
    if (isEmergencyActive && emergencyCountdown > 0) {
      timer = setTimeout(() => {
        setEmergencyCountdown((prev) => prev - 1);
      }, 1000);
    } else if (isEmergencyActive && emergencyCountdown === 0) {
      showNotification('🚨 ¡Alerta enviada a tu familia y cuidador!');
    }
    return () => clearTimeout(timer);
  }, [isEmergencyActive, emergencyCountdown]);

  const showNotification = (mensaje) => {
    setNotification(mensaje);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const iniciarEmergencia = () => {
    setIsEmergencyActive(true);
    setEmergencyCountdown(5);
  };

  const cancelarEmergencia = () => {
    setIsEmergencyActive(false);
    setEmergencyCountdown(5);
    showNotification('✅ Alerta cancelada correctamente');
  };

  const iniciarLlamada = (contacto) => {
    setActiveCall(contacto);
  };

  const colgarLlamada = () => {
    setActiveCall(null);
    showNotification('📞 Llamada finalizada');
  };

  const confirmarEnvioUbicacion = (familiar) => {
    setIsSharingLocation(false);
    const nombreCorto = familiar.nombre.split(' ')[0];
    showNotification(`📍 Ubicación enviada con éxito a ${nombreCorto}`);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-0 sm:p-4 font-sans select-none antialiased">
      <div
        className="w-full max-w-md bg-stone-50 h-dvh sm:h-[850px] sm:rounded-[40px] shadow-2xl overflow-hidden flex flex-col border-4 border-slate-700 relative"
        role="application"
        aria-label="Cuida Fácil — aplicación de ayuda para Don Pedro"
      >
        {notification && (
          <div
            className="absolute top-4 left-4 right-4 bg-yellow-400 border-2 border-yellow-600 text-slate-900 p-4 rounded-2xl shadow-xl flex items-center justify-between z-50 animate-bounce"
            role="alert"
            aria-live="assertive"
          >
            <div className="flex items-center space-x-3">
              <span className="text-3xl" aria-hidden="true">🔔</span>
              <p className="text-lg font-bold leading-tight">{notification}</p>
            </div>
            <button
              type="button"
              onClick={() => setNotification(null)}
              className="bg-yellow-500 hover:bg-yellow-600 font-bold px-3 py-1 rounded-lg text-sm border border-yellow-700"
              aria-label="Cerrar notificación"
            >
              Cerrar
            </button>
          </div>
        )}

        <header className="bg-emerald-600 text-white p-4 shadow-md flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-3xl shadow-inner" aria-hidden="true">
              {user.avatar}
            </div>
            <div>
              <p className="text-sm text-emerald-100 font-bold uppercase tracking-wider">Hola,</p>
              <h1 className="text-2xl font-black">{user.nombre}</h1>
            </div>
          </div>
          <div className="bg-emerald-800 text-emerald-100 px-3 py-1.5 rounded-full text-xs font-black uppercase flex items-center space-x-1 border border-emerald-500">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
            <span>CUIDA FÁCIL</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-stone-100 p-4 pb-20">
          {activeTab === 'inicio' && (
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-3xl border-2 border-emerald-100 shadow-sm text-center">
                <p className="text-stone-700 text-xl font-bold leading-tight">
                  👴 Si necesitas cualquier cosa, usa los botones grandes de abajo.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border-2 border-red-100 shadow-md text-center flex flex-col items-center">
                <span className="text-red-500 font-bold text-lg uppercase tracking-wide mb-2 block">
                  🚨 Emergencia Familiar 🚨
                </span>

                <button
                  type="button"
                  onClick={iniciarEmergencia}
                  aria-label="Pedir ayuda de emergencia a tu familia y cuidador"
                  className="w-56 h-56 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 transition-all flex flex-col items-center justify-center text-white font-extrabold text-3xl border-[12px] border-red-100 shadow-xl relative overflow-hidden group focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300"
                >
                  <span className="absolute inset-0 bg-red-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity" />
                  <span className="text-5xl mb-2 animate-bounce" aria-hidden="true">⚠️</span>
                  <span>PEDIR</span>
                  <span className="text-4xl text-yellow-300 tracking-wide font-black">AYUDA</span>
                </button>

                <p className="text-stone-500 text-base font-bold mt-4 leading-normal">
                  Pulsa el botón rojo para avisar de inmediato a tus seres queridos.
                </p>
              </div>

              <div className="bg-white p-4 rounded-3xl border-2 border-stone-200 shadow-sm space-y-3">
                <h2 className="text-xl font-black text-stone-800 text-center uppercase tracking-wide">
                  Servicios de Emergencia
                </h2>

                <div className="grid grid-cols-1 gap-3">
                  <button
                    type="button"
                    onClick={() => iniciarLlamada({ nombre: 'Ambulancia (131)', avatar: '🚑', color: 'from-red-100 to-red-200' })}
                    aria-label="Llamar a ambulancia"
                    className="w-full bg-red-100 border-2 border-red-400 rounded-2xl p-4 flex items-center justify-between active:scale-95 transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-red-400"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-4xl bg-red-500 p-2 rounded-xl text-white" aria-hidden="true">🚑</span>
                      <div className="text-left">
                        <span className="text-2xl font-black text-red-950 block">AMBULANCIA</span>
                        <span className="text-base text-red-700 font-bold">Llamada médica urgente</span>
                      </div>
                    </div>
                    <span className="text-3xl" aria-hidden="true">📞</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => iniciarLlamada({ nombre: 'Policía (133)', avatar: '👮', color: 'from-blue-100 to-blue-200' })}
                    aria-label="Llamar a policía"
                    className="w-full bg-blue-100 border-2 border-blue-400 rounded-2xl p-4 flex items-center justify-between active:scale-95 transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-4xl bg-blue-500 p-2 rounded-xl text-white" aria-hidden="true">👮</span>
                      <div className="text-left">
                        <span className="text-2xl font-black text-blue-950 block">POLICÍA</span>
                        <span className="text-base text-blue-700 font-bold">Llamar a Carabineros</span>
                      </div>
                    </div>
                    <span className="text-3xl" aria-hidden="true">📞</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => iniciarLlamada({ nombre: 'Bomberos (132)', avatar: '🔥', color: 'from-amber-100 to-amber-200' })}
                    aria-label="Llamar a bomberos"
                    className="w-full bg-amber-100 border-2 border-amber-400 rounded-2xl p-4 flex items-center justify-between active:scale-95 transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-4xl bg-amber-500 p-2 rounded-xl text-white" aria-hidden="true">🔥</span>
                      <div className="text-left">
                        <span className="text-2xl font-black text-amber-950 block">BOMBEROS</span>
                        <span className="text-base text-amber-700 font-bold">Fuego o rescate</span>
                      </div>
                    </div>
                    <span className="text-3xl" aria-hidden="true">📞</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contactos' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-3xl border-2 border-emerald-100 shadow-sm text-center">
                <h2 className="text-2xl font-black text-stone-800">Llamar Rápidamente</h2>
                <p className="text-stone-600 text-lg font-bold leading-tight mt-1">
                  Toca el botón verde junto a la persona que quieres llamar.
                </p>
              </div>

              <div className="space-y-3">
                {todosLosContactos.map((contacto) => (
                  <div
                    key={contacto.id}
                    className="bg-white p-4 rounded-3xl border-2 border-stone-200 shadow-sm flex items-center justify-between hover:border-emerald-300 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-4xl shadow-inner border border-stone-100" aria-hidden="true">
                        {contacto.avatar}
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-stone-900 leading-tight">{contacto.nombre}</h3>
                        <p className="text-emerald-700 font-bold text-base">{contacto.relacion}</p>
                        <p className="text-stone-400 text-sm">{contacto.telefono}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => iniciarLlamada(contacto)}
                      aria-label={`Llamar a ${contacto.nombre}`}
                      className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-5 py-4 rounded-2xl flex flex-col items-center justify-center font-black text-lg shadow-md border-b-4 border-emerald-800 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
                    >
                      <span className="text-2xl" aria-hidden="true">📞</span>
                      <span>LLAMAR</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'ubicacion' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-3xl border-2 border-emerald-100 shadow-sm text-center">
                <h2 className="text-2xl font-black text-stone-800">📍 Tu Ubicación Actual</h2>
                <p className="text-stone-600 text-lg font-bold leading-tight mt-1">
                  Aquí puedes ver dónde estás y avisarle a tu familia.
                </p>
              </div>

              <div
                className="bg-stone-200 rounded-3xl border-2 border-stone-300 shadow-inner overflow-hidden relative h-64 flex flex-col items-center justify-center"
                role="img"
                aria-label="Mapa simulado mostrando tu ubicación en Calle Las Flores 1024, Santiago"
              >
                <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#78716c" strokeWidth="2" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                <div className="absolute top-1/2 left-0 w-full h-12 bg-white -translate-y-1/2 flex items-center justify-center font-bold text-stone-500 tracking-widest text-xs">
                  AVENIDA PROVIDENCIA
                </div>
                <div className="absolute top-0 left-1/3 w-12 h-full bg-white flex items-center justify-center font-bold text-stone-500 tracking-widest text-xs [writing-mode:vertical-lr] text-center">
                  CALLE LAS FLORES
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <div className="absolute w-20 h-20 bg-emerald-500 rounded-full opacity-30 animate-ping" aria-hidden="true" />
                  <div className="absolute w-12 h-12 bg-emerald-400 rounded-full opacity-50 animate-pulse" aria-hidden="true" />

                  <div className="relative w-16 h-16 bg-white border-4 border-emerald-600 rounded-full flex items-center justify-center text-4xl shadow-xl" aria-hidden="true">
                    🏡
                  </div>
                  <span className="mt-2 bg-emerald-600 text-white font-black text-base px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                    Mi ubicación actual
                  </span>
                </div>

                <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-xs p-2 rounded-xl text-center border border-stone-300">
                  <p className="text-stone-800 font-extrabold text-base leading-none">Calle Las Flores #1024</p>
                  <p className="text-stone-500 text-xs font-bold">Santiago, Chile</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsSharingLocation(true)}
                aria-label="Enviar mi ubicación a un familiar"
                className="w-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-900 p-5 rounded-3xl flex items-center justify-center space-x-3 text-2xl font-black shadow-lg border-b-[6px] border-amber-700 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300"
              >
                <span className="text-4xl" aria-hidden="true">📤</span>
                <span>ENVIAR MI UBICACIÓN</span>
              </button>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 text-center">
                <p className="text-blue-900 font-bold text-sm">
                  ⚠️ Por tu seguridad, esta ubicación solo puede ser enviada a tu Hija, Hijo o Cuidadora. Nunca se comparte públicamente.
                </p>
              </div>
            </div>
          )}
        </main>

        <nav className="bg-white border-t-4 border-stone-200 h-20 flex justify-around items-center px-2 shrink-0 z-10 shadow-lg" aria-label="Navegación principal">
          <button
            type="button"
            onClick={() => setActiveTab('inicio')}
            aria-current={activeTab === 'inicio' ? 'page' : undefined}
            className={`flex-1 h-full flex flex-col items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${activeTab === 'inicio' ? 'bg-emerald-50 text-emerald-700 border-t-4 border-emerald-600' : 'text-stone-500 hover:text-stone-800'}`}
          >
            <span className="text-3xl" aria-hidden="true">🏠</span>
            <span className="text-base font-black uppercase mt-1">Inicio</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('contactos')}
            aria-current={activeTab === 'contactos' ? 'page' : undefined}
            className={`flex-1 h-full flex flex-col items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${activeTab === 'contactos' ? 'bg-emerald-50 text-emerald-700 border-t-4 border-emerald-600' : 'text-stone-500 hover:text-stone-800'}`}
          >
            <span className="text-3xl" aria-hidden="true">📞</span>
            <span className="text-base font-black uppercase mt-1">Contactos</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ubicacion')}
            aria-current={activeTab === 'ubicacion' ? 'page' : undefined}
            className={`flex-1 h-full flex flex-col items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${activeTab === 'ubicacion' ? 'bg-emerald-50 text-emerald-700 border-t-4 border-emerald-600' : 'text-stone-500 hover:text-stone-800'}`}
          >
            <span className="text-3xl" aria-hidden="true">📍</span>
            <span className="text-base font-black uppercase mt-1">Ubicación</span>
          </button>
        </nav>

        {isEmergencyActive && (
          <div className="absolute inset-0 bg-red-700 text-white z-50 flex flex-col items-center justify-between p-6 animate-pulse" role="alertdialog" aria-labelledby="alerta-titulo">
            <div className="text-center mt-8 space-y-4">
              <span className="text-7xl block animate-bounce" aria-hidden="true">⚠️</span>
              <h2 id="alerta-titulo" className="text-4xl font-black text-yellow-300 tracking-wide uppercase">ALERTA ACTIVA</h2>
              <p className="text-xl font-bold max-w-xs mx-auto leading-relaxed">
                Estamos avisando a tus familiares y cuidadores ahora mismo.
              </p>
            </div>

            <div className="my-8 text-center">
              {emergencyCountdown > 0 ? (
                <div className="space-y-4">
                  <p className="text-2xl font-bold">Se enviará en:</p>
                  <div className="w-32 h-32 bg-white text-red-700 rounded-full flex items-center justify-center font-black text-6xl mx-auto shadow-2xl border-4 border-yellow-300" aria-live="polite">
                    {emergencyCountdown}
                  </div>
                  <p className="text-stone-200 text-lg">Tienes tiempo para cancelar si fue un error.</p>
                </div>
              ) : (
                <div className="space-y-3 bg-red-900/60 p-6 rounded-3xl border-2 border-green-400">
                  <p className="text-3xl font-black text-green-300 animate-pulse">¡ENVIADO!</p>
                  <p className="text-lg font-bold">Tus cuidadores ya recibieron tu alerta y ubicación.</p>
                  <p className="text-yellow-300 text-sm">Pronto te llamarán a este teléfono.</p>
                </div>
              )}
            </div>

            <div className="w-full mb-8">
              <button
                type="button"
                onClick={cancelarEmergencia}
                className="w-full bg-white hover:bg-stone-100 active:scale-95 text-slate-950 p-6 rounded-3xl text-2xl font-black tracking-wide shadow-2xl border-b-8 border-stone-300 flex flex-col items-center justify-center transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300"
              >
                <span className="text-3xl" aria-hidden="true">❌</span>
                <span>CANCELAR ALERTA</span>
                <span className="text-base font-normal text-stone-600 mt-1">(Presiona aquí si estás bien)</span>
              </button>
            </div>
          </div>
        )}

        {activeCall && (
          <div className="absolute inset-0 bg-slate-950 text-white z-50 flex flex-col items-center justify-between p-6" role="dialog" aria-label={`Llamando a ${activeCall.nombre}`}>
            <div className="text-center mt-12 space-y-6">
              <span className="bg-emerald-600 text-emerald-100 px-4 py-2 rounded-full font-black text-sm uppercase tracking-widest animate-pulse">
                📞 LLAMADA EN CURSO
              </span>

              <div className="w-40 h-40 bg-slate-800 rounded-full flex items-center justify-center text-7xl mx-auto border-4 border-emerald-500 shadow-xl animate-pulse" aria-hidden="true">
                {activeCall.avatar}
              </div>

              <div>
                <h3 className="text-3xl font-black tracking-tight">Llamando a {activeCall.nombre}…</h3>
                {activeCall.relacion && (
                  <p className="text-xl text-emerald-400 font-bold mt-1">{activeCall.relacion}</p>
                )}
                {activeCall.telefono && (
                  <p className="text-lg text-slate-400 mt-1">{activeCall.telefono}</p>
                )}
              </div>
            </div>

            <div className="flex space-x-2 my-4" aria-hidden="true">
              <span className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" />
            </div>

            <div className="w-full mb-12">
              <button
                type="button"
                onClick={colgarLlamada}
                aria-label="Colgar llamada"
                className="w-full bg-red-600 hover:bg-red-700 active:scale-95 text-white p-6 rounded-3xl text-2xl font-black tracking-wide shadow-2xl border-b-8 border-red-950 flex flex-col items-center justify-center transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300"
              >
                <span className="text-4xl mb-1" aria-hidden="true">❌</span>
                <span>COLGAR LLAMADA</span>
              </button>
            </div>
          </div>
        )}

        {isSharingLocation && (
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xs z-40 flex items-end justify-center" role="dialog" aria-labelledby="modal-ubicacion-titulo">
            <div className="bg-white w-full rounded-t-[32px] p-6 space-y-4 shadow-2xl border-t-4 border-emerald-500 animate-slide-up max-w-md">
              <div className="flex items-center justify-between gap-3">
                <h3 id="modal-ubicacion-titulo" className="text-2xl font-black text-stone-800 leading-tight">
                  ¿A quién le quieres enviar tu ubicación?
                </h3>
                <button
                  type="button"
                  onClick={() => setIsSharingLocation(false)}
                  className="bg-stone-100 hover:bg-stone-200 p-2 rounded-full text-xl shrink-0"
                  aria-label="Cerrar"
                >
                  ❌
                </button>
              </div>

              <p className="text-stone-600 text-base font-bold leading-tight">
                Elige un contacto de confianza. Se le enviará un mensaje con tu mapa actual.
              </p>

              <div className="space-y-3 pt-2">
                {contactosFamiliares.map((familiar) => (
                  <button
                    key={familiar.id}
                    type="button"
                    onClick={() => confirmarEnvioUbicacion(familiar)}
                    className="w-full bg-stone-100 hover:bg-emerald-50 active:scale-95 p-4 rounded-2xl border-2 border-stone-200 hover:border-emerald-500 flex items-center justify-between text-left transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl" aria-hidden="true">{familiar.avatar}</span>
                      <div>
                        <span className="text-lg font-black block text-stone-900">{familiar.nombre}</span>
                        <span className="text-sm font-bold text-emerald-700">{familiar.relacion}</span>
                      </div>
                    </div>
                    <span className="bg-emerald-600 text-white font-black px-3 py-2 rounded-xl text-sm">
                      ENVIAR 📤
                    </span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsSharingLocation(false)}
                className="w-full bg-stone-200 hover:bg-stone-300 p-4 rounded-2xl text-lg font-black text-stone-700 transition-colors"
              >
                Volver Atrás
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
