import React, { useState, useMemo } from 'react';
import {
  Leaf,
  Sprout,
  Recycle,
  Search,
  CheckCircle2,
  XCircle,
  Droplets,
  Wind,
  Sun,
  Clock,
  Scale,
  AlertTriangle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  Users,
  HeartHandshake,
  Info,
  RefreshCw,
  Check,
  X,
  Plus,
  Minus,
  Award,
  TreePine
} from 'lucide-react';

// ============================================================================
// DATOS EDUCATIVOS Y CATÁLOGO DE RESIDUOS (CAMPUS VERDE CETis 58)
// ============================================================================

const WASTE_ITEMS = [
  // Materiales VERDES (Ricos en Nitrógeno - Humedad)
  {
    id: 'v1',
    name: 'Cáscaras de frutas y verduras',
    category: 'verde',
    allowed: true,
    emoji: '🍌',
    tip: 'Pícalas en trozos pequeños (2-4 cm) para acelerar su descomposición.'
  },
  {
    id: 'v2',
    name: 'Posos de café y filtros de papel',
    category: 'verde',
    allowed: true,
    emoji: '☕',
    tip: 'Aportan nitrógeno excelente y atraen lombrices benéficas.'
  },
  {
    id: 'v3',
    name: 'Pasto fresco recién cortado',
    category: 'verde',
    allowed: true,
    emoji: '🌿',
    tip: 'Mézclalo bien con material seco para evitar que se compacte y huela mal.'
  },
  {
    id: 'v4',
    name: 'Bolsitas de té (sin grapas ni plástico)',
    category: 'verde',
    allowed: true,
    emoji: '🍵',
    tip: 'Verifica que la bolsita sea de papel natural o algodón.'
  },
  {
    id: 'v5',
    name: 'Restos de plantas y flores frescas',
    category: 'verde',
    allowed: true,
    emoji: '🌻',
    tip: 'Asegúrate de que no tengan plagas ni pesticidas químicos.'
  },
  {
    id: 'v6',
    name: 'Cáscaras de huevo trituradas',
    category: 'verde',
    allowed: true,
    emoji: '🥚',
    tip: 'Lávalas, sécalas y tritúralas bien; aportan calcio y regulan la acidez.'
  },

  // Materiales CAFÉS (Ricos en Carbono - Estructura y Seco)
  {
    id: 'c1',
    name: 'Hojas secas de árboles',
    category: 'cafe',
    allowed: true,
    emoji: '🍂',
    tip: 'El mejor material estructurante. Guárdalas en sacos para tener reservas.'
  },
  {
    id: 'c2',
    name: 'Cartón corrugado sin tinta ni cinta',
    category: 'cafe',
    allowed: true,
    emoji: '📦',
    tip: 'Rómpelo en pedazos pequeños y humedécelo ligeramente al integrarlo.'
  },
  {
    id: 'c3',
    name: 'Aserrín y viruta de madera natural',
    category: 'cafe',
    allowed: true,
    emoji: '🪵',
    tip: 'Usa solo de madera sin barniz, pintura ni tratamientos químicos.'
  },
  {
    id: 'c4',
    name: 'Ramas pequeñas y podas secas',
    category: 'cafe',
    allowed: true,
    emoji: '🌾',
    tip: 'Ideales para la capa base porque permiten que circule el oxígeno.'
  },
  {
    id: 'c5',
    name: 'Servilletas y papel de cocina usados',
    category: 'cafe',
    allowed: true,
    emoji: '🧻',
    tip: 'Solo si no tienen aceite de cocina, cloro ni productos de limpieza.'
  },
  {
    id: 'c6',
    name: 'Cáscaras de nuez, almendra y cacahuate',
    category: 'cafe',
    allowed: true,
    emoji: '🥜',
    tip: 'Tardan más en degradarse, pero crean bolsas de aire útiles.'
  },

  // Materiales PROHIBIDOS (No deben incluirse)
  {
    id: 'p1',
    name: 'Carnes, pescados y huesos',
    category: 'prohibido',
    allowed: false,
    emoji: '🍖',
    tip: 'Generan malos olores severos y atraen ratas, moscas y animales callejeros.'
  },
  {
    id: 'p2',
    name: 'Lácteos (queso, leche, yogur, crema)',
    category: 'prohibido',
    allowed: false,
    emoji: '🧀',
    tip: 'Se pudren rápidamente provocando olores fétidos y bacterias nocivas.'
  },
  {
    id: 'p3',
    name: 'Aceites, grasas y comida cocinada',
    category: 'prohibido',
    allowed: false,
    emoji: '🍟',
    tip: 'Impermeabilizan los residuos e impiden el paso del oxígeno.'
  },
  {
    id: 'p4',
    name: 'Heces de perros o gatos',
    category: 'prohibido',
    allowed: false,
    emoji: '🐾',
    tip: 'Contienen parásitos y patógenos peligrosos para la salud humana.'
  },
  {
    id: 'p5',
    name: 'Plásticos, metales, vidrio y unicel',
    category: 'prohibido',
    allowed: false,
    emoji: '🥤',
    tip: 'No son biodegradables; contaminan el abono con microplásticos.'
  },
  {
    id: 'p6',
    name: 'Plantas enfermas o maleza con semillas',
    category: 'prohibido',
    allowed: false,
    emoji: '🥀',
    tip: 'Las enfermedades y semillas sobreviven y contaminarán tu huerto.'
  }
];

const STEPS_DATA = [
  {
    number: '01',
    title: 'Prepara el Espacio y la Base',
    subtitle: 'Drenaje y aireación inicial',
    description:
      'Elige un lugar ventilado y con sombra parcial. Coloca una primera capa de 10 a 15 cm de ramas secas gruesas y hojarasca en el fondo para garantizar el drenaje y la entrada de aire.',
    icon: TreePine,
    metric: '10 - 15 cm de base seca',
    color: 'emerald'
  },
  {
    number: '02',
    title: 'Alterna Capas Verde y Café',
    subtitle: 'La regla de oro del equilibrio',
    description:
      'Agrega residuos orgánicos húmedos (Verdes) y cúbrelos siempre con el doble de material seco (Cafés). Nunca dejes restos de comida expuestos en la superficie.',
    icon: Scale,
    metric: 'Proporción 2 Cafés : 1 Verde',
    color: 'amber'
  },
  {
    number: '03',
    title: 'Controla Humedad y Aireación',
    subtitle: 'Vida para los microorganismos',
    description:
      'Riega suavemente hasta lograr la humedad de una "esponja exprimida" (sin encharcar). Voltea y mezcla toda la pila cada 7 días para oxigenar y evitar malos olores.',
    icon: Wind,
    metric: 'Volteo cada 7 días | 50% humedad',
    color: 'sky'
  },
  {
    number: '04',
    title: 'Maduración y Cosecha',
    subtitle: 'Oro negro para la comunidad',
    description:
      'Entre 8 y 12 semanas después, la temperatura bajará y tendrás tierra oscura, suelta y con olor a bosque húmedo. Cierne el material grueso y úsalo en jardines y huertos.',
    icon: Sprout,
    metric: '8 a 12 semanas de proceso',
    color: 'lime'
  }
];

const TROUBLESHOOTING_DATA = [
  {
    problem: 'Mal olor (a huevo podrido o amoníaco)',
    cause: 'Exceso de humedad, demasiados materiales verdes (nitrógeno) o falta de oxígeno por compactación.',
    solution: 'Agrega abundante material café seco (hojas secas, cartón picado o aserrín) y voltea vigorosamente toda la mezcla para airearla.',
    badge: 'Urgente',
    badgeColor: 'bg-red-100 text-red-800 border-red-200'
  },
  {
    problem: 'La composta está muy seca y no avanza',
    cause: 'Falta de agua o exceso de materiales cafés (carbono) expuestos al sol directo.',
    solution: 'Humedece poco a poco con regadera mientras mezclas hasta sentir textura de esponja exprimida. Añade restos de frutas o verduras frescas.',
    badge: 'Proceso lento',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200'
  },
  {
    problem: 'Presencia de moscas de fruta o hormigas',
    cause: 'Restos de fruta dulce descubiertos en la superficie o falta de humedad (en caso de hormigas).',
    solution: 'Entierra los residuos frescos en el centro de la pila y cúbrelos siempre con una capa de 5 cm de tierra, hojas secas o aserrín.',
    badge: 'Prevención',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  },
  {
    problem: 'El centro no se calienta',
    cause: 'Pila demasiado pequeña (menos de 1 m³) o falta de nitrógeno para activar las bacterias termófilas.',
    solution: 'Agrega más material verde rico en nitrógeno (posos de café, pasto verde, restos vegetales) y verifica que tenga suficiente humedad.',
    badge: 'Activación',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200'
  }
];

const FAQ_DATA = [
  {
    q: '¿Qué es exactamente la composta y por qué importa en nuestra escuela?',
    a: 'La composta es el abono orgánico resultante de la descomposición controlada de residuos vegetales y materia seca mediante microorganismos benéficos. En el CETis 58 y nuestros hogares, más del 45% de la basura diaria es orgánica; compostarla reduce gases de efecto invernadero y regenera nuestros suelos.'
  },
  {
    q: '¿Puedo hacer composta si vivo en un departamento o espacio pequeño?',
    a: '¡Sí! Puedes usar un compostero cerrado ventilado en el patio o balcón, o bien optar por una lombricomposta doméstica. Mientras mantengas la proporción 2:1 (café/verde) y cubras los residuos con material seco, no producirá olores.'
  },
  {
    q: '¿Qué hago con los pedazos grandes que no se descompusieron al cosechar?',
    a: 'Al cernir tu composta madura con una malla o rejilla, separa las ramitas o cáscaras gruesas que aún no se degradan por completo y reintégralas al inicio de tu nueva composta: ¡servirán como inóculo lleno de microorganismos benéficos!'
  },
  {
    q: '¿Cómo sé que mi composta ya está lista para usarse en plantas?',
    a: 'Tiene 4 señales claras: 1) Color café oscuro casi negro, 2) Textura suelta y esponjosa como tierra de bosque, 3) Olor agradable a tierra húmeda (nada ácido ni fétido), y 4) Temperatura ambiente (ya no está caliente en el centro).'
  }
];

