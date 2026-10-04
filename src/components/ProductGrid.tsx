"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Product } from "@/context/StoreContext";
import ProductCard from "./ProductCard";
import { Search, SlidersHorizontal, Sparkles, X, Tag } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface ProductGridProps {
  products: Product[];
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
}

export default function ProductGrid({
  products,
  searchQuery = "",
  onSearchChange,
}: ProductGridProps) {
  const { selectedPillar, setSelectedPillar } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [selectedBrand, setSelectedBrand] = useState<string>("Todas");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [internalSearch, setInternalSearch] = useState<string>("");

  const activeSearch = searchQuery || internalSearch;

  // Escuchar si hay hash en la URL para cambiar categoría
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#catalogo-disenador") {
        setSelectedCategory("perfumes-de-diseñador");
        setSelectedBrand("Todas");
      } else if (hash === "#catalogo-arabes") {
        setSelectedCategory("perfumes-arabes");
        setSelectedBrand("Todas");
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Extraer lista de marcas únicas y su conteo
  const brandList = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      // Si hay una categoría seleccionada (distinta de Todos), filtrar marcas por esa categoría
      if (selectedCategory === "Todos" || p.category === selectedCategory) {
        const b = p.brand || "Otras";
        counts[b] = (counts[b] || 0) + 1;
      }
    });

    const sortedBrands = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sortedBrands;
  }, [products, selectedCategory]);

  // Si se cambia de categoría y la marca ya no existe en esa categoría, resetear marca
  useEffect(() => {
    if (selectedBrand !== "Todas") {
      const exists = brandList.some(([b]) => b === selectedBrand);
      if (!exists) {
        setSelectedBrand("Todas");
      }
    }
  }, [selectedCategory, brandList, selectedBrand]);

  // Filtrado y ordenamiento de productos
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Filtro por categoría principal
        const matchesCategory =
          selectedCategory === "Todos" || p.category === selectedCategory;

        // Filtro por Marca requerida
        const matchesBrand =
          selectedBrand === "Todas" || p.brand === selectedBrand;

        // Filtro por pilar olfativo si fue seleccionado
        const matchesPillar =
          !selectedPillar || p.pillarCategory === selectedPillar;

        // Búsqueda por texto (título, marca o notas)
        const query = activeSearch.toLowerCase().trim();
        const matchesSearch =
          !query ||
          p.title.toLowerCase().includes(query) ||
          (p.brand && p.brand.toLowerCase().includes(query)) ||
          p.notes.some((note) => note.toLowerCase().includes(query));

        return matchesCategory && matchesBrand && matchesPillar && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "discount") {
          const discountA = a.discount ? parseInt(a.discount.replace("-", "").replace("%", "")) : 0;
          const discountB = b.discount ? parseInt(b.discount.replace("-", "").replace("%", "")) : 0;
          return discountB - discountA;
        }
        return 0;
      });
  }, [products, selectedCategory, selectedBrand, selectedPillar, activeSearch, sortBy]);

  return (
    <section id="catalogo" className="w-full py-16 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Encabezado */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span className="text-[11px] font-medium uppercase tracking-ultra text-gold-400 font-montserrat">
            Catálogo Oficial &bull; Perfumes Importados
          </span>
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-sand-50 tracking-wide mb-3">
          Colección de Fragancias
        </h2>
        <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-4" />
        <p className="text-xs sm:text-sm text-sand-300 font-light leading-relaxed font-montserrat">
          Explore nuestro catálogo selecto de perfumería árabe e importada de diseñador, con precios en moneda nacional ($ UYU) y stock listo para entrega inmediata.
        </p>
      </div>

      {/* Pill Informativa de Filtro Olfativo Activo */}
      {selectedPillar && (
        <div className="mb-6 flex items-center justify-between p-3.5 bg-noir-900 border border-gold-500/40 rounded-xl animate-fade-in">
          <div className="flex items-center gap-2 text-xs text-sand-200">
            <span className="text-gold-400 font-semibold uppercase tracking-wider">
              Familia Olfativa Seleccionada:
            </span>
            <span className="bg-gold-500 text-noir-950 font-bold px-2 py-0.5 rounded text-[11px]">
              {selectedPillar}
            </span>
          </div>
          <button
            onClick={() => setSelectedPillar(null)}
            className="text-xs text-sand-400 hover:text-gold-300 flex items-center gap-1 transition-colors"
          >
            <span>Mostrar todas las familias</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Barra de Filtros por Categoría, Búsqueda y Ordenamiento */}
      <div className="mb-6 flex flex-col lg:flex-row items-center justify-between gap-4 border-y border-white/5 py-4">
        {/* Pestañas de Categoría */}
        <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          <button
            onClick={() => {
              setSelectedCategory("Todos");
              setSelectedBrand("Todas");
              window.location.hash = "catalogo";
            }}
            className={`whitespace-nowrap px-4 py-2 text-xs uppercase tracking-widest font-semibold rounded-full transition-all border ${
              selectedCategory === "Todos"
                ? "bg-gold-500 text-noir-950 border-gold-400 shadow-gold-glow"
                : "bg-noir-900 text-sand-300 border-white/10 hover:border-gold-500/40"
            }`}
          >
            Todos ({products.length})
          </button>

          <button
            id="catalogo-disenador"
            onClick={() => {
              setSelectedCategory("perfumes-de-diseñador");
              setSelectedBrand("Todas");
              window.location.hash = "catalogo-disenador";
            }}
            className={`whitespace-nowrap px-4 py-2 text-xs uppercase tracking-widest font-semibold rounded-full transition-all border ${
              selectedCategory === "perfumes-de-diseñador"
                ? "bg-gold-500 text-noir-950 border-gold-400 shadow-gold-glow"
                : "bg-noir-900 text-sand-300 border-white/10 hover:border-gold-500/40"
            }`}
          >
            Perfumes de Diseñador
          </button>

          <button
            id="catalogo-arabes"
            onClick={() => {
              setSelectedCategory("perfumes-arabes");
              setSelectedBrand("Todas");
              window.location.hash = "catalogo-arabes";
            }}
            className={`whitespace-nowrap px-4 py-2 text-xs uppercase tracking-widest font-semibold rounded-full transition-all border ${
              selectedCategory === "perfumes-arabes"
                ? "bg-gold-500 text-noir-950 border-gold-400 shadow-gold-glow"
                : "bg-noir-900 text-sand-300 border-white/10 hover:border-gold-500/40"
            }`}
          >
            Perfumes Árabes
          </button>
        </div>

        {/* Búsqueda y Ordenamiento */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
          <div className="relative flex-grow lg:flex-grow-0 sm:w-64">
            <input
              type="text"
              placeholder="Buscar perfume o nota..."
              value={activeSearch}
              onChange={(e) => {
                if (onSearchChange) onSearchChange(e.target.value);
                else setInternalSearch(e.target.value);
              }}
              className="w-full bg-noir-900 border border-white/10 rounded-full px-4 py-2 pl-9 text-xs text-sand-100 placeholder-sand-500 focus:outline-none focus:border-gold-500 transition-colors"
            />
            <Search className="w-3.5 h-3.5 text-sand-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative flex items-center shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-sand-400 mr-2 hidden sm:inline" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-noir-900 border border-white/10 rounded-full text-xs text-sand-300 px-3.5 py-2 pr-6 focus:outline-none focus:border-gold-500 uppercase tracking-wider cursor-pointer"
            >
              <option value="featured">Destacados</option>
              <option value="price-low">Precio: Menor a Mayor</option>
              <option value="price-high">Precio: Mayor a Menor</option>
              <option value="discount">Mayor Descuento</option>
            </select>
          </div>
        </div>
      </div>

      {/* FILTROS POR MARCA (Requerimiento específico) */}
      <div className="mb-8 p-3.5 bg-noir-950/70 border border-white/5 rounded-2xl">
        <div className="flex items-center gap-2 mb-2.5 text-xs text-gold-400 uppercase tracking-wider font-semibold">
          <Tag className="w-3.5 h-3.5" />
          <span>Filtrar por Marca:</span>
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedBrand("Todas")}
            className={`whitespace-nowrap px-3 py-1 text-xs rounded-lg transition-all border ${
              selectedBrand === "Todas"
                ? "bg-gold-500/20 text-gold-300 border-gold-500 font-semibold"
                : "bg-noir-900 text-sand-400 border-white/10 hover:text-sand-200 hover:border-white/20"
            }`}
          >
            Todas las marcas
          </button>

          {brandList.map(([brand, count]) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`whitespace-nowrap px-3 py-1 text-xs rounded-lg transition-all border flex items-center gap-1.5 ${
                selectedBrand === brand
                  ? "bg-gold-500 text-noir-950 border-gold-400 font-bold shadow-gold-glow"
                  : "bg-noir-900 text-sand-300 border-white/10 hover:text-gold-300 hover:border-gold-500/40"
              }`}
            >
              <span>{brand}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedBrand === brand ? "bg-noir-950 text-gold-400 font-bold" : "bg-noir-950 text-sand-400"
              }`}>
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Resumen de Filtros Activos y Conteo */}
      <div className="mb-6 flex flex-wrap justify-between items-center text-xs tracking-wider text-sand-400 uppercase gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-cinzel text-gold-400 font-semibold">
            {selectedCategory === "Todos" ? "Catálogo General" : selectedCategory}
          </span>
          {selectedBrand !== "Todas" && (
            <span className="px-2 py-0.5 bg-noir-900 border border-gold-500/40 text-gold-300 rounded text-[11px]">
              Marca: {selectedBrand}
            </span>
          )}
          <span>&bull; {filteredProducts.length} productos disponibles</span>
        </div>

        {(activeSearch || selectedCategory !== "Todos" || selectedBrand !== "Todas" || selectedPillar) && (
          <button
            onClick={() => {
              if (onSearchChange) onSearchChange("");
              else setInternalSearch("");
              setSelectedCategory("Todos");
              setSelectedBrand("Todas");
              setSelectedPillar(null);
            }}
            className="text-gold-400 hover:underline flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Restablecer filtros</span>
          </button>
        )}
      </div>

      {/* Grid de Productos */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-white/5 bg-noir-900/40 rounded-2xl">
          <p className="font-cinzel text-xl text-sand-300 mb-2">
            No se han encontrado fragancias con los filtros seleccionados
          </p>
          <p className="text-xs text-sand-500 mb-6">
            Intente seleccionar otra marca o limpiar la búsqueda para ver el resto del catálogo.
          </p>
          <button
            onClick={() => {
              if (onSearchChange) onSearchChange("");
              else setInternalSearch("");
              setSelectedCategory("Todos");
              setSelectedBrand("Todas");
              setSelectedPillar(null);
            }}
            className="px-6 py-2.5 text-xs uppercase tracking-widest text-noir-950 font-bold bg-gold-500 rounded-full hover:bg-gold-400 transition-colors"
          >
            Ver Todas las Fragancias
          </button>
        </div>
      )}
    </section>
  );
}
