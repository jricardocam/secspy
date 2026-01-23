"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Heart, MessageCircle, Send, Bookmark, Volume2, VolumeX, MoreHorizontal, X, ShoppingBag, ChevronRight, CheckCircle2, Plus } from "lucide-react"

export function FeedVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()
  const redirectedRef = useRef(false)

  // Estados de interacción
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [muted, setMuted] = useState(false)
  const [likes, setLikes] = useState(8432) // Número más alto para credibilidad
  const [showComments, setShowComments] = useState(false)
  const [started, setStarted] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false) // Nuevo estado para seguir

  // COMENTARIOS REALISTAS (Prueba Social y Manejo de Objeciones) - 69 comentarios
  const comments = [
    { id: 1, user: "carlos_grill", text: "Soy ex-gerente de una sucursal y confirmo que los procesos son idénticos. Borra esto antes que lo vean jaja", time: "2h", avatar: "/avatars/avatar-01.jpg", likes: 245 },
    { id: 2, user: "valery_foodie", text: "Acabo de hacer la salsa secreta para la cena y mi esposo juraba que las pedimos por delivery. 10/10", time: "5h", avatar: "/avatars/avatar-02.jpg", likes: 892 },
    { id: 3, user: "mister_burger", text: "Vienen las medidas exactas o son al tanteo?", time: "1d", avatar: "/avatars/avatar-03.jpg", likes: 56, replies: [{ user: "chef_secreto", text: "Viene todo pesado en gramos exactos hermano, es la ficha técnica real." }] },
    { id: 4, user: "lupita_rodriguez", text: "Yo pague $10 y me llegaron al correo al instante, estan super completos los recetarios.", time: "1d", avatar: "/avatars/avatar-04.jpg", likes: 120 },
    { id: 5, user: "ricky_cocina", text: "Lo que me ahorre en cenas esta semana no tiene nombre... gracias crack!", time: "2d", avatar: "/avatars/avatar-05.jpg", likes: 34 },
    { id: 6, user: "maria_chef", text: "Hice las papas del McDonalds y quedaron IDENTICAS. Mi familia no lo podia creer", time: "3h", avatar: "/avatars/avatar-06.jpg", likes: 567 },
    { id: 7, user: "jorge_foodlover", text: "Por $10 USD tienes acceso a recetas que las franquicias cobran miles en capacitacion", time: "4h", avatar: "/avatars/avatar-07.jpg", likes: 234 },
    { id: 8, user: "ana_cocina", text: "El pollo estilo KFC me quedo mejor que el original, no es broma", time: "6h", avatar: "/avatars/avatar-08.jpg", likes: 445 },
    { id: 9, user: "pedro_gourmet", text: "Alguien sabe si incluye las salsas de Taco Bell? Esas son mi debilidad", time: "7h", avatar: "/avatars/avatar-09.jpg", likes: 89, replies: [{ user: "chef_secreto", text: "Si hermano, todas las salsas principales estan incluidas" }] },
    { id: 10, user: "laura_fit", text: "Ahora puedo hacer versiones mas saludables en casa sabiendo los ingredientes reales", time: "8h", avatar: "/avatars/avatar-10.jpg", likes: 156 },
    { id: 11, user: "roberto_master", text: "20 anos en la industria y puedo confirmar que estas recetas son legitimas", time: "9h", avatar: "/avatars/avatar-11.jpg", likes: 723 },
    { id: 12, user: "carmen_delicias", text: "Mi negocio de hamburguesas despego desde que use estas recetas. Gracias!", time: "10h", avatar: "/avatars/avatar-12.jpg", likes: 312 },
    { id: 13, user: "diego_fitness", text: "Por fin puedo calcular las calorias reales de lo que como", time: "11h", avatar: "/avatars/avatar-13.jpg", likes: 198 },
    { id: 14, user: "sofia_sweet", text: "Los postres de Starbucks me salieron perfectos, mis amigas no lo creian", time: "12h", avatar: "/avatars/avatar-14.jpg", likes: 267 },
    { id: 15, user: "manuel_pro", text: "Esto es oro puro para cualquiera que quiera emprender en comida", time: "13h", avatar: "/avatars/avatar-15.jpg", likes: 445 },
    { id: 16, user: "elena_foodie", text: "La salsa Big Mac es EXACTA. Probe mil recetas de internet y ninguna se acercaba", time: "14h", avatar: "/avatars/avatar-01.jpg", likes: 534 },
    { id: 17, user: "andres_chef", text: "Como chef profesional digo: esto vale mucho mas de $10", time: "15h", avatar: "/avatars/avatar-02.jpg", likes: 678 },
    { id: 18, user: "patricia_home", text: "Mis hijos ya no quieren ir a McDonalds porque les hago todo mejor en casa", time: "16h", avatar: "/avatars/avatar-03.jpg", likes: 389 },
    { id: 19, user: "fernando_grill", text: "El secreto del Whopper esta en el asado, y aqui lo explican perfecto", time: "17h", avatar: "/avatars/avatar-04.jpg", likes: 234 },
    { id: 20, user: "lucia_cooks", text: "Pense que era estafa pero llego todo al instante. Super recomendado", time: "18h", avatar: "/avatars/avatar-05.jpg", likes: 156 },
    { id: 21, user: "ricardo_taste", text: "Las alitas estilo Buffalo Wild Wings quedaron de 10. Mi familia esta feliz", time: "19h", avatar: "/avatars/avatar-06.jpg", likes: 267 },
    { id: 22, user: "monica_kitchen", text: "Ahorro facil $200 al mes haciendo todo en casa con estas recetas", time: "20h", avatar: "/avatars/avatar-07.jpg", likes: 445 },
    { id: 23, user: "gustavo_food", text: "El queso de los nachos de Taco Bell era mi misterio. Ya no mas!", time: "21h", avatar: "/avatars/avatar-08.jpg", likes: 178 },
    { id: 24, user: "claudia_chef", text: "Trabaje 5 anos en Wendys y si, estas son las recetas reales", time: "22h", avatar: "/avatars/avatar-09.jpg", likes: 623 },
    { id: 25, user: "alberto_pro", text: "Monte mi food truck con estas recetas. Mejor inversion de mi vida", time: "23h", avatar: "/avatars/avatar-10.jpg", likes: 534 },
    { id: 26, user: "rosa_cocina", text: "La mayonesa chipotle de Subway me quedo identica!", time: "1d", avatar: "/avatars/avatar-11.jpg", likes: 289 },
    { id: 27, user: "daniel_eats", text: "Mis amigos piensan que pido delivery pero todo lo hago yo", time: "1d", avatar: "/avatars/avatar-12.jpg", likes: 345 },
    { id: 28, user: "isabel_food", text: "El pan de los sandwiches de Subway es el mejor descubrimiento", time: "1d", avatar: "/avatars/avatar-13.jpg", likes: 234 },
    { id: 29, user: "oscar_grill", text: "Alguien mas hizo la carne de Chipotle? Quedo brutal", time: "1d", avatar: "/avatars/avatar-14.jpg", likes: 456 },
    { id: 30, user: "adriana_chef", text: "Por fin encontre como hacer el glaseado de Krispy Kreme", time: "1d", avatar: "/avatars/avatar-15.jpg", likes: 567 },
    { id: 31, user: "miguel_taste", text: "Esto deberia costar minimo $50. Esta regalado", time: "2d", avatar: "/avatars/avatar-01.jpg", likes: 678 },
    { id: 32, user: "carolina_cooks", text: "Mi esposo chef no creia que yo hice las costillas estilo Chilis", time: "2d", avatar: "/avatars/avatar-02.jpg", likes: 389 },
    { id: 33, user: "pablo_foodie", text: "Las papas curly de Arbys eran mi obsesion. Ahora las hago cuando quiero", time: "2d", avatar: "/avatars/avatar-03.jpg", likes: 234 },
    { id: 34, user: "teresa_kitchen", text: "14 PDFs por $10? Es el mejor deal que he encontrado", time: "2d", avatar: "/avatars/avatar-04.jpg", likes: 445 },
    { id: 35, user: "raul_master", text: "Empece vendiendo hamburguesas los fines de semana. Ya es mi trabajo de tiempo completo", time: "2d", avatar: "/avatars/avatar-05.jpg", likes: 712 },
    { id: 36, user: "gloria_chef", text: "El frosting de Cinnabon es adictivo y ahora se hacerlo!", time: "2d", avatar: "/avatars/avatar-06.jpg", likes: 356 },
    { id: 37, user: "victor_eats", text: "Pense que las recetas serian aproximadas pero no, son EXACTAS", time: "2d", avatar: "/avatars/avatar-07.jpg", likes: 267 },
    { id: 38, user: "martha_home", text: "Mi familia cree que me volvi chef profesional de la noche a la manana", time: "2d", avatar: "/avatars/avatar-08.jpg", likes: 423 },
    { id: 39, user: "ernesto_grill", text: "El adobo del pollo de Popeyes es oro puro. Gracias por compartir", time: "3d", avatar: "/avatars/avatar-09.jpg", likes: 534 },
    { id: 40, user: "silvia_taste", text: "Ya no gasto en delivery. Todo lo hago igual o mejor en casa", time: "3d", avatar: "/avatars/avatar-10.jpg", likes: 345 },
    { id: 41, user: "hector_pro", text: "Como dueno de restaurante, esto me ahorro meses de prueba y error", time: "3d", avatar: "/avatars/avatar-11.jpg", likes: 623 },
    { id: 42, user: "diana_cooks", text: "Los tacos de Taco Bell con carne perfecta. Mi familia esta encantada", time: "3d", avatar: "/avatars/avatar-12.jpg", likes: 289 },
    { id: 43, user: "arturo_chef", text: "La salsa ranch de Wingstop es mi favorita y ahora la hago litros", time: "3d", avatar: "/avatars/avatar-13.jpg", likes: 378 },
    { id: 44, user: "veronica_food", text: "Mis hijos prefieren mis nuggets a los del Happy Meal", time: "3d", avatar: "/avatars/avatar-14.jpg", likes: 456 },
    { id: 45, user: "jorge_taste", text: "El secreto estaba en la temperatura del aceite. Aqui lo explican todo", time: "3d", avatar: "/avatars/avatar-15.jpg", likes: 234 },
    { id: 46, user: "beatriz_home", text: "Hice una cena para 10 personas estilo Olive Garden. Exito total", time: "4d", avatar: "/avatars/avatar-01.jpg", likes: 567 },
    { id: 47, user: "francisco_grill", text: "Las costillas BBQ estilo Texas Roadhouse son mi nuevo plato estrella", time: "4d", avatar: "/avatars/avatar-02.jpg", likes: 445 },
    { id: 48, user: "alejandra_chef", text: "No sabia que el secreto de muchas salsas era tan simple", time: "4d", avatar: "/avatars/avatar-03.jpg", likes: 312 },
    { id: 49, user: "eduardo_eats", text: "Mi novia no creia que el helado era casero. Identico al de DQ", time: "4d", avatar: "/avatars/avatar-04.jpg", likes: 389 },
    { id: 50, user: "lorena_kitchen", text: "Compre hace una semana y ya recupere la inversion en lo que ahorre", time: "4d", avatar: "/avatars/avatar-05.jpg", likes: 534 },
    { id: 51, user: "sergio_food", text: "El blend de especias para el pollo frito es una maravilla", time: "4d", avatar: "/avatars/avatar-06.jpg", likes: 267 },
    { id: 52, user: "mariana_taste", text: "Ahora entiendo por que la comida rapida es tan adictiva. Los ingredientes!", time: "5d", avatar: "/avatars/avatar-07.jpg", likes: 445 },
    { id: 53, user: "ramon_pro", text: "Esto es conocimiento que las franquicias protegen con contratos", time: "5d", avatar: "/avatars/avatar-08.jpg", likes: 623 },
    { id: 54, user: "cecilia_cooks", text: "Mi food truck de tacos ya tiene fila gracias a estas recetas", time: "5d", avatar: "/avatars/avatar-09.jpg", likes: 712 },
    { id: 55, user: "antonio_master", text: "La marinada del pollo teriyaki es exacta. Mis clientes estan felices", time: "5d", avatar: "/avatars/avatar-10.jpg", likes: 356 },
    { id: 56, user: "gabriela_home", text: "Por fin puedo hacer la pizza estilo Pizza Hut en casa", time: "5d", avatar: "/avatars/avatar-11.jpg", likes: 445 },
    { id: 57, user: "juan_chef", text: "Las empanadas con la receta de aqui se venden solas", time: "5d", avatar: "/avatars/avatar-12.jpg", likes: 534 },
    { id: 58, user: "natalia_food", text: "El Mac and Cheese cremoso como el de los restaurantes. Increible", time: "6d", avatar: "/avatars/avatar-13.jpg", likes: 267 },
    { id: 59, user: "luis_grill", text: "Monte mi negocio de alitas con $500 y estas recetas. Ya facturo $3000/mes", time: "6d", avatar: "/avatars/avatar-14.jpg", likes: 823 },
    { id: 60, user: "irene_taste", text: "La salsa de los tacos al pastor es un secreto que ya no lo es", time: "6d", avatar: "/avatars/avatar-15.jpg", likes: 389 },
    { id: 61, user: "marcos_eats", text: "Pense que era click bait pero es 100% real. Vale cada centavo", time: "6d", avatar: "/avatars/avatar-01.jpg", likes: 456 },
    { id: 62, user: "paulina_chef", text: "Mis brownies ahora saben como los de Applebees. Mi familia los ama", time: "6d", avatar: "/avatars/avatar-02.jpg", likes: 312 },
    { id: 63, user: "felipe_pro", text: "Como consultor de restaurantes confirmo: informacion de alto valor", time: "1w", avatar: "/avatars/avatar-03.jpg", likes: 678 },
    { id: 64, user: "sandra_kitchen", text: "El queso para nachos cremoso y sin grumos. Era lo que buscaba", time: "1w", avatar: "/avatars/avatar-04.jpg", likes: 234 },
    { id: 65, user: "jose_food", text: "Mis tortas ahogadas ya compiten con las de la esquina", time: "1w", avatar: "/avatars/avatar-05.jpg", likes: 345 },
    { id: 66, user: "andrea_home", text: "Nunca pense que $10 me cambiarian tanto la forma de cocinar", time: "1w", avatar: "/avatars/avatar-06.jpg", likes: 567 },
    { id: 67, user: "david_grill", text: "El chimichurri secreto es una bomba de sabor. Mis asados subieron de nivel", time: "1w", avatar: "/avatars/avatar-07.jpg", likes: 445 },
    { id: 68, user: "monica_taste", text: "Invite a cenar a mis suegros y creyeron que contrate catering", time: "1w", avatar: "/avatars/avatar-08.jpg", likes: 389 },
    { id: 69, user: "carlos_master", text: "Llevo 3 meses cocinando con estas recetas y mi familia nunca ha estado mas feliz", time: "1w", avatar: "/avatars/avatar-09.jpg", likes: 534 },
  ]

  const goToOferta = () => {
    if (redirectedRef.current) return
    redirectedRef.current = true
    router.push("/oferta")
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onEnded = () => goToOferta()
    const onTimeUpdate = () => {
      if (video.duration && isFinite(video.duration)) {
        // Redirigir justo antes de que termine para fluidez
        if (video.currentTime >= video.duration - 0.2) goToOferta()
      }
    }

    video.addEventListener("ended", onEnded)
    video.addEventListener("timeupdate", onTimeUpdate)

    return () => {
      video.removeEventListener("ended", onEnded)
      video.removeEventListener("timeupdate", onTimeUpdate)
    }
  }, [router])

  const startWithSound = async () => {
    const video = videoRef.current
    if (!video || started) return

    try {
      redirectedRef.current = false
      video.muted = false
      video.volume = 1
      await video.play()
      setStarted(true)
      setMuted(false)
    } catch (error) {
      console.error("[FeedVideo] Error playing video:", error)
    }
  }

  // --- LÓGICA DE INTERACCIÓN ---

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFollowing(true)
    // Aquí podrías disparar un pixel de "Lead" o "Interaction" si quisieras
  }

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLiked((prev) => {
      setLikes((l) => (prev ? l - 1 : l + 1))
      return !prev
    })
  }

  const handleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return
    video.muted = !muted
    setMuted(!muted)
  }

  const handleComments = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowComments(true)
  }

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSaved(!saved)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    // Solo feedback visual, no redirige
    alert("Enlace copiado al portapapeles (Simulación)") 
  }

  return (
    <div className="relative w-full h-full bg-black font-sans" onClick={startWithSound}>
      {/* Video Container */}
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-cover pointer-events-none"
          playsInline
          loop={false}
          preload="auto"
          src="https://recursoexperto.com/wp-content/uploads/2026/01/Video2.2.mp4"
        />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/40 to-transparent">
        <div className="flex items-center justify-between">
          <span className="text-white/90 font-medium text-sm drop-shadow-md flex items-center gap-1">
             Sugerencias para ti
          </span>
          <MoreHorizontal className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Play button Overlay (Solo visible antes de iniciar) */}
      {!started && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="h-20 w-20 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center animate-pulse">
            <svg viewBox="0 0 24 24" className="h-8 w-8 fill-white ml-1">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Sidebar Controls (Derecha) */}
      <div className="absolute right-2 bottom-24 z-20 flex flex-col items-center gap-6">
        
        {/* FOTO DE PERFIL + BOTÓN SEGUIR ANIMADO */}
        <div className="relative group cursor-pointer" onClick={(e) => e.stopPropagation()}>
          <div className={`w-12 h-12 rounded-full border-2 transition-all duration-300 overflow-hidden p-0.5 bg-black ${isFollowing ? 'border-transparent' : 'border-white'}`}>
            <img src="/profile-operator.jpg" alt="Profile" className="w-full h-full object-cover rounded-full" />
          </div>
          
          {/* Botón de Seguir (+) que desaparece con animación */}
          <div 
            onClick={handleFollow}
            className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#FE2C55] rounded-full flex items-center justify-center text-white text-lg font-bold shadow-sm transition-all duration-500 transform ${isFollowing ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
          >
            <Plus className="w-3 h-3 text-white stroke-[4]" />
          </div>
        </div>

        <button onClick={handleLike} className="flex flex-col items-center gap-1 group mt-2">
          <Heart className={`w-8 h-8 drop-shadow-md transition-transform active:scale-75 ${liked ? "fill-[#FE2C55] text-[#FE2C55]" : "text-white"}`} />
          <span className="text-white text-xs font-medium drop-shadow-md">{likes}</span>
        </button>

        <button onClick={handleComments} className="flex flex-col items-center gap-1 group">
          <MessageCircle className="w-8 h-8 text-white drop-shadow-md transition-transform active:scale-75" />
          <span className="text-white text-xs font-medium drop-shadow-md">{comments.length}</span>
        </button>

        <button onClick={handleSave} className="flex flex-col items-center gap-1 group">
          <Bookmark className={`w-8 h-8 drop-shadow-md transition-transform active:scale-75 ${saved ? "fill-white text-white" : "text-white"}`} />
          <span className="text-white text-xs font-medium drop-shadow-md">Guardar</span>
        </button>

        <button onClick={handleShare} className="flex flex-col items-center gap-1 group">
          <Send className="w-8 h-8 text-white drop-shadow-md -rotate-12 group-hover:-translate-y-1 transition-transform" />
          <span className="text-white text-xs font-medium drop-shadow-md">Enviar</span>
        </button>
      </div>

      {/* --- UI TIKTOK SHOP + INFO USUARIO (Izquierda Inferior) --- */}
      <div className="absolute bottom-0 left-0 w-full z-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-12 pb-6 px-4">
        
        {/* 1. BOTÓN DE PRODUCTO (ÚNICO QUE REDIRIGE APARTE DEL FIN DEL VIDEO) */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            goToOferta();
          }}
          className="mb-4 flex w-[75%] items-center gap-3 rounded bg-[#FE2C55]/90 hover:bg-[#FE2C55] p-2 pr-3 shadow-lg cursor-pointer active:scale-95 transition-transform animate-in slide-in-from-bottom-5 duration-700 backdrop-blur-sm border border-white/10"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-white/20">
            <ShoppingBag className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-white leading-tight truncate">La Bóveda Secreta (14 PDFs)</span>
            <div className="flex items-center gap-2 mt-0.5">
               <span className="text-[10px] font-medium text-white/90">4.9 ★★★★★</span>
               <span className="rounded bg-white px-1 py-0.5 text-[9px] font-bold text-[#FE2C55]">$10 USD</span>
            </div>
          </div>
          <ChevronRight className="ml-auto h-5 w-5 text-white/80 shrink-0" />
        </div>

        {/* 2. Información del Usuario */}
        <div className="flex flex-col gap-2">
          {/* Nombre: Ya no redirige, solo stopPropagation */}
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <span className="text-white font-bold text-shadow-sm text-[16px]">@chef_secreto</span>
            <CheckCircle2 className="w-4 h-4 text-[#20D5EC] fill-black" /> 
          </div>

          {/* 3. Descripción Vendedora (Sin palabra 'Industrial') */}
          <div onClick={(e) => e.stopPropagation()}>
            <p className="text-white text-sm leading-snug w-[90%] text-shadow-sm font-light">
              El sabor que las grandes cadenas no quieren que repliques en casa. 🍔🤫 <span className="font-bold">#TopSecret</span>
            </p>
          </div>
        </div>
      </div>

      {/* MODAL DE COMENTARIOS */}
      {showComments && (
        <div
          className="absolute inset-0 z-30 bg-black/60 backdrop-blur-[1px]"
          onClick={(e) => {
            e.stopPropagation()
            setShowComments(false)
          }}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-[#121212] rounded-t-xl h-[70%] flex flex-col border-t border-white/10 animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <span className="text-white font-semibold text-sm mx-auto">{comments.length} comentarios</span>
              <button onClick={() => setShowComments(false)} className="absolute right-4 p-1">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Lista de Comentarios */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
               {comments.map((comment) => (
                   <div key={comment.id} className="flex gap-3">
                       <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                           {comment.avatar ? (
                               <img src={comment.avatar || "/placeholder.svg"} alt={comment.user} className="w-full h-full object-cover"/>
                           ) : (
                               <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800" />
                           )}
                       </div>
                       <div className="flex-1">
                           <div className="flex items-center gap-2">
                               <span className="text-gray-300 text-xs font-semibold">{comment.user}</span>
                               <span className="text-gray-500 text-[10px]">{comment.time}</span>
                           </div>
                           <p className="text-white text-sm mt-0.5 leading-snug font-light">{comment.text}</p>
                           
                           {/* Botones de interacción comentario */}
                           <div className="flex items-center gap-4 mt-2">
                               <span className="text-gray-500 text-xs font-medium cursor-pointer">Responder</span>
                               <div className="flex items-center gap-1">
                                  <Heart className="w-3 h-3 text-gray-500" />
                                  <span className="text-gray-500 text-xs">{comment.likes}</span>
                               </div>
                           </div>

                           {/* Respuestas anidadas (Simuladas) */}
                           {comment.replies && comment.replies.map((reply, i) => (
                              <div key={i} className="flex gap-2 mt-3 pl-2 border-l border-white/10">
                                <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                                   <img src="/profile-operator.jpg" className="w-full h-full object-cover"/>
                                </div>
                                <div>
                                   <span className="text-[#FE2C55] text-xs font-semibold">Creador</span>
                                   <p className="text-white/90 text-sm">{reply.text}</p>
                                </div>
                              </div>
                           ))}
                       </div>
                   </div>
               ))}
            </div>

            {/* Input Fake */}
            <div className="p-3 border-t border-white/10 bg-[#121212]">
                <div className="flex items-center gap-3 bg-[#2F2F2F] rounded-full px-4 py-2.5">
                    <div className="w-6 h-6 rounded-full bg-gray-500 flex-shrink-0">
                        <img src="/profile-operator.jpg" className="w-full h-full rounded-full object-cover opacity-80" />
                    </div>
                    <span className="text-gray-400 text-sm font-light">Añadir comentario...</span>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