// ============================================================================
// COMPONENTE PRINCIPAL DE LA APLICACIÓN
// ============================================================================

export default function App() {
  // Estados para navegación y secciones interactivas
  const [activeSection, setActiveSection] = useState('inicio');

  // Estados para el Buscador y Filtro de Residuos
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('todos'); // 'todos' | 'verde' | 'cafe' | 'prohibido'

  // Estados para el Simulador Interactivo de Proporción Verde / Café
  const [greenBuckets, setGreenBuckets] = useState(2); // Cubetas o partes de material verde
  const [brownBuckets, setBrownBuckets] = useState(4); // Cubetas o partes de material café
  const [moistureLevel, setMoistureLevel] = useState(50); // % de humedad

  // Estado para Acordeón de Preguntas Frecuentes
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Filtrado dinámico de residuos
  const filteredWaste = useMemo(() => {
    return WASTE_ITEMS.filter((item) => {
      const matchesFilter =
        selectedFilter === 'todos' || item.category === selectedFilter;
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tip.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [searchTerm, selectedFilter]);

  // Cálculo y diagnóstico inteligente del Simulador de Composta
  const simulatorDiagnosis = useMemo(() => {
    const total = greenBuckets + brownBuckets;
    if (total === 0) {
      return {
        status: 'empty',
        title: 'Compostero Vacío',
        color: 'text-stone-600',
        bg: 'bg-stone-100 border-stone-300',
        badge: 'Sin mezcla',
        ratioText: '0 : 0',
        advice: 'Agrega cubetas de material Verde (nitrógeno) y Café (carbono) para simular tu mezcla.',
        moistureAdvice: 'Ajusta el nivel de agua para comenzar.'
      };
    }

    const ratio = brownBuckets / (greenBuckets || 0.1);
    const brownPercent = Math.round((brownBuckets / total) * 100);
    const greenPercent = 100 - brownPercent;

    let status = 'optimal';
    let title = '¡Equilibrio Ideal! Mezcla Saludable';
    let color = 'text-emerald-800';
    let bg = 'bg-emerald-50 border-emerald-300';
    let badge = 'Proporción Óptima (2:1 a 3:1)';
    let advice =
      'Tu composta tiene el balance perfecto entre Nitrógeno y Carbono. Se calentará adecuadamente, no tendrá malos olores y producirá abono de alta calidad.';

    if (greenBuckets > 0 && brownBuckets === 0) {
      status = 'danger-green';
      title = 'Alerta: Exceso Crítico de Material Verde';
      color = 'text-red-800';
      bg = 'bg-red-50 border-red-300';
      badge = 'Riesgo de pudrición y mal olor';
      advice =
        'Sin material café (carbono), los residuos húmedos se compactarán, perderán oxígeno y generarán olor a amoníaco y moscas. ¡Agrega hojas secas o cartón!';
    } else if (brownBuckets > 0 && greenBuckets === 0) {
      status = 'slow-brown';
      title = 'Mezcla Demasiado Seca (Solo Carbono)';
      color = 'text-amber-800';
      bg = 'bg-amber-50 border-amber-300';
      badge = 'Descomposición muy lenta';
      advice =
        'El material café necesita nitrógeno para activar los microorganismos. Agrega restos de frutas, verduras o posos de café para arrancar el proceso.';
    } else if (ratio < 1.5) {
      status = 'excess-green';
      title = 'Exceso de Nitrógeno (Demasiado Verde)';
      color = 'text-orange-800';
      bg = 'bg-orange-50 border-orange-300';
      badge = `Proporción ${ratio.toFixed(1)} : 1 (Falta Café)`;
      advice = `Tienes ${greenPercent}% de material verde. Te recomendamos agregar ${Math.max(
        1,
        Math.ceil(greenBuckets * 2 - brownBuckets)
      )} cubeta(s) más de material café seco para evitar humedad excesiva y malos olores.`;
    } else if (ratio > 3.5) {
      status = 'excess-brown';
      title = 'Exceso de Carbono (Demasiado Café)';
      color = 'text-amber-800';
      bg = 'bg-amber-50 border-amber-300';
      badge = `Proporción ${ratio.toFixed(1)} : 1 (Falta Verde)`;
      advice = `Tienes ${brownPercent}% de material seco. No olerá mal, pero tardará muchos meses. Añade ${Math.max(
        1,
        Math.ceil(brownBuckets / 2.5 - greenBuckets)
      )} cubeta(s) de residuos vegetales frescos para acelerar la temperatura.`;
    }

    let moistureAdvice = 'Humedad ideal (45% - 60%): como una esponja exprimida.';
    if (moistureLevel < 35) {
      moistureAdvice =
        'Humedad baja: los microorganismos se detienen. Riega ligeramente al voltear.';
    } else if (moistureLevel > 65) {
      moistureAdvice =
        'Exceso de agua: desplaza el oxígeno y causa pudrición. Agrega material café seco.';
    }

    return {
      status,
      title,
      color,
      bg,
      badge,
      ratioText: `${brownBuckets} Café : ${greenBuckets} Verde`,
      brownPercent,
      greenPercent,
      advice,
      moistureAdvice
    };
  }, [greenBuckets, brownBuckets, moistureLevel]);

  // Función auxiliar para desplazamiento suave a secciones
  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2] text-[#1E2B22] font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* =====================================================================
          BARRA DE NAVEGACIÓN SUPERIOR (STICKY)
      ====================================================================== */}
      <header className="sticky top-0 z-50 bg-[#FAF8F2]/95 backdrop-blur-md border-b border-[#E3DEC9] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Identidad del Proyecto */}
            <div
              onClick={() => scrollToSection('inicio')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6 text-emerald-200" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base md:text-lg tracking-tight text-[#1B4332]">
                    CAMPUS VERDE
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#1B4332] border border-emerald-300">
                    CETis 58
                  </span>
                </div>
                <p className="text-[11px] md:text-xs text-[#5C4D3C] font-medium">
                  Del aula a la comunidad • Guía de Compostaje
                </p>
              </div>
            </div>

            {/* Enlaces de Navegación Desktop */}
            <nav className="hidden lg:flex items-center gap-1">
              {[
                { id: 'que-es', label: '¿Qué es?' },
                { id: 'materiales', label: '¿Qué SÍ y qué NO?' },
                { id: 'pasos', label: 'Paso a Paso' },
                { id: 'simulador', label: 'Simulador 2:1' },
                { id: 'soluciones', label: 'Problemas y FAQ' }
              ].map((nav) => (
                <button
                  key={nav.id}
                  onClick={() => scrollToSection(nav.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeSection === nav.id
                      ? 'bg-[#1B4332] text-white shadow-sm'
                      : 'text-[#3D4A3E] hover:bg-[#EDE8D8] hover:text-[#1B4332]'
                  }`}
                >
                  {nav.label}
                </button>
              ))}
            </nav>

            {/* Botón Acción Rápida */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollToSection('simulador')}
                className="inline-flex items-center gap-2 px-3.5 py-2 md:px-4 md:py-2.5 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs md:text-sm font-bold shadow-sm transition-all cursor-pointer"
              >
                <Scale className="w-4 h-4" />
                <span>Probar Simulador</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================================
          SECCIÓN 1: HERO / PORTADA EDUCATIVA
      ====================================================================== */}
      <section
        id="inicio"
        className="relative overflow-hidden bg-gradient-to-b from-[#1B4332] via-[#22523D] to-[#2D6A4F] text-white py-14 md:py-22"
      >
        {/* Decoración orgánica sutil */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-300 blur-3xl" />
          <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-amber-200 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Texto Principal */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-emerald-100 text-xs md:text-sm font-semibold">
                <Award className="w-4 h-4 text-amber-300" />
                <span>Iniciativa Ambiental Estudiantil • CETis 58</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Transforma tus residuos orgánicos en{' '}
                <span className="text-amber-300 underline decoration-amber-400/50 decoration-4 underline-offset-4">
                  vida para la tierra
                </span>
              </h1>

              <p className="text-base sm:text-lg text-emerald-50/90 leading-relaxed max-w-2xl">
                Bienvenido a la guía interactiva de{' '}
                <strong className="text-white">CAMPUS VERDE CETis 58: Del aula a la comunidad</strong>.
                Aprende de manera clara, práctica y científica cómo crear composta en tu escuela o en tu hogar,
                reduciendo hasta un 50% de la basura diaria.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => scrollToSection('materiales')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#1B4332] font-extrabold text-sm md:text-base shadow-lg transition-all cursor-pointer"
                >
                  <Search className="w-5 h-5" />
                  <span>Buscador: ¿Qué puedo compostar?</span>
                </button>
                <button
                  onClick={() => scrollToSection('pasos')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/30 font-bold text-sm md:text-base transition-all cursor-pointer"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Ver guía paso a paso</span>
                </button>
              </div>
            </div>

            {/* Tarjeta Visual de Impacto Ambiental */}
            <div className="lg:col-span-5">
              <div className="bg-[#FAF8F2] text-[#1E2B22] rounded-3xl p-6 md:p-8 shadow-2xl border border-[#E3DEC9]">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#6B4E31] bg-[#F2ECE1] px-3 py-1 rounded-full">
                    Impacto del Compostaje
                  </span>
                  <Recycle className="w-6 h-6 text-[#2D6A4F]" />
                </div>

                <h2 className="text-xl font-extrabold text-[#1B4332] mb-4">
                  ¿Por qué hacer composta hoy?
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/70">
                    <div className="w-10 h-10 rounded-xl bg-[#2D6A4F] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                      -45%
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#1B4332]">
                        Menos basura en rellenos sanitarios
                      </h3>
                      <p className="text-xs text-[#4A584E] mt-0.5">
                        Casi la mitad de los desechos escolares y domésticos son restos orgánicos aprovechables.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/70">
                    <div className="w-10 h-10 rounded-xl bg-[#7F5539] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                      CH₄
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#5C3D28]">
                        Evita emisiones de gas metano
                      </h3>
                      <p className="text-xs text-[#5C4D3C] mt-0.5">
                        Al airear los residuos evitamos la descomposición sin oxígeno que calienta el planeta.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-lime-50/80 border border-lime-200/70">
                    <div className="w-10 h-10 rounded-xl bg-[#40916C] text-white flex items-center justify-center shrink-0">
                      <Sprout className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#1B4332]">
                        Fertilizante 100% natural y gratuito
                      </h3>
                      <p className="text-xs text-[#4A584E] mt-0.5">
                        Nutre las áreas verdes del plantel, huertos urbanos y macetas sin químicos sintéticos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 2: ¿QUÉ ES LA COMPOSTA Y CÓMO FUNCIONA LA CIENCIA DETRÁS?
      ====================================================================== */}
      <section id="que-es" className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#2D6A4F] bg-emerald-100 px-3 py-1 rounded-full mb-3">
            <Leaf className="w-3.5 h-3.5" /> Fundamentos Ecológicos
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1B4332]">
            ¿Qué es la composta y cómo ocurre la magia?
          </h2>
          <p className="mt-3 text-[#4A584E] text-base sm:text-lg leading-relaxed">
            La composta es el proceso biológico controlado mediante el cual millones de microorganismos
            (bacterias, hongos y actinomicetos) transforman restos orgánicos en{' '}
            <strong className="text-[#1B4332]">humus</strong>: una tierra oscura, fértil y rica en nutrientes.
          </p>
        </div>

        {/* Los 4 Ingredientes Vitales de toda Composta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-[#E3DEC9] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#1B4332] flex items-center justify-center mb-4">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-[#1B4332]">1. Nitrógeno (Verdes)</h3>
            <p className="text-sm text-[#4A584E] mt-2 leading-relaxed">
              Son materiales frescos y húmedos (frutas, verduras, pasto verde). Brindan proteínas para que
              los microorganismos se reproduzcan y generen calor.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E3DEC9] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#7F5539] flex items-center justify-center mb-4">
              <TreePine className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-[#5C3D28]">2. Carbono (Cafés)</h3>
            <p className="text-sm text-[#4A584E] mt-2 leading-relaxed">
              Son materiales secos y fibrosos (hojas secas, cartón, aserrín). Aportan energía, absorben exceso
              de humedad y evitan malos olores.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E3DEC9] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center mb-4">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-sky-900">3. Agua (Humedad)</h3>
            <p className="text-sm text-[#4A584E] mt-2 leading-relaxed">
              Los microorganismos necesitan una película de agua para moverse y digerir los residuos. La
              humedad ideal es entre <strong>45% y 60%</strong>.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E3DEC9] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center mb-4">
              <Wind className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-teal-900">4. Oxígeno (Aire)</h3>
            <p className="text-sm text-[#4A584E] mt-2 leading-relaxed">
              El compostaje es un proceso <strong>aeróbico</strong>. Voltear la mezcla permite que respiren
              las bacterias benéficas y elimina olores desagradables.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 3: BUSCADOR Y FILTRO INTERACTIVO DE RESIDUOS (SÍ vs NO)
      ====================================================================== */}
      <section
        id="materiales"
        className="py-16 md:py-20 bg-[#F2ECE1]/80 border-y border-[#E3DEC9]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#6B4E31] bg-amber-100 px-3 py-1 rounded-full mb-3">
              <Search className="w-3.5 h-3.5" /> Clasificador Interactivo
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1B4332]">
              ¿Qué materiales SÍ van y cuáles NO?
            </h2>
            <p className="mt-3 text-[#4A584E] text-base">
              Usa el buscador o filtra por categoría para verificar al instante si un residuo puede entrar a tu composta y cómo prepararlo.
            </p>
          </div>

          {/* Controles de Búsqueda y Filtros */}
          <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-[#E3DEC9] mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              {/* Barra de búsqueda */}
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-[#6B4E31] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Escribe un residuo (ej. café, cáscara, carne, cartón, huevo)..."
                  className="w-full pl-11 pr-10 py-3 rounded-xl bg-[#FAF8F2] border border-[#D8D0BC] text-[#1E2B22] placeholder-[#7C7263] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] text-sm sm:text-base"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    aria-label="Limpiar búsqueda"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Botones de Filtro */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedFilter('todos')}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    selectedFilter === 'todos'
                      ? 'bg-[#1B4332] text-white shadow-sm'
                      : 'bg-[#FAF8F2] text-[#3D4A3E] border border-[#D8D0BC] hover:bg-[#EDE8D8]'
                  }`}
                >
                  Todos ({WASTE_ITEMS.length})
                </button>
                <button
                  onClick={() => setSelectedFilter('verde')}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    selectedFilter === 'verde'
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>SÍ: Verdes (Nitrógeno)</span>
                </button>
                <button
                  onClick={() => setSelectedFilter('cafe')}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    selectedFilter === 'cafe'
                      ? 'bg-[#7F5539] text-white shadow-sm'
                      : 'bg-amber-50 text-[#5C3D28] border border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>SÍ: Cafés (Carbono)</span>
                </button>
                <button
                  onClick={() => setSelectedFilter('prohibido')}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    selectedFilter === 'prohibido'
                      ? 'bg-red-700 text-white shadow-sm'
                      : 'bg-red-50 text-red-900 border border-red-200 hover:bg-red-100'
                  }`}
                >
                  <XCircle className="w-4 h-4" />
                  <span>NO Compostables</span>
                </button>
              </div>
            </div>
          </div>

          {/* Rejilla de Resultados de Residuos */}
          {filteredWaste.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-[#E3DEC9]">
              <p className="text-lg font-bold text-[#1B4332]">
                No encontramos residuos con "{searchTerm}"
              </p>
              <p className="text-sm text-[#5C4D3C] mt-1">
                Intenta buscar con otra palabra o reinicia los filtros.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedFilter('todos');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-[#2D6A4F] text-white text-sm font-bold cursor-pointer"
              >
                Mostrar todos los materiales
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredWaste.map((item) => {
                const isGreen = item.category === 'verde';
                const isBrown = item.category === 'cafe';

                let cardStyle = 'border-red-200 bg-white';
                let badgeStyle = 'bg-red-100 text-red-800';
                let badgeLabel = 'NO INCLUIR';

                if (isGreen) {
                  cardStyle = 'border-emerald-200 bg-white';
                  badgeStyle = 'bg-emerald-100 text-emerald-800';
                  badgeLabel = 'SÍ • VERDE (Nitrógeno)';
                } else if (isBrown) {
                  cardStyle = 'border-amber-200 bg-white';
                  badgeStyle = 'bg-amber-100 text-[#5C3D28]';
                  badgeLabel = 'SÍ • CAFÉ (Carbono)';
                }

                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl p-5 border-2 ${cardStyle} shadow-sm hover:shadow-md transition-all flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <span className="text-3xl" role="img" aria-label={item.name}>
                          {item.emoji}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold ${badgeStyle}`}
                        >
                          {item.allowed ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <X className="w-3.5 h-3.5" />
                          )}
                          {badgeLabel}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-base text-[#1E2B22] mb-2">
                        {item.name}
                      </h3>
                    </div>

                    <div className="mt-2 pt-3 border-t border-stone-100 flex items-start gap-2 text-xs text-[#4A584E]">
                      <Info className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                      <span>{item.tip}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 4: PROCESO PASO A PASO PARA ARMAR Y MANTENER TU COMPOSTA
      ====================================================================== */}
      <section id="pasos" className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#2D6A4F] bg-emerald-100 px-3 py-1 rounded-full mb-3">
            <Clock className="w-3.5 h-3.5" /> Metodología Práctica
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1B4332]">
            Cómo armar tu composta en 4 pasos sencillos
          </h2>
          <p className="mt-3 text-[#4A584E] text-base">
            Sigue esta guía paso a paso aplicada en las brigadas ecológicas del CETis 58 para garantizar una composta rápida y libre de olores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS_DATA.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-white rounded-3xl p-6 border border-[#E3DEC9] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-black text-[#D8D0BC]">
                      {step.number}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-[#1B4332] text-emerald-200 flex items-center justify-center">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-[#6B4E31]">
                    {step.subtitle}
                  </span>
                  <h3 className="text-lg font-extrabold text-[#1B4332] mt-1 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#4A584E] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#EDE8D8]">
                  <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1B4332] bg-[#FAF8F2] px-3 py-1.5 rounded-lg border border-[#E3DEC9] w-full justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>{step.metric}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 5: SIMULADOR INTERACTIVO DE PROPORCIÓN VERDE / CAFÉ
      ====================================================================== */}
      <section
        id="simulador"
        className="py-16 md:py-20 bg-gradient-to-br from-[#1B4332] to-[#265942] text-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-300 bg-white/10 px-3 py-1 rounded-full mb-3 border border-white/20">
              <Scale className="w-3.5 h-3.5" /> Herramienta Interactiva
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
              Calculadora y Simulador de Proporción Verde / Café
            </h2>
            <p className="mt-3 text-emerald-100/90 text-base">
              Experimenta agregando cubetas de residuos <strong>Verdes</strong> (nitrógeno) y <strong>Cafés</strong> (carbono),
              ajusta la humedad y descubre cómo reacciona tu composta antes de prepararla en casa.
            </p>
          </div>

          <div className="bg-[#FAF8F2] text-[#1E2B22] rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-[#E3DEC9]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Panel Izquierdo: Controles Interactivos */}
              <div className="lg:col-span-6 space-y-6">
                {/* Control Material Verde */}
                <div className="p-5 rounded-2xl bg-emerald-50/90 border border-emerald-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-emerald-700" />
                      <span className="font-extrabold text-emerald-950">
                        Material VERDE (Nitrógeno)
                      </span>
                    </div>
                    <span className="text-lg font-black text-emerald-800 bg-white px-3 py-0.5 rounded-lg border border-emerald-200">
                      {greenBuckets} {greenBuckets === 1 ? 'cubeta' : 'cubetas'}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800 mb-4">
                    Cáscaras de fruta, verduras, posos de café, pasto fresco.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setGreenBuckets(Math.max(0, greenBuckets - 1))}
                      aria-label="Disminuir material verde"
                      className="w-11 h-11 rounded-xl bg-white hover:bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-900 font-bold shadow-sm cursor-pointer"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={greenBuckets}
                      onChange={(e) => setGreenBuckets(Number(e.target.value))}
                      className="flex-1 accent-emerald-700 h-2.5 bg-emerald-200 rounded-lg cursor-pointer"
                    />
                    <button
                      onClick={() => setGreenBuckets(Math.min(10, greenBuckets + 1))}
                      aria-label="Aumentar material verde"
                      className="w-11 h-11 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center font-bold shadow-sm cursor-pointer"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Control Material Café */}
                <div className="p-5 rounded-2xl bg-amber-50/90 border border-amber-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <TreePine className="w-5 h-5 text-[#7F5539]" />
                      <span className="font-extrabold text-[#5C3D28]">
                        Material CAFÉ (Carbono)
                      </span>
                    </div>
                    <span className="text-lg font-black text-[#7F5539] bg-white px-3 py-0.5 rounded-lg border border-amber-200">
                      {brownBuckets} {brownBuckets === 1 ? 'cubeta' : 'cubetas'}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B4E31] mb-4">
                    Hojas secas, cartón picado, aserrín natural, ramas secas.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setBrownBuckets(Math.max(0, brownBuckets - 1))}
                      aria-label="Disminuir material café"
                      className="w-11 h-11 rounded-xl bg-white hover:bg-amber-100 border border-amber-300 flex items-center justify-center text-[#5C3D28] font-bold shadow-sm cursor-pointer"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="15"
                      value={brownBuckets}
                      onChange={(e) => setBrownBuckets(Number(e.target.value))}
                      className="flex-1 accent-[#7F5539] h-2.5 bg-amber-200 rounded-lg cursor-pointer"
                    />
                    <button
                      onClick={() => setBrownBuckets(Math.min(15, brownBuckets + 1))}
                      aria-label="Aumentar material café"
                      className="w-11 h-11 rounded-xl bg-[#7F5539] hover:bg-[#5C3D28] text-white flex items-center justify-center font-bold shadow-sm cursor-pointer"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Control de Humedad */}
                <div className="p-5 rounded-2xl bg-sky-50/90 border border-sky-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-5 h-5 text-sky-700" />
                      <span className="font-extrabold text-sky-950">
                        Nivel de Humedad
                      </span>
                    </div>
                    <span className="text-sm font-black text-sky-800 bg-white px-3 py-0.5 rounded-lg border border-sky-200">
                      {moistureLevel}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    step="5"
                    value={moistureLevel}
                    onChange={(e) => setMoistureLevel(Number(e.target.value))}
                    className="w-full accent-sky-600 h-2.5 bg-sky-200 rounded-lg cursor-pointer mt-2"
                  />
                  <div className="flex justify-between text-[11px] font-semibold text-sky-800 mt-1.5">
                    <span>Muy seca (10%)</span>
                    <span>Ideal (50%)</span>
                    <span>Encharcada (90%)</span>
                  </div>
                </div>
              </div>

              {/* Panel Derecho: Diagnóstico Visual en Tiempo Real */}
              <div className="lg:col-span-6 space-y-6">
                <div
                  className={`rounded-3xl p-6 sm:p-7 border-2 transition-all ${simulatorDiagnosis.bg}`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-white/80 text-[#1E2B22] border border-black/10">
                      {simulatorDiagnosis.badge}
                    </span>
                    <span className="text-sm font-black text-[#1B4332]">
                      Relación: {simulatorDiagnosis.ratioText}
                    </span>
                  </div>

                  <h3 className={`text-xl sm:text-2xl font-extrabold mb-3 ${simulatorDiagnosis.color}`}>
                    {simulatorDiagnosis.title}
                  </h3>

                  {/* Barra Visual de Composición */}
                  {greenBuckets + brownBuckets > 0 && (
                    <div className="my-5">
                      <div className="flex justify-between text-xs font-bold mb-1.5">
                        <span className="text-[#5C3D28]">
                          Café (Carbono): {simulatorDiagnosis.brownPercent}%
                        </span>
                        <span className="text-emerald-800">
                          Verde (Nitrógeno): {simulatorDiagnosis.greenPercent}%
                        </span>
                      </div>
                      <div className="w-full h-5 rounded-full overflow-hidden flex bg-stone-200 shadow-inner">
                        <div
                          style={{ width: `${simulatorDiagnosis.brownPercent}%` }}
                          className="bg-[#7F5539] transition-all duration-300"
                          title="Material Café"
                        />
                        <div
                          style={{ width: `${simulatorDiagnosis.greenPercent}%` }}
                          className="bg-emerald-600 transition-all duration-300"
                          title="Material Verde"
                        />
                      </div>
                      <p className="text-[11px] text-stone-600 mt-1.5 text-center">
                        Meta recomendada: ~67% a 75% Café y ~25% a 33% Verde (2 o 3 partes café por 1 verde).
                      </p>
                    </div>
                  )}

                  <p className="text-sm text-[#1E2B22] leading-relaxed bg-white/75 p-4 rounded-2xl border border-black/5">
                    {simulatorDiagnosis.advice}
                  </p>

                  <div className="mt-4 flex items-start gap-2.5 text-xs font-semibold text-sky-950 bg-sky-100/80 p-3.5 rounded-xl border border-sky-200">
                    <Droplets className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                    <span>{simulatorDiagnosis.moistureAdvice}</span>
                  </div>

                  {/* Botón para restaurar valores ideales */}
                  <div className="mt-5 flex justify-end">
                    <button
                      onClick={() => {
                        setGreenBuckets(2);
                        setBrownBuckets(4);
                        setMoistureLevel(50);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4332] hover:underline cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Restaurar proporción ideal (4 Café : 2 Verde)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 6: PROBLEMAS COMUNES Y PREGUNTAS FRECUENTES (FAQ)
      ====================================================================== */}
      <section id="soluciones" className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Columna Izquierda: Guía de Solución de Problemas */}
          <div className="lg:col-span-7">
            <div className="mb-8">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full mb-3">
                <AlertTriangle className="w-3.5 h-3.5" /> Diagnóstico Rápido
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B4332]">
                Errores comunes y cómo solucionarlos
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#4A584E]">
                ¿Tu composta huele mal o tiene moscas? Todo tiene solución sencilla ajustando aire, agua o proporción.
              </p>
            </div>

            <div className="space-y-4">
              {TROUBLESHOOTING_DATA.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E3DEC9] shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="font-extrabold text-base sm:text-lg text-[#1E2B22]">
                      {item.problem}
                    </h3>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6B4E31] mb-3">
                    <strong>Causa probable:</strong> {item.cause}
                  </p>
                  <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-xs sm:text-sm text-[#1B4332]">
                    <strong>Solución práctica:</strong> {item.solution}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Columna Derecha: Preguntas Frecuentes (Acordeón) */}
          <div className="lg:col-span-5">
            <div className="mb-8">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#2D6A4F] bg-emerald-100 px-3 py-1 rounded-full mb-3">
                <HelpCircle className="w-3.5 h-3.5" /> Dudas Frecuentes
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B4332]">
                Preguntas de la Comunidad
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#4A584E]">
                Resolvemos las dudas más habituales de estudiantes, docentes y familias.
              </p>
            </div>

            <div className="space-y-3">
              {FAQ_DATA.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-[#E3DEC9] overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-[#FAF8F2] transition-colors cursor-pointer"
                    >
                      <span className="font-bold text-sm sm:text-base text-[#1B4332]">
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-[#2D6A4F] shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-sm text-[#4A584E] leading-relaxed border-t border-stone-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Tarjeta Comunitaria CETis 58 */}
            <div className="mt-8 bg-gradient-to-br from-[#6B4E31] to-[#4A3520] text-white rounded-3xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base">Del aula a la comunidad</h3>
                  <p className="text-xs text-amber-200">Compromiso Ambiental CETis 58</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-amber-50/90 leading-relaxed">
                Cada kilogramo de residuos orgánicos que compostamos en el plantel y en nuestros hogares
                se convierte en suelo fértil para reforestar nuestra ciudad. ¡Comparte esta guía con tu familia y vecinos!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          PIE DE PÁGINA (FOOTER)
      ====================================================================== */}
      <footer className="bg-[#152E22] text-emerald-100/80 py-10 border-t border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-200">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-white text-sm">
                CAMPUS VERDE CETis 58: Del aula a la comunidad
              </p>
              <p className="text-xs text-emerald-300/80">
                Plataforma educativa abierta sobre compostaje y gestión sostenible de residuos orgánicos.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <button
              onClick={() => scrollToSection('que-es')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Fundamentos
            </button>
            <span>•</span>
            <button
              onClick={() => scrollToSection('materiales')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Clasificador
            </button>
            <span>•</span>
            <button
              onClick={() => scrollToSection('simulador')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Simulador 2:1
            </button>
            <span>•</span>
            <button
              onClick={() => scrollToSection('soluciones')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Soluciones
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}import React, { useState, useMemo } from 'react';
import {
  Leaf,
  Sprout,
  Recycle,
  Search,
  CheckCircle2,
  XCircle,
  Droplets,
  Wind,
  Sun,
  Clock,
  Scale,
  AlertTriangle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  Users,
  HeartHandshake,
  Info,
  RefreshCw,
  Check,
  X,
  Plus,
  Minus,
  Award,
  TreePine
} from 'lucide-react';

// ============================================================================
// DATOS EDUCATIVOS Y CATÁLOGO DE RESIDUOS (CAMPUS VERDE CETis 58)
// ============================================================================

const WASTE_ITEMS = [
  // Materiales VERDES (Ricos en Nitrógeno - Humedad)
  {
    id: 'v1',
    name: 'Cáscaras de frutas y verduras',
    category: 'verde',
    allowed: true,
    emoji: '🍌',
    tip: 'Pícalas en trozos pequeños (2-4 cm) para acelerar su descomposición.'
  },
  {
    id: 'v2',
    name: 'Posos de café y filtros de papel',
    category: 'verde',
    allowed: true,
    emoji: '☕',
    tip: 'Aportan nitrógeno excelente y atraen lombrices benéficas.'
  },
  {
    id: 'v3',
    name: 'Pasto fresco recién cortado',
    category: 'verde',
    allowed: true,
    emoji: '🌿',
    tip: 'Mézclalo bien con material seco para evitar que se compacte y huela mal.'
  },
  {
    id: 'v4',
    name: 'Bolsitas de té (sin grapas ni plástico)',
    category: 'verde',
    allowed: true,
    emoji: '🍵',
    tip: 'Verifica que la bolsita sea de papel natural o algodón.'
  },
  {
    id: 'v5',
    name: 'Restos de plantas y flores frescas',
    category: 'verde',
    allowed: true,
    emoji: '🌻',
    tip: 'Asegúrate de que no tengan plagas ni pesticidas químicos.'
  },
  {
    id: 'v6',
    name: 'Cáscaras de huevo trituradas',
    category: 'verde',
    allowed: true,
    emoji: '🥚',
    tip: 'Lávalas, sécalas y tritúralas bien; aportan calcio y regulan la acidez.'
  },

  // Materiales CAFÉS (Ricos en Carbono - Estructura y Seco)
  {
    id: 'c1',
    name: 'Hojas secas de árboles',
    category: 'cafe',
    allowed: true,
    emoji: '🍂',
    tip: 'El mejor material estructurante. Guárdalas en sacos para tener reservas.'
  },
  {
    id: 'c2',
    name: 'Cartón corrugado sin tinta ni cinta',
    category: 'cafe',
    allowed: true,
    emoji: '📦',
    tip: 'Rómpelo en pedazos pequeños y humedécelo ligeramente al integrarlo.'
  },
  {
    id: 'c3',
    name: 'Aserrín y viruta de madera natural',
    category: 'cafe',
    allowed: true,
    emoji: '🪵',
    tip: 'Usa solo de madera sin barniz, pintura ni tratamientos químicos.'
  },
  {
    id: 'c4',
    name: 'Ramas pequeñas y podas secas',
    category: 'cafe',
    allowed: true,
    emoji: '🌾',
    tip: 'Ideales para la capa base porque permiten que circule el oxígeno.'
  },
  {
    id: 'c5',
    name: 'Servilletas y papel de cocina usados',
    category: 'cafe',
    allowed: true,
    emoji: '🧻',
    tip: 'Solo si no tienen aceite de cocina, cloro ni productos de limpieza.'
  },
  {
    id: 'c6',
    name: 'Cáscaras de nuez, almendra y cacahuate',
    category: 'cafe',
    allowed: true,
    emoji: '🥜',
    tip: 'Tardan más en degradarse, pero crean bolsas de aire útiles.'
  },

  // Materiales PROHIBIDOS (No deben incluirse)
  {
    id: 'p1',
    name: 'Carnes, pescados y huesos',
    category: 'prohibido',
    allowed: false,
    emoji: '🍖',
    tip: 'Generan malos olores severos y atraen ratas, moscas y animales callejeros.'
  },
  {
    id: 'p2',
    name: 'Lácteos (queso, leche, yogur, crema)',
    category: 'prohibido',
    allowed: false,
    emoji: '🧀',
    tip: 'Se pudren rápidamente provocando olores fétidos y bacterias nocivas.'
  },
  {
    id: 'p3',
    name: 'Aceites, grasas y comida cocinada',
    category: 'prohibido',
    allowed: false,
    emoji: '🍟',
    tip: 'Impermeabilizan los residuos e impiden el paso del oxígeno.'
  },
  {
    id: 'p4',
    name: 'Heces de perros o gatos',
    category: 'prohibido',
    allowed: false,
    emoji: '🐾',
    tip: 'Contienen parásitos y patógenos peligrosos para la salud humana.'
  },
  {
    id: 'p5',
    name: 'Plásticos, metales, vidrio y unicel',
    category: 'prohibido',
    allowed: false,
    emoji: '🥤',
    tip: 'No son biodegradables; contaminan el abono con microplásticos.'
  },
  {
    id: 'p6',
    name: 'Plantas enfermas o maleza con semillas',
    category: 'prohibido',
    allowed: false,
    emoji: '🥀',
    tip: 'Las enfermedades y semillas sobreviven y contaminarán tu huerto.'
  }
];

const STEPS_DATA = [
  {
    number: '01',
    title: 'Prepara el Espacio y la Base',
    subtitle: 'Drenaje y aireación inicial',
    description:
      'Elige un lugar ventilado y con sombra parcial. Coloca una primera capa de 10 a 15 cm de ramas secas gruesas y hojarasca en el fondo para garantizar el drenaje y la entrada de aire.',
    icon: TreePine,
    metric: '10 - 15 cm de base seca',
    color: 'emerald'
  },
  {
    number: '02',
    title: 'Alterna Capas Verde y Café',
    subtitle: 'La regla de oro del equilibrio',
    description:
      'Agrega residuos orgánicos húmedos (Verdes) y cúbrelos siempre con el doble de material seco (Cafés). Nunca dejes restos de comida expuestos en la superficie.',
    icon: Scale,
    metric: 'Proporción 2 Cafés : 1 Verde',
    color: 'amber'
  },
  {
    number: '03',
    title: 'Controla Humedad y Aireación',
    subtitle: 'Vida para los microorganismos',
    description:
      'Riega suavemente hasta lograr la humedad de una "esponja exprimida" (sin encharcar). Voltea y mezcla toda la pila cada 7 días para oxigenar y evitar malos olores.',
    icon: Wind,
    metric: 'Volteo cada 7 días | 50% humedad',
    color: 'sky'
  },
  {
    number: '04',
    title: 'Maduración y Cosecha',
    subtitle: 'Oro negro para la comunidad',
    description:
      'Entre 8 y 12 semanas después, la temperatura bajará y tendrás tierra oscura, suelta y con olor a bosque húmedo. Cierne el material grueso y úsalo en jardines y huertos.',
    icon: Sprout,
    metric: '8 a 12 semanas de proceso',
    color: 'lime'
  }
];

const TROUBLESHOOTING_DATA = [
  {
    problem: 'Mal olor (a huevo podrido o amoníaco)',
    cause: 'Exceso de humedad, demasiados materiales verdes (nitrógeno) o falta de oxígeno por compactación.',
    solution: 'Agrega abundante material café seco (hojas secas, cartón picado o aserrín) y voltea vigorosamente toda la mezcla para airearla.',
    badge: 'Urgente',
    badgeColor: 'bg-red-100 text-red-800 border-red-200'
  },
  {
    problem: 'La composta está muy seca y no avanza',
    cause: 'Falta de agua o exceso de materiales cafés (carbono) expuestos al sol directo.',
    solution: 'Humedece poco a poco con regadera mientras mezclas hasta sentir textura de esponja exprimida. Añade restos de frutas o verduras frescas.',
    badge: 'Proceso lento',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200'
  },
  {
    problem: 'Presencia de moscas de fruta o hormigas',
    cause: 'Restos de fruta dulce descubiertos en la superficie o falta de humedad (en caso de hormigas).',
    solution: 'Entierra los residuos frescos en el centro de la pila y cúbrelos siempre con una capa de 5 cm de tierra, hojas secas o aserrín.',
    badge: 'Prevención',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  },
  {
    problem: 'El centro no se calienta',
    cause: 'Pila demasiado pequeña (menos de 1 m³) o falta de nitrógeno para activar las bacterias termófilas.',
    solution: 'Agrega más material verde rico en nitrógeno (posos de café, pasto verde, restos vegetales) y verifica que tenga suficiente humedad.',
    badge: 'Activación',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200'
  }
];

const FAQ_DATA = [
  {
    q: '¿Qué es exactamente la composta y por qué importa en nuestra escuela?',
    a: 'La composta es el abono orgánico resultante de la descomposición controlada de residuos vegetales y materia seca mediante microorganismos benéficos. En el CETis 58 y nuestros hogares, más del 45% de la basura diaria es orgánica; compostarla reduce gases de efecto invernadero y regenera nuestros suelos.'
  },
  {
    q: '¿Puedo hacer composta si vivo en un departamento o espacio pequeño?',
    a: '¡Sí! Puedes usar un compostero cerrado ventilado en el patio o balcón, o bien optar por una lombricomposta doméstica. Mientras mantengas la proporción 2:1 (café/verde) y cubras los residuos con material seco, no producirá olores.'
  },
  {
    q: '¿Qué hago con los pedazos grandes que no se descompusieron al cosechar?',
    a: 'Al cernir tu composta madura con una malla o rejilla, separa las ramitas o cáscaras gruesas que aún no se degradan por completo y reintégralas al inicio de tu nueva composta: ¡servirán como inóculo lleno de microorganismos benéficos!'
  },
  {
    q: '¿Cómo sé que mi composta ya está lista para usarse en plantas?',
    a: 'Tiene 4 señales claras: 1) Color café oscuro casi negro, 2) Textura suelta y esponjosa como tierra de bosque, 3) Olor agradable a tierra húmeda (nada ácido ni fétido), y 4) Temperatura ambiente (ya no está caliente en el centro).'
  }
];

// ============================================================================
// COMPONENTE PRINCIPAL DE LA APLICACIÓN
// ============================================================================

export default function App() {
  // Estados para navegación y secciones interactivas
  const [activeSection, setActiveSection] = useState('inicio');

  // Estados para el Buscador y Filtro de Residuos
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('todos'); // 'todos' | 'verde' | 'cafe' | 'prohibido'

  // Estados para el Simulador Interactivo de Proporción Verde / Café
  const [greenBuckets, setGreenBuckets] = useState(2); // Cubetas o partes de material verde
  const [brownBuckets, setBrownBuckets] = useState(4); // Cubetas o partes de material café
  const [moistureLevel, setMoistureLevel] = useState(50); // % de humedad

  // Estado para Acordeón de Preguntas Frecuentes
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Filtrado dinámico de residuos
  const filteredWaste = useMemo(() => {
    return WASTE_ITEMS.filter((item) => {
      const matchesFilter =
        selectedFilter === 'todos' || item.category === selectedFilter;
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tip.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [searchTerm, selectedFilter]);

  // Cálculo y diagnóstico inteligente del Simulador de Composta
  const simulatorDiagnosis = useMemo(() => {
    const total = greenBuckets + brownBuckets;
    if (total === 0) {
      return {
        status: 'empty',
        title: 'Compostero Vacío',
        color: 'text-stone-600',
        bg: 'bg-stone-100 border-stone-300',
        badge: 'Sin mezcla',
        ratioText: '0 : 0',
        advice: 'Agrega cubetas de material Verde (nitrógeno) y Café (carbono) para simular tu mezcla.',
        moistureAdvice: 'Ajusta el nivel de agua para comenzar.'
      };
    }

    const ratio = brownBuckets / (greenBuckets || 0.1);
    const brownPercent = Math.round((brownBuckets / total) * 100);
    const greenPercent = 100 - brownPercent;

    let status = 'optimal';
    let title = '¡Equilibrio Ideal! Mezcla Saludable';
    let color = 'text-emerald-800';
    let bg = 'bg-emerald-50 border-emerald-300';
    let badge = 'Proporción Óptima (2:1 a 3:1)';
    let advice =
      'Tu composta tiene el balance perfecto entre Nitrógeno y Carbono. Se calentará adecuadamente, no tendrá malos olores y producirá abono de alta calidad.';

    if (greenBuckets > 0 && brownBuckets === 0) {
      status = 'danger-green';
      title = 'Alerta: Exceso Crítico de Material Verde';
      color = 'text-red-800';
      bg = 'bg-red-50 border-red-300';
      badge = 'Riesgo de pudrición y mal olor';
      advice =
        'Sin material café (carbono), los residuos húmedos se compactarán, perderán oxígeno y generarán olor a amoníaco y moscas. ¡Agrega hojas secas o cartón!';
    } else if (brownBuckets > 0 && greenBuckets === 0) {
      status = 'slow-brown';
      title = 'Mezcla Demasiado Seca (Solo Carbono)';
      color = 'text-amber-800';
      bg = 'bg-amber-50 border-amber-300';
      badge = 'Descomposición muy lenta';
      advice =
        'El material café necesita nitrógeno para activar los microorganismos. Agrega restos de frutas, verduras o posos de café para arrancar el proceso.';
    } else if (ratio < 1.5) {
      status = 'excess-green';
      title = 'Exceso de Nitrógeno (Demasiado Verde)';
      color = 'text-orange-800';
      bg = 'bg-orange-50 border-orange-300';
      badge = `Proporción ${ratio.toFixed(1)} : 1 (Falta Café)`;
      advice = `Tienes ${greenPercent}% de material verde. Te recomendamos agregar ${Math.max(
        1,
        Math.ceil(greenBuckets * 2 - brownBuckets)
      )} cubeta(s) más de material café seco para evitar humedad excesiva y malos olores.`;
    } else if (ratio > 3.5) {
      status = 'excess-brown';
      title = 'Exceso de Carbono (Demasiado Café)';
      color = 'text-amber-800';
      bg = 'bg-amber-50 border-amber-300';
      badge = `Proporción ${ratio.toFixed(1)} : 1 (Falta Verde)`;
      advice = `Tienes ${brownPercent}% de material seco. No olerá mal, pero tardará muchos meses. Añade ${Math.max(
        1,
        Math.ceil(brownBuckets / 2.5 - greenBuckets)
      )} cubeta(s) de residuos vegetales frescos para acelerar la temperatura.`;
    }

    let moistureAdvice = 'Humedad ideal (45% - 60%): como una esponja exprimida.';
    if (moistureLevel < 35) {
      moistureAdvice =
        'Humedad baja: los microorganismos se detienen. Riega ligeramente al voltear.';
    } else if (moistureLevel > 65) {
      moistureAdvice =
        'Exceso de agua: desplaza el oxígeno y causa pudrición. Agrega material café seco.';
    }

    return {
      status,
      title,
      color,
      bg,
      badge,
      ratioText: `${brownBuckets} Café : ${greenBuckets} Verde`,
      brownPercent,
      greenPercent,
      advice,
      moistureAdvice
    };
  }, [greenBuckets, brownBuckets, moistureLevel]);

  // Función auxiliar para desplazamiento suave a secciones
  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2] text-[#1E2B22] font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* =====================================================================
          BARRA DE NAVEGACIÓN SUPERIOR (STICKY)
      ====================================================================== */}
      <header className="sticky top-0 z-50 bg-[#FAF8F2]/95 backdrop-blur-md border-b border-[#E3DEC9] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Identidad del Proyecto */}
            <div
              onClick={() => scrollToSection('inicio')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6 text-emerald-200" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base md:text-lg tracking-tight text-[#1B4332]">
                    CAMPUS VERDE
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#1B4332] border border-emerald-300">
                    CETis 58
                  </span>
                </div>
                <p className="text-[11px] md:text-xs text-[#5C4D3C] font-medium">
                  Del aula a la comunidad • Guía de Compostaje
                </p>
              </div>
            </div>

            {/* Enlaces de Navegación Desktop */}
            <nav className="hidden lg:flex items-center gap-1">
              {[
                { id: 'que-es', label: '¿Qué es?' },
                { id: 'materiales', label: '¿Qué SÍ y qué NO?' },
                { id: 'pasos', label: 'Paso a Paso' },
                { id: 'simulador', label: 'Simulador 2:1' },
                { id: 'soluciones', label: 'Problemas y FAQ' }
              ].map((nav) => (
                <button
                  key={nav.id}
                  onClick={() => scrollToSection(nav.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeSection === nav.id
                      ? 'bg-[#1B4332] text-white shadow-sm'
                      : 'text-[#3D4A3E] hover:bg-[#EDE8D8] hover:text-[#1B4332]'
                  }`}
                >
                  {nav.label}
                </button>
              ))}
            </nav>

            {/* Botón Acción Rápida */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollToSection('simulador')}
                className="inline-flex items-center gap-2 px-3.5 py-2 md:px-4 md:py-2.5 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs md:text-sm font-bold shadow-sm transition-all cursor-pointer"
              >
                <Scale className="w-4 h-4" />
                <span>Probar Simulador</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================================
          SECCIÓN 1: HERO / PORTADA EDUCATIVA
      ====================================================================== */}
      <section
        id="inicio"
        className="relative overflow-hidden bg-gradient-to-b from-[#1B4332] via-[#22523D] to-[#2D6A4F] text-white py-14 md:py-22"
      >
        {/* Decoración orgánica sutil */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-300 blur-3xl" />
          <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-amber-200 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Texto Principal */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-emerald-100 text-xs md:text-sm font-semibold">
                <Award className="w-4 h-4 text-amber-300" />
                <span>Iniciativa Ambiental Estudiantil • CETis 58</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Transforma tus residuos orgánicos en{' '}
                <span className="text-amber-300 underline decoration-amber-400/50 decoration-4 underline-offset-4">
                  vida para la tierra
                </span>
              </h1>

              <p className="text-base sm:text-lg text-emerald-50/90 leading-relaxed max-w-2xl">
                Bienvenido a la guía interactiva de{' '}
                <strong className="text-white">CAMPUS VERDE CETis 58: Del aula a la comunidad</strong>.
                Aprende de manera clara, práctica y científica cómo crear composta en tu escuela o en tu hogar,
                reduciendo hasta un 50% de la basura diaria.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => scrollToSection('materiales')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#1B4332] font-extrabold text-sm md:text-base shadow-lg transition-all cursor-pointer"
                >
                  <Search className="w-5 h-5" />
                  <span>Buscador: ¿Qué puedo compostar?</span>
                </button>
                <button
                  onClick={() => scrollToSection('pasos')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/30 font-bold text-sm md:text-base transition-all cursor-pointer"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Ver guía paso a paso</span>
                </button>
              </div>
            </div>

            {/* Tarjeta Visual de Impacto Ambiental */}
            <div className="lg:col-span-5">
              <div className="bg-[#FAF8F2] text-[#1E2B22] rounded-3xl p-6 md:p-8 shadow-2xl border border-[#E3DEC9]">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#6B4E31] bg-[#F2ECE1] px-3 py-1 rounded-full">
                    Impacto del Compostaje
                  </span>
                  <Recycle className="w-6 h-6 text-[#2D6A4F]" />
                </div>

                <h2 className="text-xl font-extrabold text-[#1B4332] mb-4">
                  ¿Por qué hacer composta hoy?
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/70">
                    <div className="w-10 h-10 rounded-xl bg-[#2D6A4F] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                      -45%
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#1B4332]">
                        Menos basura en rellenos sanitarios
                      </h3>
                      <p className="text-xs text-[#4A584E] mt-0.5">
                        Casi la mitad de los desechos escolares y domésticos son restos orgánicos aprovechables.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/70">
                    <div className="w-10 h-10 rounded-xl bg-[#7F5539] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                      CH₄
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#5C3D28]">
                        Evita emisiones de gas metano
                      </h3>
                      <p className="text-xs text-[#5C4D3C] mt-0.5">
                        Al airear los residuos evitamos la descomposición sin oxígeno que calienta el planeta.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-lime-50/80 border border-lime-200/70">
                    <div className="w-10 h-10 rounded-xl bg-[#40916C] text-white flex items-center justify-center shrink-0">
                      <Sprout className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#1B4332]">
                        Fertilizante 100% natural y gratuito
                      </h3>
                      <p className="text-xs text-[#4A584E] mt-0.5">
                        Nutre las áreas verdes del plantel, huertos urbanos y macetas sin químicos sintéticos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 2: ¿QUÉ ES LA COMPOSTA Y CÓMO FUNCIONA LA CIENCIA DETRÁS?
      ====================================================================== */}
      <section id="que-es" className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#2D6A4F] bg-emerald-100 px-3 py-1 rounded-full mb-3">
            <Leaf className="w-3.5 h-3.5" /> Fundamentos Ecológicos
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1B4332]">
            ¿Qué es la composta y cómo ocurre la magia?
          </h2>
          <p className="mt-3 text-[#4A584E] text-base sm:text-lg leading-relaxed">
            La composta es el proceso biológico controlado mediante el cual millones de microorganismos
            (bacterias, hongos y actinomicetos) transforman restos orgánicos en{' '}
            <strong className="text-[#1B4332]">humus</strong>: una tierra oscura, fértil y rica en nutrientes.
          </p>
        </div>

        {/* Los 4 Ingredientes Vitales de toda Composta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-[#E3DEC9] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#1B4332] flex items-center justify-center mb-4">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-[#1B4332]">1. Nitrógeno (Verdes)</h3>
            <p className="text-sm text-[#4A584E] mt-2 leading-relaxed">
              Son materiales frescos y húmedos (frutas, verduras, pasto verde). Brindan proteínas para que
              los microorganismos se reproduzcan y generen calor.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E3DEC9] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#7F5539] flex items-center justify-center mb-4">
              <TreePine className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-[#5C3D28]">2. Carbono (Cafés)</h3>
            <p className="text-sm text-[#4A584E] mt-2 leading-relaxed">
              Son materiales secos y fibrosos (hojas secas, cartón, aserrín). Aportan energía, absorben exceso
              de humedad y evitan malos olores.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E3DEC9] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center mb-4">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-sky-900">3. Agua (Humedad)</h3>
            <p className="text-sm text-[#4A584E] mt-2 leading-relaxed">
              Los microorganismos necesitan una película de agua para moverse y digerir los residuos. La
              humedad ideal es entre <strong>45% y 60%</strong>.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E3DEC9] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center mb-4">
              <Wind className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-teal-900">4. Oxígeno (Aire)</h3>
            <p className="text-sm text-[#4A584E] mt-2 leading-relaxed">
              El compostaje es un proceso <strong>aeróbico</strong>. Voltear la mezcla permite que respiren
              las bacterias benéficas y elimina olores desagradables.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 3: BUSCADOR Y FILTRO INTERACTIVO DE RESIDUOS (SÍ vs NO)
      ====================================================================== */}
      <section
        id="materiales"
        className="py-16 md:py-20 bg-[#F2ECE1]/80 border-y border-[#E3DEC9]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#6B4E31] bg-amber-100 px-3 py-1 rounded-full mb-3">
              <Search className="w-3.5 h-3.5" /> Clasificador Interactivo
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1B4332]">
              ¿Qué materiales SÍ van y cuáles NO?
            </h2>
            <p className="mt-3 text-[#4A584E] text-base">
              Usa el buscador o filtra por categoría para verificar al instante si un residuo puede entrar a tu composta y cómo prepararlo.
            </p>
          </div>

          {/* Controles de Búsqueda y Filtros */}
          <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-[#E3DEC9] mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              {/* Barra de búsqueda */}
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-[#6B4E31] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Escribe un residuo (ej. café, cáscara, carne, cartón, huevo)..."
                  className="w-full pl-11 pr-10 py-3 rounded-xl bg-[#FAF8F2] border border-[#D8D0BC] text-[#1E2B22] placeholder-[#7C7263] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] text-sm sm:text-base"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    aria-label="Limpiar búsqueda"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Botones de Filtro */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedFilter('todos')}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    selectedFilter === 'todos'
                      ? 'bg-[#1B4332] text-white shadow-sm'
                      : 'bg-[#FAF8F2] text-[#3D4A3E] border border-[#D8D0BC] hover:bg-[#EDE8D8]'
                  }`}
                >
                  Todos ({WASTE_ITEMS.length})
                </button>
                <button
                  onClick={() => setSelectedFilter('verde')}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    selectedFilter === 'verde'
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>SÍ: Verdes (Nitrógeno)</span>
                </button>
                <button
                  onClick={() => setSelectedFilter('cafe')}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    selectedFilter === 'cafe'
                      ? 'bg-[#7F5539] text-white shadow-sm'
                      : 'bg-amber-50 text-[#5C3D28] border border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>SÍ: Cafés (Carbono)</span>
                </button>
                <button
                  onClick={() => setSelectedFilter('prohibido')}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    selectedFilter === 'prohibido'
                      ? 'bg-red-700 text-white shadow-sm'
                      : 'bg-red-50 text-red-900 border border-red-200 hover:bg-red-100'
                  }`}
                >
                  <XCircle className="w-4 h-4" />
                  <span>NO Compostables</span>
                </button>
              </div>
            </div>
          </div>

          {/* Rejilla de Resultados de Residuos */}
          {filteredWaste.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-[#E3DEC9]">
              <p className="text-lg font-bold text-[#1B4332]">
                No encontramos residuos con "{searchTerm}"
              </p>
              <p className="text-sm text-[#5C4D3C] mt-1">
                Intenta buscar con otra palabra o reinicia los filtros.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedFilter('todos');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-[#2D6A4F] text-white text-sm font-bold cursor-pointer"
              >
                Mostrar todos los materiales
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredWaste.map((item) => {
                const isGreen = item.category === 'verde';
                const isBrown = item.category === 'cafe';

                let cardStyle = 'border-red-200 bg-white';
                let badgeStyle = 'bg-red-100 text-red-800';
                let badgeLabel = 'NO INCLUIR';

                if (isGreen) {
                  cardStyle = 'border-emerald-200 bg-white';
                  badgeStyle = 'bg-emerald-100 text-emerald-800';
                  badgeLabel = 'SÍ • VERDE (Nitrógeno)';
                } else if (isBrown) {
                  cardStyle = 'border-amber-200 bg-white';
                  badgeStyle = 'bg-amber-100 text-[#5C3D28]';
                  badgeLabel = 'SÍ • CAFÉ (Carbono)';
                }

                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl p-5 border-2 ${cardStyle} shadow-sm hover:shadow-md transition-all flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <span className="text-3xl" role="img" aria-label={item.name}>
                          {item.emoji}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold ${badgeStyle}`}
                        >
                          {item.allowed ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <X className="w-3.5 h-3.5" />
                          )}
                          {badgeLabel}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-base text-[#1E2B22] mb-2">
                        {item.name}
                      </h3>
                    </div>

                    <div className="mt-2 pt-3 border-t border-stone-100 flex items-start gap-2 text-xs text-[#4A584E]">
                      <Info className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                      <span>{item.tip}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 4: PROCESO PASO A PASO PARA ARMAR Y MANTENER TU COMPOSTA
      ====================================================================== */}
      <section id="pasos" className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#2D6A4F] bg-emerald-100 px-3 py-1 rounded-full mb-3">
            <Clock className="w-3.5 h-3.5" /> Metodología Práctica
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1B4332]">
            Cómo armar tu composta en 4 pasos sencillos
          </h2>
          <p className="mt-3 text-[#4A584E] text-base">
            Sigue esta guía paso a paso aplicada en las brigadas ecológicas del CETis 58 para garantizar una composta rápida y libre de olores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS_DATA.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-white rounded-3xl p-6 border border-[#E3DEC9] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-black text-[#D8D0BC]">
                      {step.number}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-[#1B4332] text-emerald-200 flex items-center justify-center">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-[#6B4E31]">
                    {step.subtitle}
                  </span>
                  <h3 className="text-lg font-extrabold text-[#1B4332] mt-1 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#4A584E] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#EDE8D8]">
                  <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1B4332] bg-[#FAF8F2] px-3 py-1.5 rounded-lg border border-[#E3DEC9] w-full justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>{step.metric}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 5: SIMULADOR INTERACTIVO DE PROPORCIÓN VERDE / CAFÉ
      ====================================================================== */}
      <section
        id="simulador"
        className="py-16 md:py-20 bg-gradient-to-br from-[#1B4332] to-[#265942] text-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-300 bg-white/10 px-3 py-1 rounded-full mb-3 border border-white/20">
              <Scale className="w-3.5 h-3.5" /> Herramienta Interactiva
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
              Calculadora y Simulador de Proporción Verde / Café
            </h2>
            <p className="mt-3 text-emerald-100/90 text-base">
              Experimenta agregando cubetas de residuos <strong>Verdes</strong> (nitrógeno) y <strong>Cafés</strong> (carbono),
              ajusta la humedad y descubre cómo reacciona tu composta antes de prepararla en casa.
            </p>
          </div>

          <div className="bg-[#FAF8F2] text-[#1E2B22] rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-[#E3DEC9]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Panel Izquierdo: Controles Interactivos */}
              <div className="lg:col-span-6 space-y-6">
                {/* Control Material Verde */}
                <div className="p-5 rounded-2xl bg-emerald-50/90 border border-emerald-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-emerald-700" />
                      <span className="font-extrabold text-emerald-950">
                        Material VERDE (Nitrógeno)
                      </span>
                    </div>
                    <span className="text-lg font-black text-emerald-800 bg-white px-3 py-0.5 rounded-lg border border-emerald-200">
                      {greenBuckets} {greenBuckets === 1 ? 'cubeta' : 'cubetas'}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800 mb-4">
                    Cáscaras de fruta, verduras, posos de café, pasto fresco.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setGreenBuckets(Math.max(0, greenBuckets - 1))}
                      aria-label="Disminuir material verde"
                      className="w-11 h-11 rounded-xl bg-white hover:bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-900 font-bold shadow-sm cursor-pointer"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={greenBuckets}
                      onChange={(e) => setGreenBuckets(Number(e.target.value))}
                      className="flex-1 accent-emerald-700 h-2.5 bg-emerald-200 rounded-lg cursor-pointer"
                    />
                    <button
                      onClick={() => setGreenBuckets(Math.min(10, greenBuckets + 1))}
                      aria-label="Aumentar material verde"
                      className="w-11 h-11 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center font-bold shadow-sm cursor-pointer"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Control Material Café */}
                <div className="p-5 rounded-2xl bg-amber-50/90 border border-amber-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <TreePine className="w-5 h-5 text-[#7F5539]" />
                      <span className="font-extrabold text-[#5C3D28]">
                        Material CAFÉ (Carbono)
                      </span>
                    </div>
                    <span className="text-lg font-black text-[#7F5539] bg-white px-3 py-0.5 rounded-lg border border-amber-200">
                      {brownBuckets} {brownBuckets === 1 ? 'cubeta' : 'cubetas'}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B4E31] mb-4">
                    Hojas secas, cartón picado, aserrín natural, ramas secas.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setBrownBuckets(Math.max(0, brownBuckets - 1))}
                      aria-label="Disminuir material café"
                      className="w-11 h-11 rounded-xl bg-white hover:bg-amber-100 border border-amber-300 flex items-center justify-center text-[#5C3D28] font-bold shadow-sm cursor-pointer"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="15"
                      value={brownBuckets}
                      onChange={(e) => setBrownBuckets(Number(e.target.value))}
                      className="flex-1 accent-[#7F5539] h-2.5 bg-amber-200 rounded-lg cursor-pointer"
                    />
                    <button
                      onClick={() => setBrownBuckets(Math.min(15, brownBuckets + 1))}
                      aria-label="Aumentar material café"
                      className="w-11 h-11 rounded-xl bg-[#7F5539] hover:bg-[#5C3D28] text-white flex items-center justify-center font-bold shadow-sm cursor-pointer"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Control de Humedad */}
                <div className="p-5 rounded-2xl bg-sky-50/90 border border-sky-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-5 h-5 text-sky-700" />
                      <span className="font-extrabold text-sky-950">
                        Nivel de Humedad
                      </span>
                    </div>
                    <span className="text-sm font-black text-sky-800 bg-white px-3 py-0.5 rounded-lg border border-sky-200">
                      {moistureLevel}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    step="5"
                    value={moistureLevel}
                    onChange={(e) => setMoistureLevel(Number(e.target.value))}
                    className="w-full accent-sky-600 h-2.5 bg-sky-200 rounded-lg cursor-pointer mt-2"
                  />
                  <div className="flex justify-between text-[11px] font-semibold text-sky-800 mt-1.5">
                    <span>Muy seca (10%)</span>
                    <span>Ideal (50%)</span>
                    <span>Encharcada (90%)</span>
                  </div>
                </div>
              </div>

              {/* Panel Derecho: Diagnóstico Visual en Tiempo Real */}
              <div className="lg:col-span-6 space-y-6">
                <div
                  className={`rounded-3xl p-6 sm:p-7 border-2 transition-all ${simulatorDiagnosis.bg}`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-white/80 text-[#1E2B22] border border-black/10">
                      {simulatorDiagnosis.badge}
                    </span>
                    <span className="text-sm font-black text-[#1B4332]">
                      Relación: {simulatorDiagnosis.ratioText}
                    </span>
                  </div>

                  <h3 className={`text-xl sm:text-2xl font-extrabold mb-3 ${simulatorDiagnosis.color}`}>
                    {simulatorDiagnosis.title}
                  </h3>

                  {/* Barra Visual de Composición */}
                  {greenBuckets + brownBuckets > 0 && (
                    <div className="my-5">
                      <div className="flex justify-between text-xs font-bold mb-1.5">
                        <span className="text-[#5C3D28]">
                          Café (Carbono): {simulatorDiagnosis.brownPercent}%
                        </span>
                        <span className="text-emerald-800">
                          Verde (Nitrógeno): {simulatorDiagnosis.greenPercent}%
                        </span>
                      </div>
                      <div className="w-full h-5 rounded-full overflow-hidden flex bg-stone-200 shadow-inner">
                        <div
                          style={{ width: `${simulatorDiagnosis.brownPercent}%` }}
                          className="bg-[#7F5539] transition-all duration-300"
                          title="Material Café"
                        />
                        <div
                          style={{ width: `${simulatorDiagnosis.greenPercent}%` }}
                          className="bg-emerald-600 transition-all duration-300"
                          title="Material Verde"
                        />
                      </div>
                      <p className="text-[11px] text-stone-600 mt-1.5 text-center">
                        Meta recomendada: ~67% a 75% Café y ~25% a 33% Verde (2 o 3 partes café por 1 verde).
                      </p>
                    </div>
                  )}

                  <p className="text-sm text-[#1E2B22] leading-relaxed bg-white/75 p-4 rounded-2xl border border-black/5">
                    {simulatorDiagnosis.advice}
                  </p>

                  <div className="mt-4 flex items-start gap-2.5 text-xs font-semibold text-sky-950 bg-sky-100/80 p-3.5 rounded-xl border border-sky-200">
                    <Droplets className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                    <span>{simulatorDiagnosis.moistureAdvice}</span>
                  </div>

                  {/* Botón para restaurar valores ideales */}
                  <div className="mt-5 flex justify-end">
                    <button
                      onClick={() => {
                        setGreenBuckets(2);
                        setBrownBuckets(4);
                        setMoistureLevel(50);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4332] hover:underline cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Restaurar proporción ideal (4 Café : 2 Verde)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 6: PROBLEMAS COMUNES Y PREGUNTAS FRECUENTES (FAQ)
      ====================================================================== */}
      <section id="soluciones" className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Columna Izquierda: Guía de Solución de Problemas */}
          <div className="lg:col-span-7">
            <div className="mb-8">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full mb-3">
                <AlertTriangle className="w-3.5 h-3.5" /> Diagnóstico Rápido
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B4332]">
                Errores comunes y cómo solucionarlos
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#4A584E]">
                ¿Tu composta huele mal o tiene moscas? Todo tiene solución sencilla ajustando aire, agua o proporción.
              </p>
            </div>

            <div className="space-y-4">
              {TROUBLESHOOTING_DATA.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E3DEC9] shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="font-extrabold text-base sm:text-lg text-[#1E2B22]">
                      {item.problem}
                    </h3>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6B4E31] mb-3">
                    <strong>Causa probable:</strong> {item.cause}
                  </p>
                  <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-xs sm:text-sm text-[#1B4332]">
                    <strong>Solución práctica:</strong> {item.solution}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Columna Derecha: Preguntas Frecuentes (Acordeón) */}
          <div className="lg:col-span-5">
            <div className="mb-8">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#2D6A4F] bg-emerald-100 px-3 py-1 rounded-full mb-3">
                <HelpCircle className="w-3.5 h-3.5" /> Dudas Frecuentes
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B4332]">
                Preguntas de la Comunidad
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#4A584E]">
                Resolvemos las dudas más habituales de estudiantes, docentes y familias.
              </p>
            </div>

            <div className="space-y-3">
              {FAQ_DATA.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-[#E3DEC9] overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-[#FAF8F2] transition-colors cursor-pointer"
                    >
                      <span className="font-bold text-sm sm:text-base text-[#1B4332]">
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-[#2D6A4F] shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-sm text-[#4A584E] leading-relaxed border-t border-stone-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Tarjeta Comunitaria CETis 58 */}
            <div className="mt-8 bg-gradient-to-br from-[#6B4E31] to-[#4A3520] text-white rounded-3xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base">Del aula a la comunidad</h3>
                  <p className="text-xs text-amber-200">Compromiso Ambiental CETis 58</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-amber-50/90 leading-relaxed">
                Cada kilogramo de residuos orgánicos que compostamos en el plantel y en nuestros hogares
                se convierte en suelo fértil para reforestar nuestra ciudad. ¡Comparte esta guía con tu familia y vecinos!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          PIE DE PÁGINA (FOOTER)
      ====================================================================== */}
      <footer className="bg-[#152E22] text-emerald-100/80 py-10 border-t border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-200">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-white text-sm">
                CAMPUS VERDE CETis 58: Del aula a la comunidad
              </p>
              <p className="text-xs text-emerald-300/80">
                Plataforma educativa abierta sobre compostaje y gestión sostenible de residuos orgánicos.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <button
              onClick={() => scrollToSection('que-es')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Fundamentos
            </button>
            <span>•</span>
            <button
              onClick={() => scrollToSection('materiales')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Clasificador
            </button>
            <span>•</span>
            <button
              onClick={() => scrollToSection('simulador')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Simulador 2:1
            </button>
            <span>•</span>
            <button
              onClick={() => scrollToSection('soluciones')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Soluciones
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}