"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { products as initialProducts, Product as BaseProduct } from "@/data/products";

export interface Product extends BaseProduct {
  stock: number;
  availableForDecant: boolean;
  decantPrice?: number;
  viewsCount: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  productCount?: number;
}

export interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number; // e.g. 10 for 10%, 500 for $500 UYU
  minPurchase?: number;
  expiryDate?: string;
  usedCount: number;
  maxUses?: number;
  isActive: boolean;
}

export interface Promotion {
  id: string;
  title: string;
  discountPercentage: number;
  targetCategory?: string; // 'all', 'perfumes-de-diseñador', 'perfumes-arabes', etc.
  targetBrand?: string;
  badgeText: string;
  isActive: boolean;
}

export interface SearchLog {
  term: string;
  count: number;
  lastSearched: string;
}

export interface AnalyticsData {
  totalVisits: number;
  todayVisits: number;
  productViews: Record<string, number>;
  searchQueries: SearchLog[];
}

interface StoreContextType {
  // Productos & Stock
  products: Product[];
  addProduct: (newProd: Omit<Product, "id" | "viewsCount">) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, newStock: number) => void;
  toggleDecant: (id: string, available?: boolean, decantPrice?: number) => void;
  stockFilter: "all" | "in-stock" | "out-of-stock" | "critical" | "decants";
  setStockFilter: (filter: "all" | "in-stock" | "out-of-stock" | "critical" | "decants") => void;

  // Categorías
  categories: Category[];
  addCategory: (category: Omit<Category, "id">) => void;
  updateCategory: (id: string, updated: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Cupones
  coupons: Coupon[];
  addCoupon: (coupon: Omit<Coupon, "id" | "usedCount">) => void;
  toggleCoupon: (id: string) => void;
  deleteCoupon: (id: string) => void;
  appliedCoupon: Coupon | null;
  applyCouponCode: (code: string) => { success: boolean; message: string; discountAmount: number };
  removeAppliedCoupon: () => void;

  // Ofertas & Promociones
  promotions: Promotion[];
  addPromotion: (promo: Omit<Promotion, "id">) => void;
  togglePromotion: (id: string) => void;
  deletePromotion: (id: string) => void;

  // Analytics
  analytics: AnalyticsData;
  trackProductView: (productId: string) => void;
  trackSearchQuery: (query: string) => void;

  // Admin Auth
  isAdminLoggedIn: boolean;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const INITIAL_CATEGORIES: Category[] = [
  {
    id: "cat-disenador",
    name: "Perfumes de Diseñador",
    slug: "perfumes-de-diseñador",
    description: "Fragancias icónicas de las casas internacionales de moda más prestigiadas.",
  },
  {
    id: "cat-arabes",
    name: "Perfumes Árabes",
    slug: "perfumes-arabes",
    description: "Extractos puros de autor, Oud de Camboya, maderas y maceraciones de Oriente.",
  },
  {
    id: "cat-nicho",
    name: "Ediciones Privadas & Nicho",
    slug: "ediciones-privadas",
    description: "Fragancias exclusivas de tirada limitada y alta concentración de aceites.",
  },
];

const INITIAL_COUPONS: Coupon[] = [
  {
    id: "coup-1",
    code: "BIENVENIDA10",
    type: "percentage",
    value: 10,
    minPurchase: 2000,
    usedCount: 14,
    maxUses: 100,
    isActive: true,
  },
  {
    id: "coup-2",
    code: "LUJO500",
    type: "fixed",
    value: 500,
    minPurchase: 4000,
    usedCount: 8,
    maxUses: 50,
    isActive: true,
  },
  {
    id: "coup-3",
    code: "OFERTA15",
    type: "percentage",
    value: 15,
    minPurchase: 5000,
    usedCount: 22,
    maxUses: 200,
    isActive: true,
  },
];

const INITIAL_PROMOTIONS: Promotion[] = [
  {
    id: "promo-1",
    title: "Especial Lattafa • 15% OFF",
    discountPercentage: 15,
    targetBrand: "Lattafa",
    badgeText: "PROMO LATTAFA",
    isActive: true,
  },
  {
    id: "promo-2",
    title: "Semana del Diseñador • 10% OFF",
    discountPercentage: 10,
    targetCategory: "perfumes-de-diseñador",
    badgeText: "DISEÑADOR OFF",
    isActive: false,
  },
];

export function StoreProvider({ children }: { children: React.ReactNode }) {
  // 1. Productos con stock predeterminado realista y opción de decant
  const [products, setProducts] = useState<Product[]>(() => {
    return initialProducts.map((p, idx) => {
      // Variar stock para demostración (algunos sin stock, algunos críticos, la mayoría abundantes)
      let defaultStock = 12;
      if (idx % 7 === 0) defaultStock = 0; // Sin stock
      else if (idx % 5 === 0) defaultStock = 2; // Stock crítico
      else defaultStock = 10 + (idx % 15);

      // Decants disponibles para la mayoría de fragancias árabes e icónicas
      const isDecantReady = p.category === "perfumes-arabes" || p.price > 4000 || idx % 2 === 0;
      const decantPrice = Math.round(p.price * 0.22); // ~22% del frasco completo para muestra de 10ml

      return {
        ...p,
        stock: defaultStock,
        availableForDecant: isDecantReady,
        decantPrice: decantPrice,
        viewsCount: Math.floor(Math.random() * 80) + 15,
      };
    });
  });

  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [promotions, setPromotions] = useState<Promotion[]>(INITIAL_PROMOTIONS);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [stockFilter, setStockFilter] = useState<"all" | "in-stock" | "out-of-stock" | "critical" | "decants">("all");

  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalVisits: 1420,
    todayVisits: 184,
    productViews: {
      "khamrah-qahwa-lattafa": 142,
      "asad-lattafa": 118,
      "amber-oud-gold-24k": 96,
      "9pm-afnan": 89,
      "erba-pura-xerjoff": 74,
      "le-male-elixir-jpg": 68,
    },
    searchQueries: [
      { term: "Lattafa", count: 87, lastSearched: "Hace 5 minutos" },
      { term: "Khamrah", count: 64, lastSearched: "Hace 12 minutos" },
      { term: "Asad", count: 52, lastSearched: "Hace 20 minutos" },
      { term: "Oud", count: 48, lastSearched: "Hace 35 minutos" },
      { term: "Amber Oud", count: 41, lastSearched: "Hace 1 hora" },
      { term: "Montale", count: 33, lastSearched: "Hace 2 horas" },
      { term: "Xerjoff", count: 29, lastSearched: "Hace 3 horas" },
    ],
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Cargar estado guardado de LocalStorage
  useEffect(() => {
    try {
      const savedProds = localStorage.getItem("perfumes_importtados_products_v3");
      if (savedProds) setProducts(JSON.parse(savedProds));

      const savedCats = localStorage.getItem("perfumes_importtados_categories_v3");
      if (savedCats) setCategories(JSON.parse(savedCats));

      const savedCoupons = localStorage.getItem("perfumes_importtados_coupons_v3");
      if (savedCoupons) setCoupons(JSON.parse(savedCoupons));

      const savedPromos = localStorage.getItem("perfumes_importtados_promotions_v3");
      if (savedPromos) setPromotions(JSON.parse(savedPromos));

      const savedAnalytics = localStorage.getItem("perfumes_importtados_analytics_v3");
      if (savedAnalytics) {
        const parsed = JSON.parse(savedAnalytics);
        setAnalytics({
          ...parsed,
          todayVisits: parsed.todayVisits + 1,
          totalVisits: parsed.totalVisits + 1,
        });
      } else {
        setAnalytics((prev) => ({ ...prev, totalVisits: prev.totalVisits + 1 }));
      }

      const savedAdminState = localStorage.getItem("perfumes_importtados_admin_session");
      if (savedAdminState === "true") setIsAdminLoggedIn(true);
    } catch {
      // Ignorar en SSR
    }
  }, []);

  // Persistir cambios
  useEffect(() => {
    try {
      localStorage.setItem("perfumes_importtados_products_v3", JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem("perfumes_importtados_categories_v3", JSON.stringify(categories));
    } catch {}
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem("perfumes_importtados_coupons_v3", JSON.stringify(coupons));
    } catch {}
  }, [coupons]);

  useEffect(() => {
    try {
      localStorage.setItem("perfumes_importtados_promotions_v3", JSON.stringify(promotions));
    } catch {}
  }, [promotions]);

  useEffect(() => {
    try {
      localStorage.setItem("perfumes_importtados_analytics_v3", JSON.stringify(analytics));
    } catch {}
  }, [analytics]);

  // Funciones de Producto & Stock
  const addProduct = (newProd: Omit<Product, "id" | "viewsCount">) => {
    const id = newProd.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now().toString().slice(-4);
    const created: Product = {
      ...newProd,
      id,
      viewsCount: 1,
      stock: newProd.stock ?? 10,
      availableForDecant: newProd.availableForDecant ?? true,
      decantPrice: newProd.decantPrice || Math.round(newProd.price * 0.22),
    };
    setProducts((prev) => [created, ...prev]);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateStock = (id: string, newStock: number) => {
    const stockVal = Math.max(0, newStock);
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: stockVal } : p))
    );
  };

  const toggleDecant = (id: string, available?: boolean, decantPrice?: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const isAvail = available !== undefined ? available : !p.availableForDecant;
          return {
            ...p,
            availableForDecant: isAvail,
            decantPrice: decantPrice !== undefined ? decantPrice : (p.decantPrice || Math.round(p.price * 0.22)),
          };
        }
        return p;
      })
    );
  };

  // Funciones de Categorías
  const addCategory = (cat: Omit<Category, "id">) => {
    const id = "cat-" + Date.now().toString().slice(-5);
    const newCat: Category = {
      ...cat,
      id,
      slug: cat.slug || cat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    };
    setCategories((prev) => [...prev, newCat]);
  };

  const updateCategory = (id: string, updated: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // Funciones de Cupones
  const addCoupon = (coup: Omit<Coupon, "id" | "usedCount">) => {
    const id = "coup-" + Date.now().toString().slice(-5);
    const newCoup: Coupon = {
      ...coup,
      id,
      code: coup.code.toUpperCase().trim(),
      usedCount: 0,
      isActive: coup.isActive ?? true,
    };
    setCoupons((prev) => [newCoup, ...prev]);
  };

  const toggleCoupon = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  const applyCouponCode = (code: string) => {
    const cleanCode = code.toUpperCase().trim();
    const found = coupons.find((c) => c.code === cleanCode && c.isActive);

    if (!found) {
      return { success: false, message: "Código de cupón no válido o expirado", discountAmount: 0 };
    }

    setAppliedCoupon(found);
    // Incrementar contador de uso
    setCoupons((prev) =>
      prev.map((c) => (c.id === found.id ? { ...c, usedCount: c.usedCount + 1 } : c))
    );

    return {
      success: true,
      message: `Cupón ${found.code} aplicado con éxito`,
      discountAmount: found.type === "percentage" ? found.value : found.value,
    };
  };

  const removeAppliedCoupon = () => {
    setAppliedCoupon(null);
  };

  // Funciones de Promociones
  const addPromotion = (promo: Omit<Promotion, "id">) => {
    const id = "promo-" + Date.now().toString().slice(-5);
    setPromotions((prev) => [{ ...promo, id, isActive: promo.isActive ?? true }, ...prev]);
  };

  const togglePromotion = (id: string) => {
    setPromotions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const deletePromotion = (id: string) => {
    setPromotions((prev) => prev.filter((p) => p.id !== id));
  };

  // Tracking para Analytics
  const trackProductView = (productId: string) => {
    setAnalytics((prev) => {
      const views = { ...prev.productViews };
      views[productId] = (views[productId] || 0) + 1;
      return { ...prev, productViews: views };
    });

    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, viewsCount: (p.viewsCount || 0) + 1 } : p))
    );
  };

  const trackSearchQuery = (query: string) => {
    const term = query.trim();
    if (!term || term.length < 2) return;

    setAnalytics((prev) => {
      const existingIdx = prev.searchQueries.findIndex(
        (s) => s.term.toLowerCase() === term.toLowerCase()
      );
      let newQueries = [...prev.searchQueries];

      if (existingIdx >= 0) {
        newQueries[existingIdx] = {
          ...newQueries[existingIdx],
          count: newQueries[existingIdx].count + 1,
          lastSearched: "Hace un momento",
        };
      } else {
        newQueries.unshift({
          term,
          count: 1,
          lastSearched: "Hace un momento",
        });
      }

      return { ...prev, searchQueries: newQueries.slice(0, 20) };
    });
  };

  // Autenticación de Admin (PIN simple e intuitivo)
  const loginAdmin = (pin: string) => {
    if (pin.trim() === "1234" || pin.trim() === "admin" || pin.trim() === "perfumes") {
      setIsAdminLoggedIn(true);
      try {
        localStorage.setItem("perfumes_importtados_admin_session", "true");
      } catch {}
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem("perfumes_importtados_admin_session");
    } catch {}
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        toggleDecant,
        stockFilter,
        setStockFilter,

        categories,
        addCategory,
        updateCategory,
        deleteCategory,

        coupons,
        addCoupon,
        toggleCoupon,
        deleteCoupon,
        appliedCoupon,
        applyCouponCode,
        removeAppliedCoupon,

        promotions,
        addPromotion,
        togglePromotion,
        deletePromotion,

        analytics,
        trackProductView,
        trackSearchQuery,

        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        isAdminModalOpen,
        setIsAdminModalOpen,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore debe utilizarse dentro de un StoreProvider");
  }
  return context;
}
