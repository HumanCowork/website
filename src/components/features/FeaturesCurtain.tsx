export function FeaturesCurtain() {
  return (
    <section
      id="que-hacemos"
      className="relative z-20 w-full min-h-screen bg-white text-slate-900 rounded-t-[2.5rem] border-t border-slate-200 shadow-[0_-25px_60px_rgba(0,0,0,0.15)] px-6 sm:px-10 lg:px-16 py-20 sm:py-28"
    >
      <div className="w-full max-w-[94vw] 2xl:max-w-[90vw] mx-auto space-y-12">
        {/* Cabecera temporal de la cortina blanca */}
        <div className="space-y-4 max-w-2xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#1271b7] border border-blue-200">
            Cortina de Contenido · Próxima Sección
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Qué hacemos en Human Cowork
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Esta sección sube y cubre el Hero al hacer scroll. Acá se presentan los
            pilares, demos en vivo y dinámicas de la comunidad.
          </p>
        </div>

        {/* Tarjetas de muestra temporales para dar volumen al scroll */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#1271b7] text-white flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="text-xl font-bold text-slate-900">Demos & Feedback</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Enchufás tu compu, mostrás tu código o arquitectura y recibís
              devolución honesta de pares técnicos.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#1271b7] text-white flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="text-xl font-bold text-slate-900">Criterio Humano & IA</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Modelos y agentes al servicio de la dirección estratégica, con el
              criterio de los ingenieros al mando.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#1271b7] text-white flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="text-xl font-bold text-slate-900">Destrabar Proyectos</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Banco de problemas real para resolver cuellos de botella técnicos y
              comerciales codo a codo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
